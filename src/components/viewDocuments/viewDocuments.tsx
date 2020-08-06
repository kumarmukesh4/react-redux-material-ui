import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Avatar from '@material-ui/core/Avatar';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import FolderIcon from '@material-ui/icons/Folder';
import { localStore } from '../../common/services';
import { API_URL } from '../../common/config';
import { CardHeader } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
        position: 'relative',
        marginBottom: '15px'
    },
    media: {
        height: 20,
    },
    large: {
        width: '60px',
        height: '50px',
        position: 'absolute',
        top: 0,
        right: '10px',
        borderRadius: '0',
        boxShadow: '1px 2px 3px 0px rgba(0,0,0,0.30)'

    },
    action: {
        borderTop: '1px solid #ddd'
    },
    status: {
        margin: 0,
        padding: 0,
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        color: 'rgb(33, 150, 243)'
    },
    subtitle: {
        display: 'flex',
        alignItems: 'center',
    }
});

interface ViewDocument {
    attachment: string
    attachment_type: string
    curr_date: string
    del: string
    exam_id: number
    id: number
    link: string
    patient_id: number
    status: string
    time: string
    user_id: number
}


function ViewDocuments(props: any) {
    const classes = useStyles();
    const { examId } = props;
    const [viewDocumentData, setViewDocumentData] = useState<Array<ViewDocument>>([{
        'attachment': '',
        'attachment_type': '',
        'curr_date': '',
        'del': '',
        'exam_id': 0,
        'id': 0,
        'link': '',
        'patient_id': 0,
        'status': '',
        'time': '',
        'user_id': 0
    }]);

    useEffect(() => {
        const token = localStore.get('AUTH_TOKEN') || '';
        const userInfo = JSON.parse(localStore.get('USER_INFO') || '');
        let url = API_URL['VIEW_DOCUMENT'];
        axios({
            method: 'post',
            url: url,
            headers: {
                Authorization: `JWT ${token}`
            },
            data: {
                "patient_id": userInfo.userId, //'247439'
                "exam_id": examId
            }
        })
            .then((res: any) => {
                setViewDocumentData(res.data.data);

            }, (error) => {
                console.log(error);
            });

    }, [])


    const showAttachment = (src: string) => {
       
    }


    const viewDocData = viewDocumentData.map((item) => {
        return <Card className={classes.root}>
            <CardContent style={{padding: '16px 5px'}}>
                <h4 className={classes.status}> <AttachmentIcon style={{color: '#777'}} />  {item.status}</h4>
                <Avatar alt="Remy Sharp" src={item.link} onClick={() => showAttachment(item.link) } className={classes.large}> <FolderIcon /> </Avatar>
            </CardContent>
            <CardActions className={classes.action}>
                <Typography className={classes.subtitle} variant="subtitle2"><AvTimerIcon/> {item.time}</Typography>
                <Typography className={classes.subtitle} variant="subtitle2" style={{position: 'absolute', right: '15px'}}><EventAvailableIcon />{item.curr_date}</Typography>
            </CardActions>
        </Card>
    })
    return (
        <>
            {
                viewDocumentData && viewDocumentData.length > 0 ? viewDocData : ''
            }
        </>
    )
}

export default ViewDocuments