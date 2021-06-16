import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";

import {
    CardContent,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    Card as MuiCard,
    Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField,
} from "@material-ui/core";

import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

import { spacing } from "@material-ui/system";
import {useDispatch, useSelector} from "react-redux";
import {getAllTypes} from "../../store/project-types/slice";
import API from "../../API/stage";
import APIType from "../../API/project-types";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const Card = styled(MuiCard)(spacing);

function Students() {
    return (
        <Grid container spacing={6} style={{ width: '100%' }}>
            <SimpleExpansionPanel />
        </Grid>
    );
}

export default Students;
