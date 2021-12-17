import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {getAllPatientsWithAll} from "../../services/patientService";
import Box from "@mui/material/Box";

const columns = [
    {field: 'patientId', headerName: 'Patient ID', width: 100, editable: false},
    {field: 'patientName', headerName: 'Patient Name', width: 180, editable: true},
    {field: 'patientCreatedAt', headerName: 'Patient Created at', width: 160, editable: true},
    {field: 'studyId', headerName: 'Study ID', width: 100, editable: false},
    {field: 'studyName', headerName: 'Study Name', width: 180, editable: true},
    {field: 'studyCreatedAt', headerName: 'Study Created at', width: 160, editable: true},
    {field: 'seriesId', headerName: 'Series ID', width: 100, editable: false},
    {field: 'seriesName', headerName: 'Series Name', width: 180, editable: true},
    {field: 'seriesCreatedAt', headerName: 'SeriesCreated at', width: 160, editable: true},
    {field: 'fileId', headerName: 'File ID', width: 100, editable: false},
    {field: 'filePath', headerName: 'File Name', width: 180, editable: true},
    {field: 'fileCreatedAt', headerName: 'File Created at', width: 160, editable: true},

];

export default function DataTable() {
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
    useEffect(() => {
        async function fetchData() {
            const result = await getAllPatientsWithAll();
            const patients = result.data.data.getAllPatients;
            let data = [];
            patients.forEach(patient => {
                patient.studies?.forEach(study => {
                    study.series?.forEach(series => {
                        series.files?.forEach(file => {
                            data.push({
                                id: patient.id.toString()+study.id.toString()+series.id.toString()+file.id.toString(),
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

        fetchData();
    }, []);
    return (
        <Box style={{height: 'calc(100vh - 56px - 56px)', marginBottom: '56px', width: '100%'}}>
            <DataGrid
                rowHeight={38}
                rows={dataState.data}
                columns={columns}
                pageSize={12}
            />
        </Box>
    );
}
