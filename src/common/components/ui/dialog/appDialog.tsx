import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog, {DialogProps} from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Icon from '@material-ui/core/Icon';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function AppDialog(Props: any) {
    const classes = useStyles();
    const { isOpenDialog, closeDialog, dialogConfig, size, showActionRow } = Props;
    const [open, setOpen] = React.useState(isOpenDialog);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>(size);
    const [fullWidth, setFullWidth] = React.useState(true);
    const handleClickOpen = () => {
        setOpen(isOpenDialog);
    };

    const handleClose = () => {
        setOpen(false);
        closeDialog();
    };
    return (
        <>
            <Dialog open={open} 
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    onClose={handleClose} 
                    aria-labelledby="form-dialog-title" 
                    TransitionComponent={Transition}>
                <DialogTitle id="form-dialog-title">{dialogConfig.title}</DialogTitle>
                <DialogContent>
                     {Props.children}
                </DialogContent>
                {
                showActionRow &&    
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Cancel</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<CloudUploadIcon />}>
                        Upload
                    </Button>
                     
                </DialogActions>
                }
            </Dialog>
        </>
    )
}

export default AppDialog
