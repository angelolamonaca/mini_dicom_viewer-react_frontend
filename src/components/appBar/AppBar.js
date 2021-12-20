import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function ButtonAppBar() {
    return (
        <AppBar position="sticky" sx={{height: '56px'}}>
            <Toolbar>
                <Typography variant="h6" component="div">
                    Mini DICOM Viewer
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
