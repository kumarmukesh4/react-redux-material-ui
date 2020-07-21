import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AppDialog(Props: any) {
    const { isOpenDialog, closeDialog, dialogConfig } = Props;
    const [open, setOpen] = React.useState(isOpenDialog);
    const handleClickOpen = () => {
        setOpen(isOpenDialog);
    };

    const handleClose = () => {
        setOpen(false);
        closeDialog();
    };
    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{dialogConfig.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {Props.children}
                     </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Cancel</Button>
                    <Button onClick={handleClose} color="primary">Upload</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AppDialog
