import React from 'react'
import { Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

import './cancelledExam.scss'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function CancelledExam(props: any) {
    const { cancelledExamData } = props;
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const ColorButtonAction = withStyles((theme: Theme) => ({
        root: {
            color: '#fff',
            backgroundColor: '#3f51b5',
            '&:hover': {
                backgroundColor: '#3f51b5',
            },
            fontSize: '11px'
        },
    }))(Button);

    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <table className="cancelled-exam-tbl">
                        <tr>
                            <td>
                                <div className="cancelled-heading">Schedule Date</div>
                                <span className="cancelled-data">{cancelledExamData.schduleDate}</span>

                            </td>
                            <td>
                                <div className="cancelled-heading">Modality</div>
                                <span className="cancelled-data">{cancelledExamData.modality}</span>
                            </td>
                            <td>

                                <div className="cancelled-heading">Exam</div>
                                <span className="cancelled-data">{cancelledExamData.exam}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <div className="cancelled-heading">Ref.</div>
                                <span className="cancelled-data">{cancelledExamData.ref}</span>
                            </td>
                            <td>
                                <div className="cancelled-heading">Acc Number</div>
                                <span className="cancelled-data">{cancelledExamData.acctNumber}</span>
                            </td>
                            <td>
                                <div className="cancelled-heading">Status</div>
                                <span className="cancelled-data">{cancelledExamData.status}</span>
                            </td>
                        </tr>
                        
                    </table>
                </CardContent>
            </Card>
        </>
    )
}

export default CancelledExam