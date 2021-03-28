import React, { useEffect } from 'react'
import AddBoard from '../../components/addBoard'
import TabContent from '../../components/tabContent'
import { message } from 'antd'
import { apiCreateBoard, apiGetAllBoard } from '../../services/board'

import './home.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addBoard, fetchData } from '../../redux/action/home'
import { useHistory } from 'react-router-dom'
import ListBoard from '../../components/listBoard'
import UpdateBoard from '../../components/updateBoard'

const Home = () => {
    const user = useSelector(state => state.user.user)
    const board = useSelector(state => state.home.board)
    const dispatch = useDispatch()

    const router = useHistory()

    useEffect(() => {
        if (user === null) {
            router.push('/login')
            return;
        }
        const id = user._id
        const getAllBoardForHome = async (idUser) => {
            try {
                const res = await apiGetAllBoard(idUser)
                // console.log(res);
                const action = fetchData(res.data.data)
                dispatch(action)
            } catch (err) {
                console.log('something is error')
            }
        }
        getAllBoardForHome(id)
        return () => {
            const action = fetchData([])
            dispatch(action)
        }
    }, [router, user, dispatch])
    const createBoard = async (data) => {
        const user = JSON.parse(localStorage.getItem('user'))
        const newBoard = {
            idUser: user._id,
            name: data.name
        }
        try {
            const res = await apiCreateBoard(newBoard)
            // console.log(res);
            const action = addBoard(res.data.data)
            dispatch(action)
        } catch (err) {
            message.error('something is error')
        }
    }
    return (
        <div>
            <div>
                <TabContent></TabContent>
            </div>
            <div className="content">
                <div className="title-my-board">My boards</div>
                <div className="manage-board">
                    <AddBoard onCreate={createBoard}></AddBoard>
                    <ListBoard data={board} ></ListBoard>
                    <UpdateBoard></UpdateBoard>
                </div>
            </div>
        </div>
    )
}

export default Home