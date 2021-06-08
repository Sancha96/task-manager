import React, {FC} from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import {useSelector} from "react-redux";

import DateFnsUtils from "@date-io/date-fns";

import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {StylesProvider, ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {ThemeProvider} from "styled-components/macro";

import { RootState } from './store';

import Layout from "./layouts/Dashboard";

import Login from './pages/auth/SignIn';
import Register from './pages/auth/SignUp';
import Profile from './pages/Profile';
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

import {Routes as URLs} from "./constants/links";

import createTheme from "./theme";

import './App.module.scss';
import {THEMES} from "./constants/themes";
import ProjectsCreate from "./pages/ProjectsCreate";
import Stages from './pages/Stages';
import Students from "./pages/Students";
import Admin from './pages/Admin';
import TasksCreate from "./pages/TasksCreate";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const data = useSelector((state: RootState) => state.auth.data);

    const isAuth = data && !!Object.keys(data).length;

    return (
        <Route
            {...rest}
            render={(props: any) =>
                <Layout>
                        <Component {...props} />
                    </Layout>
            }
        />
    );

};

const Routes = () => {
    return <Router>
        <Switch>
            <Route exact path={URLs.Login} component={Login} />
            <Route exact path={URLs.Register} component={Register} />
            <PrivateRoute path={URLs.Profile} component={Profile} />
            <PrivateRoute exact path={URLs.Projects} component={Projects} />
            <PrivateRoute path={URLs.Board} component={Tasks} />
            <PrivateRoute exact path={URLs.Students} component={Students} />
            <PrivateRoute exact path={URLs.ProjectsCreate} component={ProjectsCreate} />
            <PrivateRoute exact path={URLs.TasksCreate} component={TasksCreate} />
            <PrivateRoute exact path={URLs.Project} component={Stages} />
            <PrivateRoute exact path={URLs.Admin} component={Admin} />
        </Switch>
    </Router>
}

const App: FC = () => {
    const theme = THEMES.DARK;
    return (
      <StylesProvider injectFirst>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <MuiThemeProvider theme={createTheme(theme)}>
                  <ThemeProvider theme={createTheme(theme)}>
                      <Routes />
                  </ThemeProvider>
              </MuiThemeProvider>
          </MuiPickersUtilsProvider>
      </StylesProvider>
  );
}

export default App;
