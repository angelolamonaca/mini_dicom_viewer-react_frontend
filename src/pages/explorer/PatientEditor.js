import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, FormControl, Grid, Stack, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import {deletePatient, editPatient, getSinglePatient} from "../../services/patientService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
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
    const save = async () => {
        await editPatient(idPatient, patientState.patient.name)
        fetchData();
    }
    const deleteCurrentPatient = async () => {
        await deletePatient(idPatient, patientState.patient.name)
        navigate(`/`)
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
            marginBottom={'112px'}
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
                    disabled={patientState.patient.name.length === 0}
                    onClick={save}
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
                onClick={deleteCurrentPatient}
                startIcon={<DeleteIcon/>}>
                DELETE PATIENT
            </Button>
        </Grid>
    );
}
