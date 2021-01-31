const FECHA = new Date();

const utils = {
    errors: {
        nameRequired: "El nombre es obligatorio",

    },
    formatMessage(emisor, message) {
        return {
            emisor,
            message,
            fecha: `${FECHA.getHours()}/${FECHA.getDay()}/${FECHA.getMonth()}/${FECHA.getFullYear()} `
        }

    }
};
module.exports = {
    utils
}