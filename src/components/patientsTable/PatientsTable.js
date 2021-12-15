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
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {getAllPatients} from "../../services/patientService";

export default function CollapsibleTable() {
    const [data, setData] = useState({
        patients: [{
            id: '',
            name: '',
            createdAt: '',
            updatedAt: '',
            studies: [{id: '', studyName: '', createdAt: '', updatedAt: ''}]
        }]
    });
    useEffect(() => {
        async function fetchData() {
            const result = await getAllPatients();
            setData({patients: result.data.data.getAllPatients});
        }

        fetchData();
    }, [data.patients]);
    return (
        <Box>
            <TableContainer component={Paper} sx={{height: 'calc(100vh - 56px - 56px)', marginBottom: '56px'}}>
                <Table stickyHeader aria-label="collapsible table">

                    <TableHead>
                        <TableRow sx={{fontWeight: 700}}>
                            <TableCell/>
                            <TableCell align="center">Patient</TableCell>
                            <TableCell align="center">Created At</TableCell>
                            <TableCell/>
                            <TableCell/>
                            <TableCell/>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.patients.map((patient) => (
                            <Row key={patient.id} row={patient}/>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </Box>
    );
}

function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
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
                    {row.name}
                </TableCell>
                <TableCell align="center">
                    {new Date(parseInt(row.createdAt)).toLocaleString()}
                </TableCell>
                <TableCell align="center" padding={'checkbox'}>
                    <IconButton
                        aria-label="info"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        <InfoIcon/>
                    </IconButton>
                </TableCell>
                <TableCell align="center" padding={'checkbox'}>
                    <IconButton
                        aria-label="edit"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        <EditIcon/>
                    </IconButton>
                </TableCell>
                <TableCell align="center" padding={'checkbox'}>
                    <IconButton
                        aria-label="edit"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        <StarBorderIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div" align="center">
                                Studies
                            </Typography>
                            <Table size="small" aria-label="purchases">

                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Study Name</TableCell>
                                        <TableCell align="center">Created At</TableCell>
                                        <TableCell align="center">Updated At</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {row.studies.map((studies) => (
                                        <TableRow key={studies.id}>
                                            <TableCell align="center" component="th" scope="row">
                                                {studies.studyName}
                                            </TableCell>
                                            <TableCell align="center" component="th" scope="row">
                                                {new Date(parseInt(studies.createdAt)).toLocaleString()}
                                            </TableCell>
                                            <TableCell align="center">
                                                {new Date(parseInt(studies.createdAt)).toLocaleString()}
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

Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        studies: PropTypes.arrayOf(
            PropTypes.shape({
                studyName: PropTypes.string.isRequired,
                createdAt: PropTypes.string.isRequired,
                updatedAt: PropTypes.string.isRequired,
            }),
        )
    }).isRequired,
};
