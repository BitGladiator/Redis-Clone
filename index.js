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
                    socket.write('$-1\r\n');  // send the error response
                }
                else socket.write(`$${value.length}\r\n${value}\r\n`); // send the value
            }
            else if (command === "DEL") {
                let deletedCount = 0; // initialize the deleted count
                for (let i = 1; i < reply.length; i++) {
                    const key = reply[i].toString(); // get the key
                    if (store.hasOwnProperty(key)) {
                        delete store[key]; // delete the key
                        deletedCount++; // increment the deleted count
                    }
                }
                socket.write(`:${deletedCount}\r\n`); // Redis integer reply
            }
            
            else {
                socket.write(`-ERR unknown command '${command}'\r\n`); // send the error response
            }

            console.log("=>", reply.map(v => v.toString())); // display the reply
        },
        returnError: (error) => {
            console.log("=>", error); // display the error
            socket.write(`-ERR ${error.message}\r\n`); // send the error response
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
