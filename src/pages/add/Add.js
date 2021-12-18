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
import {createStudy, getAllStudies} from "../../services/studyService";
import {getAllModalities} from "../../services/modalityService";
import {createSeries, getAllSeries} from "../../services/seriesService";
import {createFile} from "../../services/fileService";

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
    async function fetchPatients() {
        const result = await getAllPatientsWithStudies();
        setPatientsState({patients: result.data.data.getAllPatients});
    }
    useEffect(() => {
        fetchPatients();
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



    const [studySelect, setStudySelect] = React.useState('');
    const handleStudySelectChange = (event) => {
        setStudySelect(event.target.value);
    };
    const [studiesState, setStudiesState] = useState({
        studies: [{
            id: '',
            studyName: ''
        }]
    });
    async function fetchStudies() {
        const result = await getAllStudies();
        setStudiesState({studies: result.data.data.getAllStudies});
    }
    useEffect(() => {
        fetchStudies();
    }, []);




    const [modalitySelect, setModalitySelect] = React.useState('');
    const handleModalitySelectChange = (event) => {
        setModalitySelect(event.target.value);
    };
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
        fetchModalities();
    }, []);


    const [seriesState, setSeriesState] = useState({
        series: {
            id: '',
            seriesName: '',
            createdAt: '',
            updatedAt: '',
        }
    });
    const [seriesErrorMessage, setSeriesErrorMessage] = useState("");
    useEffect(() => {
        // Set errorMessage only if text is equal or bigger than MAX_LENGTH
        if (!seriesState.series.seriesName) {
            setSeriesErrorMessage(
                "Name cannot be empty"
            );
        }
    }, [seriesState]);
    useEffect(() => {
        if (seriesState.series.seriesName) {
            setSeriesErrorMessage("");
        }
    }, [seriesState, seriesErrorMessage]);


    const onSeriesNameChange = (e) => {
        setSeriesState(prevSeries => ({
            series: {
                ...prevSeries.series,
                seriesName: e.target.value
            }
        }))
    }






    const [seriesSelect, setSeriesSelect] = React.useState('');
    const handleSeriesSelectChange = (event) => {
        setSeriesSelect(event.target.value);
    };
    const [seriesesState, setSeriesesState] = useState({
        series: [{
            id: '',
            name: ''
        }]
    });
    async function fetchSeries() {
        const result = await getAllSeries();
        setSeriesesState({series: result.data.data.getAllSeries});
    }
    useEffect(() => {
        fetchSeries();
    }, []);




    const [fileState, setFileState] = useState({
        file: {
            id: '',
            filePath: ''
        }
    });
    const [fileErrorMessage, setFileErrorMessage] = useState("");
    useEffect(() => {
        // Set errorMessage only if text is equal or bigger than MAX_LENGTH
        if (!fileState.file.filePath) {
            setFileErrorMessage(
                "Name cannot be empty"
            );
        }
    }, [fileState]);
    useEffect(() => {
        if (fileState.file.filePath) {
            setFileErrorMessage("");
        }
    }, [fileState, fileErrorMessage]);


    const onFilePathChange = (e) => {
        setFileState(prevFile => ({
            file: {
                ...prevFile.file,
                filePath: e.target.value
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
                <TabPanel value="3">
                    <FormGroup>
                        <FormControl sx={{my: 2}}>
                            <InputLabel id="demo-simple-select-label">Patient</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simpdle-select"
                                value={patientSelect}
                                label="Patient"
                                onChange={handlePatientSelectChange}>
                                {patientsState.patients.map((patient) => (
                                    <MenuItem value={patient.id}>{patient.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{my: 2}}>
                            <InputLabel id="demo-simple-select-label">Study</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simpdle-select"
                                value={studySelect}
                                label="Study"
                                onChange={handleStudySelectChange}>
                                {studiesState.studies.map((study) => (
                                    <MenuItem value={study.id}>{study.studyName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{my: 2}}>
                            <InputLabel id="demo-simple-select-label">Modality</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simpdle-select"
                                value={modalitySelect}
                                label="Study"
                                onChange={handleModalitySelectChange}>
                                {modalitiesState.modalities.map((modality) => (
                                    <MenuItem value={modality.id}>{modality.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{my: 2}}>
                            <TextField
                                id="outlined-basic"
                                label="Series Name"
                                variant="outlined"
                                error={seriesState.series.seriesName.length === 0}
                                helperText={seriesErrorMessage}
                                onChange={(e) => {
                                    onSeriesNameChange(e)
                                }}
                                value={seriesState.series.seriesName}/>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="success"
                            disabled={seriesState.series.seriesName.length === 0}
                            onClick={async () => {
                                const newSeries = await createSeries(seriesState.series.seriesName, patientSelect, studySelect, modalitySelect)
                                navigate(`/patient/${patientSelect}/study/${studySelect}/series/${newSeries.data.data.createSeries.id}`)
                            }}
                            startIcon={<SaveIcon />}>
                            Save
                        </Button>
                    </FormGroup>
                </TabPanel>
                <TabPanel value="4">
                    <FormGroup>
                        <FormControl sx={{my: 2}}>
                            <InputLabel id="demo-simple-select-label">Patient</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simpdle-select"
                                value={patientSelect}
                                label="Patient"
                                onChange={handlePatientSelectChange}>
                                {patientsState.patients.map((patient) => (
                                    <MenuItem value={patient.id}>{patient.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{my: 2}}>
                            <InputLabel id="demo-simple-select-label">Study</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simpdle-select"
                                value={studySelect}
                                label="Study"
                                onChange={handleStudySelectChange}>
                                {studiesState.studies.map((study) => (
                                    <MenuItem value={study.id}>{study.studyName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{my: 2}}>
                            <InputLabel id="demo-simple-select-label">Series</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simpdle-select"
                                value={seriesSelect}
                                label="Study"
                                onChange={handleSeriesSelectChange}>
                                {seriesesState.series.map((series) => (
                                    <MenuItem value={series.id}>{series.seriesName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{my: 2}}>
                            <TextField
                                id="outlined-basic"
                                label="Series Name"
                                variant="outlined"
                                error={fileState.file.filePath.length === 0}
                                helperText={seriesErrorMessage}
                                onChange={(e) => {
                                    onFilePathChange(e)
                                }}
                                value={fileState.file.filePath}/>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="success"
                            disabled={fileState.file.filePath.length === 0}
                            onClick={async () => {
                                const newFile = await createFile(seriesState.series.seriesName, patientSelect, studySelect, seriesSelect)
                                navigate(`/patient/${patientSelect}/study/${studySelect}/series/${seriesSelect}/file/${newFile.data.data.createFile.id}`)
                            }}
                            startIcon={<SaveIcon />}>
                            Save
                        </Button>
                    </FormGroup></TabPanel>
            </TabContext>
        </Grid>
    );
}
