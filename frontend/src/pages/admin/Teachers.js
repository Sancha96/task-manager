import React, {useEffect} from "react";

import {
    Box, Button, Input, Link, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow,
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getTeachers} from "../../store/person/slice";
import styled from "styled-components/macro";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const Customer = styled.div`
  display: flex;
  align-items: center;
`;

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(
    array,
    comparator
) {
    const stabilizedThis = array.map((el, index) => ({
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

export function join(t, s) {
    const date = new Date(t);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}

function Teachers() {
    const dispatch = useDispatch();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("customer");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { teachers = [] } = useSelector((state) => state.person);

    useEffect(() => {
        dispatch(getTeachers());
    }, []);

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, teachers?.length - page * rowsPerPage);

    return (
        <Paper>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                <Input placeholder="Поиск по ФИО" />
                <Button type="primary">Создать</Button>
            </div>
            <TableContainer>
                <Table
                    aria-labelledby="tableTitle"
                    size={"medium"}
                    aria-label="enhanced table"
                >
                    <TableBody>
                        {stableSort(teachers, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={`${row.uuid}-${index}`}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" style={{ verticalAlign: 'top' }}>
                                            <Customer>
                                                <Box ml={3}>
                                                    {row.lastName} {row.firstName} {row.surName}
                                                </Box>
                                            </Customer>
                                        </TableCell>
                                        <TableCell style={{ verticalAlign: 'top' }}>
                                            {!Number(row.gender) ? 'Ж' : 'М'}
                                        </TableCell>
                                        <TableCell style={{ verticalAlign: 'top' }}>
                                            {
                                                row.birthDate && join(row.birthDate)
                                            }
                                        </TableCell>
                                        <TableCell style={{ verticalAlign: 'top' }}>
                                            {row.course}
                                        </TableCell>
                                        <TableCell style={{ verticalAlign: 'top' }}>
                                            <div>
                                                <EditIcon />
                                                <DeleteForeverIcon />
                                            </div>
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
                count={teachers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage="Кол-во строк на странице:"
            />
        </Paper>
    );
}

export default Teachers;
