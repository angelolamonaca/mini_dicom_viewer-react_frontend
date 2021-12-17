import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {getAllStudies} from "../../services/studyService";
import {getAllPatients, getSinglePatient} from "../../services/patientService";

const columns = [
    {field: 'id', headerName: 'ID Study', width: 90, editable: false},
    {field: 'studyName', headerName: 'Name Study', width: 270, editable: true},
    {field: 'createdAt', headerName: 'Study Created at', width: 160, editable: true},
    {field: 'updatedAt', headerName: 'Study Updated at', width: 160, editable: true},
    {field: 'idPatient', headerName: 'ID Patient', width: 90, editable: true},
    {field: 'patientName', headerName: 'Patient Name', width: 240, editable: true},
    {field: 'patientCreatedAt', headerName: 'Patient created at', width: 160, editable: true},
    {field: 'patientUpdatedAt', headerName: 'Patient updated at', width: 160, editable: true},
];

export default function DataTable() {
    const [studiesState, setStudiesState] = useState({
        studies: [{
            "id": '',
            "studyName": "",
            "createdAt": "",
            "updatedAt": "",
            "idPatient": "",
            "patientName": "",
            "patientCreatedAt": "",
            "patientUpdatedAt": "",
        }]
    });
    useEffect(() => {
        async function fetchData() {
            const result = await getAllStudies();
            const studies = await result.data.data.getAllStudies;
            studies.map(async study => {
                study.createdAt = new Date(parseInt(study.createdAt)).toLocaleString()
                study.updatedAt = new Date(parseInt(study.updatedAt)).toLocaleString()
            })
            setStudiesState({studies: studies});
        }

        fetchData();
    }, []);
    const [patientsState, setPatientsState] = useState({
        patients: [{
            "id": '',
            "name": "",
            "createdAt": "",
            "updatedAt": "",
        }]
    });
    useEffect(() => {
        async function fetchData() {
            const result = await getAllPatients();
            const patients = await result.data.data.getAllPatients;
            setPatientsState({patients: patients});
        }

        fetchData();
    }, []);
    studiesState.studies.map(async study => {
        const patient = patientsState.patients.find(patient => patient.id === study.idPatient)
        study.patientName = patient?.name
        study.patientCreatedAt = new Date(parseInt(patient?.createdAt)).toLocaleString()
        study.patientUpdatedAt = new Date(parseInt(patient?.updatedAt)).toLocaleString()
    })
    return (
        <div style={{height: 'calc(100vh - 56px - 56px)', marginBottom: '56px', width: '100%'}}>
            <DataGrid
                rowHeight={38}
                rows={studiesState.studies}
                columns={columns}
                pageSize={13}
                rowsPerPageOptions={[13]}
            />
        </div>
    );
}
