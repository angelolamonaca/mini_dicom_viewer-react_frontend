import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {editPatient, getAllPatientsWithAll} from "../../services/patientService";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {editStudy} from "../../services/studyService";

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
    {field: 'fileId', headerName: 'File ID', width: 100, editable: false},
    {field: 'filePath', headerName: 'File Name', width: 180, editable: true},
    {field: 'fileCreatedAt', headerName: 'File Created at', width: 160, editable: false},

];

export default function DataTable() {
    const editItem = async (params, event, details) => {
        console.log("Line 26 in Search.js - Params", params)
        console.log("Line 27 in Search.js - Event", event)
        console.log("Line 28 in Search.js - Details", details)
        const editedField = params.field.split(/(?=[A-Z])/)[0]
        const ids = params.id.split('-');
        console.log("Line 33 in Search.js", ids)
        switch (editedField) {
            case 'patient':
                console.log('Patient edited');
                await editPatient(ids[0], params.value)
                fetchData()
                break;
            case 'study':
                console.log("Line 42 in Search.js", ids[1], params.value)
                await editStudy(ids[1], params.value)
                fetchData()
                break;
            case 'series':
                console.log('Series edited');
                break;
            case 'file':
                console.log('File edited');
                break;
            default:
                console.log(`Sorry, we cannot get the change.`);
        }
    }
    const [editState, setEditState] = useState('')
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
            "fileId": '',
            "filePath": "",
            "fileCreatedAt": "",
        }]
    });
    async function fetchData() {
        const result = await getAllPatientsWithAll();
        const patients = result.data.data.getAllPatients;
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
