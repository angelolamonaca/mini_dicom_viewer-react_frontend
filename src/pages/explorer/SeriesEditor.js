import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, FormControl, Grid, Stack, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import {getSingleSeries} from "../../services/seriesService";
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

export default function SimpleContainer() {
    const {idPatient, idStudy, idSeries} = useParams();
    const [seriesState, setSeriesState] = useState({
        series: {
            id: '',
            seriesName: '',
            createdAt: '',
            updatedAt: ''
        }
    });
    useEffect(() => {
        async function fetchData() {
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

    const restore = () => {
        async function fetchData() {
            const result = await getSingleSeries(idSeries);
            setSeriesState({series: result.data.data.getSingleSeries});
        }

        fetchData();
    }

    const onseriesNameChange = (e) => {
        setSeriesState(prevSeries => ({
            series: {
                ...prevSeries.series,
                seriesName: e.target.value
            }
        }))
    }

    const navigate = useNavigate();
    const goBack = () => navigate(`/patient/${idPatient}/study/${idStudy}/series/${idSeries}/explorer`);

    return (
        <Grid
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
                            onseriesNameChange(e)
                        }}
                        value={seriesState.series.seriesName}/>
                </FormControl>
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
                <Button variant="contained" color="success">
                    Save
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={restore}>
                    Restore
                </Button>
            </Stack>
        </Grid>
    );
}
