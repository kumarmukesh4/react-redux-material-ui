import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import './loader.scss';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '200px',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
        heading: {
            textAlign: 'center',
            height: '15px',
            color: '#61dafb'
        }
    }),
);

function ProgressBar() {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
            <Typography variant="h6" component="h2" className={classes.heading}>Loading</Typography>
                <LinearProgress color="primary" style= {{backgroundColor: 'rgba(97, 218, 251, 0.40)'}}/>
            </div>
        </>
    )
}

export default ProgressBar