import * as React from 'react';
import {Button, Grid} from "@mui/material";
import {useNavigate} from "react-router";

export default function GroupOrientation() {

    const navigate = useNavigate();
    const goSearchPatients = () => navigate(`/search/patients`);
    const goSearchStudies = () => navigate(`/search/studies`);
    const goSearchSeries = () => navigate(`/search/series`);
    const goSearchFiles = () => navigate(`/search/files`);
    return (
        <Grid
            marginTop={'5vh'}
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            noValidate
            autoComplete="off">
            <Button
                variant="contained"
                sx={{marginBottom: '5vh', fontSize: '3rem'}}
                onClick={goSearchPatients}>
                patients
            </Button>
            <Button
                variant="contained"
                sx={{marginBottom: '5vh', fontSize: '3rem'}}
                onClick={goSearchStudies}>
                studies
            </Button>
            <Button
                variant="contained"
                sx={{marginBottom: '5vh', fontSize: '3rem'}}
                onClick={goSearchSeries}>
                series
            </Button>
            <Button
                variant="contained"
                sx={{marginBottom: '5vh', fontSize: '3rem'}}
                onClick={goSearchFiles}>
                files
            </Button>
        </Grid>
    );
}
