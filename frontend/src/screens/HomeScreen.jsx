import React, {useEffect, useState} from "react";
import { Row, Col } from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {listproducts} from "../actions/productActions";
import Product from "../components/Product";
import {useSearchParams} from "react-router-dom";
import {Loader} from "../components/Loader";
import {Message} from "../components/Message";
import {Paginate} from "../components/Paginate";

function HomeScreen() {

    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')
    const pg = searchParams.get("page") || 1;

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList

    useEffect(() => {
        dispatch(listproducts(keyword, pg))
    }, [dispatch, keyword, pg])

    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? <Loader/>
                : error ? <Message variant={'danger'}>{error}</Message>
                :
                 <div>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
                     <Paginate page={pg} pages={pages} keyword={keyword}/>
                 </div>
            }
        </div>
    )
}


export default HomeScreen