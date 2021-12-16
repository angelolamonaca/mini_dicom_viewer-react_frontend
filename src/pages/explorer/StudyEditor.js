import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, FormControl, Grid, Stack, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import {getSingleStudy} from "../../services/studyService";
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

export default function SimpleContainer() {
    const {idPatient, idStudy} = useParams();
    const [studyState, setStudyState] = useState({
        study: {
            id: '',
            studyName: '',
            createdAt: '',
            updatedAt: ''
        }
    });
    useEffect(() => {
        async function fetchData() {
            const result = await getSingleStudy(idStudy);
            setStudyState({study: result.data.data.getSingleStudy});
        }

        fetchData();
    }, [idStudy]);

    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        // Set errorMessage only if text is equal or bigger than MAX_LENGTH
        if (!studyState.study.studyName) {
            setErrorMessage(
                "studyName cannot be empty"
            );
        }
    }, [studyState]);
    useEffect(() => {
        if (studyState.study.studyName) {
            setErrorMessage("");
        }
    }, [studyState, errorMessage]);

    const restore = () => {
        async function fetchData() {
            const result = await getSingleStudy(idStudy);
            setStudyState({study: result.data.data.getSingleStudy});
        }

        fetchData();
    }

    const onstudyNameChange = (e) => {
        setStudyState(prevStudy => ({
            study: {
                ...prevStudy.study,
                studyName: e.target.value
            }
        }))
    }

    const navigate = useNavigate();
    const goBack = () => navigate(`/patient/${idPatient}/study/${idStudy}/explorer`);
    const goSeriesDetails = () => navigate(`explorer/`);

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
                        Study Editor
                    </Typography>
                </Toolbar>
            <div>
                <TextField
                    sx={{margin: '25px'}}
                    id="outlined-basic"
                    label="ID"
                    variant="outlined"
                    value={idStudy}
                    disabled={true}/>
            </div>
            <div>
                <FormControl>
                    <TextField
                        sx={{margin: '25px'}}
                        id="outlined-basic"
                        label="studyName"
                        variant="outlined"
                        error={studyState.study.studyName.length === 0}
                        helperText={errorMessage}
                        onChange={(e) => {
                            onstudyNameChange(e)
                        }}
                        value={studyState.study.studyName}/>
                </FormControl>
            </div>
            <div>
                <TextField sx={{margin: '25px'}} id="outlined-basic" label="Created At" variant="outlined"
                           value={new Date(parseInt(studyState.study.createdAt)).toLocaleString()} disabled={true}/>
            </div>
            <div>
                <TextField sx={{margin: '25px'}} id="outlined-basic" label="Updated At" variant="outlined"
                           value={new Date(parseInt(studyState.study.updatedAt)).toLocaleString()} disabled={true}/>
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
