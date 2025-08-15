const net = require("net");
const server = net.createServer((socket)=>{
    console.log("Client Connected");
    socket.on('data',data=>{
        console.log('=>',data.toString());
        socket.write('+OK\r\n');
    })

})
server.listen(8000,()=>console.log("Custom Redis Server running on port 8000"))