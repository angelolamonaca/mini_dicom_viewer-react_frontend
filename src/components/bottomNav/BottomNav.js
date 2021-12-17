import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from "@mui/material/Paper";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import {useNavigate} from "react-router";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const goExplore = () => navigate('/');
    const goStatistics = () => navigate('/search');
    const goTreeView = () => navigate('/treeview');
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
                    onClick={goExplore}/>
                <BottomNavigationAction
                    label="Search"
                    icon={<SearchOutlinedIcon/>}
                    onClick={goStatistics}/>
                <BottomNavigationAction
                    label="TreeView"
                    icon={<AccountTreeOutlinedIcon/>}
                    onClick={goTreeView}/>
            </BottomNavigation>
        </Paper>
    );
}
