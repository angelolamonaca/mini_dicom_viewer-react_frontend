import * as React from 'react';
import ButtonAppBar from "../appBar/AppBar";
import SimpleBottomNavigation from "../bottomNav/BottomNav";
import CollapsibleTable from "../patientsTable/PatientsTable";
import Box from "@mui/material/Box";

export default function SimpleContainer() {
    return (
        <Box>
            <ButtonAppBar/>
            <CollapsibleTable/>
            <SimpleBottomNavigation/>
        </Box>
    );
}
