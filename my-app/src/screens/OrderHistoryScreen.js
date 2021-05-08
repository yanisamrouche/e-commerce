import {useDispatch, useSelector} from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {useEffect} from "react";
import {listOrderMine} from "../actions/orderActions.js";

export default function OrderHistoryScreen(props) {

    const orderMineList = useSelector(state => state.orderMineList);
    const {loading, e, orders} = orderMineList;
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(listOrderMine())
    }, [dispatch])

    return (
        <div>
            <h1>Order History</h1>
            {
                loading ?
                    <LoadingBox></LoadingBox> :
                    e? (<MessageBox variant="danger">{e}</MessageBox> ):
                        (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL PRICE</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { orders &&
                                    orders.map((order)=> (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt}</td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0,10) : 'No' }</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : 'No'}</td>
                                        <td>
                                            <button type="button" className="small" onClick={() => {props.history.push(`/order/${order._id}`)}}>
                                                Details
                                                <span></span><span></span><span></span><span></span>
                                            </button>
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