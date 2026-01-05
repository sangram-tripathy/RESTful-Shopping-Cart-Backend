
const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "carts.json");


function readFile() {
  try {
    
    const data = fs.readFileSync(DATA_FILE, "utf8");
    
    return JSON.parse(data);
  } catch (err) {
    
    return {};
  }
}

function writeFile(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

function updateFile(cart) {
    const allData = readFile();
    allData[cart.cartId] = cart;
    writeFile(allData);   
}

class LocalFileStorage {
  
  static createCart(cart) {
    updateFile(cart)
    return cart;
  }

  
  static getCart(cartId) {
    const allData = readFile();
    console.log(allData)
    return allData[cartId] || null;
  }

  static updateCart(cartId, item){

    const existingCart = this.getCart(cartId)
    

    let existingItems = existingCart.Items;
   
    existingItems.push(item)
    
    existingCart.Items = existingItems

    updateFile(existingCart);

    return existingCart;
     

  }

  static updateItem(cartId, itemId, itemData){

    const existingCart = this.getCart(cartId)
    

    let existingItems = existingCart.Items;
    
    const itemIndex = existingItems.findIndex(obj => obj.itemId === itemId);

    existingItems[itemIndex].quantity= itemData.quantity;

    
    existingCart.Items = existingItems

    updateFile(existingCart);

    return existingCart;

  }

  static deleteItem(cartId, itemId){

    const newCart = this.getCart(cartId)
    if (!newCart) {
      return {message : "Cart not found."};
    }

    let itemCart = newCart.Items;

    const itemIndex =  itemCart.findIndex(obj => obj.itemId === itemId);

    if (itemIndex !== -1) {

    itemCart.splice(itemIndex, 1);

   }
    newCart.Items = itemCart

    updateFile(newCart)

    return  newCart




  }

   static deleteCart(cartId){
      const file = readFile();


      const deletedCart = file[cartId];

      if (!deletedCart) {
      return {message : "Cart not found."};
    }


      delete file[cartId];

      writeFile(file)


      return { success: true, message: "Cart deleted successfully", cart: deletedCart

      }


   }



  }  
module.exports = LocalFileStorage;
  

  

