"use strict"

const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.querySelector(".sidebar-toggle");
const closeBtn = document.querySelector(".close-btn");
const likeMe = document.querySelector(".like-me");
const countItemsInCart = document.querySelector('.count-items-in-cart');
const clearCart = document.querySelector(".clear-cart");
const cartItems = document.querySelector(".cart-items");
let cart = [];

function createProductMarkup(data) {
    return `
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
    `
}

function addCartItem(item) {
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
            <span class="subtotal">$<span class="product-subtotal"></span></span>
        </div>
    `;
    cartItems.appendChild(div);
}

function getProduct(id) {
    return products.find(product => product.id === +(id));
}

function subtotals(){
    let itemsInCart = document.querySelectorAll('.cart-item');
    for (let item of itemsInCart) {
        const price = item.querySelector('.product-price').textContent;
        let quantity = item.querySelector('.quantity').textContent;
        item.querySelector('.subtotal').textContent=quantity*price;
    };
}

function addToCarts() {
    const addToCartButtons = [...document.querySelectorAll(".add-to-cart")];
    addToCartButtons.forEach(button => {
        button.addEventListener("click", event => {
          // add to cart
          let cartItem = { ...getProduct(event.target.closest('.product').getAttribute('data-id')), amount: 1 };
          cart = [...cart, cartItem];
          // add to DOM
          addCartItem(cartItem);
          +countItemsInCart.textContent++;
          if (+countItemsInCart.textContent>0){
            countItemsInCart.classList.add('notempty');
          } else {
            countItemsInCart.classList.remove('notempty');
          }
          subtotals();
        });
    });
}

function clear() {
    cart = [];
    while (cartItems.children.length > 0) {
        cartItems.removeChild(cartItems.children[0]);
    }
    subtotals();
}

const filterItem = (cart, curentItem) => cart.filter(item => item.id !== +(curentItem.dataset.id));

const findItem = (cart, curentItem) => cart.find(item => item.id === +(curentItem.dataset.id));

function renderCart() {

    clearCart.addEventListener("click", () => {
      clear();
    });
    
    cartItems.addEventListener("click", event => {
      if (event.target.classList.contains("fa-trash-alt")) {
        cart = filterItem(cart, event.target);
        cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
        subtotals();
      } else if (event.target.classList.contains("fa-caret-right")) {
        let tempItem = findItem(cart, event.target);
        tempItem.amount = tempItem.amount + 1;
        event.target.previousElementSibling.innerText = tempItem.amount;
        subtotals();
      } else if (event.target.classList.contains("fa-caret-left")) {
        let tempItem = findItem(cart, event.target);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount > 0) {
            event.target.nextElementSibling.innerText = tempItem.amount;
        } else {
          cart = filterItem(cart, event.target);
          cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
        }
        subtotals();
      }
    });
}

// ==============================
(function(){
    sidebarToggle.addEventListener("click", function () {
        sidebar.classList.toggle("show-sidebar");
    });

    closeBtn.addEventListener("click", function () {
        sidebar.classList.remove("show-sidebar");
    });

    let result = '';
    products.forEach(function(item) {
        result+=createProductMarkup(item);
    });
    document.querySelector('.showcase').innerHTML = result;
    // 

    addToCarts();
    renderCart();

    
    // let  likeIt = document.querySelectorAll('.like-it'); 
    // for(let i = 0; i < likeIt.length; i++){
    //         likeIt[i].addEventListener('click', function(){
                
    //             +likeMe.textContent++;
    //             if (+likeMe.textContent>0){
    //                 likeMe.classList.add('notempty');
    //             } else {
    //                 likeMe.classList.remove('notempty');
    //             }
    //     });

    // }

})();
