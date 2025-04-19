document.addEventListener("DOMContentLoaded", function () {
  // Load navbar content
  if (document.getElementById("navbar-container")) {
    fetch("NavBar.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("navbar-container").innerHTML = data;
        // Initialize cart icon after navbar loads
        const cartIcon = document.getElementById("cartIcon");
        if (cartIcon) {
          cartIcon.addEventListener("click", showCartModal);
        }
      })
      .catch((error) => {
        console.error("Error loading navbar:", error);
      });
  }

  // Set up sidebar toggle functionality
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");
  const contentWrapper = document.querySelector(".content-wrapper");
  const navbar = document.querySelector("nav");

  if (sidebarToggle && sidebar && contentWrapper) {
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");

      if (sidebar.classList.contains("active")) {
        contentWrapper.style.marginLeft = "250px";
        if (navbar) {
          navbar.style.marginLeft = "250px";
          navbar.style.width = "calc(100% - 250px)";
        }
      } else {
        contentWrapper.style.marginLeft = "0";
        if (navbar) {
          navbar.style.marginLeft = "0";
          navbar.style.width = "100%";
        }
      }
    });
  }

  // Contact Form Validation (keep this part as is)
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  // ... (keep the rest of your contact form validation code)
});

// Initialize cart
const cart = new ShoppingCart();

// Function to show cart modal
function showCartModal() {
    // ... (use the same showCartModal function from your cart.js file)
}