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


function PhysicianForm(props: any) {
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
                        [inputName]: 'User Name required'
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
                        [inputName]: 'Password required'
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
        return valid;
    }

    const checkForFormInputNull = (data: any) => {
        let filled = true;
        Object.values(data).forEach(val => {
            val === '' && (filled = false);
        })
        return filled;
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(history);
        //localStore.set('isValidUser', true);
        //history.push('/dashboard/patient');
        dispatch(auth(values));
        // dispatch(auth(token));
        // setisValidUsers(true);
    }

    useEffect(() => {
        if(isUserExist && !isUserExist['isUserInvalid']) {
            setisValidUsers(isUserExist['isUserInvalid']);
            setAlertData({
                type: 'error',
                msg: isUserExist['msg'] || ''
            })
        }
      
    }, [isUserExist])

    // const showUserError = (
    //     isValidUsers === false ?  <Alert severity="error" style={{padding: '0 15px'}}>Email Id or Phone does not exist!</Alert> : ''
    // )

    return (
        <>
            {/* {showUserError} */}

            { isUserExist && !isUserExist['isUserInvalid'] && <AppAlert alertMsg = {alertData}  /> }

            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel className={classes.label} htmlFor="outlined-adornment-password">Email or Mobile Number</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type="text"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange('userName')}
                        onBlur={handleOnBlur}
                        required={true}
                        endAdornment={
                            <InputAdornment position="end">
                                <PersonIcon style={{ color: '#838383', fontSize: '30px' }} />
                            </InputAdornment>
                        }
                        labelWidth={190}
                    />
                    <span style={{fontSize: '11px', position: 'absolute', left: 0, bottom: '-15px', color: 'red'}}>{errors['userName']}</span>
                </FormControl>

                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel className={classes.label} htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        name="password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        onBlur={handleOnBlur}
                        label={errors["password"]}
                        required={true}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end">
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={50}
                    />
                    <span style={{fontSize: '11px', position: 'absolute', left: 0, bottom: '-15px', color: 'red'}}>{errors['password']}</span>
                </FormControl>
                <ColorButton type="submit" disabled={isFormValid} variant="contained" color="primary">Login</ColorButton>
            </form>
        </>
    )
}

export default PhysicianForm
