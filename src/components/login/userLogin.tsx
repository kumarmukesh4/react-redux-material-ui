import React, {useEffect} from 'react'

import './login.scss'
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AppTabs from '../../common/components/ui/tab/tab';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            width: '70%',
            margin: 'auto',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            height: '500px',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                position: 'relative'
            }
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            textAlign: 'center'
        },
        content: {
            flex: '1 0 auto',
            width: '100%'
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        playIcon: {
            height: 38,
            width: 38,
        },
    }),
);

function UserLogin() {

    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        
    }, [])

    return (
        <>
             <h1>User Login</h1>
             <Card className={classes.root}>
                <div className="login-wrapper">
                    <CardContent className={classes.content}>
                        <AppTabs />
                   </CardContent>
                </div>
                <CardMedia
                    className="cover">
                    <div className="cover-content">
                        <h3>Welcome to the HDC</h3>
                        <h6>Hollywood Diagnostics Center</h6>
                    </div>

                </CardMedia>
            </Card>
        </>
    )
}

export default UserLogin