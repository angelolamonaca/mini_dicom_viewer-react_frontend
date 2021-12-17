import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {getAllPatientsWithAll} from "../../services/patientService";
import {getAllStudies} from "../../services/studyService";

const columns = [
    {field: 'id', headerName: 'ID Study', width: 100, editable: false},
    {field: 'studyName', headerName: 'Name Study', width: 180, editable: true},
    {field: 'createdAt', headerName: 'Created at', width: 160, editable: true},
    {field: 'updatedAt', headerName: 'Updated at', width: 160, editable: true},
];

export default function DataTable() {
    const [studiesState, setStudiesState] = useState({
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
            const result = await getAllStudies();
            const studies = result.data.data.getAllStudies;
            studies.map(patient => {
                patient.createdAt = new Date(parseInt(patient.createdAt)).toLocaleString()
                patient.updatedAt = new Date(parseInt(patient.updatedAt)).toLocaleString()
            })

            setStudiesState({studies: result.data.data.getAllStudies});
        }

        fetchData();
    }, []);
    return (
        <div style={{height: 'calc(100vh - 56px - 56px)', marginBottom: '56px', width: '100%'}}>
            <DataGrid
                rows={studiesState.studies}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[9]}
            />
        </div>
    );
}
