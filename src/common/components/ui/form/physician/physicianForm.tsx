import React, {useEffect, useState} from 'react'
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
import { useSelector, useDispatch } from 'react-redux'

import {Link, useHistory  } from 'react-router-dom'
import { localStore } from '../../../../services'

import {authSuccess} from '../../../../../store/action'


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
    password: string;
    showPassword: boolean;
}

function PhysicianForm(props: any) {
    let history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [isValidUsers, setisValidUsers] = useState(localStore.get('isValidUser'))

    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
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

    const validateForm = () => {
        console.log(history);
        //localStore.set('isValidUser', true);
        //history.push('/dashboard/patient');
        dispatch(authSuccess());
        // setisValidUsers(true);
    }

    useEffect(() => {
         
    }, [])

    return (
        <>
          <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Enter your Username" variant="outlined" />
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <ColorButton variant="contained" color="primary" onClick={validateForm}>Login</ColorButton>
                <div className="forgot-password">Forgot Your Password</div>
            </form>
        </>
    )
}

export default PhysicianForm
