var socketIo = io()
const { updateUsersBox, addMessage } = {
    updateUsersBox(users, misDatos) {

        let boxUsers = document.getElementById("users");
        boxUsers.innerHTML = ''
        users.forEach(user => {
            boxUsers.innerHTML += `<div onclick="salaPersonal('${user.id}','${misDatos.nombre}')" > <span id="${user.nombre}" class="notif"></span><img src="${user.img}" alt="User Img"> <p>${user.nombre}</p> </div>`
        })
    },


    addMessage(message, role) {
        document.getElementById("messsages").innerHTML += `<div class="${role}"><p class="${role}">${message.emisor} ${message.fecha}</p></div>`
        document.getElementById("messsages").innerHTML += `<div class="${role}"><p class="${role}">${message.message}</p></div>`;
    },


};



let params = new URLSearchParams(window.location.search);
if (!params.has("nombre") || !params.has("sala")) {
    window.location = "index.html"
    throw new Error("El nombre es obligatorio")
}
let user = {
    nombre: params.get("nombre"),
    sala: params.get("sala")
}
socketIo.on("connect", () => {
    let misDatos;
    socketIo.emit("newUser", user, (err, users, personalData) => {
        misDatos = personalData
        if (err) {
            return console.log(`No pudimos guardar el usuario , error:${err}`);
        }
        updateUsersBox(users, misDatos)

    });


    socketIo.on("newUser_>", (err, users, personalData) => {
        if (err) {
            return console.log(`No pudimos guardar el usuario , error:${err}`);
        }
        updateUsersBox(users, misDatos)

    });


    socketIo.on("usuarioFuera", (data) => {
        new Audio("./audio/desconected.mp3").play();
        let messageBox = document.getElementById("notification");
        messageBox.style.display = 'block'
        messageBox.innerText = data.message
        updateUsersBox(data.users, misDatos)
        setTimeout(() => {
            messageBox.style.display = 'none'
        }, 2000);

    })

    document.getElementById("send").addEventListener("click", () => {
        const messageSend = document.getElementsByTagName("input")[0].value;
        socketIo.emit("message", messageSend, (message) => {
            addMessage(message, "emisor")

        });


    })
    socketIo.on("message_>", (message) => {
        addMessage(message, "receptor")
    });

    socketIo.on("message_uno_a_uno_>", (message) => {
        document.getElementById(`${message.emisor}`).style.display = 'block';
    })


});

function salaPersonal(amigo, tusDatos) {

    document.location = `personalBox.html?emisor=${tusDatos}&destinatario=${amigo}`

}

socketIo.on("disconnect", () => {});