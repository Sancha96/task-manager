import React, {useEffect, useMemo, useState} from "react";
import styled from "styled-components/macro";
import {NavLink, useHistory, useParams} from "react-router-dom";

import {
    Grid,
    Link,
    List,
    ListItemIcon,
    Breadcrumbs as MuiBreadcrumbs,
    Card as MuiCard,
    Divider as MuiDivider,
    ListItem as MuiListItem,
    ListItemText as MuiListItemText,
    Typography, Checkbox,
    Chip as MuiChip,
} from "@material-ui/core";

import {red, green, orange, grey} from "@material-ui/core/colors";


import StarIcon from '@material-ui/icons/Star';

import { spacing } from "@material-ui/system";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {useDispatch, useSelector} from "react-redux";
import {getStagesByTypeId} from "../store/stage/slice";
import {RootState} from "../store";
import {getProjectById} from "../store/project/slice";
import {Routes} from "../constants/links";
import API from "../API/task";
import {join} from "./admin/Students";

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const ListItem = styled(MuiListItem)(spacing);

const ListItemText = styled(MuiListItemText)(spacing);

const Chip = styled(MuiChip)<{ rgbcolor: string }>`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`;

function SimpleList() {
    const dispatch = useDispatch();
    const { id: projectId, stageId } = useParams<any>();
    const history = useHistory();
    const stages: any = useSelector((state: RootState) => state.stage.data);
    const project: any = useSelector((state: RootState) => state.project.item);
    const filteredStages = useMemo(() => stages.filter((stage: any) => stage.type.uuid === project?.type.uuid), [stages]);
    const [tasks, setTasks] = useState<any>([]);

    useEffect(() => {
        dispatch(getProjectById(projectId))
    }, [])

    useEffect(() => {
        if (project?.type.uuid) {
            dispatch(getStagesByTypeId(project?.type.uuid))
        }
    }, [project?.type.uuid])

    useEffect(() => {
        if (stages) {
            const tasks: any = [];
            let count = 0;
            stages.forEach((stage: any) => {
                API.getTasks({projectId, stageId: stage.uuid}).then(({data}: any) => {
                    data.forEach((d: any) => tasks.push(d));
                    if (count === stages.length - 1) {
                        setTasks(tasks);
                    }
                    count++;
                })
            })
        }
    }, [stages]);

    const getFormattedTasks = (tasks: any) => {
        const ftasks: any = {};
        tasks.forEach((task: any) => {
            if (!ftasks[task.stage?.uuid]) ftasks[task.stage?.uuid] = [];
            ftasks[task.stage?.uuid].push(task);
        });
        return ftasks;
    }

    const formattedTasks = useMemo(() => tasks && getFormattedTasks(tasks), [tasks]);

    return (
        <Card mb={6}>
            <List component="nav">
                {
                    filteredStages.map((stage: any) => {
                        const percent = formattedTasks && formattedTasks[stage.uuid] ?
                            Number((100 * formattedTasks[stage.uuid].filter((task: any) => task.isConfirmed)?.length / formattedTasks[stage.uuid].length).toFixed()) :
                            0;
                        return <ListItem key={stage.uuid} button onClick={() => history.push(`${Routes.Projects}/${projectId}/${stage.uuid}`)}>
                            <ListItemIcon onClick={e => e.stopPropagation()} style={{ padding: "0 10px", color: grey[500] }}>
                                {formattedTasks && formattedTasks[stage.uuid] ? <Chip
                                    label={`${percent}%`}
                                    rgbcolor={percent === 100 ? green[500] : percent < 50 ? red[500] : orange[500]}/> :
                                    "Не начат"
                                }
                            </ListItemIcon>
                            <ListItemText primary={stage.title} />
                            <ListItemSecondaryAction>{stage.endDate && join(stage.endDate)}</ListItemSecondaryAction>
                        </ListItem>
                    })
                }
            </List>
        </Card>
    );
}

function Stages() {
    const project: any = useSelector((state: RootState) => state.project.item);

    return (
        <>
            <Typography variant="h3" gutterBottom display="inline">
                Этапы
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} exact to="/">
                    Главная
                </Link>
                <Link component={NavLink} exact to="/projects">
                    Проекты
                </Link>
                <Typography title={project?.title}>{project?.title.slice(0, 30)}{project?.title.length > 30 ? '...' : ''}</Typography>
            </Breadcrumbs>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item md={12}>
                    <SimpleList />
                </Grid>
            </Grid>
        </>
    );
}

export default Stages;
