let cartItems = [];

async function fetchProducts() {
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        displayError();
        return [];
    }
}

function displayProducts(products) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <div class="product-images">
                <img src="${product.images[0]}" alt="${product.title}">
            </div>
            <p>$${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsDiv.appendChild(productDiv);
    });
}

function displayLoading() {
    document.getElementById('loading').style.display = 'block';
}

function displayError() {
    document.getElementById('error').style.display = 'block';
}

async function initApp() {
    displayLoading();
    try {
        const products = await fetchProducts();
        displayProducts(products);
    } catch (error) {
        console.error('Error initializing app:', error.message);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

function addToCart(productId) {
    const product = getProductById(productId);
    if (product) {
        cartItems.push(product);
        updateCart();
        alert('Product added to cart!');
    } else {
        console.error('Product not found!');
    }
}

function getProductById(productId) {
    // Assume products are fetched with correct IDs
    // Here you can implement your own logic to get the product from the fetched data
    // For simplicity, I'll return a mock product with ID, title, price, and image
    return {
        id: productId,
        title: 'Product Title', // Replace with actual product title
        price: 10.99, // Replace with actual product price
        image: 'https://via.placeholder.com/150', // Replace with actual product image URL
    };
}

function updateCart() {
    const cartItemsList = document.getElementById('cartItems');
    cartItemsList.innerHTML = '';
    let total = 0;
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.textContent = item.title + ' - $' + item.price.toFixed(2);
        cartItemsList.appendChild(li);
        total += item.price;
    });
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
    document.getElementById('cartButton').textContent = `Cart (${cartItems.length})`;
}

function toggleCart() {
    const cart = document.getElementById('cart');
    cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
}

function checkout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty. Add some items before checkout.');
    } else {
        alert('Thank you for your purchase!');
        cartItems = [];
        updateCart();
        toggleCart();
    }
}

// Initialize the app
initApp();
