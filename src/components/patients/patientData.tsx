import React from 'react';
import { Theme, createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Tooltip } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%', 
        },
        heading: {
            fontSize: theme.typography.pxToRem(12),
            paddingTop: '3px'
        },
        modality: {
            backgroundColor: '#61dafb',
            padding: '3px 20px',
            borderRadius: '3px',
            fontSize: '12px',
            textAlign: 'center'
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        icon: {
            verticalAlign: 'bottom',
            height: 20,
            width: 20,
        },
        details: {
            alignItems: 'center',
            padding: '0px 16px 16px',
            position: 'relative',
            top: '-8px'
        },
        column: {
            flexBasis: '100%',
        },
        helper: {
            borderLeft: `2px solid ${theme.palette.divider}`,
            padding: theme.spacing(1, 2),
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
            },
        }
    }),
);



function PatientData(props: any) {
    const { appointmentData, opendialog } = props;
    const classes = useStyles();

    const ColorButton = withStyles((theme: Theme) => ({
        root: {
          color: theme.palette.getContrastText('#61dafb'),
          backgroundColor: '#61dafb',
          '&:hover': {
            backgroundColor: '#61dafb',
          },
        },
      }))(Button);

    const ColorButtonAction = withStyles((theme: Theme) => ({
        root: {
          color: '#fff',
          backgroundColor: '#3f51b5',
          '&:hover': {
            backgroundColor: '#3f51b5',
          },
        },
      }))(Button);

    return (
        <>

            <ExpansionPanel defaultExpanded ={false}  >
                <ExpansionPanelSummary 
                    expandIcon={<ExpandMoreIcon  />}
                    aria-controls="panel1c-content"
                    id="panel1c-header">
                    <div className={classes.column}>
                        <div className="date-row">
                          <span className="date-txt">
                             <span>Date:</span> {appointmentData.date}
                          </span>
                          <span className="time-txt">
                           <span>Time:</span> {appointmentData.time}
                          </span>
                        </div>
                        <div className="column-row three-column">
                            <div className="col">
                                <Typography className={classes.modality}>{appointmentData.modality} </Typography>
                            </div>
                            <div className="col">
                                 <Typography className={classes.heading}><strong>{appointmentData.exam}</strong></Typography>
                            </div>
                            <div className="col">
                                <Tooltip title="Complete Paperwork"><PostAddIcon className="cursor-p icons"  /></Tooltip> 
                                <Tooltip title="Upload Document"><CloudUploadIcon className="cursor-p icons" /></Tooltip> 
                                <Tooltip title="View Document"><VisibilityIcon className="cursor-p icons" /></Tooltip>
                            </div>    
                        </div>
                    </div>
                   
                </ExpansionPanelSummary>
                
                <ExpansionPanelDetails className={classes.details}>
                    <div className="location-row"><LocationOnIcon />  Location: {appointmentData.location}</div>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions className="button-row">
                    <ColorButtonAction variant="contained" color="primary" onClick={() => opendialog('paperwork')}>Complete Paperwork</ColorButtonAction>
                    <ColorButtonAction variant="contained" color="primary" onClick={() => opendialog('upload')}>Upload Documents</ColorButtonAction>
                    <ColorButtonAction variant="contained" color="primary" onClick={() => opendialog('view')}>View Documents</ColorButtonAction>
                </ExpansionPanelActions>
            </ExpansionPanel>

        </>
    )
}

export default PatientData
