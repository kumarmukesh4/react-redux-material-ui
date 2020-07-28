import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { getAppointment } from '../../store/action'
import AppDialog from '../../common/components/ui/dialog/appDialog'
import StylesProvider from '@material-ui/styles/StylesProvider';
import { makeStyles, MuiThemeProvider, createMuiTheme, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { Tooltip } from '@material-ui/core';
import PatientData from './patientData';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';



import './patients.scss'
import Statistics from '../statistics/statistics';
import FinalizedExam from '../finalizedExam/finalizedExam';
import TabContainer from '../../common/components/ui/tabContainer/tabContainer';


interface Column {
    id: 'location' | 'modality' | 'exam' | 'date' | 'time' | 'action';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'location', label: 'Location', minWidth: 100 },
    { id: 'modality', label: 'Modality', minWidth: 70 },
    { id: 'exam', label: 'Exam', minWidth: 400 },
    { id: 'date', label: 'Date', minWidth: 70 },
    { id: 'time', label: 'Time', minWidth: 70 },
    { id: 'action', label: 'Action', minWidth: 100 },
];

interface Data {
    id: string;
    location: string;
    modality: string;
    exam: string;
    date: string;
    time: string;
    action: string
}

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

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    statiscs: {
        width: '31%',
        '@media(max-width: 600px)': {
            width: '100%'
        }
    }
});

const useStyles2 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'inline-flex',
            alignItems: 'right',
            width: 400,
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

const dialogConfigData = [
    {
        upload: {
            title: 'Upload Document'
        }
    },
    {
        view: {
            title: 'View Document'
        }
    },
    {
        paperwork: {
            title: 'Complete Paperwork'
        }
    }

]


function Patients(props: any) {
    const classes = useStyles();
    const classes2 = useStyles2();

    const APPOINTMENT_LIST = useSelector((state: any) => state.appointment.appointmentList);
    const isLoading = useSelector((state: any) => state.appointment.loading);
    const dispatch = useDispatch();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [rows, setRows] = useState<Data[]>([]);
    const [isDialogOpen, setisDialogOpen] = useState(false);
    const [dialogConfig, setisdialogConfig] = useState(dialogConfigData);
    const [dialogConfigDataOnClick, setdialogConfigDataOnClick] = useState(Object);

    useEffect(() => {
        dispatch(getAppointment());
    }, []);

    const openDialog = (data: any) => {
        setisDialogOpen(true);
        if (data === 'upload') {
            setdialogConfigDataOnClick(dialogConfig[0].upload)
        } else if (data === 'view') {
            setdialogConfigDataOnClick(dialogConfig[1].view)
        } else {
            setdialogConfigDataOnClick(dialogConfig[2].paperwork)
        }

    }

    const closeDialog = () => {
        setisDialogOpen(false)
    }

    const uploadDocumentCotent = (
        <h1>Upload document</h1>
    )

    const viewDocumentContent = (
        <h1>view document</h1>
    )

    const statisticData = [
        {
            title: 'Upcoming Appointments',
            count: 6
        },
        {
            title: 'Finalized Exams',
            count: 6
        },
        {
            title: 'Canceled & No show Exams',
            count: 15
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

    return (

        <>
            <TabContainer />
        </>

        /*
        <div style={{ textAlign: 'center' }}>

            <h3 className="module-heading">Statistics</h3>

            {
                statisticData.map((item: any) => {
                    return <Grid className={classes.statiscs} item xs={1} sm={6} md={3} lg={2} style={{ display: 'inline-block', margin: '10px', textAlign: 'center' }}>
                        <Statistics statistic={item} />
                    </Grid>
                })
            }


            <h3 className="module-heading">Upcoming Appointments</h3>
            {
                APPOINTMENT_LIST.map((item: any) => {
                    return <MuiThemeProvider theme={theme} key={item.id}>
                        <StylesProvider>
                            <Grid item xs={1} sm={6} md={3} lg={2} style={{ display: 'inline-block', margin: '10px', textAlign: 'left' }}>
                                <PatientData appointmentData={item} opendialog={openDialog}/>
                            </Grid>
                        </StylesProvider>
                    </MuiThemeProvider>

                })
            }

            <h3 className="module-heading">Finalized Exams</h3>
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
            {
                finalizedExamData.map((item: any) => {
                    return <Grid className={classes.statiscs} item xs={1} sm={6} md={3} lg={2} style={{ display: 'inline-block', margin: '10px', textAlign: 'center' }}>
                             <FinalizedExam finalizedExamData={item} />
                            </Grid>
                })
            }


            {isDialogOpen &&
                <AppDialog dialogConfig={dialogConfigDataOnClick} isOpenDialog={isDialogOpen} closeDialog={closeDialog}>
                    <h2>Upload your patient`s paperwork!</h2>
                </AppDialog>
            }
        </div>
        */
    )
}

export default Patients
