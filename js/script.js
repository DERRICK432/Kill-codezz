// Select header and menu elements
const header = document.querySelector("header");
const menu = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

// Toggle sticky class on scroll for header
window.addEventListener("scroll", function() {
    header.classList.toggle("sticky", window.scrollY > 0);
});

// Toggle menu and navbar on menu icon click
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
};

// Hide navbar and reset menu icon when scrolling
window.onscroll = () => {
    menu.classList.remove('bx-x'); // Reset menu icon to default state
    navbar.classList.remove('open'); // Hide the navbar on scroll
};

// Scroll reveal animation
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true
});

sr.reveal('.home-text', { delay: 200, origin: 'top' });
sr.reveal('.home-img', { delay: 300, origin: 'top' });
sr.reveal('.feature, .product, .cta.content, .contact', { delay: 200, origin: 'top' });

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Loaded successfully");

    // Select elements
    const cartCountElement = document.querySelector(".cart-count");
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

    // Initialize cart data
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from localStorage or initialize empty
    let cartCount = cart.length; // Initialize count based on the cart array
    updateCartDisplay(cartCount);

    // Function to update the cart count display
    function updateCartDisplay(count) {
        cartCountElement.textContent = count;
        cartCountElement.style.display = count > 0 ? "inline-block" : "none";
    }

    // Add a product to the cart
    function addToCart(button) {
        const productCard = button.closest(".product-card"); // Get the closest parent product card
        const imageElement = productCard.querySelector(".product-img img"); // Get the product image
        const priceElement = productCard.querySelector(".product-price"); // Get the price
        const titleElement = productCard.querySelector(".product-title"); // Get the title
        const subtitleElement = productCard.querySelector(".product-subtitle"); // Get the subtitle

        // Generate a unique ID for the product (e.g., based on cart length)
        const productId = `prod-${cart.length + 1}`; 

        // Extract values from the elements
        const product = {
            id: productId, // Unique identifier for the product
            title: titleElement.textContent.trim(),
            subtitle: subtitleElement.textContent.trim(),
            price: priceElement.textContent.replace("Ksh", "").trim(),
            image: imageElement.src,
        };

        // Add product to the cart array and save it in localStorage
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update the cart count
        cartCount = cart.length;
        updateCartDisplay(cartCount);

        // Show success message
        showSuccessMessage(button);
    }

    // Function to show a success message when adding to the cart
    function showSuccessMessage(button) {
        // Create or select the success message
        let successMessage = button.parentElement.querySelector(".success-message");

        if (!successMessage) {
            // If the message does not exist, create it
            successMessage = document.createElement("div");
            successMessage.className = "success-message";
            successMessage.textContent = "Item added successfully!";
            button.parentElement.appendChild(successMessage);
        }

        // Position the message relative to the button
        successMessage.style.position = "absolute";
        successMessage.style.top = `${button.offsetTop - 40}px`; // Position above the button
        successMessage.style.left = `${button.offsetLeft}px`;

        // Show the success message
        successMessage.style.display = "block";
        successMessage.classList.add("show");

        // Hide the message after 2 seconds
        setTimeout(() => {
            successMessage.classList.remove("show");
            successMessage.style.display = "none"; // Hide it completely
        }, 1500);
    }

    // Attach event listeners to all "Add to Cart" buttons
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener("click", function () {
                console.log(`Button clicked for product: ${this.dataset.title}`);
                addToCart(this);
            });
        });
    } else {
        console.error("No 'Add to Cart' buttons found");
    }
});
