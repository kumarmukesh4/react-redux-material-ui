import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    month: {
        fontSize: 27,
        textAlign: 'center',
    },
    date: {
        fontSize: 80,
        textAlign: 'center',
    },
    year: {
        fontSize: 27,
        textAlign: 'center',
    }
});

function DateTime() {

    const classes = useStyles();

    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.month} color="textSecondary" gutterBottom>
                        July
                     </Typography>
                    <Typography className={classes.date} variant="h5" component="h2" color="textSecondary">
                        26
                    </Typography>
                    <Typography className={classes.year} color="textSecondary">
                        2020
                    </Typography>
                    
                </CardContent>
            </Card>
        </>
    )
}

export default DateTime
