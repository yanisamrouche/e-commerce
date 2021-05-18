import {useDispatch, useSelector} from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {useEffect} from "react";
import {deleteOrder, listOrders} from "../actions/orderActions";
import {ORDER_DELETE_RESET} from "../constants/orderConstans";

export default function OrderListScreen(props) {
    const orderList = useSelector(state => state.orderList)
    const { loading, e, orders } = orderList;
    const orderDelete = useSelector(state => state.orderDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = orderDelete
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: ORDER_DELETE_RESET})
        dispatch(listOrders())
    }, [dispatch, successDelete])

    const deleteHandler = (order) => {
        //TODO: delete handler
        dispatch(deleteOrder(order._id))
    }

    return(
        <div>
            <h1>Orders</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            { loading ? (
                <LoadingBox></LoadingBox>
            ) : e ? (
                <MessageBox variant="danger">{e}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                    { orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.user && order.user._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice.toFixed(2)}</td>
                            <td>{order.isPaid ? `Paid at : ${order.paidAt.substring(0, 10)}` : 'No'}</td>
                            <td>{order.isDelivered ? `Delivered at : ${order.deliveredAt.substring(0, 10)}` : 'No'}</td>
                            <td>
                                <button
                                    type="button"
                                    className="primary block"
                                    onClick={() => {props.history.push(`/order/${order._id}`)}}>
                                    Details
                                    <span></span> <span></span> <span></span> <span></span>
                                </button>

                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="primary block"
                                    onClick={ () => deleteHandler(order) }>
                                    Delete
                                    <span></span><span></span><span></span><span></span>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

        </div>
    )
}