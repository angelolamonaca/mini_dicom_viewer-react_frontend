import * as React from 'react';
import CollapsibleTable from "../patientsTable/PatientsTable";
import Box from "@mui/material/Box";
import ButtonAppBar from "../appBar/AppBar";
import SimpleBottomNavigation from "../bottomNav/BottomNav";

export default function SimpleContainer() {
    return (
        <Box>
            <ButtonAppBar/>
            <CollapsibleTable/>
            <SimpleBottomNavigation/>
        </Box>
    );
}
