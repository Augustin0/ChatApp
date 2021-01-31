const { io } = require("../init");
const { Usuario } = require("../Modelos/usuario")
const { errors, formatMessage } = require("./ustils").utils

const usuarioManager = new Usuario();
io.on("connection", (user) => {
    let users;
    let sala_user;
    user.on("newUser", (data, calback) => {
        if (!data.nombre | data.nombre == '' || !data.sala) {
            calback(errors.nameRequired, null)

        } else {
            sala_user = data.sala
            user.join(sala_user)
            users = usuarioManager.addNewUser({ id: user.id, ...data });
            calback(null, users, usuarioManager.getUser(user.id))

            user.broadcast.to(sala_user).emit("newUser_>", null, users, usuarioManager.getUser(user.id))

        }
    })

    user.on("message", (message_Q, calback) => {
        let usuario = usuarioManager.getUser(user.id);
        let message = '';
        if (usuario) {
            message = formatMessage(usuario.nombre, message_Q);
            calback(message)
        }
        user.broadcast.to(sala_user).emit("message_>", message)

    });
    user.on("message_uno_a_uno", (data, calback) => {
        let message = formatMessage(data.nombreEmisor, data.messageSend);
        calback(message);
        user.broadcast.to(sala_user).to(data.id).emit("message_uno_a_uno_>", message)
    })


    user.on("disconnect", () => {
        let usuario = usuarioManager.borrarPersona(user.id)
        if (usuario) {
            user.broadcast.to(sala_user).emit("usuarioFuera", { message: `${usuario.nombre} no esta en la sala principal`, users: usuarioManager.getAllUsers(sala_user) });

            user.broadcast.to(sala_user).emit("newUser_>", null, users, usuarioManager.getUser(user.id))
        }

    });








    user.on("message", (info, calback) => {

        user.broadcast.emit("message", info)




    })
});