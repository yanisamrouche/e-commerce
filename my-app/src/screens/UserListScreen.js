import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteUser, listUsers} from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function UserListScreen() {
    const userList = useSelector(state => state.userList);
    const {loading, e , users} = userList;

    const userDelete = useSelector(state => state.userDelete)
    const {loading: loadingDelete, e: errorDelete, success: successDelete} = userDelete
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(listUsers())
    }, [dispatch, successDelete])
    const deleteUserHandler = (user) => {
        dispatch(deleteUser(user._id))
    }
    return (
        <div>
            <h1>Users</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant="success">User Deleted Successfully</MessageBox>}
            {loading ? <LoadingBox></LoadingBox>:
                e? <MessageBox variant="danger">{e}</MessageBox> :
                    (
                        <table className="table">
                        <thead>
                        <tr>
                            <td>ID</td>
                            <td>NAME</td>
                            <td>EMAIL</td>
                            <td>IS ADMIN</td>
                            <td>ACTIONS</td>
                        </tr>
                        </thead>
                        <tbody>
                        {users && users.map((user)=>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                <td>
                                    <button className="primary block">Edit</button>
                                </td>
                                <td>
                                    <button className="primary block" onClick={()=> deleteUserHandler(user)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )
            }
        </div>

    )
}