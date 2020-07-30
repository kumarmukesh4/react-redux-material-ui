import React, {ChangeEvent, useState, useEffect} from 'react'
import axios from 'axios';
import { localStore } from '../../common/services';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { API_URL } from '../../common/config'
import './login.scss'
import Loader from '../../shared/loader/loader';


interface OtpState {
    otp1: string,
    otp2: string,
    otp3: string,
    otp4: string,
    otp5: string,
    otp6: string,
}

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
    const {goNextToReset, userId} = props;
    const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles();
    const [values, setValues] = React.useState<OtpState>({
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
        otp6: '',
    });

    const handleChange =  (event: ChangeEvent<any>) => {
        const eleName = event.target.name;
        setValues({
			...values,
			[eleName]: event.target.value
		})
    }

    const handleSubmit = (event: any) => {
        event?.preventDefault();
        setIsLoading(true);
        let enteredOtp = parseInt(Object.values(values).join(''))
        let url = API_URL['CHECK_OTP'];

        axios({
            method: 'post',
            url: url,
            data: {
                "id": userId, //"himanshunagpal25061992@gmail.com"
                "otp": enteredOtp
            }
        })
        .then((res) => {
            setIsLoading(false);
            const resData = res.data;
            if(resData.response === true) {
                goNextToReset()
            } else {
                setIsLoading(false);
            }
             
          }, (error) => {
            setIsLoading(false);
        });
    }
    

    return (
        <>
            {isLoading && (<Loader />)}
            <Typography component="h5" variant="h5">Forgot Password?</Typography>
            <Typography variant="subtitle1" color="textSecondary">Please enter your verification code</Typography>
            <Typography variant="subtitle1" color="textSecondary">We have sent a verifiation code to your registered email ID</Typography>

            <form id="formname" name="otpform" className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField id="otp1" 
                name="otp1"
                value={values.otp1}
                onChange={handleChange} />

            <TextField id="otp2" 
                name="otp2"
                value={values.otp2}
                onChange={handleChange} />
    
            <TextField id="otp3" 
                name="otp3"
                value={values.otp3}
                onChange={handleChange} />

            <TextField id="otp4" 
                name="otp4"
                value={values.otp4}
                onChange={handleChange} />

            <TextField id="otp5" 
                name="otp5"
                value={values.otp5}
                onChange={handleChange} />                

            <TextField id="otp6" 
                name="otp6"
                value={values.otp6}
                onChange={handleChange} />
            
            <ColorButton type="submit" variant="contained" color="primary" >Next</ColorButton>
            </form>
            <div className="link1 m-t-10" onClick={handleSubmit}>Resend Code</div>
        </>
    )
}

export default ForgotVerifyCode
