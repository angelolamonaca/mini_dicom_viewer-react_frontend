import * as React from 'react';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {getAllPatientsWithStudies} from "../../services/patientService";
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {blue, red} from "@mui/material/colors";
import {useNavigate} from 'react-router';
import {deleteStudy} from "../../services/studyService";

export default function PatientsTable() {

    const [patientsState, setPatientsState] = useState({
        patients: [{
            id: '',
            name: '',
            createdAt: '',
            updatedAt: '',
            studies: [{id: '', studyName: '', createdAt: ''}]
        }]
    });

    async function fetchData() {
        const result = await getAllPatientsWithStudies();
        setPatientsState({patients: result.data.data.getAllPatients});
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Box>
            <TableContainer component={Paper} sx={{height: 'calc(100vh - 56px - 56px)', marginBottom: '56px'}}>
                <Table stickyHeader aria-label="collapsible table">

                    <TableHead>
                        <TableRow sx={{fontWeight: 700}}>
                            <TableCell/>
                            <TableCell align="center">Patient ID</TableCell>
                            <TableCell align="center">Patient Name</TableCell>
                            <TableCell align="center">Created At</TableCell>
                            <TableCell align="center"/>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {patientsState.patients.map((patient) => (
                            <Row key={patient.id} row={patient}/>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </Box>
    );

    function Row(props) {

        Row.propTypes = {
            row: PropTypes.shape({
                name: PropTypes.string.isRequired,
                createdAt: PropTypes.string.isRequired,
                studies: PropTypes.arrayOf(
                    PropTypes.shape({
                        studyName: PropTypes.string.isRequired,
                        createdAt: PropTypes.string.isRequired,
                    }),
                )
            }).isRequired,
        };

        const deleteCurrentStudy = (studyId) => {
            deleteStudy(studyId)
            fetchData()
        }
        const {row} = props;
        const [open, setOpen] = React.useState(false);
        const navigate = useNavigate();
        const goPatientDetails = () => navigate(`/patient/${row.id}`);
        const goStudyExplorer = (studyId) => navigate(`/patient/${row.id}/study/${studyId}/explorer`);
        return (
            <React.Fragment>
                <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        </IconButton>
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="center">
                        {new Date(parseInt(row.createdAt)).toLocaleString()}
                    </TableCell>
                    <TableCell align="center" padding={'normal'}>
                        <IconButton
                            aria-label="edit"
                            size="small"
                            onClick={goPatientDetails}>
                            <EditTwoToneIcon sx={{color: "#ffc000"}}/>
                        </IconButton>
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0, backgroundColor: "#daf2ff"}} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{margin: 1}}>
                                <Typography variant="h6" gutterBottom component="div" align="center">
                                    Studies
                                </Typography>
                                <Table size="small" aria-label="purchases">

                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Study ID</TableCell>
                                            <TableCell align="center">Study Name</TableCell>
                                            <TableCell align="center">Created At</TableCell>
                                            <TableCell align="center"/>
                                            <TableCell align="center"/>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {row.studies.map((study) => (
                                            <TableRow key={study.id}>
                                                <TableCell align="center" component="th" scope="row">
                                                    {study.id}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {study.studyName}
                                                </TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                    {new Date(parseInt(study.createdAt)).toLocaleString()}
                                                </TableCell>

                                                <TableCell align="center" padding={'checkbox'}>
                                                    <IconButton
                                                        aria-label="info"
                                                        size="small"
                                                        onClick={() => goStudyExplorer(study.id)}>
                                                        <InfoTwoToneIcon sx={{color: blue[500]}}/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="center" padding={'normal'}>
                                                    <IconButton
                                                        aria-label="edit"
                                                        size="small"
                                                        onClick={() => deleteCurrentStudy(study.id)}>
                                                        <DeleteTwoToneIcon sx={{color: red[500]}}/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }


}

