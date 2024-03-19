import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Carousel, Image} from "react-bootstrap";
import {Loader} from "./Loader.jsx";
import {Message} from "./Message.jsx";
import {listTopProducts} from "../actions/productActions.jsx";
import Product from "./Product.jsx";

export const ProductCarousel = () => {

    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const {error, loading, products} = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (loading ? <Loader/>
            :error
            ? <Message variant={'danger'}>{error}</Message>
            : (
                <Carousel pause={'hover'} className={'bg-dark'}>
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link
                                to={`/products/${product._id}`}
                            >
                                <Image src={product.image} alt={product.name} fluid />
                                <Carousel.Caption className={'carousel-caption'}>
                                    <h4>{Product.name} (${product.price})</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )
    )
}