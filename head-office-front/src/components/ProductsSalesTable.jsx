import { useEffect, useState } from "react";
import { getAllProductSales } from "../services/api.service";

const ProductSalesTable =  () => {
    const [productSales, setProductSales] = useState([]);
    
    useEffect(() => {
        getAllProductSales()
            .then(setProductSales)
            .catch(err => console.log(err));
    }, []);


    return (
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Cost</th>
                    <th>Amount</th>
                    <th>Tax</th>
                    <th>Date</th>
                    <th>Region</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {productSales.map(productSale => (
                    <tr key={productSale.id}>
                        <td>{productSale.product}</td>
                        <td>{productSale.quanity}</td>
                        <td>{productSale.cost}</td>
                        <td>{productSale.amount}</td>
                        <td>{productSale.tax}</td>
                        <td>{new Date(productSale.date).toLocaleDateString()}</td>
                        <td>{productSale.region}</td>
                        <td>{productSale.total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ProductSalesTable;