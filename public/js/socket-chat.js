var socket = io();
let misDatosPersonales;
var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', function() {

    socket.emit('newUser', usuario, function(err, resp, datosPersonales) {
        if (err) {
            return
        }
        misDatosPersonales = datosPersonales
        renderizarUsuarios(resp)

    });

    socket.on('newUser_>', function(err, resp, datosPersonales, messageFormated) {
        if (err) {
            return
        }
        misDatosPersonales = datosPersonales
        renderizarUsuarios(resp)
        renderMessages(messageFormated, "Admin")

    });

    socket.on('usuarioFuera', function(datos, messageFormated) {

        renderizarUsuarios(datos.users)
        renderMessages(messageFormated, "Admin")

    });
    socket.on("message_>", (formatMessage) => {
        renderMessages(formatMessage, "newMessage")
    })

});


// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {
    console.log(personas);
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);

});