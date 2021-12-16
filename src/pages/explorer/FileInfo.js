import * as React from 'react';
import {useEffect, useState} from 'react';
import {Grid, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import {getSingleFile} from "../../services/fileService";

export default function SimpleContainer() {
    const {idPatient, idStudy, idSeries, idFile} = useParams();
    const [fileState, setFileState] = useState({
        file: {
            id: '',
            filePath: '',
            createdAt: '',
            updatedAt: ''
        }
    });
    useEffect(() => {
        async function fetchData() {
            const result = await getSingleFile(idFile);
            setFileState({file: result.data.data.getSingleFile});
        }

        fetchData();
    }, [idFile]);

    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        // Set errorMessage only if text is equal or bigger than MAX_LENGTH
        if (!fileState.file.filePath) {
            setErrorMessage(
                "filePath cannot be empty"
            );
        }
    }, [fileState]);
    useEffect(() => {
        if (fileState.file.filePath) {
            setErrorMessage("");
        }
    }, [fileState, errorMessage]);

    const restore = () => {
        async function fetchData() {
            const result = await getSingleFile(idFile);
            setFileState({file: result.data.data.getSingleFile});
        }

        fetchData();
    }

    const onfileNameChange = (e) => {
        setFileState(prevFile => ({
            file: {
                ...prevFile.file,
                filePath: e.target.value
            }
        }))
    }

    const navigate = useNavigate();
    const goBack = () => navigate(`/patient/${idPatient}/study/${idStudy}/series/${idSeries}/explorer`);

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            noValidate
            autoComplete="off">

            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="back"
                    onClick={goBack}>
                    <ArrowBackIcon/>
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{marginLeft: '1rem'}}>
                    File Info
                </Typography>
            </Toolbar>
            <div>
                <Typography
                    sx={{margin: '25px'}}
                    id="outlined-basic"
                    label="ID Patient">
                    ID Patient: {idPatient}
                </Typography>
                <Typography
                    sx={{margin: '25px'}}
                    id="outlined-basic"
                    label="ID Patient">
                    ID Study: {idStudy}
                </Typography>
                <Typography
                    sx={{margin: '25px'}}
                    id="outlined-basic"
                    label="ID Patient">
                    ID Series: {idSeries}
                </Typography>
                <Typography
                    sx={{margin: '25px'}}
                    id="outlined-basic"
                    label="ID Patient">
                    ID File: {idFile}
                </Typography>
                <Typography
                    sx={{margin: '25px'}}
                    id="outlined-basic"
                    label="ID Patient">
                    File Path: {fileState.file.filePath}
                </Typography>
                <Typography
                    sx={{margin: '25px'}}
                    id="outlined-basic"
                    label="ID Patient">
                    Created at {new Date(parseInt(fileState.file.createdAt)).toLocaleString()}
                </Typography>
                <Typography
                    sx={{margin: '25px'}}
                    id="outlined-basic"
                    label="ID Patient">
                    Updated at {new Date(parseInt(fileState.file.updatedAt)).toLocaleString()}
                </Typography>
            </div>
        </Grid>
    );
}
