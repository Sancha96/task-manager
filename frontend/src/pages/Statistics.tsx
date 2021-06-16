import React, {useEffect} from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import {
    Avatar as MuiAvatar,
    Box,
    Breadcrumbs as MuiBreadcrumbs,
    Button,
    Checkbox,
    Chip as MuiChip,
    Divider as MuiDivider, FormControl, FormControlLabel, FormHelperText,
    Grid,
    IconButton,
    Link, MenuItem,
    Paper as MuiPaper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography,
} from "@material-ui/core";

import {green, orange, red} from "@material-ui/core/colors";

import {
    Add as AddIcon,
    Archive as ArchiveIcon,
    FilterList as FilterListIcon,
    RemoveRedEye as RemoveRedEyeIcon,
} from "@material-ui/icons";

import { spacing, SpacingProps } from "@material-ui/system";
import * as Yup from "yup";
import {createProject} from "../store/project/slice";
import {Routes} from "../constants/links";
import TextField from "@material-ui/core/TextField";
import {Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {getStudents, getTeachers} from "../store/person/slice";
import {getAllTypes} from "../store/project-types/slice";
import {getSkills} from "../store/skill/slice";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

interface MuiChipSpacingType extends SpacingProps {
    paid?: boolean;
    sent?: boolean;
}

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

const Avatar = styled(MuiAvatar)`
  background: ${(props) => props.theme.palette.primary.main};
`;

const Customer = styled.div`
  display: flex;
  align-items: center;
`;

const Chip = styled(MuiChip)<{ rgbcolor: string }>`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`;

type RowType = {
    [key: string]: string | number;
    customer: string;
    customerEmail: string;
    id: string;
    projects: any;
    teacher: string;
};

function descendingComparator(a: RowType, b: RowType, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: "desc" | "asc", orderBy: string) {
    return order === "desc"
        ? (a: RowType, b: RowType) => descendingComparator(a, b, orderBy)
        : (a: RowType, b: RowType) => -descendingComparator(a, b, orderBy);
}

function stableSort(
    array: Array<RowType>,
    comparator: (a: RowType, b: RowType) => number
) {
    const stabilizedThis = array.map((el: RowType, index: number) => ({
        el,
        index,
    }));
    stabilizedThis.sort((a, b) => {
        const order = comparator(a.el, b.el);
        if (order !== 0) return order;
        return a.index - b.index;
    });
    return stabilizedThis.map((element) => element.el);
}

type HeadCell = {
    id: string;
    alignment: "left" | "center" | "right" | "justify" | "inherit" | undefined;
    label: string;
    disablePadding?: boolean;
};
const headCells: Array<HeadCell> = [
    { id: "lastName", alignment: "left", label: "Студент" },
    { id: "projects", alignment: "left", label: "Проекты" },
    { id: "progress", alignment: "left", label: "Прогресс" },
    { id: "teacher", alignment: "left", label: "Преподаватель" },
];

type EnhancedTableHeadPropsType = {
    numSelected: number;
    order: "desc" | "asc";
    orderBy: string;
    rowCount: number;
    onSelectAllClick: (e: any) => void;
    onRequestSort: (e: any, property: string) => void;
};
const EnhancedTableHead: React.FC<EnhancedTableHeadPropsType> = (props) => {
    const {
        order,
        orderBy,
        onRequestSort,
    } = props;
    const createSortHandler = (property: string) => (event: any) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell: HeadCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.alignment}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

type EnhancedTableToolbarPropsType = { numSelected: number };
const EnhancedTableToolbar = (props: EnhancedTableToolbarPropsType) => {
    const dispatch = useDispatch();
    const types = useSelector((state: RootState) => state.projectTypes.data);
    const skills = useSelector((state: RootState) => state.skill.data);
    const getData = () => {
        dispatch(getAllTypes());
        dispatch(getSkills());
    };

    useEffect(() => {
        getData()
    }, []);

    return (
        <Toolbar>
            <ToolbarTitle style={{width: '100%'}}>
                <Formik
                    initialValues={{
                        course: "",
                        type: "",
                        skill: "",
                    }}
                    onSubmit={async (values) => null}
                >
                    {({ errors, handleChange, handleSubmit, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit} style={{ width: "100%", display: 'flex', justifyContent: "space-between", alignItems: "flex-end" }}>
                            <FormControl fullWidth>
                                <FormHelperText>Группа</FormHelperText>
                                <Select
                                    variant="outlined"
                                    id="course"
                                    name="course"
                                    value={values.course}
                                    onChange={handleChange}
                                >
                                    {
                                        ["МОИАИС 174", "МОИАИС 164"].map((course: any) =>
                                            (
                                                <MenuItem key={course} value={course}>
                                                    {course}
                                                </MenuItem>
                                            ))
                                    }
                                </Select>
                            </FormControl>

                            <FormControl fullWidth style={{ marginLeft: 20 }}>
                                <FormHelperText>Тип проекта</FormHelperText>
                                <Select
                                    variant="outlined"
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

                            <FormControl fullWidth style={{ marginLeft: 20 }}>
                                <FormHelperText>Стэк</FormHelperText>
                                <Select
                                    variant="outlined"
                                    id="skill"
                                    name="skill"
                                    value={values.skill}
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
                                variant="contained"
                                color="primary"
                                style={{ height: 52, width: 150, marginLeft: 20 }}
                            >
                                Найти
                            </Button>
                        </form>
                    )}
                </Formik>
            </ToolbarTitle>
            <Spacer />
        </Toolbar>
    );
};

function EnhancedTable() {
    const dispatch = useDispatch();
    const [order, setOrder] = React.useState<"desc" | "asc">("asc");
    const [orderBy, setOrderBy] = React.useState("customer");
    const [selected, setSelected] = React.useState<Array<string>>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { students } = useSelector((state: RootState) => state.person);
    const getData = () => {
        dispatch(getStudents());
    };

    useEffect(() => {
        getData()
    }, []);

    const handleRequestSort = (event: any, property: string) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds: any = students.map((n: RowType) => n.uuid);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, students.length - page * rowsPerPage);

    return (
        <div>
            <Paper>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size={"medium"}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={students.length}
                        />
                        <TableBody>
                            {stableSort(students, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any, index: any) => {
                                    const isItemSelected = isSelected(row.uuid);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={`${row.uuid}-${index}`}
                                            selected={isItemSelected}
                                        >
                                            <TableCell component="th" id={labelId} scope="row" style={{ verticalAlign: 'top' }}>
                                                <Customer>
                                                    <Box ml={3}>
                                                        {row.lastName} {row.firstName} {row.surName}
                                                    </Box>
                                                </Customer>
                                            </TableCell>
                                            {/*<TableCell>{row.teacher}</TableCell>*/}
                                            <TableCell style={{ verticalAlign: 'top' }}>
                                                {
                                                    row.projects.map((project: any, key: number) =>
                                                        key <= 2 && <div key={key} style={{ padding: '5px 0' }}>
                                                            <Link component={NavLink} to={`/projects/${project.uuid}`}>{project.title}</Link>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    row.projects.length > 3 && <div style={{ marginTop: '20px' }}><Link style={{ color: '#fff' }}>Показать еще</Link></div>
                                                }
                                            </TableCell>
                                            <TableCell style={{ verticalAlign: 'top' }}>
                                                {
                                                    row.projects.map((project: any, key: number) => {
                                                        return key <= 2 && <div key={key} style={{ padding: '5px 0' }}>
                                                                {project.progress ? <Chip
                                                                        label={`${project.progress}%`}
                                                                        rgbcolor={project.progress === 100 ? green[500] : project.progress < 50 ? red[500] : orange[500]}/> :
                                                                    "Не начат"
                                                                }
                                                        </div>
                                                    })
                                                }
                                            </TableCell>
                                            <TableCell style={{ verticalAlign: 'top' }}>
                                                {
                                                    row.projects.map((project: any, key: number) =>
                                                        key <= 2 && <div key={key} style={{ padding: '5px 0' }}>{project.teacher ? `${project.teacher.lastName} ${project.teacher.firstName} ${project.teacher.surName}` : 'Не назначен'}</div>
                                                    )
                                                }
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={7} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={students.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    labelRowsPerPage="Кол-во строк на странице:"
                />
            </Paper>
        </div>
    );
}

function Statistics() {
    return (
        <>
            <Grid justify="space-between" container spacing={10}>
                <Grid item>
                    <Typography variant="h3" gutterBottom display="inline">
                        Статистика
                    </Typography>
                </Grid>
            </Grid>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <EnhancedTable />
                </Grid>
            </Grid>
        </>
    );
}

export default Statistics;
