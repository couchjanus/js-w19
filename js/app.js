"use strict"
// 
const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.querySelector(".sidebar-toggle");
const closeBtn = document.querySelector(".close-btn");
const likeMe = document.querySelector(".like-me");
const countItemsInCart = document.querySelector('.count-items-in-cart');
const clearCart = document.querySelector(".clear-cart");
const cartItems = document.querySelector(".cart-items");
// function openCart() {
//     sidebar.style.transform = 'translate(0)';
// }
      
// function closeCart() {
//     sidebar.style.transform = '';
// }

// closeBtn.onclick=closeCart;
// sidebarToggle.onclick=openCart;
// ==============================
// sidebarToggle.addEventListener("click", function () {
//   // if (sidebar.classList.contains("show-sidebar")) {
//   //   sidebar.classList.remove("show-sidebar");
//   // } else {
//   //   sidebar.classList.add("show-sidebar");
//   // }
// });

// closeBtn.addEventListener("click", function () {
//   sidebar.classList.remove("show-sidebar");
// });

// ==============================
// sidebarToggle.addEventListener("click", function () {
//     sidebar.classList.toggle("show-sidebar");
// });

// closeBtn.addEventListener("click", function () {
//     sidebar.classList.remove("show-sidebar");
// });
// ==============================
(function(){
    sidebarToggle.addEventListener("click", function () {
        sidebar.classList.toggle("show-sidebar");
    });

    closeBtn.addEventListener("click", function () {
        sidebar.classList.remove("show-sidebar");
    });

    let addToCart = document.querySelectorAll('.add-to-cart');

    for(let i = 0; i < addToCart.length; i++){
        addToCart[i].addEventListener('click', function(){
            console.log(addToCart[i]);
            console.log(likeMe.textContent);
            console.log(countItemsInCart.textContent);
            +countItemsInCart.textContent++;
            if (+countItemsInCart.textContent>0){
                countItemsInCart.classList.add('notempty');
            } else {
                countItemsInCart.classList.remove('notempty');
            }

        });
    }

    let  likeIt = document.querySelectorAll('.like-it'); 
    for(let i = 0; i < likeIt.length; i++){
            likeIt[i].addEventListener('click', function(){
                
                +likeMe.textContent++;
                if (+likeMe.textContent>0){
                    likeMe.classList.add('notempty');
                } else {
                    likeMe.classList.remove('notempty');
                }
        });

    }
    cartItems.addEventListener("click", event => {
        if (event.target.classList.contains("fa-caret-right")) {
          +event.target.previousElementSibling.innerText++;
        } else if (event.target.classList.contains("fa-caret-left")) {
          +event.target.nextElementSibling.innerText--;
        }
      });
})();