import React, { useEffect, useState } from 'react'
import { Progress, message } from 'antd'
import { DragDropContext } from 'react-beautiful-dnd'
import socketIOClient from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataBoard, reFetchData } from './../../redux/action/board'
import updateCard from '../../components/componentDetailBoard/addCard/services/updateCard'
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import './detailBoard.scss'
import Column from '../../components/componentDetailBoard/column'
import ShareBoard from '../../components/shareBoard';
const ENDPOINT = "https://backendretro1712512.herokuapp.com/";

const DetailBoard = () => {
    const [percent, setPercent] = useState(0)
    const dispatch = useDispatch()
    const route = useHistory();
    const match = useParams();
    const id = match.id
    const refetchData = useSelector(state => state.board.reFetchData)
    const [displayProg, setDisplayProg] = useState(false)

    const location = window.location.href
    const dataBoard = useSelector(state => state.board.data)
    const col1 = dataBoard.filter(data => data.type === 1)
    const col2 = dataBoard.filter(data => data.type === 2)
    const col3 = dataBoard.filter(data => data.type === 3)

    useEffect(() => {
        //connect
        const socket = socketIOClient(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
        socket.emit("fetchDataAllCard", { id: id });
        socket.on(`fetchDataCardSuccess${id}`, data => {

            const action = fetchDataBoard(data);
            dispatch(action);
        });
        return () => {
            socket.disconnect();
        }
    }, [id, dispatch, refetchData])

    useEffect(() => {
        setDisplayProg(true)
        setPercent(30)
        axios.get(`https://backendretro1712512.herokuapp.com/card/board=${id}`)
            .then(res => {
                // console.log(res.data.data);
                if (res.data.status !== 200) {
                    message.error("Not fond board of your require!")
                    route.push('/notfound')
                }
                else {
                    setTimeout(() => {
                        setPercent(100)
                    }, 100)
                    const dataCard = res.data.data;
                    setDisplayProg(true);
                    setTimeout(() => {
                        setPercent(100)
                    }, 150)
                    // setPercent(100)
                    setTimeout(() => {
                        const action = fetchDataBoard(dataCard);
                        dispatch(action);
                        setDisplayProg(false);
                        setPercent(0);
                    }, [450])
                }
            })
            .catch(error => {
                console.log(error);
            })
        return () => {
            const action = fetchDataBoard([]);
            dispatch(action)
        }
    }, [id, dispatch, route])

    const onDragEnd = async ({ source, destination }) => {
        if (destination === undefined || destination === null) return null
        // If the source and destination columns are the same
        // AND if the index is the same, the item isn't moving
        if (
            source.droppableId === destination.droppableId &&
            destination.index === source.index
        )
            return null

        const s = Number(source.droppableId);
        const d = Number(destination.droppableId);
        let SRC = (s === 1 ? col1 : (s === 2 ? col2 : col3));
        let DES = (d === 1 ? col1 : (d === 2 ? col2 : col3));
        const src = SRC[source.index];
        const des = DES[destination.index];

        const indexSource = dataBoard.indexOf(src);
        const indexDes = dataBoard.indexOf(des);
        const newSrc = {
            ...src,
            type: d
        }
        const newdata = dataBoard.filter((_, idx) => (idx !== indexSource))
        newdata.splice(indexDes, 0, newSrc)
        const actionfetch = fetchDataBoard(newdata);
        dispatch(actionfetch)
        try {
            const status = await updateCard(newSrc);
            if (status === 200) {
                const action = fetchDataBoard(newdata);
                dispatch(action)
                const refetchdata = reFetchData()
                dispatch(refetchdata)
            }
            else {
                message.error("something is error!")
            }
        } catch (error) {
            message.error("something is error!")
        }

        const action = fetchDataBoard(newdata);
        dispatch(action)

    }
    return (
        <div>
            <div style={{ height: 3, display: "flex", textDirection: "column", alignItems: "center", overflow: "hidden", marginTop: 5 }}>
                <Progress percent={percent} showInfo={false} className={displayProg ? null : "noneDisplay"} style={{ width: "100%" }} >
                </Progress>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="detail-body">
                    <div className="col-card">
                        <Column name="Went well" type={1} data={col1}></Column>
                    </div>
                    <div className="col-card">
                        <Column name="To improve" type={2} data={col2}></Column>
                    </div>
                    <div className="col-card">
                        <Column name="Action items" type={3} data={col3}></Column>
                    </div>
                </div>
            </DragDropContext>
            <div className="share-detail-board">
                <ShareBoard url={location}></ShareBoard>
            </div>
        </div>
    )
}

export default DetailBoard