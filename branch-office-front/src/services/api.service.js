import axios from "axios";

export const BASE_URL = 'http://localhost:5000/';


export const getAllProductSales = async () => {
    const response =  await axios.get(`${BASE_URL}product-sales`);                                                                                                   
    return response.data;
}

export const createAProductSale = (productSale) => {
    return axios.post(BASE_URL + 'product-sales', productSale);
}
