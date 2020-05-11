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

function createChatUser(email, username, userImage, socketId){
    const currentRoom = '';
    return { email, username, userImage, socketId, currentRoom } 
}

function getMessageTime() {
    const date = new Date();
    const hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    const minutes  = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    const am_pm = (date.getHours() < 12) ? 'am' : 'pm';
    
    const time = hour + ':' + minutes + ' ' + am_pm;
    return time; 
}

exports = module.exports = function(socket, io) {
    // Join chat for the first time
    socket.on(chatEvents.join, (userInfo) => {
        const userInfoSplitted = userInfo.split('|');
        const user = {
            email: userInfoSplitted[0],
            username: userInfoSplitted[1],
            userImage: userInfoSplitted[2]
        };

        if (userInfo) {
            let found = users.find((u) => u.email == user.email);
            if (!found) {
                const newUser = createChatUser(user.email, user.username, user.userImage, socket.id);
                users.push(newUser);
            } else {
                socket.emit(chatEvents.join, errorMessages.duplicatedUser);
            }
        }
    });

    // Exit
    socket.on(chatEvents.exit, (email) => {
        if (email !== null) {
            let found = users.find((user) => user.email == email);
            if (found) {
                socket.leave(found.currentRoom);
                
                const userLeft = found.username + " ha salido de '"+ found.currentRoom + "'";
                const userLeftMsg = 'Server' + '|' + 'chat_server.png' + '|' + userLeft + '|' + 'type' + '|' + getMessageTime();
                io.to(found.currentRoom).emit(chatEvents.chat, userLeftMsg);

                const index = users.findIndex((user) => user.email == email);
                users.splice(index, 1);
            }
        }
    });

    // Join room
    socket.on(chatEvents.joinRoom, (email, room) => {
        const user = users.find((user) => user.email == email);
        if (user) {
            // If user has already an active room, then leave it
            if(user.currentRoom != '' && user.currentRoom != room){
                socket.leave(user.currentRoom);

                const userLeft = user.username + " ha salido de '"+ user.currentRoom + "'";
                const userLeftMsg = 'Server' + '|' + 'chat_server.png' + '|' + userLeft + '|' + 'type' + '|' + getMessageTime();
                io.to(user.currentRoom).emit(chatEvents.chat, userLeftMsg);
                
                const youLeft = "Has salido de '"+ user.currentRoom + "'";
                const youLeftMsg = 'Server' + '|' + 'chat_server.png' + '|' + youLeft + '|' + 'type' + '|' + getMessageTime();
                io.to(`${user.socketId}`).emit(chatEvents.chat, youLeftMsg);
                user.currentRoom = ''; 
            }

            // Join the new room
            if(user.currentRoom != room){
                user.currentRoom = room;
                socket.join(room);
                const msg = user.username + " se ha unido a '"+ room + "'";
                const chatMessage = 'Server' + '|' + 'chat_server.png' + '|' + msg + '|' + 'type' + '|' + getMessageTime();
                io.to(room).emit(chatEvents.chat, chatMessage);
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
            const chatMessage = user.email + '|' + user.userImage + '|' + msg + '|' + 'type' + '|' + getMessageTime();
            
            io.to(user.currentRoom).emit(chatEvents.chat, chatMessage);
        } else {
            socket.emit(chatEvents.chat, errorMessages.invalidEmail);
        }
    });
}
