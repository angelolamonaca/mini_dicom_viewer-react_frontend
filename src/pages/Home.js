import * as React from 'react';
import CollapsibleTable from "../components/patientsTable/PatientsTable";
import Box from "@mui/material/Box";
import ButtonAppBar from "../components/appBar/AppBar";
import SimpleBottomNavigation from "../components/bottomNav/BottomNav";

export default function SimpleContainer() {
    return (
        <Box>
            <ButtonAppBar/>
            <CollapsibleTable/>
            <SimpleBottomNavigation/>
        </Box>
    );
}
