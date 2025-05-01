document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("navbar-container")) {
    fetch("/NavBar.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("navbar-container").innerHTML = data;

        const cartIcon = document.getElementById("cartIcon");
        if (cartIcon) {
          cartIcon.addEventListener("click", showCartModal);
        }

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
