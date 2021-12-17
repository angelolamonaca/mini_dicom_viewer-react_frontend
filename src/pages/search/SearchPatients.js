import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {getAllPatientsWithAll} from "../../services/patientService";
import Box from "@mui/material/Box";

const columns = [
    {field: 'id', headerName: 'ID Patient', width: 100, editable: false},
    {field: 'name', headerName: 'Name Patient', width: 180, editable: true},
    {field: 'createdAt', headerName: 'Created at', width: 160, editable: true},
    {field: 'updatedAt', headerName: 'Updated at', width: 160, editable: true},
];

export default function DataTable() {
    const [patientsState, setPatientsState] = useState({
        patients: [{
            "id": '',
            "name": "",
            "createdAt": "",
            "updatedAt": "",
            "studies": [{
                "id": '',
                "studyName": "",
                "createdAt": "",
                "updatedAt": "",
                "series": [{
                    "id": '',
                    "seriesName": "",
                    "createdAt": "",
                    "updatedAt": "",
                    "files": [{
                        "id": '',
                        "filePath": ""
                    }]
                }]
            }]
        }]
    });
    useEffect(() => {
        async function fetchData() {
            const result = await getAllPatientsWithAll();
            const patients = result.data.data.getAllPatients;
            patients.map(patient => {
                patient.createdAt = new Date(parseInt(patient.createdAt)).toLocaleString()
                patient.updatedAt = new Date(parseInt(patient.updatedAt)).toLocaleString()
            })

            setPatientsState({patients: result.data.data.getAllPatients});
        }

        fetchData();
    }, []);
    return (
        <Box style={{height: 'calc(100vh - 56px - 56px)', marginBottom: '56px', width: '100%'}}>
            <DataGrid
                rows={patientsState.patients}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[9]}
            />
        </Box>
    );
}
