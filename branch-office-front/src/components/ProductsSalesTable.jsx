import { useEffect, useState } from "react";
import { createAProductSale, getAllProductSales } from "../services/api.service";

const ProductSalesTable =  () => {
    const [productSales, setProductSales] = useState([]);
    const [productSale, setProductSale] = useState({
        product: "",
        quanity: 0,
        cost: 0,
        total: 0,
        tax: 0,
        amount: 0,
        date: new Date(),
        branchOffice: 1,
        region: "",
    });

    useEffect(() => {
        getAllProductSales()
            .then(setProductSales)
            .catch(err => console.log(err));
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductSale({ ...productSale, [name]: value });
    };

    const handleSave = (e) => {
        for(let key in productSale) {
            if(!productSale[key]) {
                alert(`${key} is required`);
                return;
            }
        }
        createAProductSale(productSale).then(() => {
            getAllProductSales()
                .then(setProductSales)
                .catch(err => console.log(err))
        }).catch(err => console.log(err));
    };

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
                    <tr key={productSale._id}>
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
                <tr className="sale-form" onChange={handleChange}>
                    <td><input name="product"/></td>
                    <td><input type="number" name="quanity"/></td>
                    <td><input type="number" name="cost"/></td>
                    <td><input type="number" name="amount"/></td>
                    <td><input type="number" name="tax"/></td>
                    <td><input type="date" name="date"/></td>
                    <td><input name="region"/></td>
                    <td><input type="number" name="total"/></td>
                    <td><button onClick={handleSave}>SAVE</button></td>
                </tr>
            </tbody>

        </table>
    );
}

export default ProductSalesTable;