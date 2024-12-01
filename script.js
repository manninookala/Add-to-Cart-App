document.addEventListener("DOMContentLoaded", () => {

    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartTotal = document.getElementById('cart-total');
    const totalPrice = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    const products = [
        {id : 1001, name : "Product - 1", price : 20.99 },
        {id : 1002, name : "Product - 2", price : 30.9999 },
        {id : 1003, name : "Product - 3", price : 40.99}        
    ];
    let cart = [];
    let sumTotal = 0;

    products.forEach((product) => renderProducts(product));

    function renderProducts(item){
        const productItem = document.createElement('div');
        productItem.classList.add('product');

        productItem.innerHTML = `
        <span>${item.name} - Rs.${item.price.toFixed(2)}</span>
        <button data-id = "${item.id}">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    };


    productList.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON"){
            const productId = parseInt(e.target.getAttribute('data-id'));
            const fetchProduct = products.filter((pro) => pro.id === productId);
            cart.push(fetchProduct);
            addToCart(fetchProduct);
            addTotal(fetchProduct);

        }
    });

    function addToCart(item){
        // Remove default text
        emptyCart.classList.add('hidden');

        //console.log(item);
        const cartItem = document.createElement("div");
        cartItem.classList.add('product');
        cartItem.innerHTML = `
        <span>${item[0].name} - Rs.${item[0].price.toFixed(2)}</span>
        <button data-id = "${item[0].id}">Delete</button>
        `;
        cartItem.classList.add('delete');
        cartItems.appendChild(cartItem);  

        // Enabling Checkout Option
        cartTotal.classList.remove('hidden');
        //console.log(cart);
    }

    function deductTotal(item){
        //console.log(item);
        sumTotal -= item[0].price;
        //console.log(sumTotal.toFixed(2));
        totalPrice.textContent = `Rs. ${sumTotal.toFixed(2)}`;   
    }

    function addTotal(item){
        sumTotal += item[0].price;
        //console.log(sumTotal.toFixed(2));
        totalPrice.textContent = `Rs. ${sumTotal.toFixed(2)}`;
    }

    cartItems.addEventListener('click', (e) =>{
        if(e.target.tagName === 'BUTTON'){
            const deleteBtnId = parseInt(e.target.getAttribute('data-id'));
            const indexToRemove = cart.findIndex((item) => item[0].id === deleteBtnId);
            let abcItem = null;
            if (indexToRemove !== -1){
                abcItem = cart[indexToRemove];
                cart.slice(indexToRemove,1);
            }
            e.target.parentElement.remove();
            deductTotal(abcItem);
        }
    })

    checkoutBtn.addEventListener('click', () =>{
        if(cart.length == 0 || sumTotal === 0) {
            return;
        }
        alert("Checkout Successful! The items will be delivered soon...");
        totalPrice.textContent = 'Rs. 0.00';
        clearCart();
    })

    function clearCart(){
        sumTotal = 0;      
        cart.length = 0;
        cartItems.innerHTML =" ";
    }
})

