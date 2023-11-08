const socket = io();

socket.on("lista",(data) => {
    console.log(data)
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
        </tr>
        `
    }).join(" ")
    document.getElementById('product-list').innerHTML = html
}

const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('add-product', input.value);
        input.value = '';
    }
    Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      });
});