import * as React from 'react';
import {useEffect, useState} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import {useNavigate, useParams} from "react-router";
import {Grid} from "@mui/material";
import Folder from '../../assets/images/folder_icon.png';
import {getSingleStudyWithSeries} from "../../services/studyService";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import {getAllModalities} from "../../services/modalityService";

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
    const {idPatient, idStudy} = useParams();
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
            const result = await getSingleStudyWithSeries(idStudy);
            setStudyState({study: result.data.data.getSingleStudy});
        }

        fetchData();
    }, [idStudy]);
    const [modalitiesState, setModalitiesState] = useState({
        modalities: [{
            id: '',
            name: ''
        }]
    });
    useEffect(() => {
        async function fetchData() {
            const result = await getAllModalities();
            setModalitiesState({modalities: result.data.data.getAllModalities});
        }

        fetchData();
    }, []);
    const navigate = useNavigate();
    const goBack = () => navigate('/');
    const goStudyEdit = () => navigate(`/patient/${idPatient}/study/${idStudy}`);
    const goSeriesDetails = (idSeries) => navigate(`/patient/${idPatient}/study/${idStudy}/series/${idSeries}`);
    const goSeriesExplorer = (idSeries) => navigate(`/patient/${idPatient}/study/${idStudy}/series/${idSeries}/explorer`);
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
            marginBottom={'56px'}
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
                        Study ID #{studyState.study.id}
                        <IconButton
                            sx={{marginLeft: '1rem'}}
                            aria-label="edit"
                            size="small"
                            onClick={goStudyEdit}>
                            <EditTwoToneIcon sx={{color: "#ffc000"}}/>
                        </IconButton>
                    </Toolbar>
                </Typography>
            </Toolbar>

            <Typography variant="p" component="div">
                Study Name: {studyState.study.studyName}
            </Typography>
            <Typography variant="p" component="div">
                Created At: {new Date(parseInt(studyState.study.createdAt)).toLocaleString()}
            </Typography>
            <ImageList cols={isMobile ? 1 : 3}>
                {studyState.study.series.map((series) => (
                    <ImageListItem key={series.id} sx={{width: isMobile ? '60vw' : '25vw', marginInline: '3vw'}}>
                        <img
                            src={Folder}
                            alt={series.seriesName}
                            style={{cursor: 'pointer'}}
                            onClick={() => goSeriesExplorer(series.id)}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            sx={{borderRadius: 8, backgroundColor: 'rgba(136,136,136,0.6)'}}
                            title={<div><span>{series.seriesName}</span>
                                <ul>
                                    <li>{`Series ID: ${series.id}`}</li>
                                    <li>{`Created at: ${new Date(parseInt(series.createdAt)).toLocaleString()}`}</li>
                                    <li>{`Modality: ${modalitiesState.modalities[`${series.idModality}`]?.name}`}</li>
                                </ul>
                            </div>
                            }
                        />
                    </ImageListItem>

                ))}
            </ImageList>
        </Grid>
    );
}
