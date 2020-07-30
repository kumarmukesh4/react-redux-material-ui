import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }),
);

function AppAlert(props: any) {
    const {alertMsg} = props;
    const classes = useStyles();
    console.log(alertMsg);
    return (
        <>
            <div className={classes.root}>
                {alertMsg.type === 'error' && <Alert severity="error">{alertMsg.msg}</Alert>}
                {alertMsg.type === 'info' && <Alert severity="info">{alertMsg.msg}</Alert>}
                {alertMsg.type === 'success' && <Alert severity="success">{alertMsg.msg}</Alert>}
            </div>
        </>
    )
}
export default AppAlert;
