import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './viewDoc.scss'
import * as logo from '../../assets/images/logo.jpg'
import AttachmentIcon from '@material-ui/icons/Attachment';
import GetAppIcon from '@material-ui/icons/GetApp';
import { API_URL } from '../../common/config';
import { localStore } from '../../common/services';

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

function ViewDoc(props: any) {
    const { examId } = props;
    const [showLargeImg, setShowLargeImg] = useState(false);
    const [imageId, setImageId] = useState('');
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

    const showEnlarge = (imgId: any) => {
        setShowLargeImg(!showLargeImg);
        setImageId(imgId);

    }

    const downloadAttachement = (src: string) => {
        console.log(src);
        let a = document.createElement('a');
        a.href = src;
        a.setAttribute('download', src);
        a.setAttribute("target", '_self')
        a.click();
    }

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

    return (
        <>
            {
                viewDocumentData.map((item: any, index: number) => {
                    let imgId = 'doc' + (index + 1);
                    return <div className="view-doc-container">
                        <div className="left">
                            <div className="subtitle">{item.subTitlle}</div>
                            <h6><AttachmentIcon style={{ color: '#777', fontSize: '13px' }} /> {item.status}</h6>
                            <span className="date-time"><strong>Time:</strong> {item.time}</span><span className="date-time"><strong>Date:</strong> {item.schduleDate}</span>
                            <span className="download-attachment"><GetAppIcon onClick={() => downloadAttachement(item.imgSrc)} /></span>
                        </div>
                        <div className="thumbnail" onClick={() => showEnlarge(imgId)}><img src={item.imgSrc} /></div>
                        {
                            showLargeImg && imageId === imgId && <div className="thumbnail-large" id="img1"><img src={item.imgSrc} /></div>
                        }

                    </div>
                })
            }
           
        </>
    )
}
export default ViewDoc
