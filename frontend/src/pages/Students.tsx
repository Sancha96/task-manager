import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import {
    Avatar as MuiAvatar,
    Box,
    Breadcrumbs as MuiBreadcrumbs,
    Button,
    Checkbox,
    Chip as MuiChip,
    Divider as MuiDivider, FormControlLabel,
    Grid,
    IconButton,
    Link,
    Paper as MuiPaper,
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

import { green, orange } from "@material-ui/core/colors";

import {
    Add as AddIcon,
    Archive as ArchiveIcon,
    FilterList as FilterListIcon,
    RemoveRedEye as RemoveRedEyeIcon,
} from "@material-ui/icons";

import { spacing, SpacingProps } from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

interface MuiChipSpacingType extends SpacingProps {
    paid?: boolean;
    sent?: boolean;
}
const Chip = styled(MuiChip)<MuiChipSpacingType>`
  ${spacing};

  background: ${(props) => props.paid && green[500]};
  background: ${(props) => props.sent && orange[700]};
  color: ${(props) =>
    (props.paid || props.sent) && props.theme.palette.common.white};
`;

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

function createData(
    customer: string,
    customerEmail: string,
    customerAvatar: string,
    id: string,
    theme: string,
    teacher: string,
) {
    return { customer, customerEmail, customerAvatar, id, theme, teacher };
}

type RowType = {
    [key: string]: string | number;
    customer: string;
    customerEmail: string;
    customerAvatar: string;
    id: string;
    theme: string;
    teacher: string;
};
const rows: Array<RowType> = [
    createData(
        "Андреев Александр Алексеевич",
        "test@test.test",
        "A",
        "000112",
        "Построение табулатуры для гитары на основе обработки аудиозаписи",
        "Ступников А.А",
    ),
    createData(
        "Бабин Евгений Геннадьевич",
        "test@test.test",
        "E",
        "000114",
        "Разработка приложения для анализа тренировочного процесса в пулевой стрельбе",
        "Ромазанов А.Р.",
    ),
    createData(
        "Беженарь Александр Васильевич",
        "test@test.test",
        "A",
        "000117",
        "Разработка прототипа системы эвакуации из здания",
        "Донкова И.А.",
    ),
    createData(
        "Бекасов Никита Александрович",
        "test@test.test",
        "N",
        "000115",
        "Разработка сервиса для контроля за соблюдением графиков и схем маршрутов дорожного транспорта",
        "Гаврилова Н.М.",
    ),
];

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
    { id: "customer", alignment: "left", label: "Студент" },
    { id: "theme", alignment: "left", label: "Тема" },
    { id: "actions", alignment: "right", label: "Действия" },
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
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property: string) => (event: any) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all" }}
                    />
                </TableCell>
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
    const { numSelected } = props;

    return (
        <Toolbar>
            <ToolbarTitle>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} выбрано
                    </Typography>
                ) : (
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Мои студенты"
                    />
                )}
            </ToolbarTitle>
            <Spacer />
            <div>
                {numSelected > 0 && (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <ArchiveIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

function EnhancedTable() {
    const [order, setOrder] = React.useState<"desc" | "asc">("asc");
    const [orderBy, setOrderBy] = React.useState("customer");
    const [selected, setSelected] = React.useState<Array<string>>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event: any, property: string) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds: Array<string> = rows.map((n: RowType) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: string
    ) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: Array<string> = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
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
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={`${row.id}-${index}`}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ "aria-labelledby": labelId }}
                                                    onClick={(event) => handleClick(event, row.id)}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row">
                                                <Customer>
                                                    <Avatar>{row.customerAvatar}</Avatar>
                                                    <Box ml={3}>
                                                        {row.customer}
                                                        <br />
                                                        {row.customerEmail}
                                                    </Box>
                                                </Customer>
                                            </TableCell>
                                            <TableCell>{row.teacher}</TableCell>
                                            <TableCell>{row.theme}</TableCell>
                                            <TableCell align="right">
                                                <IconButton aria-label="delete">
                                                    <ArchiveIcon />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="details"
                                                    component={NavLink}
                                                    to="/students/1"
                                                >
                                                    <RemoveRedEyeIcon />
                                                </IconButton>
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
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

function Students() {
    return (
        <React.Fragment>
            <Grid justify="space-between" container spacing={10}>
                <Grid item>
                    <Typography variant="h3" gutterBottom display="inline">
                        Студенты
                    </Typography>

                    <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                        <Link component={NavLink} exact to="/">
                            Главная
                        </Link>
                        <Typography>Студенты</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item>
                    <div>
                        <Button variant="contained" color="primary">
                            <AddIcon />
                            Добавить
                        </Button>
                    </div>
                </Grid>
            </Grid>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <EnhancedTable />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Students;
