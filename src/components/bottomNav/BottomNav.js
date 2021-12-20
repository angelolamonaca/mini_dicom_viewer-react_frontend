import * as React from 'react';
import {useState} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from "@mui/material/Paper";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {useNavigate} from "react-router";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function SimpleBottomNavigation() {
    const pathName = window.location.pathname
    const [value, setValue] = useState(pathName === '/search' ? 1 : pathName === '/add' ? 2 : 0);
    const navigate = useNavigate();
    const goExplorer = () => navigate('/');
    const goSearch = () => navigate('/search');
    const goAdd = () => navigate('/add');
    return (
        <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, height: '56px'}} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}>
                <BottomNavigationAction
                    label="Explorer"
                    icon={<FolderOpenIcon/>}
                    onClick={goExplorer}/>
                <BottomNavigationAction
                    label="Search"
                    icon={<SearchOutlinedIcon/>}
                    onClick={goSearch}/>
                <BottomNavigationAction
                    label="Add new"
                    icon={<AddCircleOutlineIcon/>}
                    onClick={goAdd}/>
            </BottomNavigation>
        </Paper>
    );
}
