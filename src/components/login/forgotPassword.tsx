import React from 'react'
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

    const [values, setValues] = React.useState<State>({
        userName: ''
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    }

    const validateForm = () => {
    }

    return (
        <>
            <Typography component="h5" variant="h5">Forgot Password?</Typography>
            <Typography variant="subtitle1" color="textSecondary">Please enter your registered email ID.</Typography>
            <Typography variant="subtitle1" color="textSecondary">We will send a verification code to your registered email ID</Typography>

            <form className={classes.root} noValidate autoComplete="off">
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
                <ColorButton variant="contained" color="primary" onClick={goNextToVerify()}>Next</ColorButton>
            </form>
        </>
    )
}
export default ForgotPassword