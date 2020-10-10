"use strict"
class Storage {
    static saveProducts(products) {
      localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
      let products = JSON.parse(localStorage.getItem("products"));
      return products.find(product => product.id === +(id));
    }
    static getProducts() {
        return JSON.parse(localStorage.getItem("products"));
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
                const category = item.category;
                return { name, price, id, image, category };
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

        if (document.querySelector('.collections')){
            this.makeCategories(categories);
        }
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
        div.setAttribute('id', 'id'+item.id);
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
            });
        });
    }
    
    clear() {
        this.cart = [];
        while (this.cartItems.children.length > 0) {
            this.cartItems.removeChild(this.cartItems.children[0]);
        }
        
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
            // event.preventDefault();
            if (event.target.classList.contains("fa-trash-alt")){
                this.cart = this.filterItem(this.cart, event.target);
                event.target.closest('.cart-item').remove();
                this.setCartTotal(this.cart);
                Storage.saveCart(this.cart);
                
            } else if (event.target.classList.contains("fa-caret-right")) {
                let tempItem = this.findItem(this.cart, event.target);
                tempItem.amount = tempItem.amount + 1;
                
                this.setCartTotal(this.cart);
                Storage.saveCart(this.cart);
                event.target.previousElementSibling.innerText = tempItem.amount;
            } else if (event.target.classList.contains("fa-caret-left")) {
                let tempItem = this.findItem(this.cart, event.target);
                if (tempItem !== undefined && tempItem.amount > 1) {
                    tempItem.amount = tempItem.amount - 1;
                    event.target.nextElementSibling.innerText = tempItem.amount;
                } else {
                    this.cart = this.filterItem(this.cart, event.target);
                    event.target.closest('.cart-item').remove();
                }
                
                this.setCartTotal(this.cart);
                Storage.saveCart(this.cart);
            }
        });
    }
    // =======================

    setCartTotal(cart) {
        let tmpTotal = 0;
        cart.map(item => {
            tmpTotal = item.price * item.amount;
            this.cartItems.querySelector(`#id${item.id} .product-subtotal`).textContent=parseFloat(tmpTotal.toFixed(2));
        });

        this.cartTotal.textContent = parseFloat(cart.reduce((previous, current) => previous + current.price * current.amount, 0).toFixed(2));
        this.countItems.textContent = cart.reduce((previous, current) => previous + current.amount, 0);
    }
    
    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }

    renderCategory(){
        const categories = document.querySelector('.categories');
        categories.addEventListener('click', (event)=> {
                event.preventDefault();
                const target = event.target;

                if (target.classList.contains('category-item')) {
                    const category = target.dataset.category;
                    const categoryFilter = items => items.filter(item => item.category.includes(category));
                    this.makeShowcase(categoryFilter(Storage.getProducts()));
                } else {
                    this.makeShowcase(Storage.getProducts());
                }
                this.addToCarts();
                this.renderCart();
        });
    }

    createCategory(category){
        return `
        <a class="category-item" data-category="${category.name}" href="#">
            <img class="img-fluid" src="${category.image}" alt="${category.name}"><strong class="category-item-title category-item" data-category="${category.name}">${
            category.name.replace(category.name[0], category.name[0].toUpperCase())}</strong>
        </a>`;
    }

    makeCategories(categories) {
        for (let i=0; i<3; i++){
            let div = document.createElement('div');
            div.className = "col-md-4";
            if (i<2){
                div.classList.add(['mb-4', 'mb-md-0']);
            } 
            if(i==0){
                div.innerHTML = this.createCategory(categories[i]);
            } else if(i==1){
                div.innerHTML = this.createCategory(categories[i])+this.createCategory(categories[i+1]);
            } else if(i == 2){
                div.innerHTML = this.createCategory(categories[i+1]);
            }
            document.querySelector('.categories').append(div);
        }
    }
}


function categoriesList(categories){
    let result = '';
    categories.forEach(item=>{
        result+=`<li class="mb-2"><a class="reset-anchor category-item" href="#" data-category="${item.name}">${item.name}</a></li>`;
    })
    document.querySelector('.categories-list').innerHTML = result;
} 






// ==============================
(function(){
    const app = new App();

    if(document.querySelector('.categories-list')){
        categoriesList(categories);
    }

    function compareValues(key, order = 'asc') {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
          }
      
          const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];
      
          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order === 'desc') ? (comparison * -1) : comparison
          );
        };
      }
      
    
    if (document.querySelector(".selectpicker")){
        let selectpicker = document.querySelector(".selectpicker");
        selectpicker.addEventListener('change', function() {
            console.log('You selected: ', this.value);
            switch(this.value){
                case 'low-high':
                    app.makeShowcase(Storage.getProducts().sort(compareValues('price', 'asc')));
                    break;
                case 'high-low':
                    app.makeShowcase(Storage.getProducts().sort(compareValues('price', 'desc')));
                    break;
                case 'popularity':
                    app.makeShowcase(Storage.getProducts().sort(compareValues('id', 'desc')));
                    break;
                default:
                    app.makeShowcase(Storage.getProducts().sort(compareValues('id', 'asc')));
                    break;
            }
            app.addToCarts();
            app.renderCategory();
        });
    }

    app.addToCarts();
    app.renderCategory();
    app.renderCart();
    app.renderLike();
    // Выбор определенной категории
                // const chooseCategory = event => {
                //     event.preventDefault();
                //     const target = event.target;

                //     if (target.classList.contains('category-item')) {
                //         const category = target.dataset.category;
                //         const categoryFilter = items => items.filter(item => item.category.includes(category));
                //         app.makeShowcase(categoryFilter(products));
                //     } else {
                //         app.makeShowcase(products);
                //     }
                //     app.addToCarts();
                //     app.renderCart();
                // };
                // categories.addEventListener('click', chooseCategory);
    
})();
