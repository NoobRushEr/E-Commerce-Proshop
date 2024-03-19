import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import {Link, useParams, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {Message} from "../components/Message.jsx";
import {Loader} from "../components/Loader.jsx";
import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderActions.jsx";
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET} from "../constants/orderConstants";

export const OrderScreen = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay, success:succesPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading:loadingDeliver, success:succesDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }


    useEffect(() => {
        if(!userInfo){
            navigate(`/login`)
        }

        if(!order || succesPay || order._id !== Number(id) || succesDeliver){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})

            dispatch(getOrderDetails(id))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
    }, [order, id, dispatch, succesPay, succesDeliver])


    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AWkBN-vhX1XAkkvQD9WjFPeGRiP_igsNieaAeuxevcxdMx_N_CF4LCURCguGqwIyNVdafYOQ4Nc3KfbW'
        script.async = true
        script.onload = () =>{
            setSdkReady(true)
        }
        document.body.appendChild((script))

    }

    const successPaymentHandler = (paymentResult) =>{
        dispatch(payOrder(id, paymentResult))
    }

    const deliverHandler = () =>{
        dispatch(deliverOrder(order))
    }



    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant={'danger'}>{error}</Message>
    ):

    (
        <div>
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant={'flush'}>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name} </p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>


                            <p>
                                <strong>
                                    Shipping:
                                </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},
                                {' '}
                                {order.shippingAddress.postalcode},
                                {' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant={'success'}>Delivered On {order.deliveredAt.substring(0,10)}</Message>
                            ) : (
                                <Message variant={'warning'}>Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <p>
                                <strong>
                                    Method:
                                </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant={'success'}>Paid On {order.paidAt.substring(0,10)}</Message>
                            ) : (
                                <Message variant={'warning'}>Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ?
                            <Message variant={'info'}>Your Order is empty</Message> : (
                                <ListGroup variant={'flush'}>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={`/images/${item.image}`} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ₹{item.price} = {(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                )}

                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant={'flush'}>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>₹{order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>₹{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>₹{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>₹{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && order.user.id === userInfo._id && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}

                                    {!sdkReady ? (
                                        <Loader/>
                                    ) : (
                                       <PayPalScriptProvider options={{
                                           clientId: "AaWu8TQJS8RVDUq3lpkdNhrfCNp8ivNpfBkQ9jIKslHgExXe41R9Kcx9hx3TI3x4zYpZYhouYHd7mQJw",
                                           components: "buttons",
                                           currency: "USD" }}>
                                            <PayPalButtons
                                          style={{ layout: 'vertical' }}
                                          createOrder={(data, actions) => {
                                            return actions.order.create({
                                              purchase_units: [
                                                {
                                                  amount: {
                                                    value: order.totalPrice,
                                                    currency_code: 'USD',
                                                  },
                                                },
                                              ],
                                            });
                                          }}
                                          onApprove={successPaymentHandler}
                                        />
                                       </PayPalScriptProvider>
                                    )}
                                </ListGroup.Item>
                            )}

                        </ListGroup>
                        {loadingDeliver && <Loader/>}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                    type={'button'}
                                    className={'btn btn-block'}
                                    onClick={deliverHandler}
                                >
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}