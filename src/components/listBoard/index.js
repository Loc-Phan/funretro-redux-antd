import React from 'react'
import Board from '../board'

import './listBoard.scss'

const ListBoard = (props) => {
    const data = props.data
    let listBoard
    if (data) {
        listBoard = data.map((board, index) => {
            return <Board key={index} data={board} />
        })
    }
    return (
        <div className="list-board">
            {listBoard}
        </div>
    )
}

export default ListBoard