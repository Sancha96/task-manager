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

const Card = styled(MuiCard)(spacing);

function SimpleExpansionPanel() {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.projectTypes.data);
    const [open, setOpen] = useState(null);
    const [openCreateType, setOpenCreateType] = useState(null);
    const [titleType, setTitleType] = useState("");
    const [title, setTitle] = useState("");
    const [endDate, setDate] = useState(null);

    const createStage = async () => {
        await API.create({
            title,
            endDate,
            type: open,
        });
        dispatch(getAllTypes());
        setTitle("");
        setDate(null);
        setOpen(false);
    }

    const createType = async () => {
        await APIType.create({
            title: titleType,
        });
        dispatch(getAllTypes());
        setTitleType("");
        setOpenCreateType(false);
    }

    useEffect(() => {
        dispatch(getAllTypes())
    }, []);

    return (
        <Card mb={6}>
            <CardContent>
                <div>
                    {
                        types?.map(type => (
                            <ExpansionPanel key={type.uuid}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>{type.title}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div style={{width: '100%'}}>
                                    {
                                        type.stages?.map((stage, key) => (
                                            <div key={key}>
                                                <Typography>
                                                    {key + 1}. {stage.title}
                                                </Typography>
                                            </div>
                                        ))
                                    }
                                    <Button color="primary" onClick={() => setOpen(type.uuid)}>Добавить этап</Button>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        ))
                    }
                </div>
                <Button onClick={() => setOpenCreateType(true)} color="primary">
                    Создать тип
                </Button>
            </CardContent>
            <Dialog
                onClose={() => setOpenCreateType(null)}
                open={!!openCreateType}
            >
                <DialogTitle>Создать тип</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Название"
                        fullWidth
                        onChange={(e) => setTitleType(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCreateType(null)} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={createType} color="primary">
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                onClose={() => setOpen(null)}
                open={!!open}
            >
                <DialogTitle>Добавить этап</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Название"
                        fullWidth
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        id="date"
                        label="Дата окончания"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(null)} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={createStage} color="primary">
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

function Types() {
    return (
        <Grid container spacing={6}>
            <SimpleExpansionPanel />
        </Grid>
    );
}

export default Types;
