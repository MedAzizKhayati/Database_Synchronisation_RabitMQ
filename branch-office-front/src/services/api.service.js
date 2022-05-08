import axios from "axios";

export const BASE_URL = 'http://localhost:5000/';


export const getAllProductSales = async () => {
    const response =  await axios.get(`${BASE_URL}product-sales`);                                                                                                   
    return response.data;
}

export const createAProductSale = (productSale) => {
    return axios.post(BASE_URL + 'product-sales', productSale);
}


export const synchronizeAllSales = () => {
    return axios.patch(BASE_URL + 'product-sales/synchronize');
}

export const synchronizeById = (id) => {
    return axios.patch(BASE_URL + 'product-sales/synchronize/'+id);
}

export const getProductSaleById = async (id) => {
    return (await axios.get(BASE_URL + 'product-sales/'+id)).data;
}

export const updateProductSale = async (id, productSale) => {
    const response =  await (axios.patch(BASE_URL + 'product-sales/'+id, productSale));
    return response.data;
}