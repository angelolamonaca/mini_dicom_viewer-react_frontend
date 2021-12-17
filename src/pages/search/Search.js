import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {editPatient, getAllPatientsWithAll} from "../../services/patientService";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {editStudy} from "../../services/studyService";
import {editSeries, editSeriesModality} from "../../services/seriesService";
import {editFile} from "../../services/fileService";
import {getAllModalities} from "../../services/modalityService";
import DeleteIcon from '@mui/icons-material/Delete';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CancelIcon from '@mui/icons-material/Cancel';
import {Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";

var array = require('lodash/array');
const columns = [
    {field: 'patientId', headerName: 'Patient ID', width: 100, editable: false},
    {field: 'patientName', headerName: 'Patient Name', width: 180, editable: true},
    {field: 'patientCreatedAt', headerName: 'Patient Created at', width: 500, editable: false},
    {field: 'studyId', headerName: 'Study ID', width: 100, editable: false},
    {field: 'studyName', headerName: 'Study Name', width: 180, editable: true},
    {field: 'studyCreatedAt', headerName: 'Study Created at', width: 500, editable: false},
    {field: 'seriesId', headerName: 'Series ID', width: 100, editable: false},
    {field: 'seriesName', headerName: 'Series Name', width: 180, editable: true},
    {field: 'seriesCreatedAt', headerName: 'SeriesCreated at', width: 500, editable: false},
    {field: 'modalityId', headerName: 'Modality ID', width: 100, editable: false},
    {field: 'modalityName', headerName: 'Modality Name', width: 180, editable: true},
    {field: 'fileId', headerName: 'File ID', width: 100, editable: false},
    {field: 'filePath', headerName: 'File Name', width: 180, editable: true},
    {field: 'fileCreatedAt', headerName: 'File Created at', width: 500, editable: false},

];

export default function DataTable(s) {
    let modalities;

    async function fetchModalities() {
        const modalitiesResult = await getAllModalities();
        modalities = modalitiesResult.data.data.getAllModalities;
    }

    const editItem = async (params) => {
        const editedField = params.field.split(/(?=[A-Z])/)[0]
        const ids = params.id.split('-');
        switch (editedField) {
            case 'patient':
                editPatient(ids[0], params.value)
                    .then(() => {
                        fetchData()
                    })
                    .catch(() => {
                        fetchData()
                    })
                break;
            case 'study':
                editStudy(ids[1], params.value)
                    .then(() => {
                        fetchData()
                    })
                    .catch(() => {
                        fetchData()
                    })
                break;
            case 'series':
                editSeries(ids[2], params.value)
                    .then(() => {
                        fetchData()
                    })
                    .catch(() => {
                        fetchData()
                    })
                break;
            case 'modality':
                await fetchModalities()
                console.log("Line 65 in Search.js", 'change modality name')
                console.log("Line 67 in Search.js", modalities)
                const newModality = modalities.find(modality => {
                    return modality.name === params.value
                })
                console.log("Line 76 in Search.js", newModality)
                editSeriesModality(ids[2], newModality?.id)
                    .then(() => {
                        fetchData()
                    })
                    .catch(() => {
                        fetchData()
                    })
                break;
            case 'file':
                editFile(ids[3], params.value)
                    .then(() => {
                        fetchData()
                    })
                    .catch(() => {
                        fetchData()
                    })
                break;
            default:
                console.log(`Sorry, we cannot get the change.`);
        }
    }
    const [dataState, setDataState] = useState({
        data: [{
            "id": '',
            "patientId": '',
            "patientName": "",
            "patientCreatedAt": "",
            "studyId": '',
            "studyName": "",
            "studyCreatedAt": "",
            "seriesId": '',
            "seriesName": "",
            "seriesCreatedAt": "",
            "modalityId": '',
            "modalityName": "",
            "fileId": '',
            "filePath": "",
            "fileCreatedAt": "",
        }]
    });

    async function fetchData() {
        await fetchModalities()
        const patientsResult = await getAllPatientsWithAll();
        const patients = await patientsResult.data.data.getAllPatients;
        let data = [];
        await patients.forEach(patient => {
            data.push({
                id: patient.id.toString(),
                patientId: patient?.id,
                patientName: patient?.name,
                patientCreatedAt: new Date(parseInt(patient?.createdAt)),
                patientUpdatedAt: new Date(parseInt(patient?.updatedAt)),
            })
            patient.studies?.forEach(study => {
                const itemIndex = data.findIndex((item => item.id === patient.id.toString()));
                array.pull(data, data[itemIndex]);
                data.push({
                    id: patient.id.toString() + '-' + study.id.toString(),
                    patientId: patient?.id,
                    patientName: patient?.name,
                    patientCreatedAt: new Date(parseInt(patient?.createdAt)),
                    patientUpdatedAt: new Date(parseInt(patient?.updatedAt)),
                    studyId: study?.id,
                    studyName: study?.studyName,
                    studyCreatedAt: new Date(parseInt(study?.createdAt)),
                    studyUpdatedAt: new Date(parseInt(study?.updatedAt)),
                })
                study.series?.forEach(series => {
                    const itemIndex = data.findIndex((item => item.id === patient.id.toString() + '-' + study.id.toString()));
                    array.pull(data, data[itemIndex]);
                    data.push({
                        id: patient.id.toString() + '-' + study.id.toString() + '-' + series.id.toString(),
                        patientId: patient?.id,
                        patientName: patient?.name,
                        patientCreatedAt: new Date(parseInt(patient?.createdAt)),
                        patientUpdatedAt: new Date(parseInt(patient?.updatedAt)),
                        studyId: study?.id,
                        studyName: study?.studyName,
                        studyCreatedAt: new Date(parseInt(study?.createdAt)),
                        studyUpdatedAt: new Date(parseInt(study?.updatedAt)),
                        seriesId: series?.id,
                        seriesName: series?.seriesName,
                        modalityId: modalities.find(modality => {
                            return modality.id === series.idModality
                        }).id,
                        modalityName: modalities.find(modality => {
                            return modality.id === series.idModality
                        }).name,
                        seriesCreatedAt: new Date(parseInt(series?.createdAt)),
                        seriesUpdatedAt: new Date(parseInt(series?.updatedAt)),
                    })
                    series.files?.forEach(file => {
                        const itemIndex = data.findIndex((item => item.id === patient.id.toString() + '-' + study.id.toString() + '-' + series.id.toString()));
                        array.pull(data, data[itemIndex]);
                        data.push({
                            id: patient.id.toString() + '-' + study.id.toString() + '-' + series.id.toString() + '-' + file.id.toString(),
                            patientId: patient?.id,
                            patientName: patient?.name,
                            patientCreatedAt: new Date(parseInt(patient?.createdAt)),
                            patientUpdatedAt: new Date(parseInt(patient?.updatedAt)),
                            studyId: study?.id,
                            studyName: study?.studyName,
                            studyCreatedAt: new Date(parseInt(study?.createdAt)),
                            studyUpdatedAt: new Date(parseInt(study?.updatedAt)),
                            modalityId: modalities.find(modality => {
                                return modality.id === series.idModality
                            }).id,
                            modalityName: modalities.find(modality => {
                                return modality.id === series.idModality
                            }).name,
                            seriesId: series?.id,
                            seriesName: series?.seriesName,
                            seriesCreatedAt: new Date(parseInt(series?.createdAt)),
                            seriesUpdatedAt: new Date(parseInt(series?.updatedAt)),
                            fileId: file?.id,
                            filePath: file?.filePath,
                            fileCreatedAt: new Date(parseInt(file?.createdAt)),
                            fileUpdatedAt: new Date(parseInt(file?.updatedAt))
                        })
                    })
                })
            })
        })
        await setDataState({data: data});
        return data
    }

    useEffect(() => {
        fetchData();
    }, []);

    const [interval, setInterval] = React.useState([null, null]);
    const [intervalType, setIntervalType] = React.useState('patient');

    async function filterData(intervalType, interval) {
        console.log("Line 219 in Search.js", interval[0], interval[1], intervalType)
        if (!interval[0] || !interval[1] || !intervalType) {
            console.log("Line 221 in Search.js", "Data fetching!")
            await fetchData()
            return;
        }
        console.log("Line 225 in Search.js", "Start filtering data!")
        const filteredData = dataState.data.filter((item) => {
            switch (intervalType) {
                case 'patient':
                    return new Date(item.patientCreatedAt).getTime() > new Date(interval[0]).getTime()
                        && new Date(item.patientCreatedAt).getTime() < new Date(interval[1]).getTime()
                case 'study':
                    return new Date(item.studyCreatedAt).getTime() > new Date(interval[0]).getTime()
                        && new Date(item.studyCreatedAt).getTime() < new Date(interval[1]).getTime()
                case 'series':
                    return new Date(item.seriesCreatedAt).getTime() > new Date(interval[0]).getTime()
                        && new Date(item.seriesCreatedAt).getTime() < new Date(interval[1]).getTime()
                case 'file':
                    return new Date(item.fileCreatedAt).getTime() > new Date(interval[0]).getTime()
                        && new Date(item.fileCreatedAt).getTime() < new Date(interval[1]).getTime()
                default:
                    return true;
            }
        })
        console.log("Line 244 in Search.js","Filtering data completed!")
        setDataState({data: filteredData});
    }

    const handleIntervalTypeChange = (event) => {
        console.log("Line 249 in Search.js", "Interval type changed: "+event.target.value)
        const newIntervalType = event.target.value
        setIntervalType(newIntervalType);
        fetchData().then(() => {
            filterData(newIntervalType, interval)
        })
    };

    const handleIntervalChange = (newInterval) => {
        console.log("Line 258 in Search.js", "Interval changed: "+newInterval)
        setInterval(newInterval)
        fetchData().then(() => {
            filterData(intervalType, newInterval)
        })
    };

    const resetDatePicker = async () => {
        await setInterval([null, null])
        await fetchData()
    }
    return (
        <Box style={{height: 'calc(100vh - 56px - 56px - 56px - 36px)', marginBottom: '56px', width: '100%'}}>
            <Toolbar sx={{marginTop: '10px', marginBottom: '10px'}}>
                <FormControl sx={{width: '150px', mx: 2}}>
                    <InputLabel id="demo-simple-select-label">Item Type</InputLabel>
                    <Select
                        size={"medium"}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={intervalType}
                        label="Item Type"
                        onChange={handleIntervalTypeChange}>
                        <MenuItem value={'patient'}>Patient</MenuItem>
                        <MenuItem value={'study'}>Study</MenuItem>
                        <MenuItem value={'series'}>Series</MenuItem>
                        <MenuItem value={'file'}>File</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{mx: 2, textTransform: 'uppercase'}}> created from </Box>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        startText="Start date"
                        endText="End date"
                        showTimeSelect
                        value={interval}
                        onChange={handleIntervalChange}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField sx={{mx: 2}} size={"medium"} {...startProps} />
                                <Box sx={{mx: 2, textTransform: 'uppercase'}}> to </Box>
                                <TextField sx={{mx: 2}} size={"medium"} {...endProps} />
                            </React.Fragment>
                        )}
                    />
                </LocalizationProvider>
                <Stack direction="row" spacing={2}>
                <Button
                    sx={{mx: 2}}
                    size={"medium"}
                    variant="outlined"
                    color={"error"}
                    onClick={resetDatePicker}
                    startIcon={<CancelIcon />}>
                    RESET DATE FILTER
                </Button>
                </Stack>
            </Toolbar>
            <DataGrid
                autoPageSize
                density={"compact"}
                rows={dataState.data}
                onCellEditCommit={editItem}
                columns={columns}
                checkboxSelection={true}
                disableSelectionOnClick={true}
                components={{
                    Toolbar: GridToolbar,
                }}

            />
        </Box>
    );
}
