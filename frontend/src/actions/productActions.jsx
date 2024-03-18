import axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from "../constants/productConstants.jsx";

export const listproducts = () => async (dispatch) => {
    try {
        console.log("Dispatching PRODUCT_LIST_REQUEST");
        dispatch({ type: PRODUCT_LIST_REQUEST });

        const { data } = await axios.get(`/api/products`);

        console.log("Dispatching PRODUCT_LIST_SUCCESS with data:", data);
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error("Dispatching PRODUCT_LIST_FAIL with error:", error);
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};



export const listproductDetails = (id) => async (dispatch) => {
    try {
        console.log("Dispatching PRODUCT_LIST_REQUEST");
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/products/${id}`);

        console.log("Dispatching PRODUCT_LIST_SUCCESS with data:", data);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error("Dispatching PRODUCT_LIST_FAIL with error:", error);
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};