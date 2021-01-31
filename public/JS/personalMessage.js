var socketIo = io()
let params = new URLSearchParams(window.location.search);
if (!params.has("destinatario") || !params.has("emisor")) {
    window.location = "index.html"
    throw new Error("El nombre es obligatorio")
}

let nombreEmisor = params.get("emisor")
let id = params.get("destinatario")


socketIo.on("connect", () => {
    let boxUsers = document.getElementById("users");
    socketIo.on("newUser_>", (err, users, personalId) => {
        if (err) {
            return console.log(`No pudimos guardar el usuario , error:${err}`);
        }
        boxUsers.innerHTML = ''
        users.forEach(user => {
            boxUsers.innerHTML += `<div onclick="salaPersonal('${user.id}','${misDatos.nombre}')" id="${user.id}"><img src="${user.img}" alt="User Img"> <p>${user.nombre}</p> </div>`
        })


    });











    socketIo.on("usuarioFuera", async(message) => {
        new Audio("./audio/desconected.mp3").play();
        let messageBox = document.getElementById("notification");
        messageBox.style.display = 'block'
        messageBox.innerText = message

        setTimeout(() => {
            messageBox.style.display = 'none'
            return
        }, 5000);

    })

    document.getElementById("send").addEventListener("click", () => {
        const messageSend = document.getElementsByTagName("input")[0].value;
        socketIo.emit("message_uno_a_uno", { messageSend, id, nombreEmisor }, (message) => {
            document.getElementById("messsages").innerHTML += `<div class="emisor"><p class="emisor"> TU : ${message.fecha} </p></div>`
            document.getElementById("messsages").innerHTML += `<div class="emisor"><p class="emisor">${message.message}</p></div>`;
        });


    })
    socketIo.on("message_uno_a_uno_>", (message) => {
        document.getElementById("messsages").innerHTML += `<div class="receptor"><p class="receptor">${message.emisor} ${message.fecha}</p></div>`
        document.getElementById("messsages").innerHTML += `<div class="receptor"><p class="receptor">${message.message}</p></div>`;
    });




});
socketIo.on("disconnect", () => {});