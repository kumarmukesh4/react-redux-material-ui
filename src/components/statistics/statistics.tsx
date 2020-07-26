import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
        margin: '10px 0'
    },
    heading: {
        fontWeight: 500,
        textTransform: 'uppercase',
        fontSize: '15px',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    count: {
        fontSize: '70px',
        color: '#000'
    }
});


function Statistics(props: any) {
    const {statistic} = props;
    console.log(statistic);
    const classes = useStyles();
    return (
        <>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent>
                        <Typography className={classes.heading} gutterBottom variant="h5" component="h2">
                            {statistic.title}
                    </Typography>
                    <Typography className={classes.count} variant="body2" color="textSecondary" component="p">
                        <span style={{color: statistic.color}}>{statistic.count}</span>
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}

export default Statistics
