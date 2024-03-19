import React, {useState} from "react";
import { Button, Form } from "react-bootstrap";
import {useNavigate, useSearchParams} from "react-router-dom";
export const SearchBox = () => {

    const [keyword, setKeyWord] = useState('')
    const navigate = useNavigate()
    const path = useSearchParams()
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            navigate(`/?keyword=${keyword}`)
        }else {
            navigate(navigate(window.location.pathname, {replace: true}))
        }
    }

    return (
        <Form
            onSubmit={submitHandler}
            className={'d-flex'}
            style={{position:'absolute',right:'0'}}
        >
            <Form.Control
                type={'text'}
                name={'q'}
                onChange={(e) => setKeyWord(e.target.value)}
                className={'mr-sm-2 ml-sm-5'}
            ></Form.Control>

            <Button
                type={'submit'}
                variant={'outline-success'}
                className={'p-1 m-1'}
            >
                Submit
            </Button>
        </Form>
    )
}