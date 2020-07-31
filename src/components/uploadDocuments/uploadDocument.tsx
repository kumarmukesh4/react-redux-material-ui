import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 300,
        },
        input: {
            display: 'none',
          },
    }),
);

function UploadDocument() {

    const classes = useStyles();
    const [age, setAge] = React.useState<string | number>('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as number);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <h2 className="m-0-p-0">Upload your patient`s paperwork!</h2>
            <Typography variant="subtitle1" color="textSecondary">Check off one or many exams you wish to upload paperwork too.</Typography>
            <Typography variant="subtitle1" color="textSecondary">Choose a type of Document.</Typography>
            <Typography variant="subtitle1" color="textSecondary">Browse your computer for the file.</Typography>
            <Typography variant="subtitle1" color="textSecondary" style={{ color: '#008000' }}>Finally Click the UPLOAD button</Typography>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Select Document Type</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={age}
                    onChange={handleChange}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file" style={{position: 'relative', top: '20px'}}>
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
        </>
    )
}

export default UploadDocument
