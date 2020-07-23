import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { getAppointment } from '../../store/action'
import AppDialog from '../../common/components/ui/dialog/appDialog'

import { makeStyles } from '@material-ui/core/styles';
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


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

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
        dispatch(getAppointment())    
    }, []);

    const openDialog =  (data: any) => {
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

    return (
      
        <>
            <h3>Upcoming Appointments</h3>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {APPOINTMENT_LIST.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    {column.id === 'action' && <> 
                                                        <Tooltip title="Complete Paperwork"><PostAddIcon className="cursor-p" onClick={() => openDialog('paperwork')}  /></Tooltip> 
                                                        <Tooltip title="Upload Document"><CloudUploadIcon className="cursor-p" onClick={() => openDialog('upload')} /></Tooltip> 
                                                        <Tooltip title="View Document"><VisibilityIcon className="cursor-p" onClick={() => openDialog('view')} /></Tooltip> </> } 
                                                </TableCell> 
                                                
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={APPOINTMENT_LIST.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            { isDialogOpen &&  
            <AppDialog dialogConfig={dialogConfigDataOnClick} isOpenDialog={isDialogOpen} closeDialog={closeDialog}> 
                <h2>Upload your patient`s paperwork!</h2>  
            </AppDialog>
            }
        </>
    )
}

export default Patients
