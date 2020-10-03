"use strict"

class App{
    cart = [];
    cartItems = document.querySelector(".cart-items");
    clearCart = document.querySelector(".clear-cart");
    constructor() { 
        const sidebarToggle = document.querySelector(".sidebar-toggle");
        const closeBtn = document.querySelector(".close-btn");
        const sidebar = document.querySelector(".sidebar");
        sidebarToggle.addEventListener("click", () => sidebar.classList.toggle("show-sidebar"));
        closeBtn.addEventListener("click", () => sidebar.classList.remove("show-sidebar"));
        this.makeShowcase(products);
    }

    // methods
    getProduct = (id) => products.find(product => product.id === +(id));

    createProduct = (data) =>
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
    
    subtotals(){
        let itemsInCart = document.querySelectorAll('.cart-item');
        for (let item of itemsInCart) {
            const price = item.querySelector('.product-price').textContent;
            let quantity = item.querySelector('.quantity').textContent;
            item.querySelector('.product-subtotal').textContent=quantity*price;
        };
    }
    
    addToCarts() {
        const addToCartButtons = [...document.querySelectorAll(".add-to-cart")];
        const countItemsInCart = document.querySelector('.count-items-in-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener("click", event => {
              // add to cart
              let cartItem = { ...this.getProduct(event.target.closest('.product').getAttribute('data-id')), amount: 1 };
              this.cart = [...this.cart, cartItem];
              // add to DOM
              this.addCartItem(cartItem);
              +countItemsInCart.textContent++;
              if (+countItemsInCart.textContent>0){
                countItemsInCart.classList.add('notempty');
              } else {
                countItemsInCart.classList.remove('notempty');
              }
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
    }
    
    filterItem = (cart, curentItem) => cart.filter(item => item.id !== +(curentItem.dataset.id));
    
    findItem = (cart, curentItem) => cart.find(item => item.id === +(curentItem.dataset.id));
    
    renderCart() {
        // const clearCart = document.querySelector(".clear-cart");
        this.clearCart.addEventListener("click", () => this.clear());
        
        this.cartItems.addEventListener("click", event => {
          if (event.target.classList.contains("fa-trash-alt")) {
            this.cart = this.filterItem(this.cart, event.target);
            this.cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
            this.subtotals();
          } else if (event.target.classList.contains("fa-caret-right")) {
            let tempItem = this.findItem(this.cart, event.target);
            tempItem.amount = tempItem.amount + 1;
            event.target.previousElementSibling.innerText = tempItem.amount;
            this.subtotals();
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
          }
        });
    }

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
}

// ==============================
(function(){
    const app = new App();

    app.addToCarts();
    app.renderCart();
    app.renderLike();

})();
