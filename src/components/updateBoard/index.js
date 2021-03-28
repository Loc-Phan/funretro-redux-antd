import React, { useEffect, useState } from 'react'
import Modal from 'antd/lib/modal/Modal';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { confirmUpdateBoard, updateBoard } from './../../redux/action/home'
import axios from 'axios'

const UpdateBoard = () => {
    const [showDisplayModal, setShowDisplayModal] = useState(false)
    const boardUpdate = useSelector(state => state.home.updateBoard)
    const name = boardUpdate ? boardUpdate.name : null
    const dispatch = useDispatch()
    useEffect(() => {
        if (boardUpdate) {
            setShowDisplayModal(true)
        }
        else {
            setShowDisplayModal(false)
        }
    }, [boardUpdate])
    const onCancel = () => {
        const action = updateBoard(null)
        dispatch(action)
        setShowDisplayModal(false)
    }
    const onFinish = (value) => {
        const board = {
            ...boardUpdate,
            name: value.name
        }
        axios.post('https://backendretro1712512.herokuapp.com/board/update', { ...board })
            .then((res) => {
                // if (res.data.status === 200) {
                //     message.info('Update board name successfully!')
                // }
                // else {
                //     message.info('Update was error!')
                // }
                const action = confirmUpdateBoard(board)
                dispatch(action)
            })
            .catch((err) => {
                console.log(err)
            })
        setShowDisplayModal(false)
    }
    const onFinishFailed = (err) => {
        console.log(err)
    }
    return (
        <div>
            <Modal
                width="400px"
                title={`Update board ${name}`}
                visible={showDisplayModal}
                footer={false}
                onCancel={onCancel}
            >
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input other your board name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="btn-submit">
                            Update
                            </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default UpdateBoard