import { useRef } from "react";
import { Product } from "./types";

interface NewProductFormProps {
    onCreateProduct: (newProduct: Product) => void;
  }
  
  const NewProductForm: React.FC<NewProductFormProps> = ({ onCreateProduct }) => {
    const formRef = useRef<HTMLFormElement>(null);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      if (formRef.current) {
        const formData = new FormData(formRef.current);
  
        const newProduct: Product = {
          id: Date.now(), // Use timestamp for a simpler unique ID
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          price: parseFloat(formData.get('price') as string),
          image: formData.get('image') as string,
        };
  
        onCreateProduct(newProduct);
        formRef.current.reset();
      }
    };
  
    return (
      <div className="new-product-form">
        <h2>Create New Product</h2>
        <form  onSubmit={handleSubmit} ref={formRef}>
          <div className="margin-bottom">
            <label htmlFor="name">Name:</label>
            <input name="name" type="text" id="name"  />
          </div>
          <div className="margin-bottom">
            <label htmlFor="description">Description:</label>
            <textarea name="description" id="description" />
          </div>
          <div className="margin-bottom">
            <label htmlFor="price">Price:</label>
            <input name="price" type="number" id="price" />
          </div>
          <div className="margin-bottom">
            <label htmlFor="image">Image URL:</label>
            <input name="image" type="text" id="image" />
          </div>
          <button type="submit">Create Product</button>
        </form>
      </div>
    );
  };
  
  export default NewProductForm;