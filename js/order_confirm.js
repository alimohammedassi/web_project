window.onload = function () {
  const orderData = JSON.parse(localStorage.getItem("orderData"));

  if (orderData) {
    // عرض تفاصيل المنتجات
    const itemsContainer = document.querySelector(".order-details");
    orderData.items.forEach((item) => {
      itemsContainer.innerHTML += `
          <div class="order-item">
            <img src="${item.image}" alt="${item.name}" />
            <div class="order-item-details">
              <p>${item.name}</p>
              <p>Quantity: ${item.quantity}</p>
              <p>Price: $${item.price}</p>
            </div>
          </div>
        `;
    });

    // عرض إجمالي المبلغ
    document.querySelector(
      ".order-total span:last-child"
    ).textContent = `$${orderData.total}`;

    // عرض معلومات العميل
    document.querySelector(
      ".customer-info .info-item:nth-child(1) div"
    ).textContent = orderData.customer.name;
    document.querySelector(
      ".customer-info .info-item:nth-child(2) div"
    ).textContent = orderData.customer.email;
    document.querySelector(
      ".customer-info .info-item:nth-child(3) div"
    ).textContent = orderData.customer.phone;
    document.querySelector(
      ".customer-info .info-item:nth-child(4) div"
    ).textContent = orderData.customer.address;
  }
};
