"use strict"
class Storage {
    static saveProducts(products) {
      localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
      let products = JSON.parse(localStorage.getItem("products"));
      return products.find(product => product.id === +(id));
    }
    static saveCart(cart) {
      localStorage.setItem("basket", JSON.stringify(cart));
    }
    static getCart() {
      return localStorage.getItem("basket")
        ? JSON.parse(localStorage.getItem("basket"))
        : [];
    }
}

class Product {
    getProducts() {
        return products.map(item => {
                const name = item.name;
                const price = item.price;
                const id = item.id;
                const image = item.image;
                return { name, price, id, image };
        });
    }
}

class App{
    cart = [];
    cartItems = document.querySelector(".cart-items");
    clearCart = document.querySelector(".clear-cart");
    sidebar = document.querySelector(".sidebar");
    cartTotal = document.querySelector(".cart-total");
    countItems = document.querySelector('.count-items-in-cart');
    constructor() { 
        const sidebarToggle = document.querySelector(".sidebar-toggle");
        const closeBtn = document.querySelector(".close-btn");

        closeBtn.addEventListener("click", () => this.closeCart());
        sidebarToggle.addEventListener("click", () => this.openCart());

        this.makeShowcase(products);

        let data = new Product();
        Storage.saveProducts(data.getProducts());
        
        this.cart = Storage.getCart();
    }
    // Methods for Class App
    openCart() {
        document.querySelector(".overlay").classList.add("active");
        this.sidebar.classList.toggle("show-sidebar");
        this.cartItems.innerHTML='';
        this.cart = Storage.getCart();
        this.populateCart(this.cart);
        this.setCartTotal(this.cart);
        this.subtotals();
    }

    closeCart() {
        this.sidebar.classList.remove("show-sidebar");
        document.querySelector(".overlay").classList.remove("active");
    }
    
    getProduct = (id)=>products.find(product=>product.id === +(id));

    createProduct = (data)=>
        `
        <div class="col-xl-3 col-lg-4 col-sm-6">
            <div class="product text-center" data-id="${data.id}">
                <div class="position-relative mb-3">
                    <a class="d-block" href="detail.html"><img class="img-fluid w-100 product-img" src="${data.image}" alt="${data.name}"></a>
                    <div class="product-overlay">
                        <ul class="mb-0 list-inline">
                            <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark like-it" href="#"><i class="far fa-heart"></i></a></li>
                            <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark add-to-cart" href="#">Add to cart</a></li>
                            <li class="list-inline-item mr-0"><a class="btn btn-sm btn-outline-dark" href="#"><i class="fas fa-expand"></i></a></li>
                        </ul>
                    </div>
                </div>
                <h6><a class="reset-anchor product-name" href="detail.html">${data.name}</a></h6>
                $<span class="small text-muted product-price" data-price="${data.price}">${data.price}</span>
            </div>
        </div>
        `;
        
    makeShowcase(products) {
        let result = '';
        products.forEach(item => {
            result+=this.createProduct(item);
        });
        document.querySelector('.showcase').innerHTML = result;
    }

    addCartItem(item) {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.setAttribute('id', item.id);
        div.innerHTML = `
            <div class="picture product-img">
                <img src="${item.image}" alt="${item.name}" class="img-fluid w-100">
            </div>
            <div class="product-name p-auto">${item.name}</div>
            <div class="remove-btn text-right">
                <a class="reset-anchor m-auto" href="#">
                    <i class="fas fa-trash-alt" data-id=${item.id}></i>
                </a>
            </div>
            <div class="quantity">
                <div class="border d-flex justify-content-around mx-auto">
                    <i class="fas fa-caret-left inc-dec-btn" data-id=${item.id}></i>
                    <span class="border-1 p-1 amount">${item.amount}</span>
                    <i class="fas fa-caret-right inc-dec-btn" data-id=${item.id}></i>
                </div>
            </div>
            <div class="prices">
                <span class="price">$<span class="product-price">${item.price}</span></span>
                <span class="subtotal">Total: $<span class="product-subtotal"></span></span>
            </div>
        `;
        this.cartItems.appendChild(div);
    }

