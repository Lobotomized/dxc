const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; // Choose your desired port

// Sample product data (JSON array)
const products = [
    { id: 1, name: "Iced Latte", price: 4.50, description: "Espresso, milk, and ice", image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/iced-latte-30188f7.jpg?quality=90&webp=true&resize=375,341" },
    { id: 2, name: "Cappuccino", price: 3.75, description: "Espresso, steamed milk, and foam", image: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Cappuccino_at_Sightglass_Coffee.jpg" },
    { id: 3, name: "Sparkling Water", price: 1.25, description: "Carbonated water", image: "https://media.glamour.com/photos/612e8c3507fad1eb61cb4cdb/master/w_2560%2Cc_limit/1186624437" },
    { id: 4, name: "Mango Smoothie", price: 5.25, description: "Mango, yogurt, and ice", image: "https://www.acouplecooks.com/wp-content/uploads/2020/06/Mango-Smoothie-007.jpg" },
    { id: 5, name: "Espresso", price: 2.50, description: "Strong black coffee", image:"https://media.istockphoto.com/id/136625069/photo/coffee-espresso.jpg?s=1024x1024&w=is&k=20&c=n9nc0dqcQJcM7BXQmynvdZw6KA4BdIbmRghAovXWb34="}, 

    { id: 6, name: "Iced Latte", price: 4.50, description: "Espresso, milk, and ice", image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/iced-latte-30188f7.jpg?quality=90&webp=true&resize=375,341" },
    { id: 7, name: "Cappuccino", price: 3.75, description: "Espresso, steamed milk, and foam", image: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Cappuccino_at_Sightglass_Coffee.jpg" },
    { id: 8, name: "Sparkling Water", price: 1.25, description: "Carbonated water", image: "https://media.glamour.com/photos/612e8c3507fad1eb61cb4cdb/master/w_2560%2Cc_limit/1186624437" },
    { id: 9, name: "Mango Smoothie", price: 5.25, description: "Mango, yogurt, and ice", image: "https://www.acouplecooks.com/wp-content/uploads/2020/06/Mango-Smoothie-007.jpg" },
    { id: 10, name: "Espresso", price: 2.50, description: "Strong black coffee", image:"https://media.istockphoto.com/id/136625069/photo/coffee-espresso.jpg?s=1024x1024&w=is&k=20&c=n9nc0dqcQJcM7BXQmynvdZw6KA4BdIbmRghAovXWb34="} ,
   
    { id: 11, name: "Iced Latte", price: 4.50, description: "Espresso, milk, and ice", image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/iced-latte-30188f7.jpg?quality=90&webp=true&resize=375,341" },
    { id: 12, name: "Cappuccino", price: 3.75, description: "Espresso, steamed milk, and foam", image: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Cappuccino_at_Sightglass_Coffee.jpg" },
    { id: 13, name: "Sparkling Water", price: 1.25, description: "Carbonated water", image: "https://media.glamour.com/photos/612e8c3507fad1eb61cb4cdb/master/w_2560%2Cc_limit/1186624437" },
    { id: 14, name: "Mango Smoothie", price: 5.25, description: "Mango, yogurt, and ice", image: "https://www.acouplecooks.com/wp-content/uploads/2020/06/Mango-Smoothie-007.jpg" },
    { id: 15, name: "Espresso", price: 2.50, description: "Strong black coffee", image:"https://media.istockphoto.com/id/136625069/photo/coffee-espresso.jpg?s=1024x1024&w=is&k=20&c=n9nc0dqcQJcM7BXQmynvdZw6KA4BdIbmRghAovXWb34="} 


  ];
// Enable CORS for all routes (you can customize this if needed)    
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your React app's origin
})); 

// GET route to fetch all products
app.get('/products', (req, res) => {
    res.json(products); 
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});