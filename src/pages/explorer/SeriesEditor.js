import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, FormControl, Grid, Stack, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteSeries, editSeries, editSeriesModality, getSingleSeries} from "../../services/seriesService";
import {getAllModalities} from "../../services/modalityService";

export default function SimpleContainer() {

    const {idPatient, idStudy, idSeries} = useParams();
    const [seriesState, setSeriesState] = useState({
        series: {
            id: '',
            seriesName: '',
            idModality: '',
            modalityName: '',
            createdAt: '',
            updatedAt: ''
        }
    });
    const [modalitiesState, setModalitiesState] = useState({
        modalities: [{
            id: '',
            name: ''
        }]
    });

    async function fetchModalities() {
        const result = await getAllModalities();
        setModalitiesState({modalities: result.data.data.getAllModalities});
    }

    useEffect(() => {
        async function fetchData() {
            await fetchModalities()
            const result = await getSingleSeries(idSeries);
            setSeriesState({series: result.data.data.getSingleSeries});
        }

        fetchData();
    }, [idSeries]);

    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        // Set errorMessage only if text is equal or bigger than MAX_LENGTH
        if (!seriesState.series.seriesName) {
            setErrorMessage(
                "seriesName cannot be empty"
            );
        }
    }, [seriesState]);
    useEffect(() => {
        if (seriesState.series.seriesName) {
            setErrorMessage("");
        }
    }, [seriesState, errorMessage]);

    async function fetchData() {
        const result = await getSingleSeries(idSeries);
        setSeriesState({series: result.data.data.getSingleSeries});
    }

    const restore = () => {
        fetchData();
    }

    const save = async () => {
        await editSeries(idSeries, seriesState.series.seriesName)
        await editSeriesModality(idSeries, seriesState.series.idModality)
        fetchData();
    }

    const deleteCurrentSeries = async () => {
        await deleteSeries(idSeries)
        navigate(`/`)
    }

    const onSeriesNameChange = (e) => {
        setSeriesState(prevSeries => ({
            series: {
                ...prevSeries.series,
                seriesName: e.target.value
            }
        }))
    }

    const onSeriesModalityChange = (e) => {
        const newIdModality = modalitiesState.modalities?.find(modality => {
            return modality.name === e.target.value
        })?.id
        setSeriesState(prevSeries => ({
            series: {
                ...prevSeries.series,
                idModality: newIdModality || ''

            }
        }))
    }

    const navigate = useNavigate();
    const goBack = () => navigate(`/patient/${idPatient}/study/${idStudy}/series/${idSeries}/explorer`);

    return (
        <Grid
            marginBottom={'112px'}
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            noValidate
            autoComplete="off">

            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="back"
                    onClick={goBack}>
                    <ArrowBackIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{marginLeft: '1rem'}}>
                    Series Editor
                </Typography>
            </Toolbar>
            <div>
                <TextField
                    sx={{margin: '25px'}}
                    id="outlined-basic"
                    label="ID"
                    variant="outlined"
                    value={idSeries}
                    disabled={true}/>
            </div>
            <div>
                <FormControl>
                    <TextField
                        sx={{margin: '25px'}}
                        id="outlined-basic"
                        label="seriesName"
                        variant="outlined"
                        error={seriesState.series.seriesName.length === 0}
                        helperText={errorMessage}
                        onChange={(e) => {
                            onSeriesNameChange(e)
                        }}
                        value={seriesState.series.seriesName}/>
                </FormControl>
            </div>
            <div>
                <TextField sx={{margin: '25px'}} id="outlined-basic" label="ID Modality" variant="outlined"
                           value={seriesState.series.idModality} disabled={true}/>
            </div>
            <div>
                <TextField sx={{margin: '25px'}} id="outlined-basic" label="Modality Name" variant="outlined"
                           onChange={(e) => {
                               onSeriesModalityChange(e)
                           }}
                           error={!seriesState.series.idModality}
                           value={modalitiesState.modalities?.find(modality => {
                               return modality.id === seriesState.series.idModality
                           })?.name}/>
            </div>
            <div>
                <TextField sx={{margin: '25px'}} id="outlined-basic" label="Created At" variant="outlined"
                           value={new Date(parseInt(seriesState.series.createdAt)).toLocaleString()} disabled={true}/>
            </div>
            <div>
                <TextField sx={{margin: '25px'}} id="outlined-basic" label="Updated At" variant="outlined"
                           value={new Date(parseInt(seriesState.series.updatedAt)).toLocaleString()} disabled={true}/>
            </div>
            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={save}
                    disabled={!seriesState.series.idModality || seriesState.series.seriesName.length === 0}
                    startIcon={<SaveIcon/>}>
                    Save
                </Button>
                <Button
                    variant="contained"
                    color={"warning"}
                    onClick={restore}
                    startIcon={<CancelIcon/>}>
                    Discard changes
                </Button>
            </Stack>
            <Button
                sx={{marginTop: '1rem'}}
                variant="outlined"
                color={"error"}
                onClick={deleteCurrentSeries}
                startIcon={<DeleteIcon/>}>
                DELETE SERIES
            </Button>
        </Grid>
    );
}
