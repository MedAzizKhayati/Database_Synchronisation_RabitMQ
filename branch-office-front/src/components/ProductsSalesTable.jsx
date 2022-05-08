import { useEffect, useState } from "react";
import { createAProductSale, getAllProductSales, getProductSaleById, synchronizeAllSales, synchronizeById, updateProductSale } from "../services/api.service";

const ProductSalesTable = () => {
    const [productSales, setProductSales] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [productSale, setProductSale] = useState({
        product: "SCIZZORS",
        quanity: 20,
        cost: 1500,
        total: 15000,
        tax: 20,
        amount: 10,
        date: "2022-07-07",
        branchOffice: 1,
        region: "NORTH",
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
        delete productSale._id;
        for (let key in productSale) {
            if (!productSale[key]) {
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

    const alterProductSale = (sale) => {
        const index = productSales.findIndex(productSale => productSale._id === sale._id);
        productSales[index] = { ...productSales[index], ...sale };
        setProductSales([...productSales]);
    }

    const synchronize = async (sale) => {
        alterProductSale({ ...sale, isLoading: true });
        try {
            const response = await synchronizeById(sale._id);
        } catch (error) {
            alterProductSale({ ...sale, isLoading: false });
            return alert(error);
        }
        setTimeout(async () => {
            const productSale = await getProductSaleById(sale._id);
            alterProductSale({ ...productSale, isLoading: false });
        }, 500);
    }

    const synchronizeAll = async () => {
        await synchronizeAllSales();
        productSales.forEach(productSale => {
            !productSale.synchronized && 
            alterProductSale({ ...productSale, isLoading: true });
        })
        setTimeout(async () => {
            getAllProductSales()
                .then(setProductSales)
                .catch(err => console.log(err));
        }, 1000);
    }

    const editMode = (sale) => {
        setIsEditing(true);
        for (let key in productSale) {
            productSale[key] = sale[key] || productSale[key];
        }
        productSale._id = sale._id;
        console.log(productSale);
        setProductSale({...productSale});
    }

    const handleEdit = async () => {
        setIsEditing(false);
        if(!productSale._id) return;
        const sale = await updateProductSale(productSale._id, productSale); 
        alterProductSale(sale);
    }

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
                        <td><button onClick={() => editMode(productSale)}>EDIT</button></td>
                        <td>
                            {
                                productSale.isLoading ?
                                    <span className="loading">Loading...</span> :
                                    productSale.synchronized ?
                                        <span className="synchronized">Synchronized</span> :
                                        <span className="not-synchronized" onClick={() => synchronize(productSale)}>Click To Sync</span>
                            }
                        </td>
                    </tr>
                ))}
                <tr className="sale-form" onChange={handleChange}>
                    <td><input value={productSale.product} name="product" /></td>
                    <td><input value={productSale.quanity} type="number" name="quanity" /></td>
                    <td><input value={productSale.cost} type="number" name="cost" /></td>
                    <td><input value={productSale.amount} type="number" name="amount" /></td>
                    <td><input value={productSale.tax} type="number" name="tax" /></td>
                    <td><input value={productSale.date} type="date" name="date" /></td>
                    <td><input value={productSale.region} name="region" /></td>
                    <td><input value={productSale.total} type="number" name="total" /></td>
                    {
                        isEditing ?
                            <>
                                <td><button onClick={handleEdit}>SUBMIT</button></td>
                                <td><button onClick={() => setIsEditing(false)}>CANCEL</button></td>
                            </> :
                            <td><button onClick={handleSave}>SAVE</button></td>
                    }
                    <td>
                        {
                            !productSales.every((sale) => sale.synchronized) &&
                            <span onClick={synchronizeAll} className="not-synchronized">Sync All</span>
                        }
                    </td>
                </tr>
            </tbody>

        </table>
    );
}

export default ProductSalesTable;