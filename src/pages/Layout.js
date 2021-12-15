import {Outlet} from "react-router";
import Box from "@mui/material/Box";
import ButtonAppBar from "../components/appBar/AppBar";
import SimpleBottomNavigation from "../components/bottomNav/BottomNav";
import * as React from "react";

const Layout = () => {
    return (
        <Box>
            <ButtonAppBar/>
            <Outlet/>
            <SimpleBottomNavigation/>
        </Box>
    )
};

export default Layout;
