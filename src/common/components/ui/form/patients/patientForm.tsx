import React, { useEffect, useState, ChangeEvent } from 'react'
import clsx from 'clsx';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import Alert from '@material-ui/lab/Alert';
import { Link, useHistory } from 'react-router-dom'
import { localStore } from '../../../../services'

import { auth } from '../../../../../store/action'
import AppAlert from '../../alert/appAlert';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '90%',
            },
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        label: {
            fontSize: 'auto'
        },
        textField: {
            width: '90%',
        },
    }),
);

const ColorButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText('#192d3e'),
        backgroundColor: '#192d3e',
        '&:hover': {
            backgroundColor: '#192d3e',
        },
    },
}))(Button);

interface State {
    userName: string;
    password: string;
    showPassword: boolean;
}

interface Errors {
    userName: string;
    password: string;
}


function PatientForm(props: any) {
    let history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const isUserExist = useSelector((state: any) => state.auth.userInfo);
    const [isValidUsers, setisValidUsers] = useState(true);
    let [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    let [isFormValid, setIsFormValid] = useState<boolean>(true);
    let alertMsg = {
        type: '',
        msg: ''
    }
    const [alertData, setAlertData] = useState(alertMsg);

    const [values, setValues] = React.useState<State>({
        userName: '',
        password: '',
        showPassword: false,
    });

    const [errors, setErrors] = React.useState<Errors>({
        userName: '',
        password: '',
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleOnBlur = (event: ChangeEvent<any>) => {
        let formInputVal = event.target.value.trim();
        let inputName = event.target.name;
        switch (inputName) {
            case 'userName':
                if (formInputVal === '') {
                    setErrors({
                        ...errors,
                        [inputName]: 'Please enter your email id or mobile number'
                    })
                } else {
                    setErrors({
                        ...errors,
                        [inputName]: ''
                    })
                }
                break;
            case 'password':
                if (formInputVal === '') {
                    setErrors({
                        ...errors,
                        [inputName]: 'Please enter your password'
                    })
                } else {
                    setErrors({
                        ...errors,
                        [inputName]: ''
                    })
                }
                break;
        }
        let checkforError = checkforErrors(errors);
        let checkforFormValNull = checkForFormInputNull(values);
        let isValid = (checkforError && checkforFormValNull) ? true : false;
        setIsFormValid(!isValid);
    }

    const checkforErrors = (errors: any) => {
        let valid = true;
        Object.values(errors).forEach((val: any) => {
            val.length > 0 && (valid = false);
        })
        console.log("from CheckforError" + valid);
        return valid;
    }

    const checkForFormInputNull = (data: any) => {
        let filled = true;
        Object.values(data).forEach(val => {
            val === '' && (filled = false);
        })
        console.log("from checkForFormInputNull" + filled);
        return filled;
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        dispatch(auth(values));
    }

    useEffect(() => {
        if (isUserExist && !isUserExist['isUserInvalid']) {
            setisValidUsers(isUserExist['isUserInvalid']);
            setAlertData({
                type: 'error',
                msg: isUserExist['msg'] || ''
            })
        }

    }, [isUserExist])

    return (
        <>
            {isUserExist && !isUserExist['isUserInvalid'] && <AppAlert alertMsg={alertData} />}
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <div style={{ position: 'relative', display: 'inline-flex' }}>
                    <TextField
                        style={{ width: '100%' }}
                        className="login-input"
                        name="userName"
                        value={values.userName}
                        error={errors.userName !== ''}
                        onChange={handleChange('userName')}
                        id="outlined-error-helper-text"
                        label="Email or Mobile Number "
                        helperText={errors.userName}
                        onBlur={handleOnBlur}
                        variant="outlined" />
                    <PersonIcon style={{ color: 'rgb(0, 0, 0, 0.50)', position: 'absolute', fontSize: '30px', right: '14px', top: '12px', margin: 'auto' }} />
                </div>

                <div style={{ position: 'relative', display: 'inline-flex' }}>
                    <TextField
                        style={{ width: '100%' }}
                        className="login-input"
                        name="password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        error={errors.password !== ''}
                        onChange={handleChange('password')}
                        id="outlined-passwprd-helper-text"
                        label="Password "
                        helperText={errors.password}
                        onBlur={handleOnBlur}
                        variant="outlined" />
                    <IconButton
                        style={{ color: 'rgb(0, 0, 0, 0.50)', position: 'absolute', fontSize: '30px', right: '2px', top: '4px', margin: 'auto' }}
                        aria-label="toggle password visibility"
                        disableFocusRipple={true}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end">
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </div>
                <ColorButton type="submit" disabled={isFormValid} variant="contained" color="primary">Login</ColorButton>
            </form>
        </>
    )
}

export default PatientForm
