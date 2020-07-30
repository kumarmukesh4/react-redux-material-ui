import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, Theme, MuiThemeProvider, createMuiTheme, createStyles } from '@material-ui/core/styles';
import StylesProvider from '@material-ui/styles/StylesProvider';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './tabContainer.scss'
import Statistics from '../../../../components/statistics/statistics';
import PatientData from '../../../../components/patients/patientData';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FinalizedExam from '../../../../components/finalizedExam/finalizedExam';

import DateTime from '../date-time/dateTime';
import CancelledExam from '../../../../components/cancelledExam/cancelledExam';
import Fallback from '../fallback/fallback';
import Loader from '../../../../shared/loader/loader';


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={0}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'transparent',
    },
    label: {
        textTransform: 'none'
    },
    statiscs: {
        width: '31%',
        '@media(max-width: 600px)': {
            width: '100%'
        }
    },
    tabs: {
        '@media(max-width: 600px)': {
            display: 'none'
        }
    }
}));

const useStyles2 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'inline-flex',
            alignItems: 'right',
            width: '98%',
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);

const theme = createMuiTheme({
    overrides: {
        MuiGrid: {
            item: {
                backgroundColor: 'transparent',
            },
            'grid-xs-1': {
                '@media (min-width:1490px)': {
                    maxWidth: '32%!important',
                    flexBasis: '32% !important',
                },
                '@media (max-width:600px)': {
                    maxWidth: '100%!important',
                    flexBasis: '100% !important',
                    margin: 0
                }
            },
        },
    },
});

