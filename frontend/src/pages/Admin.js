import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {Box, Divider as MuiDivider, Tab, Tabs, Typography as MuiTypography} from "@material-ui/core";
import {spacing} from "@material-ui/system";
import styled from "styled-components/macro";
import Types from "./admin/Types";

const Typography = styled(MuiTypography)(spacing);

const Divider = styled(MuiDivider)(spacing);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {
                value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )
            }
        </div>
    )
}

function Admin() {
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue)
    };

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h3" gutterBottom display="inline">
                    Администрирование
                </Typography>
            </Box>

            <Divider my={6} />

            <Tabs value={value} onChange={handleChange}>
                <Tab label="Типы и этапы" />
            </Tabs>

            <TabPanel value={value} index={0}>
                <Types />
            </TabPanel>
        </>
    );
}

export default Admin;