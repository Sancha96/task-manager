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
import {getProjects} from "../store/project/slice";
import {Routes} from "../constants/links";
import {RootState} from "../store";
import {stat} from "fs";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  border-bottom: 1px solid ${(props) => props.theme.palette.grey[300]};
`;

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
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
    image?: string;
    title: string;
    description: string;
    chip: JSX.Element;
    persons: string[]
};
const Project: React.FC<ProjectPropsType> = ({
    image,
    title,
    description,
    chip,
}) => {
    const history = useHistory();
    return (
        <Card mb={6}>
            {image ? <CardMedia image={image} title="Contemplative Reptile" /> : null}
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>

                {chip}

                <Typography mb={4} color="textSecondary" component="p">
                    {description}
                </Typography>

                <AvatarGroup max={3}>
                    <Avatar alt="Avatar" src="/static/img/avatars/avatar-1.jpg" />
                    <Avatar alt="Avatar" src="/static/img/avatars/avatar-2.jpg" />
                    <Avatar alt="Avatar" src="/static/img/avatars/avatar-3.jpg" />
                </AvatarGroup>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => history.push("/tasks")}>
                    Подробнее
                </Button>
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
    const projects = useSelector((state: RootState) => state.project.data);

    const getData = () => {
        dispatch(getProjects())
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h3" gutterBottom display="inline">
                    Проекты
                </Typography>
                <Link component={NavLink} exact to={Routes.ProjectsCreate}>Создать</Link>
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
                        <Grid item xs={12} lg={6} xl={3} key={project.uuid}>
                            <Project
                                title={project.title}
                                description={project.description}
                                persons={project.persons}
                                chip={getChip(project.status)}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
}

export default Projects;
