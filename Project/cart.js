document.addEventListener("DOMContentLoaded", () => {
  // =========================
  //  A) PRODUCT PAGE LOGIC
  // =========================

  // Thumbnail click -> swap main image (works anywhere)
  const mainImage = document.querySelector(".main-image");
  const thumbs = document.querySelectorAll(".thumb[data-image]");

  if (mainImage && thumbs.length) {
    // Optional: set main image to first thumb on load
    const first = thumbs[0].getAttribute("data-image");
    if (first) mainImage.style.backgroundImage = `url("${first}")`;

    thumbs.forEach((t) => {
      t.addEventListener("click", () => {
        const img = t.getAttribute("data-image");
        if (img) mainImage.style.backgroundImage = `url("${img}")`;
      });
    });
  }

  // Quantity + Add to Cart (only runs if the elements exist)
  const qtyEl = document.getElementById("quantity");
  const incBtn = document.getElementById("increase");
  const decBtn = document.getElementById("decrease");
  const addBtn = document.getElementById("addToCart");

  if (qtyEl && incBtn && decBtn && addBtn) {
    let quantity = 1;

    const productBox = document.querySelector("[data-product][data-price]");
    const name = productBox?.getAttribute("data-product") || "Product";
    const price = parseFloat(productBox?.getAttribute("data-price")) || 0;

    const renderQty = () => (qtyEl.textContent = quantity);

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

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find((item) => item.name === name);

      if (existing) existing.quantity += quantity;
      else cart.push({ name, price, quantity });

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart!");
    });

    renderQty();
  }

  // =========================
  //  B) CART PAGE LOGIC
  // =========================

  const cartItemsDiv = document.getElementById("cartItems");
  const cartTotalSpan = document.getElementById("cartTotal");

  // Only run this section if we're on cart.html (elements exist)
  if (cartItemsDiv && cartTotalSpan) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const saveCart = () => localStorage.setItem("cart", JSON.stringify(cart));

    const renderCart = () => {
      cartItemsDiv.innerHTML = "";
      let total = 0;

      if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalSpan.textContent = "0.00";
        return;
      }

      cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
          <h3>${item.name}</h3>

          <div class="qty-controls">
            <button type="button" data-action="dec" data-index="${index}">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-action="inc" data-index="${index}">+</button>
          </div>

          <div>$${(item.price * item.quantity).toFixed(2)}</div>

          <button type="button" class="remove-btn" data-action="remove" data-index="${index}">✕</button>
        `;

        cartItemsDiv.appendChild(row);
      });

      cartTotalSpan.textContent = total.toFixed(2);
    };

    // One event listener for all buttons (no inline onclick needed)
    cartItemsDiv.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const action = btn.getAttribute("data-action");
      const index = Number(btn.getAttribute("data-index"));
      if (Number.isNaN(index) || !cart[index]) return;

      if (action === "inc") cart[index].quantity += 1;
      if (action === "dec") cart[index].quantity = Math.max(1, cart[index].quantity - 1);
      if (action === "remove") cart.splice(index, 1);

      saveCart();
      renderCart();
    });

    renderCart();
  }
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