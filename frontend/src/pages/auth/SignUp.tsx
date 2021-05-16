import React, {FC, useEffect, useRef} from 'react';
import * as Yup from "yup";
import { Formik } from "formik";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../../store";
import { useHistory } from 'react-router-dom';
import {Routes} from "../../constants/links";
import {register} from "../../store/user/slice";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const useComponentWillMount = (func: () => void) => {
        const willMount = useRef(true);

        if (willMount.current) {
            func();
        }

        willMount.current = false;
    };

    const { data, isLoading, error } = useSelector((state: RootState) => state.auth);

    const checkUserDataLength = () => {
        data && !!Object.keys(data).length && history.push(Routes.Projects);
    };

    useComponentWillMount(checkUserDataLength);

    useEffect(() => {
        checkUserDataLength();
    }, [data]);

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <Formik
                        initialValues={{
                            email: "admin",
                            password: "admin",
                            error: "",
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().required("Это обязательное поле"),
                            password: Yup.string().required("Это обязательное поле"),
                        })}
                        onSubmit={async (values) => {
                            await dispatch(register(values.email, values.password));
                        }}
                    >
                        {({ errors, handleChange, handleSubmit, touched, values }) => (
                            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    onChange={handleChange}
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Пароль"
                                    type="password"
                                    id="password"
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                />

                                <p>{error}</p>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Зарегистрироваться
                                </Button>
                                <Box mt={5}>
                                    <Copyright />
                                </Box>
                            </form>
                        )}
                    </Formik>
                </div>
            </Grid>
        </Grid>
    );
}

export default SignIn