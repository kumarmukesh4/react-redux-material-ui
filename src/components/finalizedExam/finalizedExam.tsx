import React from 'react';
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

 

import './finalizedExam.scss';

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

function FinalizedExam(props: any) {
    const { finalizedExamData } = props; 
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
                    <table className="finalized-exam-tbl">
                        <tr>
                            <td>
                                <div className="finalized-heading">Exam</div>
                                <span className="finalized-data">{finalizedExamData.exam}</span>
                            </td>
                            <td colSpan={2}>
                                <div className="finalized-heading">Schedule Date</div>
                                <span className="finalized-data">{finalizedExamData.schduleDate}</span>
                                 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="finalized-heading">Modality</div>
                                <span className="finalized-data">{finalizedExamData.modality}</span> 
                            </td>
                            <td>
                                <div className="finalized-heading">Ref.</div>
                                <span className="finalized-data">{finalizedExamData.ref}</span>
                            </td>
                            <td>
                                <div className="finalized-heading">Acc Number</div>
                                <span className="finalized-data">{finalizedExamData.acctNumber}</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className="finalized-heading">Status: <ColorButtonAction variant="contained" color="primary">Red Final Report</ColorButtonAction></div>
                            </td>
                            <td>
                                <ColorButtonAction variant="contained" color="primary">Report</ColorButtonAction>
                            </td>
                        </tr>
                    </table>
                </CardContent>
            </Card>
        </>
    )
}

export default FinalizedExam