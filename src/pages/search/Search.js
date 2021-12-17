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

    async function getModalities() {
        const modalitiesResult = await getAllModalities();
        return modalitiesResult.data.data.getAllModalities;
    }

    const editItem = async (params) => {
        const editedField = params.field.split(/(?=[A-Z])/)[0]
        const ids = params.id.split('-');
        switch (editedField) {
            case 'patient':
                editPatient(ids[0], params.value)
                    .then(() => {
                        fetchData().then(data => setDataState({data: data}));
                    })
                    .catch(() => {
                        fetchData().then(data => setDataState({data: data}));
                    })
                break;
            case 'study':
                editStudy(ids[1], params.value)
                    .then(() => {
                        fetchData().then(data => setDataState({data: data}));
                    })
                    .catch(() => {
                        fetchData().then(data => setDataState({data: data}));
                    })
                break;
            case 'series':
                editSeries(ids[2], params.value)
                    .then(() => {
                        fetchData().then(data => setDataState({data: data}));
                    })
                    .catch(() => {
                        fetchData().then(data => setDataState({data: data}));
                    })
                break;
            case 'modality':
                const modalities = await getModalities()
                const newModality = modalities.find(modality => {
                    return modality.name === params.value
                })
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

    const fetchData = async () => {
        const modalities = await getModalities()
        const patientsResult = await getAllPatientsWithAll();
        const patients = patientsResult.data.data.getAllPatients;
        let data = [];
        for await (const patient of patients) {
            data.push({
                id: patient.id.toString(),
                patientId: patient?.id,
                patientName: patient?.name,
                patientCreatedAt: new Date(parseInt(patient?.createdAt)),
                patientUpdatedAt: new Date(parseInt(patient?.updatedAt)),
            })
            for await (const study of patient.studies) {
                const itemIndex = data.findIndex((item => item.id === patient.id.toString()));
                await array.pull(data, data[itemIndex]);
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
                for await (const series of study.series) {
                    const itemIndex = data.findIndex((item => item.id === patient.id.toString() + '-' + study.id.toString()));
                    await array.pull(data, data[itemIndex]);
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
                        modalityId: await modalities.find(modality => {
                            return modality.id === series.idModality
                        }).id,
                        modalityName: await modalities.find(modality => {
                            return modality.id === series.idModality
                        }).name,
                        seriesCreatedAt: new Date(parseInt(series?.createdAt)),
                        seriesUpdatedAt: new Date(parseInt(series?.updatedAt)),
                    })
                    for await (const file of series.files) {
                        const itemIndex = data.findIndex((item => item.id === patient.id.toString() + '-' + study.id.toString() + '-' + series.id.toString()));
                        await array.pull(data, data[itemIndex]);
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
                            modalityId: await modalities.find(modality => {
                                return modality.id === series.idModality
                            }).id,
                            modalityName: await modalities.find(modality => {
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
                    }
                }
            }
        }
        return data
    }

    const [interval, setInterval] = React.useState([null, null]);
    const [intervalType, setIntervalType] = React.useState('patient');

    useEffect(() => {
        fetchData().then(data => setDataState({data: data}));
    }, []);

    async function filterData(data, localIntervalType, localInterval) {
        if (!localInterval[0] || !localInterval[1] || !localIntervalType) return;

        return data.filter((item) => {
            switch (localIntervalType) {
                case 'patient':
                    return new Date(item.patientCreatedAt).getTime() > new Date(localInterval[0]).getTime()
                        && new Date(item.patientCreatedAt).getTime() < new Date(localInterval[1]).getTime()
                case 'study':
                    return new Date(item.studyCreatedAt).getTime() > new Date(localInterval[0]).getTime()
                        && new Date(item.studyCreatedAt).getTime() < new Date(localInterval[1]).getTime()
                case 'series':
                    return new Date(item.seriesCreatedAt).getTime() > new Date(localInterval[0]).getTime()
                        && new Date(item.seriesCreatedAt).getTime() < new Date(localInterval[1]).getTime()
                case 'file':
                    return new Date(item.fileCreatedAt).getTime() > new Date(localInterval[0]).getTime()
                        && new Date(item.fileCreatedAt).getTime() < new Date(localInterval[1]).getTime()
                default:
                    return true;
            }
        });
    }

    const handleIntervalTypeChange = async (event) => {
        const newIntervalType = event.target.value
        setIntervalType(newIntervalType);
        await fetchData().then(async (data) => {
            filterData(data, newIntervalType, interval).then(async (filteredData) => {
                await setDataState({data: filteredData});
            })
        })
    };

    const handleIntervalChange = async (newInterval) => {
        if (!newInterval[0] || !newInterval[1]) return;
        setInterval(newInterval)
        await fetchData().then(async (data) => {
            filterData(data, intervalType, newInterval).then(async (filteredData) => {
                await setDataState({data: filteredData});
            })
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
                        startIcon={<CancelIcon/>}>
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
