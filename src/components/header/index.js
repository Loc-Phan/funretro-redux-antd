import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';

import './header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/action/user';


const Header = () => {
    const user = useSelector(state => state.user.user)
    const [checkLogin, setCheckLogin] = useState(false)
    useEffect(() => {
        if (user !== null) {
            setCheckLogin(true);
        }
    }, [user])
    const router = useHistory()
    const dispatch = useDispatch()
    const onLogout = () => {
        setCheckLogin(false);
        const action = logOut()
        dispatch(action)
        router.push('/login')
    }
    const clickSignin = () => {
        router.push('/login')
    }
    const clickSignup = () => {
        router.push('/logup')
    }
    const onUpdateUserInfo = () => {
        router.push('/user-info')
    }
    return (
        <div className="header">
            <Link style={{ color: 'white', fontSize: '24px', fontFamily: 'Sonsie One' }} to='/'>FunRetro</Link>
            <div>
                {checkLogin
                    ?
                    <span>
                        <Button type="primary" danger style={{ marginRight: 15 }} onClick={onLogout}>
                            Logout
                        </Button>
                        <Button danger style={{ marginRight: 15 }} onClick={onUpdateUserInfo}>
                            Edit Info
                        </Button>
                    </span>
                    :
                    <span>
                        <Button type="primary" danger onClick={clickSignin}>
                            Sign in
                        </Button>
                        <Button danger style={{ marginLeft: 15, marginRight: 15 }} onClick={clickSignup}>
                            Sign up
                        </Button>
                    </span>
                }
                <UserOutlined />
            </div>
        </div >
    )
}

export default Header;