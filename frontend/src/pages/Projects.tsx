import React, {useEffect} from "react";
import styled from "styled-components/macro";
import { NavLink, useHistory } from "react-router-dom";

import {
    Avatar, Box,
    Breadcrumbs as MuiBreadcrumbs,
    Button,
    Card as MuiCard,
    CardActions,
    CardContent as MuiCardContent,
    CardMedia as MuiCardMedia,
    Chip as MuiChip,
    Divider as MuiDivider,
    Grid,
    Link,
    Typography as MuiTypography,
} from "@material-ui/core";

import { AvatarGroup as MuiAvatarGroup } from "@material-ui/lab";

import { green, orange, grey } from "@material-ui/core/colors";

import { spacing, SpacingProps } from "@material-ui/system";
import {useDispatch, useSelector} from "react-redux";
import {Routes} from "../constants/links";
import {RootState} from "../store";
import {getProjects} from "../store/project/slice";
import API from "../API/project";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  border-bottom: 1px solid ${(props) => props.theme.palette.grey[300]};
`;

const Divider = styled(MuiDivider)(spacing);

interface TypographyPropsType extends SpacingProps {
    component?: string;
}
const Typography = styled(MuiTypography)<TypographyPropsType>(spacing);

const Chip = styled(MuiChip)<{ rgbcolor?: string }>`
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
`;

const AvatarGroup = styled(MuiAvatarGroup)`
  margin-left: ${(props) => props.theme.spacing(2)}px;
`;

type ProjectPropsType = {
    uuid: string;
    image?: string;
    title: string;
    description: string;
    chip: JSX.Element;
    executors: any;
    teacher: any;
    userType: any;
    status: string;
};
const Project: React.FC<ProjectPropsType> = ({
    uuid,
    title,
    description,
    chip,
    teacher,
    executors,
                                                 userType,
    status,
}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user: any = useSelector((state: RootState) => state.user.data);

    return (
        <Card mb={6}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>

                {chip}

                <Typography mb={4} color="textSecondary" component="p">
                    {description}
                </Typography>

                <Typography mb={4} color="textSecondary" component="p">
                    Стэк: ReactJS, NestJS, PostgreSQL
                </Typography>

                {userType === "student" && <Typography mb={4} color="textSecondary" component="p">
                    Преподаватель: {teacher.lastName} {teacher.firstName[0]}. {teacher.surName[0]}.
                </Typography>}

                <AvatarGroup max={3}>
                    {executors.map((executor: any) => (<Avatar key={executor.uuid} title={`${executor.firstName} ${executor.lastName}`}>{executor.firstName[0]}{executor.lastName[0]}</Avatar>))}
                </AvatarGroup>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => history.push("/projects/" + uuid)}>
                    Подробнее
                </Button>
                {
                    userType === "teacher" &&
                        <>
                        {status === "inProgress" && <Button size="small" color="primary" onClick={() => {
                            API.updateProject(uuid, { status: "done" }).then(() => {
                                if (user?.person?.uuid) {
                                    dispatch(getProjects(user.person.type === "student" ? {
                                        executor: user.person.uuid
                                    } : {
                                        teacher: user.person.uuid
                                    }));
                                }
                            });
                        }}>
                            Завершить
                        </Button>}
                        </>
                }
            </CardActions>
        </Card>
    );
};

const getChip: any = (status: any) => (
    status === "done" ? <Chip label="Завершен" rgbcolor={green[500]} /> :
        status.toLowerCase() === "backlog" ? <Chip label="Создан" rgbcolor={grey[500]} /> :
            <Chip label="В процессе" rgbcolor={orange[500]} />
)

function Projects() {
    const dispatch = useDispatch();
    const user: any = useSelector((state: RootState) => state.user.data);
    const projects = useSelector((state: RootState) => state.project.data);

    useEffect(() => {
        if (user?.person?.uuid) {
            dispatch(getProjects(user.person.type === "student" ? {
                executor: user.person.uuid
            } : {
                teacher: user.person.uuid
            }));
        }
    }, []);

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h3" gutterBottom display="inline">
                    Проекты
                </Typography>
                {user?.person?.type === "teacher" && <Link component={NavLink} exact to={Routes.ProjectsCreate}>Создать</Link>}
            </Box>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} exact to="/">
                    Главная
                </Link>
                <Typography>Проекты</Typography>
            </Breadcrumbs>

            <Divider my={6} />

            <Grid container spacing={6}>
                {
                    projects.map((project: any) => (
                        <Grid item xs={12} lg={6} xl={4} key={project.uuid}>
                            <Project
                                uuid={project.uuid}
                                title={project.title}
                                description={project.description}
                                executors={project.executors}
                                teacher={project.teacher}
                                status={project.status}
                                chip={getChip(project.status)}
                                userType={user?.person?.type}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
}

export default Projects;
