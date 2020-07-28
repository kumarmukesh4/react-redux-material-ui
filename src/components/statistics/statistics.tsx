import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './statistics.scss'

const useStyles = makeStyles({
    root: {
        maxWidth: '100%'
    }
});


function Statistics(props: any) {
    const {statistic, activateTab} = props;
    console.log(statistic);
    const classes = useStyles();
    console.log(statistic.pos);
    let pos = statistic.pos;
    return (
        <>
            <Card className='card-container' onClick={activateTab} data-attr={pos}>
                <CardActionArea>
                    <CardContent>
                        <Typography className='card-heading' gutterBottom variant="h5" component="h2">
                            {statistic.title}
                    </Typography>
                    <Typography className='count' variant="body2" color="textSecondary" component="p">
                        <span style={{color: statistic.color}}>{statistic.count}</span>
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}

export default Statistics
