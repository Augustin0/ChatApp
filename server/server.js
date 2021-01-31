require("./config");
require("./socket/socket");
const on = require("./init");


(() => {
    const PORT = process.env.PORT;
    on.listen(PORT, (err) => {
        if (err) return new Error();
        console.log(`Sirviendo en el Puerto ${PORT}`);
    })

})();