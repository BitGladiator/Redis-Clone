const net = require("net");
const Parser = require("redis-parser");
// create a store object
const store = {};

const server = net.createServer((socket) => {
    console.log("Client Connected"); //display the success message

    const parser = new Parser({ // create a new parser
        returnReply: (reply) => {
            if (!Array.isArray(reply)) return; // if the reply is not an array

            const command = reply[0].toString().toUpperCase(); // get the command
            if (command === "SET") { // if the command is SET
                const key = reply[1].toString(); // get the key
                const value = reply[2].toString(); // get the value
                store[key] = value; // store the value in the store object
                socket.write("+OK\r\n"); // send the OK response
            }
            else if(command === "GET"){
                const key = reply[1];
                const value = store[key];
                if(!value){
                    socket.write('$-1\r\n');
                }
                else socket.write(`$${value.length}\r\n${value}\r\n`);
            }  
            else {
                socket.write(`-ERR unknown command '${command}'\r\n`); // send the error response
            }

            console.log("=>", reply.map(v => v.toString())); // display the reply
        },
        returnError: (error) => {
            console.log("=>", error);
            socket.write(`-ERR ${error.message}\r\n`);
        },
    });

    socket.on("data", (data) => {
        parser.execute(data);
    });

    socket.on("end", () => {
        console.log("Client Disconnected");
    });
});

server.listen(8000, () => console.log("Custom Redis Server running on port 8000"));
