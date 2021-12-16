import * as React from 'react';
import {useEffect, useState} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import {useNavigate, useParams} from "react-router";
import {Grid} from "@mui/material";
import {getSingleSeries} from "../services/seriesService";
import FakeDicomImage from '../assets/images/fake-dicom-image.jpg';

export default function TitlebarImageList() {
    const navigate = useNavigate();
    const {idPatient, idStudy, idSeries} = useParams();
    const [seriesState, setSeriesState] = useState({
        series: {
            id: '',
            idStudy: '',
            seriesName: '',
            createdAt: '',
            files: [{id: '', filePath: '', createdAt: ''}]
        }
    });
    useEffect(() => {
        async function fetchData() {
            const result = await getSingleSeries(idSeries);
            setSeriesState({series: result.data.data.getSingleSeries});
        }
        fetchData();
    }, [idSeries]);
    const goBack = () => navigate(`/patient/${idPatient}/study/${idStudy}/explorer`);
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
                <Typography variant="h6" component="div" sx={{marginLeft: '1rem'}}>
                    Files of Series ID {seriesState.series.id}
                </Typography>
            </Toolbar>
            <ImageList>
                <ImageListItem key="Subheader" cols={3}/>
                {seriesState.series.files.map((file) => (
                    <ImageListItem key={file.id} sx={{width: '25vw', margin: '30px'}}>
                        <img
                            src={FakeDicomImage}
                            alt={file.id}
                            loading="lazy"
                            style={{cursor:'pointer'}}
                            onClick={() => window.location.href = FakeDicomImage}
                        />
                        <ImageListItemBar
                            title={file.id}
                            subtitle={`Created at ${new Date(parseInt(file.createdAt)).toLocaleString()}`}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Grid>
    );
}
