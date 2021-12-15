import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from "@mui/material/Paper";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    return (
        <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0, height: '56px'}} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}>
                <BottomNavigationAction label="Explore" icon={<SearchOutlinedIcon/>}/>
                <BottomNavigationAction label="Statistics" icon={<BarChartOutlinedIcon/>}/>
                <BottomNavigationAction label="TreeView" icon={<AccountTreeOutlinedIcon/>}/>
            </BottomNavigation>
        </Paper>
    );
}
