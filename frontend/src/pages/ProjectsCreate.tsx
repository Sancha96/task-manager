import React, {useEffect} from "react";
import styled from "styled-components/macro";
import { NavLink, useHistory } from "react-router-dom";

import {
    Box,
    Breadcrumbs as MuiBreadcrumbs,
    Divider as MuiDivider, FormControl,
    FormHelperText,
    Grid,
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
import {getSkills} from "../store/skill/slice";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Divider = styled(MuiDivider)(spacing);

interface TypographyPropsType extends SpacingProps {
    component?: string;
}
const Typography = styled(MuiTypography)<TypographyPropsType>(spacing);

function ProjectsCreate() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { students, teachers } = useSelector((state: RootState) => state.person)
    const types = useSelector((state: RootState) => state.projectTypes.data);
    const skills = useSelector((state: RootState) => state.skill.data);
    const getData = () => {
        dispatch(getStudents());
        dispatch(getTeachers());
        dispatch(getAllTypes());
        dispatch(getSkills());
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
                        executors: [],
                        skills: [],
                        teacher: "",
                        type: "",
                        error: "",
                    }}
                    validationSchema={Yup.object().shape({
                        title: Yup.string().required("Это обязательное поле"),
                        // executors: Yup.string().required("Это обязательное поле"),
                    })}
                    onSubmit={async (values) => {
                        await dispatch(createProject(values));
                        history.push(Routes.Projects)
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
                                <FormHelperText>Исполнители</FormHelperText>
                                <Select
                                    variant="outlined"
                                    fullWidth
                                    id="executors"
                                    name="executors"
                                    multiple
                                    value={values.executors}
                                    onChange={handleChange}
                                >
                                    {
                                        students?.map((student: any) =>
                                            (
                                                <MenuItem key={student.uuid} value={student.uuid}>
                                                    {`${student.lastName} ${student.firstName} ${student.surName}`}
                                                </MenuItem>
                                            ))
                                    }
                                </Select>
                            </FormControl>

                            <FormControl margin="normal" fullWidth>
                                <FormHelperText>Преподаватель</FormHelperText>
                                <Select
                                    variant="outlined"
                                    fullWidth
                                    id="teacher"
                                    name="teacher"
                                    value={values.teacher}
                                    onChange={handleChange}
                                >
                                    {
                                        teachers?.map((teacher: any) =>
                                            (
                                                <MenuItem key={teacher.uuid} value={teacher.uuid}>
                                                   {`${teacher.lastName} ${teacher.firstName} ${teacher.surName}`}
                                                </MenuItem>
                                            ))
                                    }
                                </Select>
                            </FormControl>

                            <FormControl margin="normal" fullWidth>
                                <FormHelperText>Тип проекта</FormHelperText>
                                <Select
                                    variant="outlined"
                                    fullWidth
                                    id="type"
                                    name="type"
                                    value={values.type}
                                    onChange={handleChange}
                                >
                                    {
                                        types?.map((type: any) =>
                                            (
                                                <MenuItem key={type.uuid} value={type.uuid}>
                                                    {type.title}
                                                </MenuItem>
                                            ))
                                    }
                                </Select>
                            </FormControl>

                            <FormControl margin="normal" fullWidth>
                                <FormHelperText>Стэк</FormHelperText>
                                <Select
                                    variant="outlined"
                                    fullWidth
                                    id="skills"
                                    name="skills"
                                    multiple
                                    value={values.skills}
                                    onChange={handleChange}
                                >
                                    {
                                        skills?.map((skill: any) =>
                                            (
                                                <MenuItem key={skill.uuid} value={skill.uuid}>
                                                    {skill.title}
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
