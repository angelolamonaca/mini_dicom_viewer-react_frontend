import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {editPatient, getAllPatientsWithAll} from "../../services/patientService";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {editStudy} from "../../services/studyService";
import {editSeries, editSeriesModality} from "../../services/seriesService";
import {editFile} from "../../services/fileService";
import {getAllModalities} from "../../services/modalityService";

var array = require('lodash/array');
const columns = [
    {field: 'patientId', headerName: 'Patient ID', width: 100, editable: false},
    {field: 'patientName', headerName: 'Patient Name', width: 180, editable: true},
    {field: 'patientCreatedAt', headerName: 'Patient Created at', width: 160, editable: false},
    {field: 'studyId', headerName: 'Study ID', width: 100, editable: false},
    {field: 'studyName', headerName: 'Study Name', width: 180, editable: true},
    {field: 'studyCreatedAt', headerName: 'Study Created at', width: 160, editable: false},
    {field: 'seriesId', headerName: 'Series ID', width: 100, editable: false},
    {field: 'seriesName', headerName: 'Series Name', width: 180, editable: true},
    {field: 'seriesCreatedAt', headerName: 'SeriesCreated at', width: 160, editable: false},
    {field: 'modalityId', headerName: 'Modality ID', width: 100, editable: false},
    {field: 'modalityName', headerName: 'Modality Name', width: 180, editable: true},
    {field: 'fileId', headerName: 'File ID', width: 100, editable: false},
    {field: 'filePath', headerName: 'File Name', width: 180, editable: true},
    {field: 'fileCreatedAt', headerName: 'File Created at', width: 160, editable: false},

];

export default function DataTable() {
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
        console.log("Line 119 in Search.js", modalities)
        const patientsResult = await getAllPatientsWithAll();
        const patients = patientsResult.data.data.getAllPatients;
        let data = [];
        patients.forEach(patient => {
            data.push({
                id: patient.id.toString(),
                patientId: patient?.id,
                patientName: patient?.name,
                patientCreatedAt: new Date(parseInt(patient?.createdAt)).toLocaleString(),
                patientUpdatedAt: new Date(parseInt(patient?.updatedAt)).toLocaleString(),
            })
            patient.studies?.forEach(study => {
                const itemIndex = data.findIndex((item => item.id === patient.id.toString()));
                array.pull(data, data[itemIndex]);
                data.push({
                    id: patient.id.toString()+'-'+study.id.toString(),
                    patientId: patient?.id,
                    patientName: patient?.name,
                    patientCreatedAt: new Date(parseInt(patient?.createdAt)).toLocaleString(),
                    patientUpdatedAt: new Date(parseInt(patient?.updatedAt)).toLocaleString(),
                    studyId: study?.id,
                    studyName: study?.studyName,
                    studyCreatedAt: new Date(parseInt(study?.createdAt)).toLocaleString(),
                    studyUpdatedAt: new Date(parseInt(study?.updatedAt)).toLocaleString(),
                })
                study.series?.forEach(series => {
                    const itemIndex = data.findIndex((item => item.id === patient.id.toString()+'-'+study.id.toString()));
                    array.pull(data, data[itemIndex]);
                    data.push({
                        id: patient.id.toString()+'-'+study.id.toString()+'-'+series.id.toString(),
                        patientId: patient?.id,
                        patientName: patient?.name,
                        patientCreatedAt: new Date(parseInt(patient?.createdAt)).toLocaleString(),
                        patientUpdatedAt: new Date(parseInt(patient?.updatedAt)).toLocaleString(),
                        studyId: study?.id,
                        studyName: study?.studyName,
                        studyCreatedAt: new Date(parseInt(study?.createdAt)).toLocaleString(),
                        studyUpdatedAt: new Date(parseInt(study?.updatedAt)).toLocaleString(),
                        seriesId: series?.id,
                        seriesName: series?.seriesName,
                        modalityId: modalities.find(modality => {
                            return modality.id === series.idModality
                        }).id,
                        modalityName: modalities.find(modality => {
                            return modality.id === series.idModality
                        }).name,
                        seriesCreatedAt: new Date(parseInt(series?.createdAt)).toLocaleString(),
                        seriesUpdatedAt: new Date(parseInt(series?.updatedAt)).toLocaleString(),
                    })
                    series.files?.forEach(file => {
                        const itemIndex = data.findIndex((item => item.id === patient.id.toString()+'-'+study.id.toString()+'-'+series.id.toString()));
                        array.pull(data, data[itemIndex]);
                        data.push({
                            id: patient.id.toString()+'-'+study.id.toString()+'-'+series.id.toString()+'-'+file.id.toString(),
                            patientId: patient?.id,
                            patientName: patient?.name,
                            patientCreatedAt: new Date(parseInt(patient?.createdAt)).toLocaleString(),
                            patientUpdatedAt: new Date(parseInt(patient?.updatedAt)).toLocaleString(),
                            studyId: study?.id,
                            studyName: study?.studyName,
                            studyCreatedAt: new Date(parseInt(study?.createdAt)).toLocaleString(),
                            studyUpdatedAt: new Date(parseInt(study?.updatedAt)).toLocaleString(),
                            modalityId: modalities.find(modality => {
                                return modality.id === series.idModality
                            }).id,
                            modalityName: modalities.find(modality => {
                                return modality.id === series.idModality
                            }).name,
                            seriesId: series?.id,
                            seriesName: series?.seriesName,
                            seriesCreatedAt: new Date(parseInt(series?.createdAt)).toLocaleString(),
                            seriesUpdatedAt: new Date(parseInt(series?.updatedAt)).toLocaleString(),
                            fileId: file?.id,
                            filePath: file?.filePath,
                            fileCreatedAt: new Date(parseInt(file?.createdAt)).toLocaleString(),
                            fileUpdatedAt: new Date(parseInt(file?.updatedAt)).toLocaleString()
                        })
                    })
                })
            })
        })
        setDataState({data: data});
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Box style={{height: 'calc(100vh - 56px - 56px - 56px)', marginBottom: '56px', width: '100%'}}>
            <Toolbar>
                <Typography fontSize={"large"}>Custom filters</Typography>
            </Toolbar>
            <DataGrid
                autoPageSize
                density={"compact"}
                rows={dataState.data}
                onCellEditCommit={editItem}
                columns={columns}
                checkboxSelection={true}
                disableSelectionOnClick={true}
            />
        </Box>
    );
}
