import React, { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useParams } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';
import fetchAddCard from './services/addCard'
import { reFetchData } from '../../../redux/action/board'
import './addCard.scss'
import { useDispatch } from 'react-redux';
import deleteCard from './services/deleteCard';
import updateCard from './services/updateCard'

const { confirm } = Modal;

const AddCard = (props) => {
    const [display, setDisplay] = useState(true)
    const [isCard, setIsCard] = useState(2)
    const [text, setText] = useState("")
    const [confirmLoading, setConfirmLoading] = useState(false)
    const params = useParams()
    const id = params.id
    const dispatch = useDispatch()
    useEffect(() => {
        if (props.data) {
            setIsCard(1);
            setDisplay(true)
            setText(props.data.content)
        }
    }, [props.data])
    const changeText = (event) => {
        setText(event.target.value)
    }
    const openUpdate = () => {
        setIsCard(3)
    }
    const onAddCard = async () => {
        const types = props.type
        setDisplay(false)
        const data = {
            idBoard: id,
            content: text,
            type: types
        }
        await fetchAddCard(data)
        const refetchData = reFetchData()
        dispatch(refetchData)
    }
    const onDeleteCard = async () => {
        if (props.data) {
            showConfirm()
        }
        else {
            setDisplay(false)
        }
    }
    const handleOk = async () => {
        setConfirmLoading(true)
        const status = await deleteCard(props.data._id)
        setTimeout(() => {
            setConfirmLoading(false)
            const refetchData = reFetchData()
            dispatch(refetchData)
        }, 500)
        if (status === 200) {
            // console.log("delete Success")
        }
        setDisplay(false)
    }
    const showConfirm = () => {
        confirm({
            title: 'Do you Want to delete this items?',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure',
            confirmLoading: { confirmLoading },
            onOk() {
                handleOk()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const onUpdateCard = async () => {
        setIsCard(1);
        // setDisplay(false)
        const types = props.type
        const data = {
            _id: props.data._id,
            idBoard: id,
            content: text,
            type: types
        }
        let update
        if (props.data.content !== text) {
            update = await updateCard(data)
            const refetchData = reFetchData()
            dispatch(refetchData)
        }
        if (update === 500) {
            alert("error update");
        }
    }
    return (
        <div className={display ? 'display' : 'noneDisplay'}>
            <Draggable draggableId={`${props.type}${props.index}`} index={props.index}>
                {
                    provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <div style={{ marginBottom: 10, marginTop: 10 }} >
                                {isCard === 1 ?
                                    (<div className="card" style={{ backgroundColor: props.color }}>
                                        <div className="text-content">{text}</div>
                                        <div className="iconEdit" onClick={openUpdate}><EditOutlined /></div>
                                    </div>)
                                    :
                                    isCard === 2 ?

                                        <div className="addcard" style={{ borderWidth: 7, borderColor: props.color }}>
                                            <TextArea className="text-content" onChange={changeText} value={text} placeholder="Text" autoSize />
                                            <div className="footer-card">
                                                <button onClick={onAddCard}>Add</button>
                                                <div className="btndelete" onClick={onDeleteCard}><DeleteOutlined /></div>
                                            </div>
                                        </div>
                                        :
                                        <div className="addcard" style={{ borderWidth: 7, borderColor: props.color }}>
                                            <TextArea className="text-content" onChange={changeText} value={text} placeholder="Text" autoSize />
                                            <div className="footer-card">
                                                <button onClick={onUpdateCard}>Done</button>
                                                <div className="btndelete" onClick={onDeleteCard} ><DeleteOutlined /></div>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    )
                }
            </Draggable>
        </div>
    )
}

export default AddCard