import React from "react";
import {Pagination} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";


export const Paginate = ({pages, page, keyword='', isAdmin= false}) => {

    console.log(page)

    return (pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => (
                <div key={x + 1} style={{margin: '0 2px'}}>
                    <LinkContainer
                        to={!isAdmin ?
                        {pathname: '/', search: `keyword=${keyword}&page=${x + 1}`} :
                        { pathname: '/admin/productlist', search: `keyword=${keyword}&page=${x + 1}` }
                    }
                    >
                        <Pagination.Item active={(x + 1) === parseInt(page)}>
                            {x + 1}
                        </Pagination.Item>
                    </LinkContainer>
                </div>
            ))}
        </Pagination>
        )
    )
}