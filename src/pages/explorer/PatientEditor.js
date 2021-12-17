import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, FormControl, Grid, Stack, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import {editPatient, getSinglePatient} from "../../services/patientService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

export default function SimpleContainer() {
    const {idPatient} = useParams();
    const [patientState, setPatientState] = useState({
        patient: {
            id: '',
            name: '',
            createdAt: '',
            updatedAt: '',
        }
    });
    useEffect(() => {
        async function fetchData() {
            const result = await getSinglePatient(idPatient);
            setPatientState({patient: result.data.data.getSinglePatient});
        }

        fetchData();
    }, [idPatient]);

    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        // Set errorMessage only if text is equal or bigger than MAX_LENGTH
        if (!patientState.patient.name) {
            setErrorMessage(
                "Name cannot be empty"
            );
        }
    }, [patientState]);
    useEffect(() => {
        if (patientState.patient.name) {
            setErrorMessage("");
        }
    }, [patientState, errorMessage]);

    async function fetchData() {
        const result = await getSinglePatient(idPatient);
        setPatientState({patient: result.data.data.getSinglePatient});
    }
    const restore = () => {
        fetchData();
    }
    const save = () => {
        console.log("Line 53 in PatientEditor.js", idPatient, patientState.patient.name)
        editPatient(idPatient, patientState.patient.name)
    }

    const onNameChange = (e) => {
        setPatientState(prevPatient => ({
            patient: {
                ...prevPatient.patient,
                name: e.target.value
            }
        }))
    }

    const navigate = useNavigate();
    const goBack = () => navigate('/');

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

            <div>
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
                        Patient Editor
                    </Typography>
                </Toolbar>
            </div>
            <div>
                <TextField
                    sx={{margin: '25px'}}
                    id="outlined-basic"
                    label="ID"
                    variant="outlined"
                    value={idPatient}
                    disabled={true}/>
            </div>
            <div>
                <FormControl>
                    <TextField
                        sx={{margin: '25px'}}
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        error={patientState.patient.name.length === 0}
                        helperText={errorMessage}
                        onChange={(e) => {
                            onNameChange(e)
                        }}
                        value={patientState.patient.name}/>
                </FormControl>
            </div>
            <div>
                <TextField
                    sx={{margin: '25px'}}
                    id="outlined-basic"
                    label="Created At"
                    variant="outlined"
                    value={new Date(parseInt(patientState.patient.createdAt)).toLocaleString()} disabled={true}/>
            </div>
            <div>
                <TextField
                    sx={{margin: '25px'}}
                    id="outlined-basic"
                    label="Updated At"
                    variant="outlined"
                    value={new Date(parseInt(patientState.patient.updatedAt)).toLocaleString()} disabled={true}/>
            </div>

            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={save}>
                    Save
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={restore}>
                    Discard changes
                </Button>
            </Stack>
        </Grid>
    );
}