function TabContainer() {
    const APPOINTMENT_LIST = useSelector((state: any) => state.appointment.appointmentList);
    const classes = useStyles();
    const classes2 = useStyles2();
    const [value, setValue] = React.useState(0);
    const isLoading = useSelector((state: any) => state.appointment.loading);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const statisticData = [
        {
            pos: 0,
            title: 'Upcoming Appointments',
            count: 6,
            color: '#2196f3'
        },
        {
            pos: 1,
            title: 'Finalized Exams',
            count: 6,
            color: '#4caf50'
        },
        {
            pos: 2,
            title: 'Canceled & No show Exams',
            count: 15,
            color: '#f44336'
        }
    ]
    
    const finalizedExamData = [
        {
            exam: 'New Exam',
            schduleDate: '10-13-2016',
            modality: 'XRAY',
            ref: 'ITPACSPRO',
            acctNumber: 84310
        },
        {
            exam: 'Middle Exam',
            schduleDate: '10-13-2016',
            modality: 'XRAY',
            ref: 'ITPACSPRO',
            acctNumber: 84310
        },
        {
            exam: 'Fianal Exam',
            schduleDate: '10-13-2016',
            modality: 'XRAY',
            ref: 'ITPACSPRO',
            acctNumber: 84310
        },
        {
            exam: 'Semi Exam',
            schduleDate: '10-13-2016',
            modality: 'XRAY',
            ref: 'ITPACSPRO',
            acctNumber: 84310
        },
        {
            exam: 'Semi Exam',
            schduleDate: '10-13-2016',
            modality: 'XRAY',
            ref: 'ITPACSPRO',
            acctNumber: 84310
        },
        {
            exam: 'Semi Exam',
            schduleDate: '10-13-2016',
            modality: 'XRAY',
            ref: 'ITPACSPRO',
            acctNumber: 84310
        }
    ]

    const cancelledExamData = [
        {
            exam: 'New Exam',
            schduleDate: '10-13-2016',
            modality: 'XRAY',
            ref: 'ITPACSPRO',
            acctNumber: 84310,
            status: 'Cancelled'
        },
        {
            exam: 'Middle Exam',
            schduleDate: '10-13-2016',
            modality: 'XRAY',
            ref: 'ITPACSPRO',
            acctNumber: 84310,
            status: 'Cancelled'
        },
        {
            exam: 'Fianal Exam',
            schduleDate: '10-13-2016',
            modality: 'XRAY',
            ref: 'ITPACSPRO',
            acctNumber: 84310,
            status: 'Cancelled'
        },
        {
            exam: 'Semi Exam',
            schduleDate: '10-13-2016',
            modality: 'XRAY',
            ref: 'ITPACSPRO',
            acctNumber: 84310,
            status: 'Cancelled'
        }
    ]

    const activateParentTab = (event: any) => {
        let num =  Number(event.currentTarget.getAttribute('data-attr'));
        setValue(num);
        //console.log(pos.currentTarget.getAttribute('data-attr'));
    }

    return (
        <>
        {isLoading && (<Loader />)}
        <div className={classes.root}>
            <AppBar position="static" color="default" className="tab-style">
                <Tabs
                    className={classes.tabs}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example">
                    <Tab className={classes.label} label="Upcoming Appointments" {...a11yProps(0)} />
                    <Tab className={classes.label} label="Finalized Exams" {...a11yProps(1)} />
                    <Tab className={classes.label} label="Canceled & No show Exams" {...a11yProps(2)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>

                <section className="columns">

                    <div className="column">
                        {
                            statisticData.map((item: any) => {
                                return <Statistics statistic={item} activateTab={activateParentTab} />
                            })
                        }
                    </div>

                    <div className="column middle">
                        <h2 className="module-heading">Upcoming Appointments {isLoading}</h2>
                        
                        {
                            APPOINTMENT_LIST && APPOINTMENT_LIST.length > 0 && APPOINTMENT_LIST.map((item: any) => {
                                return <MuiThemeProvider theme={theme} key={item.id}>
                                    <Grid container spacing={2} style={{ display: 'initial', verticalAlign: 'text-top' }}>
                                        <Grid lg={6} item style={{ display: 'inline-block', margin: '5px', textAlign: 'left', padding: '0px 8px' }}>
                                            <PatientData appointmentData={item} />
                                        </Grid>
                                    </Grid>
                                </MuiThemeProvider>

                            })
                        }

                        {APPOINTMENT_LIST && APPOINTMENT_LIST.length === 0 && <Fallback noDataText="No Upcoming Appointments Available" />}


                    </div>

                    <div className="column">
                        <DateTime />
                    </div>

                </section>



            </TabPanel>
            <TabPanel value={value} index={1}>
                <section className="columns">

                    <div className="column">
                        {
                            statisticData.map((item: any) => {
                                return <Statistics statistic={item} activateTab={activateParentTab} />
                            })
                        }
                    </div>

                    <div className="column middle">
                        <h2 className="module-heading">Finalized Exam</h2>

                        <div className="search-bar">
                            <Paper component="form" className={classes2.root}>
                                <InputBase
                                    className={classes2.input}
                                    placeholder="Please enter 3 letters of any exam to search"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                />
                                <IconButton type="submit" className={classes2.iconButton} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        </div>
                        <div className="column-row two-column finalized-exam">
                        {
                            finalizedExamData.map((item: any) => {
                                return  <div className="col" key={item.id}>
                                    <FinalizedExam finalizedExamData={item} />
                                </div>
                            })
                        }
                        </div>

                    </div>

                    <div className="column">
                        <DateTime />
                    </div>

                </section>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <section className="columns">

                    <div className="column">
                        {
                            statisticData.map((item: any) => {
                                return <Statistics statistic={item} activateTab={activateParentTab} />
                            })
                        }
                    </div>

                    <div className="column middle">
                        <h2 className="module-heading">Canceled Exam</h2>
                        <div className="column-row two-column finalized-exam">
                        {
                            cancelledExamData.map((item: any) => {
                                return  <div className="col" key={item.id}>
                                    <CancelledExam cancelledExamData={item} />
                                    
                                </div>
                            })
                        }
                        </div>
                    </div>

                    <div className="column">
                      <DateTime />
                    </div>

                </section>
            </TabPanel>

        </div>
        </>                
    )
}

export default TabContainer