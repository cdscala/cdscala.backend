const socket = io();

socket.on("lista",(data) => {
    // console.log(data)
    renderProductItem(data)
})

function renderProductItem(data){
    const html = data.map((product,index) => {
        return `
        <tr>
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.thumbnail}</td>
            <td>${product.code}</td>
            <td>${product.stock}</td>
            <td>${product.status}</td>
            <td>${product.category}</td>
            <td><button value=${product.id} onclick=${deleteProductoTrigger(product.id)} class="cs-delete-btn">Delete</button></td>
        </tr>
        `
    }).join(" ")
    document.getElementById('product-list').innerHTML = html
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

// const form = document.getElementById('form');
// const input = document.getElementById('input');

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     if (input.value) {
//         socket.emit('add-product', input.value);
//         input.value = '';
//     }

// });