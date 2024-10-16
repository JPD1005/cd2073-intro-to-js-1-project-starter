/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
const products = [
  {name: "Cherries", price: 2.00, quantity: 0, productId: 100, image: "images/cherry.jpg"},
  {name: "Oranges", price: 1.50, quantity: 0, productId: 101, image: "images/orange.jpg"},
  {name: "Strawberries", price: 3.00, quantity: 0, productId: 102, image: "images/strawberry.jpg"}
];

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */
const cart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

// This Function searches through the products array using given SKU, and returns found the found product
function findProduct(productId) {
  let foundProduct;
  products.forEach(product => {
    if (product.productId === productId) {
      foundProduct = product;
    }
  })
  return foundProduct;
}

function addProductToCart(productId) {
  const foundProduct = findProduct(productId);
  foundProduct.quantity += 1;
  if (cart.indexOf(foundProduct) === -1) {
    cart.push(foundProduct);
  }}

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

function increaseQuantity(productId) {
  const foundProduct = findProduct(productId);
  foundProduct.quantity++;
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/
function decreaseQuantity(productId) {
  const foundProduct = findProduct(productId);
  foundProduct.quantity -= 1;
  if (foundProduct.quantity === 0) {
      let productIndex = cart.indexOf(foundProduct);
      cart.splice(productIndex, 1);
    }
  }

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/

function removeProductFromCart(productId) {
  const foundProduct = findProduct(productId);
  foundProduct.quantity = 0;
  let productIndex = cart.indexOf(foundProduct);
  cart.splice(productIndex, 1);
}

let totalPaid = 0;

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/

function cartTotal() {
  let total = 0;
  let calc = 0;
  cart.forEach(product => {
    calc = product.quantity * product.price;
    total += calc;
  })
  return total;
}

/* Create a function called emptyCart that empties the products from the cart */

function emptyCart() {
  cart.length = 0;
}

function pay(amount) {
  const total = cartTotal();
  let result = (amount + totalPaid) - total;
  totalPaid += amount;
  if (result >= 0) {
    totalPaid = 0;
  }
  return result;
}

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/

const originalPrices = [];
  products.forEach(product => {
    originalPrices.push(product.price);
})

// This function eliminates all digits to the right of the decimal point in converted currency except for the first two.
function conversion(price) {
  return Number.parseFloat(price).toFixed(2);
}

//This function converts each original price to the rates of the new currency
function convert(newPrice) {
  let i = 0;
  products.forEach(product => {
    product.price = originalPrices[i];
    product.price *= newPrice;
    i++;
    product.price = conversion(product.price);
  })
}

/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

//This function takes original prices and replaces them with the value of the new currency. USD is default.
function currency(money) {
  if (money === "EUR") {
    convert(0.92);
  } else if (money === "YEN") {
    convert(149.5);
  } else {
    convert(1);
  }
}


module.exports = {
   products,
   cart,
   originalPrices,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay, 
   emptyCart,
   /* Uncomment the following line if completing the currency converter bonus */
   currency,
}
