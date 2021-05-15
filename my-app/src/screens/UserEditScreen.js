import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {USER_UPDATE_RESET} from "../constants/userConstants";
import {detailsUser, updateUser} from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function UserEditScreen(props){

    const userId = props.match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const userDetails = useSelector(state => state.userDetails);
    const {loading, e, user} = userDetails;

    const userUpdate = useSelector(state => state.userUpdate)
    const {
        loading: loadingUpdate,
        e: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET});
            props.history.push('/userlist')
        }
        if(!user){
            dispatch(detailsUser(userId))
        }else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user, dispatch, userId, successUpdate,props.history])

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update user
        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    };

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>
                        Edit User
                    </h1>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                </div>
                {loading ? (
                    <LoadingBox/>
                ) : e? (
                    <MessageBox variant="danger">{e}</MessageBox>
                ): (
                    <>
                        <div>
                            <label htmlFor="name">Name</label> <br/>
                            <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label><br/>
                            <input id="email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="isAdmin">Is Admin</label>
                            <input id="isAdmin" type="checkbox" checked={isAdmin}  onChange={(e) => setIsAdmin(e.target.checked)}/>
                        </div>
                        <div>
                            <button type="submit" className="primary">Update</button>
                        </div>
                    </>
                )}
            </form>
        </div>
    )

}