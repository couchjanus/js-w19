"use strict"

const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.querySelector(".sidebar-toggle");
const closeBtn = document.querySelector(".close-btn");
const likeMe = document.querySelector(".like-me");
const countItemsInCart = document.querySelector('.count-items-in-cart');
const clearCart = document.querySelector(".clear-cart");
const cartItems = document.querySelector(".cart-items");

function addProductToCart(content, item) {
    content.querySelector('.product-name').textContent = item.querySelector(".product-name").textContent;
    content.querySelector('.product-price').textContent = item.querySelector(".product-price").textContent;
    content.querySelector('.product-price').setAttribute('data-price', item.querySelector(".product-price").textContent);
    content.querySelector('.product-img img').setAttribute('src',item.querySelector(".product-img").getAttribute('src'));
    return content;   
}
function createMarkup(data) {
    return `
    <div class="col-xl-3 col-lg-4 col-sm-6">
        <div class="product text-center">
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
            $<span class="small text-muted product-price">${data.price}</span>
        </div>
    </div>
    `
}

// ==============================
(function(){
    let subtotals = function(){
        let itemsInCart = document.querySelectorAll('.cart-item');
        for (let item of itemsInCart) {
            const price = item.querySelector('.product-price').textContent;
            let quantity = item.querySelector('.quantity').textContent;
            item.querySelector('.subtotal').textContent=quantity*price;
        };
    }

    sidebarToggle.addEventListener("click", function () {
        sidebar.classList.toggle("show-sidebar");
        subtotals();
        let itemsInCart = document.querySelectorAll('.cart-item');

        for (let item of itemsInCart) {
            const price = item.querySelector('.product-price').textContent;
            item.querySelector('.fa-caret-right').addEventListener('click', function(e){
                let val = e.target.previousElementSibling.textContent;
                +(val)++;
                e.target.previousElementSibling.textContent = val;
                subtotals();
            });

            item.querySelector('.fa-caret-left').addEventListener('click', function(e){
                let val = e.target.nextElementSibling.textContent;
                if(+(val) > 1) {
                    val--;
                    e.target.nextElementSibling.textContent = val;
                    subtotals();
                }
            });
        }
    });

    closeBtn.addEventListener("click", function () {
        sidebar.classList.remove("show-sidebar");
    });

    let result = '';
    products.forEach(function(item) {
        result+=createMarkup(item);
    });
    document.querySelector('.showcase').innerHTML = result;

    let content = document.getElementById("cartItem").content;  
    
    const addToCarts = document.getElementsByClassName("add-to-cart");

    const template = document.getElementById("cartItem").content;  
    for (let i=0; i<addToCarts.length; i++) {
        addToCarts[i].addEventListener('click', function(e){
            let item = e.target.closest('.product');
            let content = addProductToCart(template, item);
            document.querySelector('.cart-items').append(document.importNode(content, true));
            +countItemsInCart.textContent++;
            if (+countItemsInCart.textContent>0){
                countItemsInCart.classList.add('notempty');
            } else {
                countItemsInCart.classList.remove('notempty');
            }
        })
    }
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
