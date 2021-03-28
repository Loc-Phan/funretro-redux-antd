import React, { useState } from 'react';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import './formLogin.scss';
import { addUser } from '../../../../redux/action/user';
import { useDispatch } from 'react-redux';

const FormLogin = () => {
    const { register, handleSubmit } = useForm()
    const [checkLogin, setCheckLogin] = useState(false)
    const router = useHistory()
    const dispatch = useDispatch()
    const onSubmit = (dataLogin) => {
        setCheckLogin(true);
        Axios.post('https://backendretro1712512.herokuapp.com/users/login', { ...dataLogin })
            .then(res => {
                const { data } = res
                // console.log(data);
                if (res.data.status === 200) {
                    const user = data.data
                    // console.log(user);
                    localStorage.setItem('user', JSON.stringify(user));
                    const action = addUser(user)
                    dispatch(action)
                    router.push('/')
                }
                else {
                    alert('Đăng nhập thất bại')
                }
                setCheckLogin(false);
            })
            .catch(err => {
                setCheckLogin(false);
                console.log(err);
            })
    }
    return (
        <div className="sign-in">
            <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
                <label className="label">Sign in</label>
                <input placeholder="Username" name="username" className="input" ref={register({ required: true })}></input>
                <input placeholder="Password" type="password" name="password" className="input" ref={register({ required: true })}></input>
                <div className="forget-password">Forgot Password?</div>
                <Button type="primary" htmlType='submit' loading={checkLogin} size="large" className="btn btn-login">Login</Button>

            </form>
        </div>
    );
}

export default FormLogin;