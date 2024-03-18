import React, { useState, useEffect } from "react";
import {Link, redirect, useNavigate, useSearchParams} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {Loader} from "../components/Loader.jsx";
import {Message} from "../components/Message";
import {FormContainer} from "../components/FormContainer.jsx";
import { login } from "../actions/userActions.jsx";

export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo){
            navigate(redirect)
        }
    },[dispatch, navigate, redirect, userInfo])



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant={'danger'}>{error}</Message>}
            {loading && <Loader/>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId={'email'}>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type={'email'}
                        placeholder={'Enter Email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId={'password'}>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type={'password'}
                        placeholder={'Enter Password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type={'submit'} variant={'primary'}>
                    Sign In
                </Button>
            </Form>
            <Row>
                <Col className={'py-3'}>
                    New Customer ?
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/redirect'}>
                    Register
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}