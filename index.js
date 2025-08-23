const net = require("net");
const Parser = require("redis-parser");

// create a store object
const store = {};

const server = net.createServer((socket) => {
  console.log("Client Connected");

  const parser = new Parser({
    returnReply: (reply) => {
      if (!Array.isArray(reply)) return;

      const command = reply[0].toString().toUpperCase();

      if (command === "SET") {
        const key = reply[1].toString();
        const value = reply[2].toString();
        store[key] = value;
        socket.write("+OK\r\n");
      } else if (command === "GET") {
        const key = reply[1].toString();
        const value = store[key];
        if (value === undefined) {
          socket.write("$-1\r\n");
        } else {
          socket.write(`$${value.length}\r\n${value}\r\n`);
        }
      } else if (command === "DEL") {
        let deletedCount = 0;
        for (let i = 1; i < reply.length; i++) {
          const key = reply[i].toString();
          if (store.hasOwnProperty(key)) {
            delete store[key];
            deletedCount++;
          }
        }
        socket.write(`:${deletedCount}\r\n`);
      } else if (command === "EXISTS") {
        const key = reply[1].toString();
        const exists = store.hasOwnProperty(key) ? 1 : 0;
        socket.write(`:${exists}\r\n`);
      } else if (command === "INCR") {
        const key = reply[1].toString();
        let value = store[key] ? parseInt(store[key], 10) : 0;

        if (isNaN(value)) {
          socket.write(`-ERR value is not an integer\r\n`);
          return;
        }

        value++;
        store[key] = value.toString();
        socket.write(`:${value}\r\n`);
      } else if (command === "DECR") {
        const key = reply[1].toString();
        let value = store[key] ? parseInt(store[key], 10) : 0;

        if (isNaN(value)) {
          socket.write(`-ERR value is not an integer\r\n`);
          return;
        }

        value--;
        store[key] = value.toString();
        socket.write(`:${value}\r\n`);

      // ----------- NEW COMMANDS ------------
      } else if (command === "DUMP") {
        const key = reply[1].toString();
        if (!store.hasOwnProperty(key)) {
          socket.write("$-1\r\n");
        } else {
          const serialized = JSON.stringify(store[key]); // simple serialization
          socket.write(`$${serialized.length}\r\n${serialized}\r\n`);
        }
      } else if (command === "FLUSHALL") {
        for (let key in store) delete store[key];
        socket.write("+OK\r\n");
      } else if (command === "ECHO") {
        const message = reply[1].toString();
        socket.write(`$${message.length}\r\n${message}\r\n`);
      // --------------------------------------

      } else {
        socket.write(`-ERR unknown command '${command}'\r\n`);
      }

      console.log(
        "=>",
        reply.map((v) => v.toString())
      );
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

server.listen(8000, () =>
  console.log("Custom Redis Server running on port 8000")
);
