import React, {useEffect, useState} from "react";
import { Row, Col } from 'react-bootstrap'

import Product from "../components/Product";
import products from "../products";
import axios from "axios";

function HomeScreen() {

    const [products,setProducts] = useState([])

    useEffect(() => {
        async function fetchProducts() {

            const { data } = await axios.get('/api/products/')
            // http://127.0.0.1:8000/api/products/
            // console.log(data)
            setProducts(data)
            console.log(data)
        }

            fetchProducts()

    }, [])

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        </div>
    )
}


export default HomeScreen