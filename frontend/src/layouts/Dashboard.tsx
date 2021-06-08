import React, {useEffect, useState} from "react";
import styled, {createGlobalStyle} from "styled-components/macro";
import Sidebar from "../components/Sidebar";
import Header from "../components/AppBar";
import Footer from "../components/Footer";

import {spacing} from "@material-ui/system";
import {
    Hidden,
    CssBaseline,
    Paper as MuiPaper,
    withWidth,
} from "@material-ui/core";

import {isWidthUp} from "@material-ui/core/withWidth";
import {getProjects} from "../store/project/slice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";

import { sidebarRoutes as routes } from "../routes/index";
import {getPersonByUserId} from "../store/user/slice";

const drawerWidth = 258;

const GlobalStyle = createGlobalStyle<any>`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.palette.background.default};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard: React.FC<any> = ({
  children,
  width,
}) => {
    const dispatch = useDispatch();
    const projects = useSelector((state: RootState) => state.project.data);
    const user: any = useSelector((state: RootState) => state.user.data);
    const auth: any = useSelector((state: RootState) => state.auth.data);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [_routes, setRoutes] = useState<any[]>(routes);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const getData = async () => {
        await dispatch(getPersonByUserId(auth.uuid));
    }

    useEffect(() => {
        if (user?.person?.uuid) {
            dispatch(getProjects(user.person.type === "student" ? {
                executor: user.person.uuid
            } : {
                teacher: user.person.uuid
            }));
        }
    }, [user?.person?.uuid])

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const newRoutes = [..._routes];
        const targetRoute: any = newRoutes.find(_route => _route.id === "Проекты");
        if (targetRoute) targetRoute.badge = projects.length;

        setRoutes(newRoutes);
    }, [projects])

    return (
        <Root>
            <CssBaseline/>
            <GlobalStyle/>
            <Drawer>
                <Hidden mdUp implementation="js">
                    <Sidebar
                        routes={_routes}
                        PaperProps={{style: {width: drawerWidth}}}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                    />
                </Hidden>
                <Hidden smDown implementation="css">
                    <Sidebar
                        routes={_routes}
                        PaperProps={{style: {width: drawerWidth}}}
                    />
                </Hidden>
            </Drawer>
            <AppContent>
                <Header onDrawerToggle={handleDrawerToggle}/>
                <MainContent p={isWidthUp("lg", width) ? 12 : 5}>
                    {children}
                </MainContent>
                <Footer/>
            </AppContent>
        </Root>
    );
};

export default withWidth()(Dashboard);
