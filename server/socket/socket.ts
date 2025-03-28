// import { Server } from "socket.io";

// export const io = new Server({
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// let onlineUsers: {username: string; socketId: string;}[] = [];

// const addNewUser = (username: string, socketId: string) => {
//   !onlineUsers.some((user) => user.username === username) &&
//     onlineUsers.push({ username, socketId });
// };

// const removeUser = (socketId: string) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// const getUser = (username: string) => {
//   return onlineUsers.find((user) => user.username === username);
// };

// io.on("connection", (socket) => {
//   socket.on("newUser", (username) => {
//     addNewUser(username, socket.id);
//   });

//   socket.on("sendNotification", ({ senderName, receiverName, type }) => {
//     const receiver = getUser(receiverName);
//     if (receiver) {
//       io.to(receiver.socketId).emit("getNotification", {
//         senderName,
//         type,
//       });
//     }
//   });

//   socket.on("sendText", ({ senderName, receiverName, text }) => {
//     const receiver = getUser(receiverName);
//     if (!receiver) return;
//     io.to(receiver.socketId).emit("getText", {
//       senderName,
//       text,
//     });
//   });

//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//   });
// });