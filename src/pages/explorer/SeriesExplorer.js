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
import {Grid, Tooltip} from "@mui/material";
import {getSingleSeries} from "../../services/seriesService";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FakeDicomImage from '../../assets/images/fake-dicom-image.jpg';
import FakeDicomImage2 from '../../assets/images/fake-dicom-image-2.jpg';
import FakeDicomImage3 from '../../assets/images/fake-dicom-image-3.jpg';
import Box from "@mui/material/Box";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

export default function TitlebarImageList() {
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;
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
    const goSeriesEditor = () => navigate(`/patient/${idPatient}/study/${idStudy}/series/${idSeries}`);
    const goFileEditor = (idFile) => navigate(`/patient/${idPatient}/study/${idStudy}/series/${idSeries}/file/${idFile}`);
    const goBack = () => navigate(`/patient/${idPatient}/study/${idStudy}/explorer`);
    const fakeImages = [FakeDicomImage, FakeDicomImage2, FakeDicomImage3];
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            marginBottom={'56px'}
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
                    <Toolbar>
                        Series ID #{seriesState.series.id}
                        <IconButton
                            sx={{marginLeft: '1rem'}}
                            aria-label="edit"
                            size="small"
                            onClick={goSeriesEditor}>
                            <EditTwoToneIcon sx={{color: "#ffc000"}}/>
                        </IconButton>
                    </Toolbar>
                </Typography>
            </Toolbar>


            <Typography variant="p" component="div">
                Series Name: {seriesState.series.seriesName}
            </Typography>
            <Typography variant="p" component="div">
                Created At: {new Date(parseInt(seriesState.series.createdAt)).toLocaleString()}
            </Typography>
            <ImageList cols={isMobile ? 1 : 3}>
                {seriesState.series.files?.map((file) => (
                    <ImageListItem key={file.id} sx={{width: isMobile ? '60vw' : '25vw', marginInline: '3vw', marginBottom: '3vw'}}>
                        <img
                            src={fakeImages[getRandomInt(3)]}
                            alt={file.id}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={file.id}
                            subtitle={`Created at ${new Date(parseInt(file.createdAt)).toLocaleString()}`}
                            actionIcon={
                                <Box>
                                    <Tooltip title={'See more details'}>
                                        <IconButton
                                            sx={{color: 'rgba(255, 255, 255, 0.75)'}}
                                            aria-label={`info about file id ${file.id}`}
                                            onClick={() => goFileEditor(file.id)}>
                                            <InfoIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={'Copy File Path'}>
                                        <IconButton
                                            sx={{color: 'rgba(255, 255, 255, 0.75)'}}
                                            aria-label={`copy file path of file id ${file.id}`}
                                            onClick={() => {
                                                navigator.clipboard.writeText(file.filePath)
                                            }}
                                        >
                                            <ContentCopyIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Grid>
    );
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
