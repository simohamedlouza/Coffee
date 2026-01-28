
        // --- Data ---
        // Using icons instead of local images for reliability in this demo
        const products = [
            { id: 1, name: 'Espresso', price: 13 , icon: './img/black-coffe.jpg' },
            { id: 3, name: 'Cappuccino', price: 20, icon: './img/capussino.jpg' },
            { id: 6, name: 'Iced Tea', price: 13, icon: './img/tee.jpg' },
            { id: 8, name: 'Water', price: 5, icon: './img/water.jpg' },
            { id: 9, name: 'Orange Juice', price: 20, icon: './img/lemon.jpg' },
            { id: 10, name: 'coca', price: 14, icon: 'https://tremus.cl/wp-content/uploads/2024/02/Bebida-Coca-Cola-Sin-Azucar-350cc.jpg' },
            { id: 11, name: 'fraise', price: 13, icon: './img/fraise.jpg' },
            { id: 12, name: 'Croissant', price: 4, icon: 'https://img.delicious.com.au/5PiJMQy-/w759-h506-cfill/del/2015/12/cornetti-italian-croissants-24713-1.jpg' },
            { id: 14, name: 'Bagel', price: 8, icon: './img/bagel.jpg' },
            { id: 15, name: 'hawai', price: 7, icon: './img/huwai.jpg' },
            { id: 16, name: 'milkchokolat', price: 13, icon: './img/milkchokolat.jpg' },
            { id: 17, name: 'juicekiwi', price: 20, icon: './img/juicekiwi.jpg' },
            { id: 18, name: 'redvelvet', price: 25, icon: './img/redvelvet.jpg' },
            { id: 19, name: 'blueberry', price: 26, icon: './img/blueberry.jpg' },
            { id: 20, name: 'lemoncake', price: 20, icon: './img/lemoncake.jpg' },
        ];

        let cart = [];

        
        function clearCart(){

            cart = [];
            updateCartUI()
        }


        // --- DOM Elements ---
        const productGrid = document.getElementById('productGrid');
        const cartItemsContainer = document.getElementById('cartItems');
        // git id  cartTotal CHange to clasess

        const cartTotalEl = document.querySelector('.cartTotal');
        const cartTotall = document.querySelector('.cartTotall');

        const toastContainer = document.getElementById('toastContainer');

        // --- Initialization ---
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts(products);
        });

        // --- Functions ---

        function renderProducts(items) {
            productGrid.innerHTML = '';
            items.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.onclick = () => addToCart(product);
                card.innerHTML = `
                    <img src="${product.icon}" alt="${product.name}" class="product-icon">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price.toFixed(2)}dh</div>
                `;
                productGrid.appendChild(card);
            });
        }

        function addToCart(product) {
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.qty++;
            } else {
                cart.push({ ...product, qty: 1 });
            }
            updateCartUI();
            showToast(`Added ${product.name}`);
        }

        function updateQty(id, change) {
            const itemIndex = cart.findIndex(item => item.id === id);
            if (itemIndex > -1) {
                cart[itemIndex].qty += change;
                if (cart[itemIndex].qty <= 0) {
                    cart.splice(itemIndex, 1);
                }
                updateCartUI();
            }
        }

        function updateCartUI() {
            cartItemsContainer.innerHTML = '';
            let total = 0;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="text-center text-muted mt-5 empty-cart-msg">
                        <i class="bi bi-cart-x display-4"></i>
                        <p class="mt-2">No items selected</p>
                    </div>`;
            } else {
                cart.forEach(item => {
                    const itemTotal = item.price * item.qty;

                    total += itemTotal;

                    const el = document.createElement('div');
                    el.className = 'cart-item';
                    el.innerHTML = `
                        <div class="cart-item-info">
                            <span class="item-name">${item.name}</span>
                            <span class="item-price"> ${item.price.toFixed(2)}dh</span>
                        </div>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                        </div>
                    `;
                    cartItemsContainer.appendChild(el);
                });
            }

            cartTotalEl.innerText =  total.toFixed(2)  + "dh";
            cartTotall.innerText = total.toFixed(2) + " dh";
        }



        function showToast(message, isError = false,) {
            const toast = document.createElement('div');
            toast.className = 'custom-toast';
            if (isError) toast.style.backgroundColor = '#ff4d4d';
            
            toast.innerHTML = `
                <i class="bi ${isError ? 'bi-exclamation-circle' : 'bi-check-circle-fill'}"></i>
                <span>${message}</span>
            `;
            
            toastContainer.appendChild(toast);
            
            // Remove from DOM after animation
            setTimeout(() => {
                toast.remove();
            }, 3000);
           
        }

        











// show ticket  modal 



function showTicketsOrder() {


    // show popup error
    if (cart.length === 0) {
        showToast("Cart is empty!", true);
        return;
    }





    // Simulate processing
    const btn = document.querySelector('.cart-total .btn');
    const originalText = btn.innerText;
    btn.innerText = "Processing...";
    // btn.disabled = true;
    



    // show Modal for tickets order

    setTimeout(() => {
        showToast("Order Placed Successfully!");
        // cart = [];
        const dataSelected = cart;
        localStorage.setItem('orderData', JSON.stringify(dataSelected));


        updateCartUI();
        btn.innerText = originalText;

        const modal = new bootstrap.Modal(document.getElementById('tickerModal'));
        modal.show();

        let axc = bootstrap.Modal.getInstance(document.getElementById('posModal'));
        axc.hide();

        btn.disabled = false;

        //  call generate ticket function
        generateTicket();


    }, 1000);



}



function generateTicket() {
    

const Datee  = document.getElementById('Datee');
const time  = document.getElementById('time');

const Serveur = document.getElementById('Serveur');
const totalorder = document.getElementById('totalorder');
const data_order = document.getElementById('data_order');

localStorage.getItem('orderData');
let orderData = JSON.parse( localStorage.getItem('orderData') );
for(a of orderData){
    let row =`
    <tr>
      <th scope="row">${a.qty}</th>     
      <td>${a.name}</td>
      <td>${a.price}Dh</td>

    </tr>
    `
    data_order.innerHTML += row;
    //  calculer totalord
}
let totalord = orderData.reduce((acc, item) => acc + item.price * item.qty, 0);
totalorder.innerText = totalord + "Dh";


let ServeurName = ['Ahmed', 'Youssef'];
let randomIndex = Math.floor(Math.random() * ServeurName.length);
Serveur.innerText = ServeurName[randomIndex];   

let currentDate = new Date();
Datee.innerText = currentDate.toLocaleDateString();
time.innerText = currentDate.toLocaleTimeString();





}


function print_ticket(){





    // only show tickerModal modal content all other hide
    const tickerModal = document.getElementById('tickerModal');
    const print = document.getElementById('print');
    print.style.display = 'none';
    document.body.innerHTML = tickerModal.innerHTML;
    window.print();
    window.location.reload();




}

