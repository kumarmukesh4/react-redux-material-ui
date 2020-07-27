import React from 'react'
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './login.scss'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '22px'
            },
        },
    }),
);

const ColorButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText('#192d3e'),
        backgroundColor: '#192d3e',
        width: '55%',
        marginTop: '30px',
        '&:hover': {
            backgroundColor: '#192d3e',
        },
    },
}))(Button);


function ForgotVerifyCode(props: any) {
    const {goNextToReset} = props;
    const classes = useStyles();

    return (
        <>
            <Typography component="h5" variant="h5">Forgot Password?</Typography>
            <Typography variant="subtitle1" color="textSecondary">Please enter your verification code</Typography>
            <Typography variant="subtitle1" color="textSecondary">We have sent a verifiation code to your registered email ID</Typography>

            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="code1" />
                <TextField id="code2" />
                <TextField id="code3" />
                <TextField id="code4" />
                <TextField id="code5" />
                <TextField id="code6" />
            </form>
            <ColorButton variant="contained" color="primary" onClick={goNextToReset()}>Next</ColorButton>

            <div className="link1 m-t-20">Resend Code</div>
        </>
    )
}

export default ForgotVerifyCode
