const socket = io();

socket.on("lista",(data) => {
    console.log(data)
})