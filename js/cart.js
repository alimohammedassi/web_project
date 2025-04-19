
class ShoppingCart {
    constructor() {
        this.cart = [];
        this.loadCart();
        this.updateCartCount();
    }

    addItem(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({...product, quantity: 1});
        }
        this.saveCart();
        this.updateCartCount();
    }

    removeItem(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveCart();
        this.updateCartCount();
    }

    updateQuantity(id, quantity) {
        const item = this.cart.find(item => item.id === id);
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
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    }

    loadCart() {
        const savedCart = localStorage.getItem('shoppingCart');
        this.cart = savedCart ? JSON.parse(savedCart) : [];
    }

    updateCartCount() {
        const countElement = document.getElementById('cartCount');
        if (countElement) {
            countElement.textContent = this.getTotalItems();
        }
    }
}

const cart = new ShoppingCart();

// دالة لعرض عربة التسوق
function showCartModal() {
    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    modal.innerHTML = `
        <div class="cart-modal-content">
            <span class="close-cart">&times;</span>
            <h2>Your Shopping Cart</h2>
            <div class="cart-items-container"></div>
            <div class="cart-total">
                <p>Total: $<span id="cartTotalPrice">${cart.getTotalPrice().toFixed(2)}</span></p>
                <button id="checkoutBtn">Proceed to Checkout</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // عرض العناصر
    const itemsContainer = modal.querySelector('.cart-items-container');
    cart.cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">&times;</button>
        `;
        itemsContainer.appendChild(itemElement);
    });

    // أحداث الأزرار
    modal.querySelector('.close-cart').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const item = cart.cart.find(item => item.id === id);
            if (e.target.classList.contains('plus')) {
                cart.updateQuantity(id, item.quantity + 1);
            } else if (item.quantity > 1) {
                cart.updateQuantity(id, item.quantity - 1);
            }
            showCartModal(); // إعادة تحميل السلة
        });
    });

    modal.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            cart.removeItem(e.target.getAttribute('data-id'));
            showCartModal(); // إعادة تحميل السلة
        });
    });

    modal.querySelector('#checkoutBtn').addEventListener('click', () => {
        alert('Proceeding to checkout!');
        // يمكنك توجيه المستخدم إلى صفحة الدفع هنا
    });
}

// حدث لإظهار السلة عند النقر على الأيقونة
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', showCartModal);
    }
});