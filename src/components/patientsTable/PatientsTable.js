import * as React from 'react';
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

function createData(patientId, patientName, createdAt, updatedAt) {
    return {
        patientId,
        patientName,
        createdAt,
        updatedAt,
        studies: [
            {
                studyId: 0,
                studyName: 'Lorem Ipsum',
                createdAt: Date(),
                updatedAt: Date(),
            },
            {
                studyId: 1,
                studyName: 'Lorem Ipsum',
                createdAt: Date(),
                updatedAt: Date(),
            }
        ],
    };
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
                <TableCell component="th" scope="row">
                    {row.patientName}
                </TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="right">{row.updatedAt}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Studies
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>studyName</TableCell>
                                        <TableCell>createdAt</TableCell>
                                        <TableCell>updatedAt</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.studies.map((studyRow) => (
                                        <TableRow key={studyRow.studyId}>
                                            <TableCell component="th" scope="row">
                                                {studyRow.studyName}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {studyRow.createdAt}
                                            </TableCell>
                                            <TableCell>{studyRow.updatedAt}</TableCell>
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
        patientName: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        studies: PropTypes.arrayOf(
            PropTypes.shape({
                studyName: PropTypes.string.isRequired,
                createdAt: PropTypes.string.isRequired,
                updatedAt: PropTypes.string.isRequired,
            }),
        ).isRequired
    }).isRequired,
};

const rows = [
    createData(0,'Will Smith', Date(), Date()),
    createData(1,'Emma Watson', Date(), Date()),
    createData(2,'Bill Gates', Date(), Date()),
    createData(3,'Jeff Bezos', Date(), Date()),
    createData(4,'Tom Ford', Date(), Date()),
    createData(301,'Will Smith', Date(), Date()),
    createData(11,'Emma Watson', Date(), Date()),
    createData(21,'Bill Gates', Date(), Date()),
    createData(31,'Jeff Bezos', Date(), Date()),
    createData(41,'Tom Ford', Date(), Date()),
    createData(302,'Will Smith', Date(), Date()),
    createData(12,'Emma Watson', Date(), Date()),
    createData(22,'Bill Gates', Date(), Date()),
    createData(32,'Jeff Bezos', Date(), Date()),
    createData(42,'Tom Ford', Date(), Date()),
    createData(303,'Will Smith', Date(), Date()),
    createData(13,'Emma Watson', Date(), Date()),
    createData(23,'Bill Gates', Date(), Date()),
    createData(33,'Jeff Bezos', Date(), Date()),
    createData(43,'Tom Ford', Date(), Date()),
];

export default function CollapsibleTable() {
    return (
        <TableContainer component={Paper} sx={{maxHeight: '80vh'}}>
            <Table stickyHeader aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Patient Name</TableCell>
                        <TableCell align="right">Created At</TableCell>
                        <TableCell align="right">Updated At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.patientId} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
