import React, { useEffect } from "react";
import styled from "styled-components/macro";
import {NavLink, useHistory, useParams} from "react-router-dom";

import "dragula/dist/dragula.css";

import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Card as MuiCard,
  CardContent as MuiCardContent, Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography as MuiTypography,
} from "@material-ui/core";

import { AvatarGroup } from "@material-ui/lab";

import { spacing } from "@material-ui/system";

import { Add as AddIcon } from "@material-ui/icons";

import { MessageCircle } from "react-feather";

import dragula from "dragula";
import {useDispatch, useSelector} from "react-redux";
import {getStageById} from "../store/stage/slice";
import {RootState} from "../store";
import {getProjectById} from "../store/project/slice";
import {getTasks} from "../store/task/slice";
import API from "../API/task";
import APIProject from "../API/project";
import {green, orange, red} from "@material-ui/core/colors";
import {Routes} from "../constants/links";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)<{ pb?: number }>`
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`;

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const TaskWrapper = styled(Card)`
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
  cursor: grab;

  &:hover {
    background: ${(props) => props.theme.palette.background.default};
  }
`;

const TaskWrapperContent = styled(CardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`;

const TaskAvatars = styled.div`
  margin-left: 8px;
`;

const MessageCircleIcon = styled(MessageCircle)`
  color: ${(props) => props.theme.palette.grey[500]};
  vertical-align: middle;
`;

const TaskBadge = styled.div`
  background: ${(props) => props.color};
  width: 40px;
  height: 6px;
  border-radius: 6px;
  display: inline-block;
  margin-right: ${(props) => props.theme.spacing(2)}px;
`;

const TaskNotifications = styled.div`
  display: flex;
  position: absolute;
  bottom: ${(props) => props.theme.spacing(4)}px;
  right: ${(props) => props.theme.spacing(4)}px;
`;

const TaskNotificationsAmount = styled.div`
  color: ${(props) => props.theme.palette.grey[500]};
  font-weight: 600;
  margin-right: ${(props) => props.theme.spacing(1)}px;
  line-height: 1.75;
`;

const Typography = styled(MuiTypography)(spacing);

const TaskTitle = styled(Typography)`
  font-weight: 600;
  font-size: 15px;
  margin-right: ${(props) => props.theme.spacing(10)}px;
`;
type LanePropsType = {
  title: string;
  description?: string;
  onContainerLoaded: (container: Element) => void;
  type: any;
};
const Lane: React.FC<LanePropsType> = ({
  title,
  description,
  onContainerLoaded,
    type,
  children,
}) => {
  const history = useHistory();
  const params = useParams<any>();
  const { stageId, id: projectId } = params;
  const user: any = useSelector((state: RootState) => state.user.data);
  const handleContainerLoaded = (container: HTMLDivElement | null) => {
    if (container) {
      onContainerLoaded(container);
    }
  };

  return (
    <Card mb={6}>
      <CardContent pb={0}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" mb={4}>
          {description}
        </Typography>
        <div ref={handleContainerLoaded} data-type={type} style={{ padding: '20px 0' }}>{children}</div>
        {type === "backlog" && user?.person?.type === "teacher" && <Button color="primary" variant="contained" fullWidth onClick={() => {
          history.push({
            pathname: Routes.TasksCreate,
            state: {
              stageId,
              projectId,
            }
          })
        }}>
          <AddIcon />
          Добавить задачу
        </Button>}
      </CardContent>
    </Card>
  );
};

const Chip = styled(MuiChip)<{ rgbcolor: string }>`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`;

type TaskPropsType = {
  content: any;
  avatars: Array<number>;
};

function getTimeFromMins(mins: any) {
  let hours = Math.trunc(mins/60);
  let minutes = mins % 60;
  return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
};

const Task: React.FC<TaskPropsType> = ({ content }) => {
  const params = useParams<any>();
  const { stageId, id: projectId } = params;
  const user: any = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();
  return (
    <TaskWrapper mb={4} data-task-id={content.uuid} data-is-confirmed={content.isConfirmed}>
      <TaskWrapperContent>
        {
          content?.status === "done" && content.isConfirmed && <Chip
            label="Подтверждено"
            rgbcolor={green[500]}/>
        }

        <TaskTitle variant="body1" gutterBottom>
          {content.title}
        </TaskTitle>

        {content.actualTime && <div style={{ padding: '5px 0 10px' }}>
          {`Затраченное время: ${getTimeFromMins(content.actualTime)}`}
        </div>}

        <TaskAvatars>
          <AvatarGroup max={3}>
            {content.executors?.map((executor: any) => (<Avatar key={executor.uuid} title={`${executor.firstName} ${executor.lastName}`}>{executor.firstName[0]}{executor.lastName[0]}</Avatar>))}
          </AvatarGroup>
        </TaskAvatars>

        {content.notifications && (
          <TaskNotifications>
            <TaskNotificationsAmount>
              {content.notifications}
            </TaskNotificationsAmount>
            <MessageCircleIcon />
          </TaskNotifications>
        )}
        {user?.person?.type === "teacher" && content?.status === "done" && !content.isConfirmed && <Button color="primary" variant="contained" onClick={() => {
          API.updateStatusTask(content.uuid, { isConfirmed: true }).then(() => {
            dispatch(getTasks({ projectId, stageId }))
          });
        }}>
          Подтвердить
        </Button>}
      </TaskWrapperContent>
    </TaskWrapper>
  );
};

const containers: Array<Element> = [];

function Tasks() {
  const dispatch = useDispatch();
  const params = useParams<any>();
  const { stageId, id: projectId } = params;
  const stage = useSelector((state: RootState) => state.stage.item);
  const project = useSelector((state: RootState) => state.project.item);
  const tasks = useSelector((state: RootState) => state.task.data);
  const onContainerReady = (container: Element) => {
    containers.push(container);
  };

  useEffect(() => {
    dragula(containers, {
      accepts: function (el, target, source, sibling) {
        const taskId = el?.getAttribute('data-task-id');
        const type = target?.getAttribute('data-type');
        API.updateStatusTask(taskId, { status: type });
        if (type === "inprogress") {
          APIProject.updateProject(projectId, { status: "inProgress" })
        }
        return true;
      },
      // invalid: function (el, handle) {
      //   const isConfirmed = Boolean(el?.getAttribute('data-is-confirmed'));
      //   return isConfirmed;
      // },
    });
    dispatch(getStageById(stageId));
    dispatch(getProjectById(projectId));
    dispatch(getTasks({ projectId, stageId }))
  }, []);

  return (
    <>
      <Typography variant="h3" gutterBottom display="inline">
        Этап: {stage?.title}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Главная
        </Link>
        <Link component={NavLink} exact to="/projects">
          Проекты
        </Link>
        <Link component={NavLink} exact to={`/projects/${projectId}`} title={project?.title}>{project?.title.slice(0, 30)}{project?.title.length > 30 ? '...' : ''}</Link>
        <Typography>Задачи</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={3} xl={3}>
          <Lane
            title="Backlog"
            type="backlog"
            onContainerLoaded={onContainerReady}
          >
            {
              tasks?.filter((task: any) => task.status === "backlog").map((task: any) => (
                  <Task key={task.uuid} content={task} avatars={[0]} />
              ))
            }
          </Lane>
        </Grid>
        <Grid item xs={12} lg={3} xl={3}>
          <Lane
            title="Paused"
            type="paused"
            onContainerLoaded={onContainerReady}
          >
            {
              tasks?.filter((task: any) => task.status === "paused").map((task: any) => (
                  <Task key={task.uuid} content={task} avatars={[0]} />
              ))
            }
          </Lane>
        </Grid>
        <Grid item xs={12} lg={3} xl={3}>
          <Lane
            title="In Progress"
            type="inprogress"
            onContainerLoaded={onContainerReady}
          >
            {
              tasks?.filter((task: any) => task.status === "inprogress").map((task: any) => (
                  <Task key={task.uuid} content={task} avatars={[0]} />
              ))
            }
          </Lane>
        </Grid>
        <Grid item xs={12} lg={3} xl={3}>
          <Lane
            title="Done"
            type="done"
            onContainerLoaded={onContainerReady}
          >
            {
              tasks?.filter((task: any) => task.status === "done").map((task: any) => (
                  <Task key={task.uuid} content={task} avatars={[0]} />
              ))
            }
          </Lane>
        </Grid>
      </Grid>
    </>
  );
}

export default Tasks;
