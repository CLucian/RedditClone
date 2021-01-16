const dotenv = require('dotenv')

// dotenv.config --> reads the .env file, assigns the variables to process.env and returns an object(named parsed) containing the content
dotenv.config()
module.exports = {
    port_dev: process.env.REACT_APP_PORT_DEV,
    port_prod: process.env.REACT_APP_PORT_PROD,
    redirect_uri_dev: process.env.REACT_APP_REDIRECT_URI_DEV,
    redirect_uri_prod: process.env.REACT_APP_REDIRECT_URI_PROD,
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
}
