const socket = io();

socket.on("lista",(data) => {
    if (document.getElementById('product-list')){
        renderProductItem(data)
    }
    if (document.getElementById('product-list-cart')){
        renderProductItem2(data)
    }
})
socket.on('add-product-cart-alert',(data) => {
    Toastify({
        text: `El producto: ${data.producto} fue agregado al carrito: ${data.carrito}`,
        duration: 3000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true, 
        style: {
        },
        onClick: function(){} 
    }).showToast();
})

socket.on('combinacion-incorrecta',() => {
    Toastify({
        text: `Combinacion usuario/contraseña incorrecta`,
        duration: 3000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true, 
        style: {
        },
        onClick: function(){} 
    }).showToast();
})

function renderProductItem(data){
    const html = data.map((product,index) => {
        return `
        <tr>
            <td>${product._id}</td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.thumbnail}</td>
            <td>${product.code}</td>
            <td>${product.stock}</td>
            <td>${product.status}</td>
            <td>${product.category}</td>
            <td><button value=${'\''+product._id+'\''} onclick=${deleteProductoTrigger('\''+product._id+'\'')} class="cs-delete-btn">Delete</button></td>
        </tr>
        `
    }).join(" ")
        document.getElementById('product-list').innerHTML = html
}
function renderProductItem2(data){
    const html = data.map((product,index) => {
        return `
        <tr>
            <td>${product._id}</td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.thumbnail}</td>
            <td>${product.code}</td>
            <td>${product.stock}</td>
            <td>${product.status}</td>
            <td>${product.category}</td>
            <td><button value=${'\''+product._id+'\''} onclick=${addProductoCartTrigger('\''+product._id+'\'')} class="cs-delete-btn">Add to cart</button></td>
        </tr>
        `
    }).join(" ")
    document.getElementById('product-list-cart').innerHTML = html
}


function deleteProduct(id){
    console.log(`eliminar producto: ${id}`)
    socket.emit('delete-product',id)
    
    Toastify({
        text: `El producto eliminado fue: ${id} a traves de websocket`,
        duration: 3000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true, 
        style: {
        },
        onClick: function(){} 
    }).showToast();
}
function deleteProductoTrigger(id){
    return `deleteProduct(${id})`
}

function addProductCart(id){
    console.log(`agregar producto al carro: ${id}`)
    socket.emit('add-product-cart',id)
}
function addProductoCartTrigger(id){
    return `addProductCart(${id})`
}

const element = document.getElementById("login-btn");
if (element){
    element.addEventListener("click", loginRedirect);
}
const element2 = document.getElementById("register-btn");
if (element2){
    element2.addEventListener("click", loginRedirect);
}

function loginRedirect() {
    window.location.href = '/login'
}
function registerRedirect() {
    window.location.href = '/register'
}

// const form = document.getElementById('form');
// const input = document.getElementById('input');

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     if (input.value) {
//         socket.emit('add-product', input.value);
//         input.value = '';
//     }

// });