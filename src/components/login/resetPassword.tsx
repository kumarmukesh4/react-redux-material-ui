import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import axios from 'axios';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Link, useHistory } from 'react-router-dom'
import AppAlert from '../../common/components/ui/alert/appAlert';
import { API_URL } from '../../common/config';
import Loader from '../../shared/loader/loader';


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
    repassword: string;
    showRepasssword: boolean
}

function ResetPassword(props: any) {
    const {userId, backToLogin} = props;
    let history = useHistory();
    const classes = useStyles();
    let alertMsg = {
        type: '',
        msg: ''
    }
    const [isLoading, setIsLoading] = useState(false);
    const [alertData, setAlertData] = useState(alertMsg);
    const [isMatch, setIsMatch] = useState(true);
    const [isPasswordSave, setIsPasswordSave] = useState(false);
    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
        repassword: '',
        showRepasssword: false
    });

  

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleClickReShowPassword = () => {
        setValues({ ...values, showRepasssword: !values.showRepasssword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = (event: any) => {
        event?.preventDefault();
        setIsLoading(true);
        let url = API_URL['SAVE_RESET_PASSWORD'];
        if (values.password !== values.repassword) {
            setIsLoading(false);
            setIsMatch(false);
            setAlertData({
                type: 'error',
                msg: 'Password does not match'
            })
        } else {
            setIsMatch(false);
            
            axios({
                method: 'post',
                url: url,
                data: {
                    "patient_id": userId, 
                    "password": values.password
                }
            })
            .then((res) => {
                setIsLoading(false);
                setAlertData({
                    type: 'success',
                    msg: res.data.message
                })
                setIsPasswordSave(true);
                setValues({
                    password: '',
                    showPassword: false,
                    repassword: '',
                    showRepasssword: false
                })
            }, (error) => {
                setIsLoading(false);
                setIsPasswordSave(false);
            });
        }
         
    }

    return (
        <>
            {isLoading && (<Loader />)}
            <Typography component="h5" variant="h5">Forgot Password?</Typography>
            <Typography variant="subtitle1" color="textSecondary">Please enter your new password.</Typography>
            { !isMatch && <AppAlert alertMsg = {alertData}  /> }
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="new-password">New Password</InputLabel>
                    <OutlinedInput
                        id="new-password"
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
                        labelWidth={115}
                    />
                </FormControl>

                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="re-enter-password">Re-enter Password</InputLabel>
                    <OutlinedInput
                        id="re-enter-password"
                        type={values.showRepasssword ? 'text' : 'password'}
                        value={values.repassword}
                        onChange={handleChange('repassword')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickReShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showRepasssword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={135}
                    />
                </FormControl>

                <ColorButton type="submit" variant="contained" color="primary">Change Password</ColorButton>

            </form>
            {isPasswordSave && <div className="link1 m-t-10" onClick={backToLogin}>Re-Login</div>}
        </>
    )
}

export default ResetPassword