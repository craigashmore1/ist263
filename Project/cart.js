// ====== QUANTITY CONTROLS ======
let quantity = 1;

const quantityDisplay = document.getElementById("quantity");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");

increaseBtn.addEventListener("click", () => {
  quantity++;
  quantityDisplay.textContent = quantity;
});

decreaseBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    quantityDisplay.textContent = quantity;
  }
});

// ====== ADD TO CART ======
const addToCartBtn = document.getElementById("addToCart");

addToCartBtn.addEventListener("click", () => {
  const product = {
    name: "Original Urinal Beer Keg",
    price: 79.99,
    quantity: quantity
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if product already exists
  const existingProduct = cart.find(item => item.name === product.name);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart!");
});