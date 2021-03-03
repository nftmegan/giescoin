const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const config = require("../../config");
const routes = require("../routes");

exports.load = async(app) => {
    //app.use(morgan("dev"));

    app.get('/status', (req, res) => {
        res.status(200).end();
    });
    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    // Config cors options
    /*
    var corsOptions = {
        origin: "http://localhost:9000"
      };*/
    app.use(cors());

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json());

    app.use("/" + config.api.prefix + "/", routes);
};