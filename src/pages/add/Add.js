import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import SaveIcon from "@mui/icons-material/Save";
import {createPatient, getAllPatientsWithStudies} from "../../services/patientService";
import {useNavigate} from "react-router";
import {createStudy} from "../../services/studyService";

export default function LabTabs() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [patientState, setPatientState] = useState({
        patient: {
            id: '',
            name: '',
            createdAt: '',
            updatedAt: '',
        }
    });
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


    const onNameChange = (e) => {
        setPatientState(prevPatient => ({
            patient: {
                ...prevPatient.patient,
                name: e.target.value
            }
        }))
    }

    const [patientSelect, setPatientSelect] = React.useState('');
    const handlePatientSelectChange = (event) => {
        setPatientSelect(event.target.value);
    };
    const [patientsState, setPatientsState] = useState({
        patients: [{
            id: '',
            name: ''
        }]
    });
    async function fetchData() {
        const result = await getAllPatientsWithStudies();
        setPatientsState({patients: result.data.data.getAllPatients});
    }
    useEffect(() => {
        fetchData();
    }, []);

    const [studyState, setStudyState] = useState({
        study: {
            id: '',
            studyName: '',
            createdAt: '',
            updatedAt: '',
        }
    });
    const [studyErrorMessage, setStudyErrorMessage] = useState("");
    useEffect(() => {
        // Set errorMessage only if text is equal or bigger than MAX_LENGTH
        if (!studyState.study.studyName) {
            setStudyErrorMessage(
                "Name cannot be empty"
            );
        }
    }, [studyState]);
    useEffect(() => {
        if (studyState.study.studyName) {
            setStudyErrorMessage("");
        }
    }, [studyState, studyErrorMessage]);


    const onStudyNameChange = (e) => {
        setStudyState(prevStudy => ({
            study: {
                ...prevStudy.study,
                studyName: e.target.value
            }
        }))
    }
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
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Add Patient" value="1"/>
                        <Tab label="Add Study" value="2"/>
                        <Tab label="Add Series" value="3"/>
                        <Tab label="Add File" value="4"/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <FormGroup>
                        <FormControl>
                            <TextField
                                sx={{my: 2}}
                                id="outlined-basic"
                                label="Patient Name"
                                variant="outlined"
                                error={patientState.patient.name.length === 0}
                                helperText={errorMessage}
                                onChange={(e) => {
                                    onNameChange(e)
                                }}
                                value={patientState.patient.name}/>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="success"
                            disabled={patientState.patient.name.length === 0}
                            onClick={async () => {
                                const newPatient = await createPatient(patientState.patient.name)
                                navigate(`/patient/${newPatient.data.data.createPatient.id}`)
                            }}
                            startIcon={<SaveIcon />}>
                            Save
                        </Button>
                    </FormGroup>
                </TabPanel>
                <TabPanel value="2">
                    <FormGroup>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Patient</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={patientSelect}
                                label="Patient"
                                onChange={handlePatientSelectChange}>
                                {patientsState.patients.map((patient) => (
                                    <MenuItem value={patient.id}>{patient.name}</MenuItem>
                                ))}
                            </Select>
                            <TextField
                                sx={{my: 2}}
                                id="outlined-basic"
                                label="Study Name"
                                variant="outlined"
                                error={studyState.study.studyName.length === 0}
                                helperText={studyErrorMessage}
                                onChange={(e) => {
                                    onStudyNameChange(e)
                                }}
                                value={studyState.study.studyName}/>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="success"
                            disabled={studyState.study.studyName.length === 0}
                            onClick={async () => {
                                const newStudy = await createStudy(studyState.study.studyName, patientSelect)
                                navigate(`/patient/${patientSelect}/study/${newStudy.data.data.createStudy.id}`)
                            }}
                            startIcon={<SaveIcon />}>
                            Save
                        </Button>
                    </FormGroup>
                </TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="4">Item Three</TabPanel>
            </TabContext>
        </Grid>
    );
}
