import React, {useEffect, useMemo} from "react";
import styled from "styled-components/macro";
import { NavLink, useHistory } from "react-router-dom";

import {
    Box,
    Breadcrumbs as MuiBreadcrumbs,
    Divider as MuiDivider, FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    Link, MenuItem, Select,
    Typography as MuiTypography,
} from "@material-ui/core";

import { spacing, SpacingProps } from "@material-ui/system";
import {useDispatch, useSelector} from "react-redux";
import {createProject} from "../store/project/slice";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Routes} from "../constants/links";
import {Formik} from "formik";
import {getStudents, getTeachers} from "../store/person/slice";
import {RootState} from "../store";
import {getAllTypes} from "../store/project-types/slice";
import API from "../API/task";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Divider = styled(MuiDivider)(spacing);

interface TypographyPropsType extends SpacingProps {
    component?: string;
}
const Typography = styled(MuiTypography)<TypographyPropsType>(spacing);

function TasksCreate() {
    const history: any = useHistory<any>();
    const dispatch = useDispatch();
    const { students } = useSelector((state: RootState) => state.person)
    const getData = () => {
        dispatch(getStudents());
    }

    useEffect(() => {
        getData()
    }, []);

    console.log(history)

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h3" gutterBottom display="inline">
                    Создание задачи
                </Typography>
            </Box>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Formik
                    initialValues={{
                        title: "",
                        executors: [],
                        stage: history.location.state.stageId,
                        project: history.location.state.projectId,
                        error: ""

                    }}
                    validationSchema={Yup.object().shape({
                        title: Yup.string().required("Это обязательное поле"),
                    })}
                    onSubmit={async (values: any) => {
                        values.executors = [values.executors];
                        API.create(values).then(() => {
                            history.goBack();
                        })
                    }}
                >
                    {({ errors, handleChange, handleSubmit, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <FormControl margin="normal" fullWidth>
                                <FormHelperText>Название</FormHelperText>
                                <TextField
                                    variant="outlined"
                                    // required
                                    id="title"
                                    name="title"
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <FormHelperText>Студенты</FormHelperText>
                                <Select
                                    variant="outlined"
                                    fullWidth
                                    id="executors"
                                    name="executors"
                                    value={values.executors}
                                    onChange={handleChange}
                                >
                                    {
                                        students?.map((student: any) =>
                                            (
                                                <MenuItem key={student.uuid} value={student.uuid}>
                                                    {`${student.firstName} ${student.lastName}`}
                                                </MenuItem>
                                            ))
                                    }
                                </Select>
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Создать
                            </Button>
                        </form>
                    )}
                </Formik>
            </Grid>
        </>
    );
}

export default TasksCreate;
