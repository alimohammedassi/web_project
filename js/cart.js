class ShoppingCart {
  constructor() {
    this.cart = [];
    this.loadCart();
    this.updateCartCount();
  }

  addItem(product) {
    const existingItem = this.cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.saveCart();
    this.updateCartCount();
  }

  removeItem(id) {
    this.cart = this.cart.filter((item) => item.id != id); // مقارنة مرنة لدعم string أو int
    this.saveCart();
    this.updateCartCount();
  }

  updateQuantity(id, quantity) {
    const item = this.cart.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
      this.updateCartCount();
    }
  }

  getTotalItems() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
  }

  loadCart() {
    const savedCart = localStorage.getItem("shoppingCart");
    this.cart = savedCart ? JSON.parse(savedCart) : [];
  }

  updateCartCount() {
    const countElement = document.getElementById("cartCount");
    if (countElement) {
      countElement.textContent = this.getTotalItems();
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateCartCount();
  }
}

window.cart = new ShoppingCart();

function showCartModal() {
  // Remove any existing modal first to prevent duplicates
  const existingModal = document.querySelector(".cart-modal");
  if (existingModal) {
    document.body.removeChild(existingModal);
  }

  const modal = document.createElement("div");
  modal.className = "cart-modal";
  modal.innerHTML = `
      <div class="cart-modal-content">
          <span class="close-cart">&times;</span>
          <h2>Your Shopping Cart</h2>
          <div class="cart-items-container"></div>
          <div class="cart-total">
              <p>Total: $<span id="cartTotalPrice">${window.cart
                .getTotalPrice()
                .toFixed(2)}</span></p>
              <button id="checkoutBtn">Proceed to Checkout</button>
          </div>
      </div>
  `;

  document.body.appendChild(modal);

  const itemsContainer = modal.querySelector(".cart-items-container");

  if (window.cart.cart.length === 0) {
    itemsContainer.innerHTML = `
          <div class="empty-cart">
              <p>Your cart is empty</p>
          </div>
      `;
  } else {
    window.cart.cart.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "cart-item";
      itemElement.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <div class="cart-item-details">
                  <h3>${item.name}</h3>
                  <p>$${item.price.toFixed(2)}</p>
                  <div class="quantity-controls">
                      <button class="quantity-btn minus" data-id="${
                        item.id
                      }">-</button>
                      <span>${item.quantity}</span>
                      <button class="quantity-btn plus" data-id="${
                        item.id
                      }">+</button>
                  </div>
              </div>
              <button class="remove-item" data-id="${item.id}">&times;</button>
          `;
      itemsContainer.appendChild(itemElement);
    });
  }

  // Close modal event
  modal.querySelector(".close-cart").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  // Quantity buttons event listeners
  modal.querySelectorAll(".quantity-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      const item = window.cart.cart.find((item) => item.id === id);
      if (e.target.classList.contains("plus")) {
        window.cart.updateQuantity(id, item.quantity + 1);
      } else if (item.quantity > 1) {
        window.cart.updateQuantity(id, item.quantity - 1);
      }
      // Reopen modal to refresh contents
      showCartModal();
    });
  });

  // Remove item buttons event listeners
  modal.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      window.cart.removeItem(id);
      // Reopen modal to refresh contents
      showCartModal();
    });
  });

  // Checkout button event
  modal.querySelector("#checkoutBtn").addEventListener("click", () => {
    // Check if cart is not empty
    if (window.cart.cart.length > 0) {
      // Redirect to payment page
      window.location.href = "/payment.html";
    } else {
      alert("Your cart is empty. Add some products before checkout.");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Setup cart icon click event if it exists
  const cartIcon = document.getElementById("cartIcon");
  if (cartIcon) {
    cartIcon.addEventListener("click", showCartModal);
  }

  // If we're on the cart page, display the cart items
  if (window.location.pathname.includes("cart.html")) {
    displayCartItems();
  }
});

// Function to display cart items on the cart.html page
function displayCartItems() {
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotalPrice = document.querySelector(".cart-total-price");

  if (cartItemsContainer) {
    // Clear existing content
    cartItemsContainer.innerHTML = "";

    if (window.cart.cart.length === 0) {
      // Show empty cart message
      cartItemsContainer.innerHTML = `
              <div class="empty-cart">
                  <div class="empty-cart-icon">🛒</div>
                  <p>Your cart is empty</p>
              </div>
          `;
    } else {
      // Create cart items list
      window.cart.cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
                  <div class="cart-item-image">
                      <img src="${item.image}" alt="${item.name}">
                  </div>
                  <div class="cart-item-details">
                      <h3 class="cart-item-name">${item.name}</h3>
                      <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                      <div class="cart-item-quantity">
                          <button class="quantity-btn minus" data-id="${
                            item.id
                          }">-</button>
                          <span class="quantity-value">${item.quantity}</span>
                          <button class="quantity-btn plus" data-id="${
                            item.id
                          }">+</button>
                      </div>
                  </div>
                  <button class="remove-cart-item" data-id="${
                    item.id
                  }">Remove</button>
              `;
        cartItemsContainer.appendChild(cartItem);
      });

      // Add event listeners for quantity buttons and remove buttons
      cartItemsContainer.querySelectorAll(".quantity-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = parseInt(e.target.getAttribute("data-id"));
          const item = window.cart.cart.find((item) => item.id === id);
          if (e.target.classList.contains("plus")) {
            window.cart.updateQuantity(id, item.quantity + 1);
          } else if (item.quantity > 1) {
            window.cart.updateQuantity(id, item.quantity - 1);
          }
          displayCartItems(); // Refresh the cart display
        });
      });

      cartItemsContainer
        .querySelectorAll(".remove-cart-item")
        .forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            window.cart.removeItem(id);
            displayCartItems(); // Refresh the cart display
          });
        });
    }

    // Update total price
    if (cartTotalPrice) {
      cartTotalPrice.textContent = `$${window.cart.getTotalPrice().toFixed(2)}`;
    }

    // Update checkout button to link to payment page
    const checkoutBtn = document.querySelector(".checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        if (window.cart.cart.length > 0) {
          window.location.href = "/payment.html";
        } else {
          alert("Your cart is empty. Add some products before checkout.");
        }
      });
    }
  }
}
