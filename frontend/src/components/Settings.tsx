import React, { useState } from "react";
import styled, { css } from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import { THEMES } from "../constants/themes";
import { green, grey, indigo } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

import {
    Box,
    Button,
    Drawer,
    Fab as MuiFab,
    Grid,
    ListItem,
    Typography,
    IconButton as MuiIconButton,
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";

import { Palette as PaletteIcon } from "@material-ui/icons";
import {setTheme} from "../store/theme/slice";

type DemoButtonType = {
    active?: boolean;
};

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const DemoButton = styled.div<DemoButtonType>`
  cursor: pointer;
  background: ${(props) => props.theme.palette.background.paper};
  height: 80px;
  border-radius: 0.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.825rem;
  position: relative;
  border: 1px solid
    ${(props) =>
    !props.active
        ? props.theme.palette.action.selected
        : props.theme.palette.action.active};
`;

type DemoButtonInnerType = {
    selectedTheme: string;
};

const DemoButtonInner = styled.div<DemoButtonInnerType>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px ${(props) => props.theme.palette.action.selected};
  position: relative;

  ${(props) =>
    props.selectedTheme === THEMES.DEFAULT &&
    css`
      background: linear-gradient(-45deg, #23303f 50%, ${grey[100]} 0);
    `}
  ${(props) =>
    props.selectedTheme === THEMES.DARK &&
    css`
      background: #23303f;
    `}
  ${(props) =>
    props.selectedTheme === THEMES.LIGHT &&
    css`
      background: ${grey[100]};
    `}
  ${(props) =>
    props.selectedTheme === THEMES.BLUE &&
    css`
      background: linear-gradient(-45deg, #4782da 50%, ${grey[100]} 0);
    `}
  ${(props) =>
    props.selectedTheme === THEMES.GREEN &&
    css`
      background: linear-gradient(-45deg, ${green[500]} 50%, ${grey[100]} 0);
    `}
  ${(props) =>
    props.selectedTheme === THEMES.INDIGO &&
    css`
      background: linear-gradient(-45deg, ${indigo[500]} 50%, ${grey[100]} 0);
    `}
`;

const DemoTitle = styled(Typography)`
  text-align: center;
`;

const Fab = styled(MuiFab)`
  position: fixed;
  right: ${(props) => props.theme.spacing(8)}px;
  bottom: ${(props) => props.theme.spacing(8)}px;
  z-index: 1;
`;

const Wrapper = styled.div`
  width: 258px;
  overflow-x: hidden;
`;

const Heading = styled(ListItem)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }
`;

type DemoTypes = {
    title: string;
    theme: string;
};

function Demo({ title, theme }: DemoTypes) {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state: any) => state.theme.theme);

    return (
        <Grid item xs={6}>
            <DemoButton
                active={theme === currentTheme}
                onClick={() => dispatch(setTheme(theme))}
            >
                <DemoButtonInner selectedTheme={theme} />
            </DemoButton>
            <DemoTitle variant="subtitle2" gutterBottom>
                {title}
            </DemoTitle>
        </Grid>
    );
}

function Demos() {
    return (
        <Wrapper>
            <Heading button={true}>Выберите тему</Heading>

            <Box px={4} my={3}>
                <Grid container spacing={3}>
                    <Demo title="Тёмная" theme={THEMES.DARK} />
                    <Demo title="Светлая" theme={THEMES.LIGHT} />
                    <Demo title="Стандартная" theme={THEMES.DEFAULT} />
                    <Demo title="Синяя" theme={THEMES.BLUE} />
                    <Demo title="Зелёная" theme={THEMES.GREEN} />
                    <Demo title="Индиго" theme={THEMES.INDIGO} />
                </Grid>
            </Box>
        </Wrapper>
    );
}

function Settings() {
    const [state, setState] = useState({
        isOpen: false,
    });

    const toggleDrawer = (open: boolean) => () => {
        setState({ ...state, isOpen: open });
    };

    return (
        <React.Fragment>
            {/*<Grid item onClick={toggleDrawer(true)}>*/}
                <IconButton
                    onClick={toggleDrawer(true)}
                    color="inherit"
                >
                    <PaletteIcon />
                </IconButton>
            {/*</Grid>*/}
            <Drawer anchor="right" open={state.isOpen} onClose={toggleDrawer(false)}>
                <Demos />
            </Drawer>
        </React.Fragment>
    );
}

export default Settings;
