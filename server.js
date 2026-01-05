
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { v4: uuidv4 } = require("uuid");
const LocalFileStorage = require("./localFile");


app.use(express.json());



app.get("/api/cart/:cartId", (req, res) => {
    const cartId = req.params.cartId;
    const cart= LocalFileStorage.getCart(cartId)
    return res.json(cart);
});

app.post("/api/cart", (req, res) => {
    
    const cartId = uuidv4();
    // console.log(cartId);
    const newCart = {
      cartId,
      Items:[]
    }

    LocalFileStorage.createCart(newCart);

    return res.status(201).json({ message: "Cart created", cartId});
});

app.post("/api/cart/:cartId/items", (req, res) => {
    
    const cartId = req.params.cartId;

    const itemData = req.body;
     
    const updatedCart = LocalFileStorage.updateCart(cartId, itemData)

    return res.status(201).json(updatedCart);
});

app.post("/api/cart/:cartId/items/:itemId", (req, res) => {
    
    const cartId = req.params.cartId;

    const itemId = req.params.itemId;

    const itemData = req.body;
     
    const updatedCart = LocalFileStorage.updateItem(cartId, itemId, itemData)

    return res.status(201).json(updatedCart);
});

app.delete("/api/cart/:cartId/items/:itemId", (req, res) => {
  
    const  cartId = req.params.cartId;

    const itemId =  req.params.itemId;

    
    const deleteItem = LocalFileStorage.deleteItem(cartId, itemId);

  

    return res.status(200).json(deleteItem);
  


});

app.delete("/api/cart/:cartId",(req,res)=>{

  const  cartId = req.params.cartId;

  const deleteCart =LocalFileStorage.deleteCart(cartId);

   return res.status(200).json(deleteCart);

})





app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
