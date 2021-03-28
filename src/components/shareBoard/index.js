import React, { useState } from 'react'
import Modal from 'antd/lib/modal/Modal';
import { Button, message } from 'antd'
import { ShareAltOutlined } from '@ant-design/icons'
import './shareBoard.scss'

const ShareBoard = (props) => {
    const url = props.url
    const [showDisplayModal, setShowDisplayModal] = useState(false)
    const onCancel = () => {
        setShowDisplayModal(false)
    }
    const onCopyLink = (e) => {
        e.preventDefault()
        setShowDisplayModal(true)
    }
    const onCopyBoard = (e) => {
        e.preventDefault()
        const idBoard = `input${url}`
        const copyText = document.getElementById(idBoard)
        copyText.select()
        copyText.setSelectionRange(0, 99999)
        document.execCommand('copy')
        message.success('Copy link successfully')
    }

    return (
        <div>
            <Modal
                title='Copy link'
                visible={showDisplayModal}
                onOk={onCancel}
                onCancel={onCancel}
            >
                <div className="modal-info">
                    <input id={`input${url}`} defaultValue={url} style={{ width: '80%', marginRight: '15px' }} />
                    <span><Button type='primary' onClick={onCopyBoard}>Copy</Button></span>
                </div>
            </Modal>
            <div onClick={onCopyLink}><ShareAltOutlined /></div>
        </div>
    )
}

export default ShareBoard