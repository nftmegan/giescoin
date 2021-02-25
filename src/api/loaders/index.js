const load_express = async (app) => {
    await require("./express.loader").load(app);
}

exports.load = async(app) => {
    await load_express(app); // Load express
}