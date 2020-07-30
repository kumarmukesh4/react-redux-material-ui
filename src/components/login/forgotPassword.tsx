import React, {useState} from 'react'
import axios from 'axios';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './login.scss'
import AppAlert from '../../common/components/ui/alert/appAlert';
import { API_URL } from '../../common/config'
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
        textField: {
            width: '90%',
        },
        subheading: {
            fontSize: '14px'
        }
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
}

function ForgotPassword(props: any) {
    const classes = useStyles();
    const {goNextToVerify} = props;

    let alertMsg = {
        type: '',
        msg: ''
    }

    const [isLoading, setIsLoading] = useState(false);
    const [alertData, setAlertData] = useState(alertMsg);

    const [isInValid, setIsInValid] = useState(false);

    const [values, setValues] = React.useState<State>({
        userName: ''
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    }

   
    let userid = '';
    const handleSubmit = (event: any) => {
        event?.preventDefault();
        setIsLoading(true);
        let url = API_URL['FORGOT_PASSWORD'];
        
        axios({
            method: 'post',
            url: url,
            data: {
                "email": values.userName //"himanshunagpal25061992@gmail.com"
            }
        })
        .then((res) => {
            setIsLoading(false);
            const resData = res.data;
            if(resData.response === true) {
                userid = resData.data;
                goNextToVerify(userid);
            } else {
                setIsLoading(false);
                setAlertData({
                    type: 'error',
                    msg: resData.message
                })
                setIsInValid(true);
            }
             
          }, (error) => {
            setIsLoading(false);
            console.log(error);
        });
         
    }

    return (
        <>
            {isLoading && (<Loader />)}
            <Typography component="h5" variant="h5">Forgot Password?</Typography>
            <Typography className={classes.subheading} variant="subtitle1" color="textSecondary">Please enter your registered email ID.</Typography>
            <Typography className={classes.subheading} variant="subtitle1" color="textSecondary">We will send a verification code to your registered email ID</Typography>
            { isInValid && <AppAlert alertMsg = {alertData}  /> }
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="emailmobile">Email or Mobile</InputLabel>
                    <OutlinedInput
                        id="emailmobile"
                        type="text"
                        value={values.userName}
                        onChange={handleChange('userName')}
                        endAdornment={
                            <InputAdornment position="end">
                                <PersonIcon style={{ color: '#838383', fontSize: '30px' }} />
                            </InputAdornment>
                        }
                        labelWidth={150}
                    />
                </FormControl>
                <ColorButton type="submit" variant="contained" color="primary">Next</ColorButton>
            </form>
        </>
    )
}
export default ForgotPassword