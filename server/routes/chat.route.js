'use strict';

let users = [];

const chatEvents = {
    join: 'join',
    exit: 'exit',
    joinRoom: 'joinRoom',
    exitRoom: 'exitRoom',
    chat: 'chat'
};

const errorMessages = {
    duplicatedUser: 'Ya existe un usuario con este mail en el chat, no se puede unir',
    invalidEmail: 'Email inválido'
};

function createChatUser(email, username, socketId){
    const currentRoom = '';
    return {email, username, socketId, currentRoom} 
}

exports = module.exports = function(socket, io) {
    // Join chat for the first time
    socket.on(chatEvents.join, (email, username) => {
        let found = users.find((user) => user.email == email && user.username == username);
        if (!found) {
            const user = createChatUser(email, username, socket.id);
            users.push(user);
        } else {
            socket.emit(chatEvents.join, errorMessages.duplicatedUser);
        }
    });

    // Join room
    socket.on(chatEvents.joinRoom, (email, room) => {
        const user = users.find((user) => user.email == email);
        if (user) {
            // If user has already an active room, then leave it
            if(user.currentRoom != '' && user.currentRoom != room){
                socket.leave(user.currentRoom);
                io.to(user.currentRoom).emit(chatEvents.chat, user.username + " ha salido de '"+ user.currentRoom + "'" + "<br>");
                io.to(`${user.socketId}`).emit(chatEvents.chat, "Has salido de '"+ user.currentRoom + "'" + "<br>");
                user.currentRoom = ''; 
            }

            // Join the new room
            if(user.currentRoom != room){
                user.currentRoom = room;
                socket.join(room);
                io.to(room).emit(chatEvents.chat, user.username + " se ha unido a '"+ room + "'" + "<br>");
            }
        } else {
            socket.emit(chatEvents.joinRoom, errorMessages.invalidEmail);
        }
    });

    // Exit room
    socket.on(chatEvents.exitRoom, (email, room) => {
        const user = users.find((user) => user.email == email);

        if (user) {
            if(user.currentRoom == room){
                user.currentRoom = '';
                socket.leave(room);
                io.to(room).emit(chatEvents.chat, user.username + " ha salido de '"+ room + "'" + "<br>");
                io.to(`${user.socketId}`).emit(chatEvents.chat, "Has salido de '"+ room + "'" + "<br>");
            }
        } else {
            socket.emit(chatEvents.exitRoom, errorMessages.invalidEmail);
        }
    });

    // Send messages
    socket.on(chatEvents.chat, (email, msg) => {
        const user = users.find((user) => user.email == email);
        if (user) {
            io.to(user.currentRoom).emit(chatEvents.chat, user.username + ": " + msg + "<br>");
        } else {
            socket.emit(chatEvents.chat, errorMessages.invalidEmail);
        }
    });
}
