document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
});

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceContainer = document.getElementById('totalPrice');
    const subTotalContainer = document.getElementById('subTotal');
    const discountContainer = document.getElementById('discount');
    const grandTotalContainer = document.getElementById('grandTotal');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="4">Your cart is empty.</td></tr>';
        totalPriceContainer.innerText = `₨0.00`;
        subTotalContainer.innerText = `NPR 0.00`;
        discountContainer.innerText = `NPR 0.00`;
        grandTotalContainer.innerText = `NPR 0.00`;
        return;
    }

    let totalPrice = 0;
    let discount = 0;
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const itemRow = document.createElement('tr');
        itemRow.innerHTML = `
            <td><img src="${item.poster}" alt="${item.title}" style="max-width: 50px; border-radius: 5px;"></td>
            <td>${item.title}</td>
            <td>₨${item.discountedPrice.toFixed(2)}</td>
            <td><button onclick="removeFromCart(${index})" class="delete-btn">Remove</button></td>
        `;
        totalPrice += item.discountedPrice;
        cartItemsContainer.appendChild(itemRow);
    });

    totalPriceContainer.innerText = `₨${totalPrice.toFixed(2)}`;
    const subTotal = totalPrice;
    const deliveryFee = 0;
    const serviceCharge = 0;
    discountContainer.innerText = `NPR -${discount.toFixed(2)}`;
    const grandTotal = subTotal + discount + deliveryFee + serviceCharge;
    subTotalContainer.innerText = `NPR ${subTotal.toFixed(2)}`;
    grandTotalContainer.innerText = `NPR ${grandTotal.toFixed(2)}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function proceedToCheckout() {
    alert("Proceeding to payment...");
}
