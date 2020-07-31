import React, {useState, useEffect} from 'react'
import './login.scss'
import * as logo from '../../assets/images/logo.jpg'
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import AppTabs from '../../common/components/ui/tab/tab';
import ForgotPassword from './forgotPassword';
import ForgotVerifyCode from './forgotVerifyCode';
import ResetPassword from './resetPassword';
import Loader from '../../shared/loader/loader';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            width: '70%',
            margin: 'auto',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            height: '520px',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                position: 'relative'
            }
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            textAlign: 'center'
        },
        content: {
            flex: '1 0 auto',
            width: '100%'
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        playIcon: {
            height: 38,
            width: 38,
        },
    }),
);

const LoginFormState = {
    login: 'login',
    isForgot: 'forgot',
    isVerify: 'verify',
    isReset: 'reset'
}

function Login(props: any) {

    const classes = useStyles();
    const theme = useTheme();
    const isLoading = useSelector((state: any) => state.auth.loading);
    const [loignState, setLoginState] = useState(LoginFormState.login);

    const [userId, setUserId] = useState<number>();

    const goNextToVerify = (id: number) => {
        setUserId(id);
        setLoginState(LoginFormState.isVerify);
    }

    

    const goNextToReset = () => {
        console.log('IsReset');
        setLoginState(LoginFormState.isReset);
    }

    const backToLogin = () => {
        setLoginState(LoginFormState.login);
    }


    return (
        <>
            {isLoading && (<Loader />)}
            <Card className={classes.root}>
                <div className="login-wrapper">
                    <CardContent className={classes.content}>
                        <img className="login-logo" src={String(logo)} />
                        {/* <Typography component="h5" variant="h5">Live From Space</Typography>
                        <Typography variant="subtitle1" color="textSecondary">Mac Miller</Typography> */}
                        {
                            (loignState === LoginFormState.login && <AppTabs />) 
                        }
                        {
                            (loignState === LoginFormState.isForgot && <ForgotPassword backToLogin = {backToLogin} goNextToVerify = {goNextToVerify}  />)
                        }
                        {
                            (loignState === LoginFormState.isVerify && <ForgotVerifyCode userId ={userId} goNextToReset = {goNextToReset} />)
                        }
                        {
                            (loignState === LoginFormState.isReset && <ResetPassword userId ={userId} backToLogin = {backToLogin}  />)
                        }
                        {
                            (loignState === LoginFormState.login && <div className="link1" onClick={() => setLoginState(LoginFormState.isForgot)} style={{position: 'relative', top: '-14px'}}>Forgot Your Password</div>)
                        }
                        
                    </CardContent>
                </div>
                <CardMedia
                    className="cover">
                    <div className="cover-content">
                        <h3>Welcome to the HDC</h3>
                        <h6>Hollywood Diagnostics Center</h6>
                    </div>

                </CardMedia>
            </Card>

            {/* <div className="login-container">
                <div className="hdc-intro">
                    <h3>Welcome to the HDC</h3>
                    <h6>Hollywood Diagnostics Center</h6>
                </div>
                <div className="login-left">Login</div>
            </div> */}
        </>
    )
}

export default Login