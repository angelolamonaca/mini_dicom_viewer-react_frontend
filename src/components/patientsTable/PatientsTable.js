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
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function createData(patientId, patientName, numberOfStudies) {
    return {
        patientId,
        patientName,
        numberOfStudies,
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


export default function CollapsibleTable() {
    return (
        <Box>
            <TableContainer component={Paper} sx={{height: 'calc(100vh - 56px - 56px)', marginBottom: '56px'}}>
                <Table stickyHeader aria-label="collapsible table">

                    <TableHead>
                        <TableRow sx={{fontWeight: 700}}>
                            <TableCell/>
                            <TableCell align="center">Patient</TableCell>
                            <TableCell align="center">Studies</TableCell>
                            <TableCell/>
                            <TableCell/>
                            <TableCell/>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.patientId} row={row}/>
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
                    {row.patientName}
                </TableCell>
                <TableCell align="center">
                    {row.numberOfStudies}
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
                            <Typography variant="h6" gutterBottom component="div">
                                Studies
                            </Typography>
                            <Table size="small" aria-label="purchases">

                                <TableHead>
                                    <TableRow>
                                        <TableCell>Study Name</TableCell>
                                        <TableCell>Created At</TableCell>
                                        <TableCell>Updated At</TableCell>
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
        numberOfStudies: PropTypes.number.isRequired,
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
    createData(0, 'Will Smith', 234),
    createData(1, 'Emma Watson', 42),
    createData(2, 'Bill Gates', 12),
    createData(3, 'Jeff Bezos', 42),
    createData(4, 'Tom Ford', 432),
    createData(10, 'Will Smith', 234),
    createData(11, 'Emma Watson', 42),
    createData(12, 'Bill Gates', 12),
    createData(13, 'Jeff Bezos', 42),
    createData(14, 'Tom Ford', 432),
    createData(10, 'Will Smith', 234),
    createData(11, 'Emma Watson', 42),
    createData(12, 'Bill Gates', 12),
    createData(13, 'Jeff Bezos', 42),
    createData(14, 'Tom Ford', 432),
];
