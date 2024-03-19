import React, { useState, useEffect } from "react";
import {Link, redirect, useNavigate, useSearchParams} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {Loader} from "../components/Loader.jsx";
import {Message} from "../components/Message";
import {FormContainer} from "../components/FormContainer.jsx";
import {login, register} from "../actions/userActions.jsx";


export const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch()

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/';

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo){
            navigate(redirect)
        }
    },[dispatch, navigate, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword){
            setMessage('Passwords do not match')
        }else{
        dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant={'danger'}>{message}</Message>}
            {error && <Message variant={'danger'}>{error}</Message>}
            {loading && <Loader/>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId={'name'}>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control
                        required
                        type={'name'}
                        placeholder={'Enter Name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId={'email'}>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        required
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
                        required
                        type={'password'}
                        placeholder={'Enter Password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId={'passwordconfirm'}>
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control
                        required
                        type={'password'}
                        placeholder={'Confirm Password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                 <Button type={'submit'} variant={'primary'}>
                    Register
                </Button>
            </Form>
            <Row>
                <Col className={'py-3'}>
                    Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/redirect'}>
                    Sign In
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}