import React, {useState,useEffect} from "react";


const FormUI = () => {
    const [productNo, setProductNo] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productList, setProductList] = useState([]);
    const [totalValue, setTotalValue]=useState(0);
    const [dataLoaded,setDataLoaded]=useState(false);



    useEffect(()=>{
        const storedProducts = JSON.parse(localStorage.getItem('productList'));
        const storedTotalValue = parseFloat(localStorage.getItem('totalValue'));
        
        
        setProductList(storedProducts);
        setTotalValue(storedTotalValue);
        setDataLoaded(true);
    },[]);

    useEffect(()=>{
        if (dataLoaded){
            localStorage.setItem('productList', JSON.stringify(productList));
            localStorage.setItem('totalValue',totalValue.toString());
    
        }
    },[productList,totalValue,dataLoaded]);



    const handleAddToList =() =>{
        if (productNo && productName && productPrice){
            const newProduct = {
                productNo,
                productName,
                productPrice
            }

            setProductList([...productList,newProduct]);

            setTotalValue(totalValue+parseFloat(productPrice));

            setProductNo('');
            setProductName('');
            setProductPrice('');
        }
    }

    const handleDeleteItem =(index)=>{
        const deletedProduct = productList[index];

        setTotalValue(totalValue - parseFloat(deletedProduct.productPrice));


        const updatedProducts=[...productList];
        updatedProducts.splice(index,1);
        setProductList(updatedProducts);
    }

    

    return (

        <>
        <h1>Seller Site.</h1>
        <form>
        <label> Product No.
            <input 
                type= "number"
                value = {productNo}
                onChange={(e) => setProductNo(e.target.value)}
            ></input>
        </label>
        <label> Product Name
            <input 
            type= "text"
            value = {productName}
            onChange={(e) => setProductName(e.target.value)}
            ></input>
        </label>
        <label> Product Price
            <input 
                type= "number"
                value = {productPrice}
                onChange={(e) => setProductPrice(e.target.value)}></input>
        </label>
        </form>
        <button onClick={handleAddToList}>Add to List</button>
        <h2>Products List</h2>
        <ul>
            {productList.map((product,index)=>(
                <li key={index}>
                    {product.productPrice},{product.productName}
                    <button onClick={()=>handleDeleteItem(index)}>Delete Item</button>
                </li>
            ))}
        </ul>
        <h3>Total Value of Products : Rs {totalValue}</h3>
        </>
    );
}
export default FormUI;