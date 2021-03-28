import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import { Button, Input, message } from 'antd'
import { addUser } from './../../redux/action/user'
import axios from 'axios'

import './updateUserInfo.scss'

const UpdateUserInfo = () => {
    const user = useSelector(state => state.user.user)
    const [isEdit, setIsEdit] = useState(1)
    const [loadingButton, setLoadingButton] = useState(false)
    const [newName, setNewName] = useState('')
    const dispatch = useDispatch()
    const onEdit = () => {
        setIsEdit(2)
    }
    const onDone = () => {
        if (newName === '') return
        setLoadingButton(true)
        const newUser = {
            ...user,
            name: newName
        }
        axios.post('https://backendretro1712512.herokuapp.com/users/update', { ...newUser })
            .then((res) => {
                // console.log(res)
                setLoadingButton(false)
                setIsEdit(1)
                const action = addUser(newUser)
                dispatch(action)
                message.success('Update info successfully')
            })
            .catch((err) => {
                console.log(err)
                setLoadingButton(false)
                setIsEdit(1)
            })
    }
    const changeName = (event) => {
        setNewName(event.target.value)
    }
    return (
        <div>
            {user !== null
                ?
                <div className="user-info">
                    <span style={{ marginBottom: '20px' }}>{user.username}</span>
                    <div>
                        {isEdit === 1
                            ?
                            <div>
                                <span style={{ marginRight: '30px', marginBottom: '20px' }}>{user.name}</span>
                                <EditOutlined className="edit-icon" onClick={onEdit} />
                            </div>
                            :
                            <div style={{ display: 'flex' }}>
                                <Input id={`idUpdateName`} defaultValue={user.name} onChange={changeName}></Input>
                                <Button type="primary" onClick={onDone} loading={loadingButton}>Done</Button>
                            </div>
                        }
                    </div>
                </div>
                :
                <Redirect push to='/login' ></Redirect>
            }
        </div>
    )
}

export default UpdateUserInfo