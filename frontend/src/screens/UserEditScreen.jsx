import React, { useState, useEffect } from "react";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {Loader} from "../components/Loader.jsx";
import {Message} from "../components/Message.jsx";
import {FormContainer} from "../components/FormContainer.jsx";
import { getUserDetails, updateUser } from "../actions/userActions.jsx";
import {USER_UPDATE_RESET} from "../constants/userConstants.jsx";
export const UserEditScreen = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch()


    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate)
    const { error:errorUpdate, loading:loadingUpdate, success:successUpdate } = userUpdate;

    useEffect(() => {
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/userlist')
        }else{
            if(!user.name || user._id !== Number(id)){
                dispatch(getUserDetails(id))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    },[id, user, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id:user._id, name, email, isAdmin}))
    }

    return (
        <div>
            <Link to={'/admin/userlist'}>
                Go Back
            </Link>

        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant={'danger'}>{errorUpdate}</Message> }

            {loading ? <Loader/> : error ? <Message variant={'danger'}>{error}</Message>
                : (
                <Form onSubmit={submitHandler}>
                <Form.Group controlId={'name'}>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control
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
                        type={'email'}
                        placeholder={'Enter Email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId={'isadmin'}>
                    <Form.Check
                        type={'checkbox'}
                        label={'Is Admin'}
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(!isAdmin)}
                    ></Form.Check>
                </Form.Group>

                 <Button type={'submit'} variant={'primary'}>
                    Update
                </Button>
            </Form>
            )}
        </FormContainer>
        </div>
    )
}