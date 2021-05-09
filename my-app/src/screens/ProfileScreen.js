import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {detailsUser, updateUserProfile} from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";

export default function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    const userDetails = useSelector(state => state.userDetails)
    const { loading, e, user } = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success: successUpdate, e: errorUpdate, loading: loadingUpdate} = userUpdateProfile

    const dispatch = useDispatch();
    useEffect(()=>{
        if(!user){
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id))
        }else{
            setName(user.name)
            setEmail(user.email)
        }

    }, [dispatch, userInfo._id, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            alert('Password and confirm password are not matched')
        }else {
            dispatch(updateUserProfile({
                userId: user._id,
                name,
                email,
                password
            }))
        }
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox></LoadingBox>
                        : e? <MessageBox variant="danger">{e}</MessageBox>
                        :
                        <>
                            {loadingUpdate && <LoadingBox></LoadingBox>}
                            {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                            {successUpdate && <MessageBox variant="success">Profile updated successfully</MessageBox>}
                            <div>
                                <label htmlFor="name">Name</label>
                                <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input id="email" type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" placeholder="Enter password" onChange = {(e)=> setPassword(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input id="confirmPassword" type="password" placeholder="Enter confirm password" onChange = {(e)=> setConfirmPassword (e.target.value)} />
                            </div>

                            <div>
                                <label/>
                                <button className="primary" type="submit">
                                    Update
                                    <span></span><span></span><span></span><span></span>
                                </button>
                            </div>
                        </>
                }
            </form>

        </div>
    )
}