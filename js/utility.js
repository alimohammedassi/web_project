// Load navbar on all pages
document.addEventListener("DOMContentLoaded", function () {
    // Load navbar content if navbar container exists
    if (document.getElementById("navbar-container")) {
      fetch("/NavBar.html")
        .then((response) => response.text())
        .then((data) => {
          document.getElementById("navbar-container").innerHTML = data;
          // Initialize cart icon after navbar loads
          const cartIcon = document.getElementById("cartIcon");
          if (cartIcon) {
            cartIcon.addEventListener("click", showCartModal);
          }
          
          // Initialize dark mode toggle
          const darkModeToggle = document.querySelector(".toggle-btn");
          if (darkModeToggle) {
            darkModeToggle.addEventListener("click", toggleDarkMode);
          }
        })
        .catch((error) => {
          console.error("Error loading navbar:", error);
        });
    }
  });
  
  // Dark mode toggle function
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    // Store user preference in localStorage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  }
  
  // Check for saved dark mode preference on page load
  function checkDarkModePreference() {
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-mode");
    }
  }
  
  // Run on page load
  checkDarkModePreference();