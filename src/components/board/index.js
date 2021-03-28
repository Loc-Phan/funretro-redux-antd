import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ClockCircleOutlined } from '@ant-design/icons';
import { getAllCard, apiDeleteBoard } from '../../services/board';
import { deleteBoard } from './../../redux/action/home'
import { message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd'

import './board.scss'
import { useDispatch, useSelector } from 'react-redux';
import { updateBoard } from './../../redux/action/home'
import ShareBoard from '../shareBoard';

const { confirm } = Modal
const deleteItem = ((arr, id) => {
    return arr.filter((data) => {
        return data._id !== id;
    })
})

const Board = (props) => {
    const listBoard = useSelector(state => state.home.board)
    const data = props.data
    const location = window.location.href
    const id = data._id
    const url = `${location}detail-board/${id}`
    const [listCard, setListCard] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        const cardOfBoard = async () => {
            try {
                const res = await getAllCard(id);
                setListCard(res.data.data)
            } catch (error) {
                message.error("something is error")
            }
        }
        cardOfBoard()
    }, [id])
    const onUpdateBoard = (e) => {
        e.preventDefault()
        const action = updateBoard(data)
        dispatch(action)
    }
    const onDeleteCard = async () => {
        try {
            const res = await apiDeleteBoard(id)
            if (res.data.status === 200) {
                const data = deleteItem(listBoard, id)
                const action = deleteBoard(data)
                dispatch(action)
            }
            else {
                console.log('delete error')
            }
        } catch (error) {
            console.log('delete error')
        }
    }
    const showConfirm = (e) => {
        e.preventDefault()
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                onDeleteCard()
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    }
    const cl1 = listCard.filter((data) => data.type === 1)
    const cl2 = listCard.filter((data) => data.type === 2)
    const cl3 = listCard.filter((data) => data.type === 3)
    const num1 = cl1.map((data, index) => {
        return <div key={index} className="numberCard num1"></div>
    })
    const num2 = cl2.map((data, index) => {
        return <div key={index} className="numberCard num2"></div>
    })
    const num3 = cl3.map((data, index) => {
        return <div key={index} className="numberCard num3"></div>
    })
    return (
        <div className="board">
            <Link to={`detail-board/${id}`}>
                <div>
                    <div className="board-name">{data.name}</div>
                    <div className="board-info">
                        <div><ClockCircleOutlined /></div>
                        <div>Card: {listCard.length} </div>
                    </div>
                </div>
                <div>
                    <div className="board-number">
                        <div>{num1}</div>
                        <div>{num2}</div>
                        <div>{num3}</div>
                    </div>
                </div>
            </Link>
            <div className="control-board">
                <div className="edit-board" onClick={onUpdateBoard} style={{ width: "40%", fontSize: 15 }} >EDIT</div>
                <div className="edit-board" onClick={showConfirm} style={{ width: "40%", fontSize: 15 }} >DELETE</div>
                <div className="edit-board" style={{ width: "20%", fontSize: 15 }} ><ShareBoard url={url}></ShareBoard></div>
            </div>
        </div>
    )
}

export default Board