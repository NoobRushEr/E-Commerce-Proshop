import React, {useState} from "react";
import { Button, Form } from "react-bootstrap";
import {useNavigate, useSearchParams} from "react-router-dom";
export const SearchBox = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("keyword") || "");

    const submitHandler = (e) => {
        e.preventDefault()
        setSearchParams({ keyword: searchQuery });
        if(searchQuery){
            navigate(`/?keyword=${encodeURIComponent(searchQuery)}&page=1`);
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
                onChange={(e) => setSearchQuery(e.target.value)}
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