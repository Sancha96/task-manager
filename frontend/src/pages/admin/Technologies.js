import React, {useEffect, useState} from "react";

import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip,
} from "@material-ui/core";

import {useDispatch, useSelector} from "react-redux";
import API from "../../API/skill";
import {getSkills} from "../../store/skill/slice";

import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function Technologies() {
    const dispatch = useDispatch();
    const skills = useSelector((state) => state.skill.data);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");

    const create = async () => {
        await API.create({
            title,
        });
        dispatch(getSkills());
        setTitle("");
        setOpen(false);
    }

    useEffect(() => {
        dispatch(getSkills())
    }, []);

    return (
        <div style={{ padding: '20px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '0 20px' }}>
            {
                skills?.map((stage, key) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px' }}>
                        {stage.title}
                        <div>
                            <EditIcon />
                            <DeleteForeverIcon />
                        </div>
                    </div>
                ))
            }
            </div>
            <Button color="primary" onClick={() => setOpen(true)}>Создать</Button>
            <Dialog
                onClose={() => setOpen(false)}
                open={!!open}
            >
                <DialogTitle>Создание технологии</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Название"
                        fullWidth
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={create} color="primary">
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Technologies;
