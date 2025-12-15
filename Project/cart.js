document.addEventListener("DOMContentLoaded", () => {
  // ---------- PRODUCT IMAGE SWAP (works on any product page) ----------
  const mainImage = document.querySelector(".main-image");
  const thumbnails = document.querySelectorAll(".thumb[data-image]");

  if (mainImage && thumbnails.length) {
    // set main image to first thumb by default (optional)
    const first = thumbnails[0].getAttribute("data-image");
    if (first) mainImage.style.backgroundImage = `url("${first}")`;

    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const img = thumb.getAttribute("data-image");
        if (img) mainImage.style.backgroundImage = `url("${img}")`;
      });
    });
  }

  // ---------- QUANTITY + ADD TO CART ----------
  const qtyEl = document.getElementById("quantity");
  const incBtn = document.getElementById("increase");
  const decBtn = document.getElementById("decrease");
  const addBtn = document.getElementById("addToCart");

  // If this page doesn't have cart controls, stop here safely
  if (!qtyEl || !incBtn || !decBtn || !addBtn) return;

  let quantity = 1;

  const productBox =
    document.querySelector("[data-product][data-price]") || document.body;

  const productName = productBox.getAttribute("data-product") || "Product";
  const productPrice = parseFloat(productBox.getAttribute("data-price")) || 0;

  const renderQty = () => {
    qtyEl.textContent = quantity;
  };

  incBtn.addEventListener("click", (e) => {
    e.preventDefault();
    quantity++;
    renderQty();
  });

  decBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (quantity > 1) quantity--;
    renderQty();
  });

  addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const item = {
      name: productName,
      price: productPrice,
      quantity: quantity
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((x) => x.name === item.name);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  });

  renderQty();
});

document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.querySelector(".original-page .main-image");
  const thumbnails = document.querySelectorAll(".original-page .thumb");

  if (!mainImage || thumbnails.length === 0) return;

  thumbnails.forEach(thumb => {
    thumb.addEventListener("click", () => {
      const img = thumb.getAttribute("data-image");
      mainImage.style.backgroundImage = `url("${img}")`;
    });
  });
});