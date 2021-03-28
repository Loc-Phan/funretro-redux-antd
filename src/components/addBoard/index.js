import React, { useState } from 'react'
import { PlusCircleFilled } from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal';
import { Form, Input, Button } from 'antd'

import './addBoard.scss';

const AddBoard = (props) => {
    const [showDisplayModal, setDisplayShowModal] = useState(false);
    const showModal = () => {
        setDisplayShowModal(true);
    }
    const onCancel = () => {
        setDisplayShowModal(false);
    }
    const onFinish = (value) => {
        // console.log(value);
        props.onCreate(value);
        onCancel();
    }
    const onFinishFailed = (err) => {
        console.log(err);
    }
    return (
        <div>
            <div className="add-board" onClick={showModal}>
                <PlusCircleFilled />
                <div className="title-add-board">Add board</div>
            </div>
            <div>
                <Modal
                    width="400px"
                    title="Create board"
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
                            rules={[{ required: true, message: 'Please input your board name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="btn-submit">
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}

export default AddBoard