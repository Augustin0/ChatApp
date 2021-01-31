class Usuario {
    constructor() {
        this.usuarios = [];
    }
    addNewUser(data) {
        this.usuarios.push(data);
        return this.usuarios.filter(persona => persona.sala === data.sala)
    };
    getUser(id) {
        return this.usuarios.filter(persona => persona.id === id)[0];
    };
    getAllUsers(sala) {
        return this.usuarios.filter(persona => persona.sala === sala)
    };
    borrarPersona(id) {
        let userElimainado = this.getUser(id);
        if (userElimainado)

            this.usuarios = this.usuarios.filter(user => user.id != id);
        return userElimainado
    };
    borraTodasLasPersonas() {
        this.usuarios = []
    };




};
module.exports = {
    Usuario
}