    addToCarts() {
        const addToCartButtons = [...document.querySelectorAll(".add-to-cart")];
        const countItemsInCart = document.querySelector('.count-items-in-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener("click", event => {
                let product = this.getProduct(event.target.closest('.product').getAttribute('data-id'));

                let exist = this.cart.some(elem => elem.id === product.id);
                if(exist){
                    this.cart.forEach(elem => {
                        if(elem.id === product.id){
                          elem.amount += 1;
                        }
                    })
                }else {
                    let cartItem = { ...product, amount: 1 };
                    this.cart = [...this.cart, cartItem];
                    +countItemsInCart.textContent++;
                    if (+countItemsInCart.textContent>0){
                      countItemsInCart.classList.add('notempty');
                    } else {
                      countItemsInCart.classList.remove('notempty');
                    }
                }
                Storage.saveCart(this.cart);
                this.setCartTotal(this.cart);
                this.subtotals();
            });
        });
    }
    
    clear() {
        this.cart = [];
        while (this.cartItems.children.length > 0) {
            this.cartItems.removeChild(this.cartItems.children[0]);
        }
        this.subtotals();
        this.setCartTotal(this.cart);
        Storage.saveCart(this.cart);
    }

    filterItem = (cart, curentItem) => cart.filter(item => item.id !== +(curentItem.dataset.id));
    
    findItem = (cart, curentItem) => cart.find(item => item.id === +(curentItem.dataset.id));
    renderLike() {
        const likeMe = document.querySelector(".like-me");    
        let  likeIt = [...document.querySelectorAll(".like-it")];
        likeIt.forEach((like)=>{
            like.addEventListener('click', () => {
                +likeMe.textContent++;
                if (+likeMe.textContent>0){
                    likeMe.classList.add('notempty');
                } else {
                    likeMe.classList.remove('notempty');
                }
            });
        });
    }
    
    renderCart() {

        this.clearCart.addEventListener("click", ()=>this.clear());
        
        this.cartItems.addEventListener("click", event=>{
            if (event.target.classList.contains("fa-trash-alt")){
                this.cart = this.filterItem(this.cart, event.target);
                this.subtotals();
                this.setCartTotal(this.cart);
                Storage.saveCart(this.cart);
                this.cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
            } else if (event.target.classList.contains("fa-caret-right")) {
                let tempItem = this.findItem(this.cart, event.target);
                tempItem.amount = tempItem.amount + 1;
                this.subtotals();
                this.setCartTotal(this.cart);
                Storage.saveCart(this.cart);
                event.target.previousElementSibling.innerText = tempItem.amount;
            } else if (event.target.classList.contains("fa-caret-left")) {
                let tempItem = this.findItem(this.cart, event.target);
                tempItem.amount = tempItem.amount - 1;
                if (tempItem.amount > 0) {
                event.target.nextElementSibling.innerText = tempItem.amount;
                } else {
                this.cart = this.filterItem(this.cart, event.target);
                this.cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
                }
                this.subtotals();
                this.setCartTotal(this.cart);
                Storage.saveCart(this.cart);
            }
        });
    }
    // =======================

    setCartTotal(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
          tempTotal += item.price * item.amount;
          itemsTotal += item.amount;
        });
        this.cartTotal.textContent = parseFloat(tempTotal.toFixed(2));
        this.countItems.textContent = itemsTotal;
    }
    subtotals(){
        let itemsInCart = document.querySelectorAll('.cart-item');
        for (let item of itemsInCart) {
            const price = item.querySelector('.product-price').textContent;
            let quantity = item.querySelector('.quantity').textContent;
            item.querySelector('.product-subtotal').textContent=quantity*price;
        };
    }
    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }
}

// ==============================
(function(){
    const app = new App();
    app.addToCarts();
    app.renderCart();
    app.renderLike();
})();
