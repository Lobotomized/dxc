import { useEffect, useRef, useState } from 'react';
import { GetProductsResponse } from './interfaces'
import { CoinCounter, Product } from './types';
import './App.css';
import VendorForm from './VendorForm';
import NewProductForm from './NewProductForm';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [insertedAmount, setInsertedAmount] = useState(0);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [currentScreen, setCurrentScreen] = useState("vendor");
  const statusMessageRef = useRef<HTMLParagraphElement>(null); 
  const formRef = useRef<HTMLFormElement>(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products') as unknown as GetProductsResponse;
        
        if(response && response.ok){
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        

        const data: Product[] = await response.json(); 
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  

  const createProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const deleteProduct = (productId: number) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleCoinClick = (amount: number) => {
    setInsertedAmount(insertedAmount + amount);
  };

  const handleResetClick = () => {
    setInsertedAmount(0);
    setStatusMessage(''); 
  };

  const handleBuyClick = (product: Product) => {
    if (insertedAmount >= product.price) {
      deleteProduct(product.id);

      const change = insertedAmount - product.price;
      setInsertedAmount(0); 

      const coinDenominations:number[] = [1, 0.5, 0.2, 0.1, 0.05];
      const changeBreakdown:CoinCounter = {};
      let remainingChange:number = change;

      for (const denomination of coinDenominations) {
        changeBreakdown[denomination] = Math.floor(remainingChange / denomination);
        remainingChange %= denomination;
        remainingChange = parseFloat((Math.ceil(remainingChange*20)/20).toFixed(2))
      }
      console.log(changeBreakdown)

      setStatusMessage(
        `${product.name} is bought. The change is ${Object.entries(changeBreakdown)
          .filter(([_, count]) => count != undefined && count > 0)
          .map(([denomination, count]) => {
           return `${count} ${denomination}$ coin` + (count && count > 1? "s" : "")
          })
          .join(', ')}.`
      );
    } else {
      setStatusMessage('Not enough money');
    }
    if (statusMessageRef.current) {
      statusMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleEditClick = (productId: number) => {
    setEditingProductId(productId);
  };

  const handleCancelClick = () => {
    setEditingProductId(null);
  };

  const handleSaveClick = (productId: number) => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      const updatedProduct: Product = {
        id: productId,
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        image: formData.get('image') as string,
      };

      updateProduct(updatedProduct);
      setEditingProductId(null);
    }
  };
  return (
    <div className="app-container">
     <div className="app-content">
     <nav>
        <button onClick={() => setCurrentScreen("vendor")}>Vendor</button>
        <button onClick={() => setCurrentScreen("admin")}>Admin</button>
      </nav>
      <h1>Product Catalog</h1>

      {currentScreen === "vendor" && (
          <>
            <p className="status-message" ref={statusMessageRef}>
              {statusMessage}
            </p>
            <VendorForm
              insertedAmount={insertedAmount}
              handleCoinClick={handleCoinClick}
              handleResetClick={handleResetClick}
            />

            <div className="product-list">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <div className="product-buttons">
                    <button onClick={() => handleBuyClick(product)}>Buy</button>

                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      {currentScreen === "admin" && (
        <>
          <NewProductForm onCreateProduct={createProduct} />

          <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-card">
              {editingProductId === product.id ? (
                <form ref={formRef} className="edit-product-form"> 
                  <div className="margin-bottom">
                    <label htmlFor="name">Name:</label>
                    <input name="name" type="text" defaultValue={product.name} />
                  </div>
                  <div className="margin-bottom">
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" defaultValue={product.description} />
                  </div>
                  <div className="margin-bottom">
                    <label htmlFor="price">Price:</label>
                    <input name="price" type="number" defaultValue={product.price} />
                  </div>
                  <div className="margin-bottom">
                    <label htmlFor="image">Image URL:</label>
                    <input name="image" type="text" defaultValue={product.image} />
                  </div>
                  <div className="product-buttons">
                    <button type="button" onClick={() => handleSaveClick(product.id)}>Save</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                    
                  </div>

                </form>
              ) : (
                <>
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <div className="product-buttons">
                    <button onClick={() => handleEditClick(product.id)}>Edit</button>
                    <button onClick={() => deleteProduct(product.id)}>Delete</button>

                  </div>
                </>
              )}
            </div>
          ))}
          </div>
        </>
        )}
      </div>
    </div>  
    );
}

export default App;