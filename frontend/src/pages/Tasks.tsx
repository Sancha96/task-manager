import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import "dragula/dist/dragula.css";

import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography as MuiTypography,
} from "@material-ui/core";

import { AvatarGroup } from "@material-ui/lab";

import { spacing } from "@material-ui/system";

import { orange, green, blue } from "@material-ui/core/colors";

import { Add as AddIcon } from "@material-ui/icons";

import { MessageCircle } from "react-feather";

import dragula from "dragula";

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
};
const Lane: React.FC<LanePropsType> = ({
  title,
  description,
  onContainerLoaded,
  children,
}) => {
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
        <div ref={handleContainerLoaded}>{children}</div>
        <Button color="primary" variant="contained" fullWidth>
          <AddIcon />
          Добавить задачу
        </Button>
      </CardContent>
    </Card>
  );
};

type TaskPropsType = {
  content: DemoTasksElement;
  avatars: Array<number>;
};
const Task: React.FC<TaskPropsType> = ({ content, avatars }) => {
  return (
    <TaskWrapper mb={4}>
      <TaskWrapperContent>
        {content.badges &&
          content.badges.map((color, i) => <TaskBadge color={color} key={i} />)}

        <TaskTitle variant="body1" gutterBottom>
          {content.title}
        </TaskTitle>

        <TaskAvatars>
          <AvatarGroup max={3}>
            {avatars &&
              avatars.map((avatar, i) => (
                <Avatar
                  src={`/static/img/avatars/avatar-${avatar}.jpg`}
                  key={i}
                />
              ))}
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
      </TaskWrapperContent>
    </TaskWrapper>
  );
};

type DemoTasksElement = {
  title: string;
  badges?: Array<string>;
  notifications?: number;
};
const demoTasks = [
  {
    title: "Создание схемы БД",
    badges: [green[600], orange[600]],
    notifications: 2,
  },
  {
    title: "Разворачивание серверной части приложения",
    badges: [green[600]],
    notifications: 1,
  },
  {
    title: "Создание источника Users",
  },
  {
    title: "Подключение TypeORM",
    badges: [green[600]],
    notifications: 3,
  },
  {
    title: "Реализация контроллера и сервиса Users",
    badges: [blue[600]],
  },
];

const containers: Array<Element> = [];

function Tasks() {
  const onContainerReady = (container: Element) => {
    containers.push(container);
  };

  useEffect(() => {
    dragula(containers);
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom display="inline">
        Задачи
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Главная
        </Link>
        <Typography>Задачи</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={3} xl={3}>
          <Lane
            title="Backlog"
            onContainerLoaded={onContainerReady}
          >
            <Task content={demoTasks[2]} avatars={[2]} />
            <Task content={demoTasks[3]} avatars={[2, 3]} />
            <Task content={demoTasks[4]} avatars={[]} />
          </Lane>
        </Grid>
        <Grid item xs={12} lg={3} xl={3}>
          <Lane
            title="To do"
            onContainerLoaded={onContainerReady}
          >
            <Task content={demoTasks[0]} avatars={[1, 2, 3, 4]} />
            <Task content={demoTasks[2]} avatars={[2]} />
            <Task content={demoTasks[3]} avatars={[2, 3]} />
            <Task content={demoTasks[1]} avatars={[]} />
            <Task content={demoTasks[4]} avatars={[]} />
          </Lane>
        </Grid>
        <Grid item xs={12} lg={3} xl={3}>
          <Lane
            title="In Progress"
            onContainerLoaded={onContainerReady}
          >
            <Task content={demoTasks[2]} avatars={[3, 1, 2]} />
            <Task content={demoTasks[4]} avatars={[2]} />
          </Lane>
        </Grid>
        <Grid item xs={12} lg={3} xl={3}>
          <Lane
            title="Completed"
            onContainerLoaded={onContainerReady}
          >
            <Task content={demoTasks[3]} avatars={[1, 2]} />
            <Task content={demoTasks[2]} avatars={[4]} />
            <Task content={demoTasks[0]} avatars={[]} />
          </Lane>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Tasks;