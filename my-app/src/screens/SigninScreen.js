import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signin} from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search ?
        props.location.search.split('=')[1] : '/';

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo, loading , e} = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password))
    }

    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {
                    loading && <LoadingBox></LoadingBox>
                }
                {
                    e && <MessageBox variant="danger">{e}</MessageBox>
                }
                <div>
                    <label htmlFor="email">Email address</label>
                    <span className="icon"><i className="fas fa-user"></i> </span>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        required
                        onChange={e => setEmail(e.target.value)}>

                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <span className="icon"><i className="fas fa-lock"></i> </span>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        onChange={e => setPassword(e.target.value)}>

                    </input>
                </div>
                <div>
                    <label />
                    <button className="primary block" type="submit">
                        Sign In
                        <span></span><span></span><span></span><span></span>
                    </button>

                </div>
                <div>
                    <label />
                    <div>
                        New customer? {' '}
                        <Link to={`/register?redirect=${redirect}`}>Create Account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}