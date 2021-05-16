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
import {createProject, getProjects} from "../store/project/slice";
import * as Yup from "yup";
import {login} from "../store/auth/slice";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Routes} from "../constants/links";
import {Formik} from "formik";
import {getStudents} from "../store/person/slice";
import {RootState} from "../store";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Divider = styled(MuiDivider)(spacing);

interface TypographyPropsType extends SpacingProps {
    component?: string;
}
const Typography = styled(MuiTypography)<TypographyPropsType>(spacing);

function ProjectsCreate() {
    const dispatch = useDispatch();
    const students = useSelector((state: RootState) => state.person.students)
    const getData = () => {
        dispatch(getStudents())
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h3" gutterBottom display="inline">
                    Создание проекта
                </Typography>
            </Box>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} exact to="/">
                    Главная
                </Link>
                <Link component={NavLink} exact to="/">
                    Проекты
                </Link>
                <Typography>Создание</Typography>
            </Breadcrumbs>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Formik
                    initialValues={{
                        title: "",
                        description: "",
                        persons: [],
                        error: ""

                    }}
                    validationSchema={Yup.object().shape({
                        title: Yup.string().required("Это обязательное поле"),
                        // persons: Yup.string().required("Это обязательное поле"),
                    })}
                    onSubmit={async (values) => {
                        console.log(values)
                        await dispatch(createProject(values));
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
                                <FormHelperText>Описание</FormHelperText>
                                <TextField
                                    variant="outlined"
                                    name="description"
                                    id="description"
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <FormHelperText>Студенты</FormHelperText>
                                <Select
                                    variant="outlined"
                                    // required
                                    fullWidth
                                    id="persons"
                                    name="persons"
                                    multiple
                                    value={values.persons}
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

export default ProjectsCreate;
