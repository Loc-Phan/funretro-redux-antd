import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import './formLogup.scss';

const FormLogup = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [checkRegister, setCheckRegister] = useState(false);
    const router = useHistory();

    const onSubmit = (data) => {
        const user = {
            name: data.name,
            username: data.username,
            password: data.password
        }
        setCheckRegister(true);
        Axios.post('https://backendretro1712512.herokuapp.com/users/logup', { ...user })
            .then((res) => {
                console.log(res.data);
                setCheckRegister(false);
                if (res.data.status !== 200) {
                    // console.log()
                    message.error(res.data.data);
                }
                else {
                    router.push('/login');
                }
            })
            .catch(err => {
                console.log(err);
                setCheckRegister(false);
            })
    }
    return (
        <div className="log-up">
            <form className="log-up-form" onSubmit={handleSubmit(onSubmit)}>
                <label className="label">Sign up</label>
                <input placeholder="Yourname" name="yourname" class="input" ref={register({ required: true })}></input>
                <div className="error-message">* {errors.yourname && 'Yourname is required'}</div>
                <input placeholder="Username" name="username" class="input" ref={register({ required: true })}></input>
                <div className="error-message">* {errors.username && 'Username is required'}</div>
                <input placeholder="Password" type="password" name="password" class="input" ref={register({ required: true })}></input>
                <div className="error-message">* {errors.password && 'Password not validate'}</div>
                <input placeholder="Retype password" type="password" name="repassword" class="input" ref={register({ required: true, validate: value => value === watch('password') })}></input>
                <div className="error-message">* {errors.repassword && 'Retype password not validate'} </div>
                <Button type="primary" htmlType='submit' size="large" className="btn btn-logup" loading={checkRegister}>
                    Register
                </Button>
            </form>
        </div>
    )
}

export default FormLogup;