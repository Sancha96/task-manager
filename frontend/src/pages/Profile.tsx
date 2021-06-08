import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import {red, green, blue, orange, grey} from "@material-ui/core/colors";

import {
    Avatar as MuiAvatar,
    Box,
    Breadcrumbs as MuiBreadcrumbs,
    Button as MuiButton,
    Card as MuiCard,
    CardContent,
    Chip as MuiChip,
    Divider as MuiDivider,
    Grid as MuiGrid,
    LinearProgress as MuiLinearProgress,
    Link,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography as MuiTypography,
} from "@material-ui/core";

import { spacing, SpacingProps } from "@material-ui/system";

import {
    Briefcase,
    DollarSign,
    ExternalLink,
    Facebook,
    Home,
    Instagram,
    MapPin,
    ShoppingBag,
    Twitter,
} from "react-feather";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Button = styled(MuiButton)(spacing);

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Grid = styled(MuiGrid)(spacing);

const LinearProgress = styled(MuiLinearProgress)(spacing);

const Spacer = styled.div(spacing);

interface TypographyPropsType extends SpacingProps {
    component?: string;
}
const Typography = styled(MuiTypography)<TypographyPropsType>(spacing);

const Centered = styled.div`
  text-align: center;
`;

const Avatar = styled(MuiAvatar)`
  display: inline-block;
  height: 128px;
  width: 128px;
`;

const AboutIcon = styled.span`
  display: flex;
  padding-right: ${(props) => props.theme.spacing(2)}px;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const ChartWrapper = styled.div`
  height: 280px;
  position: relative;
`;

const StatsIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 32px;

  svg {
    width: 32px;
    height: 32px;
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const ProductsChip = styled(Chip)<{ rgbcolor?: string }>`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)}px);
`;

function Details() {
    return (
        <Card mb={6}>
            <CardContent>
                <Spacer mb={4} />

                <Centered>
                    <Typography variant="body2" component="div" gutterBottom>
                        <Box fontWeight="fontWeightMedium">Челнокова Александра</Box>
                        <Box fontWeight="fontWeightRegular">МОиАИС 174-1</Box>
                    </Typography>
                </Centered>
            </CardContent>
        </Card>
    );
}

function Skills() {
    return (
        <Card mb={6}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Стэк
                </Typography>

                <Spacer mb={4} />

                <Centered>
                    <Chip size="small" mr={1} mb={1} label="ReactJS" color="secondary" />
                    <Chip size="small" mr={1} mb={1} label="NestJS" color="secondary" />
                    <Chip size="small" mr={1} mb={1} label="PostgreSQL" color="secondary" />
                    <Chip size="small" mr={1} mb={1} label="Laravel" />
                    <Chip size="small" mr={1} mb={1} label="Symphony" />
                </Centered>
            </CardContent>
        </Card>
    );
}

function Elsewhere() {
    return (
        <Card mb={6}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Контакты
                </Typography>

                <Spacer mb={4} />

                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <AboutIcon>
                            <Instagram />
                        </AboutIcon>
                    </Grid>
                    <Grid item>
                        <Link href="https://material-app.bootlab.io/">Instagram</Link>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

function Earnings() {
    return (
        <Box position="relative">
            <Card mb={6} pt={2}>
                <CardContent>
                    <Typography variant="h2" gutterBottom>
                        <Box fontWeight="fontWeightRegular">0</Box>
                    </Typography>
                    <Typography variant="body2" gutterBottom mt={3} mb={0}>
                        Завершенные проекты
                    </Typography>

                    <LinearProgress
                        variant="determinate"
                        value={0}
                        color="secondary"
                        mt={4}
                    />
                </CardContent>
            </Card>
        </Box>
    );
}

function Orders() {
    return (
        <Box position="relative">
            <Card mb={6} pt={2}>
                <CardContent>
                    <Typography variant="h2" gutterBottom>
                        <Box fontWeight="fontWeightRegular">3</Box>
                    </Typography>
                    <Typography variant="body2" gutterBottom mt={3} mb={0}>
                         Завершенных этапов
                    </Typography>

                    <LinearProgress
                        variant="determinate"
                        value={27}
                        color="secondary"
                        mt={4}
                    />
                </CardContent>
            </Card>
        </Box>
    );
}

function Revenue() {
    return (
        <Box position="relative">
            <Card mb={6} pt={2}>
                <CardContent>
                    <Typography variant="h2" gutterBottom>
                        <Box fontWeight="fontWeightRegular">3</Box>
                    </Typography>
                    <Typography variant="body2" gutterBottom mt={3} mb={0}>
                        Завершенных задач
                    </Typography>

                    <LinearProgress
                        variant="determinate"
                        value={50}
                        color="secondary"
                        mt={4}
                    />
                </CardContent>
            </Card>
        </Box>
    );
}

function Products() {
    return (
        <Card mb={6}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Задачи
                </Typography>
                <TableWrapper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Название</TableCell>
                                <TableCell>Статус</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Добавление в презентацию слайда со схемой базы данных
                                </TableCell>
                                <TableCell>
                                    <ProductsChip
                                        size="small"
                                        label="Backlog"
                                        rgbcolor={grey[500]}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Создание справочников с этапами выполнения проектов
                                </TableCell>
                                <TableCell>
                                    <ProductsChip
                                        size="small"
                                        label="In Progress"
                                        rgbcolor={orange[500]}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Изучение и настройка миграций
                                </TableCell>
                                <TableCell>
                                    <ProductsChip
                                        size="small"
                                        label="In Progress"
                                        rgbcolor={orange[500]}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Выбор СУБД и обоснование выбора
                                </TableCell>
                                <TableCell>
                                    <ProductsChip
                                        size="small"
                                        label="Completed"
                                        rgbcolor={green[500]}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Выделение основных сущностей и установка связей между ними
                                </TableCell>
                                <TableCell>
                                    <ProductsChip
                                        size="small"
                                        label="Completed"
                                        rgbcolor={green[500]}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Создание таблиц Users и Persons
                                </TableCell>
                                <TableCell>
                                    <ProductsChip
                                        size="small"
                                        label="Completed"
                                        rgbcolor={green[500]}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableWrapper>
            </CardContent>
        </Card>
    );
}

function Profile() {
    return (
        <React.Fragment>
            <Typography variant="h3" gutterBottom display="inline">
                Профиль
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} exact to="/">
                    Главная
                </Link>
                <Typography>Профиль</Typography>
            </Breadcrumbs>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={12} lg={4} xl={3}>
                    <Details />
                    <Skills />
                    <Elsewhere />
                </Grid>
                <Grid item xs={12} lg={8} xl={9}>
                    <Grid container spacing={6}>
                        <Grid item xs={12} lg={4}>
                            <Earnings />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Orders />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Revenue />
                        </Grid>
                    </Grid>
                    <Products />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Profile;
