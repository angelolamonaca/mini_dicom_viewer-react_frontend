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
import Folder from '../assets/images/folder_icon.png';
import {getSingleStudyWithSeries} from "../services/studyService";

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
    const {id} = useParams();
    const [studyState, setStudyState] = useState({
        study: {
            id: '',
            studyName: '',
            createdAt: '',
            updatedAt: '',
            series: [{id: '', seriesName: '', idModality: '', createdAt: '', updatedAt: ''}]
        }
    });
    useEffect(() => {
        async function fetchData() {
            const result = await getSingleStudyWithSeries(id);
            setStudyState({study: result.data.data.getSingleStudy});
        }

        fetchData();
    }, [id]);
    const navigate = useNavigate();
    const goBack = () => navigate('/study/' + id);
    const goSeriesDetail = (id) => navigate('/series/' + id);
    return (
        <Grid
            maxWidth={'100vw'}
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
                    Series of Study ID {studyState.study.id}
                </Typography>
            </Toolbar>
            <ImageList cols={isMobile ? 1 : 3}>
                {studyState.study.series.map((series) => (
                    <ImageListItem key={series.id} sx={{width: isMobile ? '60vw' : '25vw', marginInline: '3vw'}}>
                        <img
                            src={Folder}
                            alt={series.seriesName}
                            style={{cursor: 'pointer'}}
                            onClick={() => goSeriesDetail(series.id)}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={<div><span>{series.seriesName}</span>
                                <ul>
                                <li>{`Series ID: ${series.id}`}</li>
                                <li>{`Modality ID: ${series.idModality}`}</li>
                                </ul>
                            </div>
                            }
                            actionIcon={
                                <Tooltip title={`Created at ${new Date(parseInt(series.createdAt)).toLocaleString()}`}>
                                    <IconButton
                                        sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                        aria-label={`info about ${series.seriesName}`}
                                    >
                                        <InfoIcon/>
                                    </IconButton>
                                </Tooltip>
                            }
                        />
                    </ImageListItem>

                ))}
            </ImageList>
        </Grid>
    );
}
