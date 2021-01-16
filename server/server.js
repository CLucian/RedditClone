const express = require('express')

// initialize express
const app = express()

const axios = require('axios')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4000
// const PORT = 4000
// const todoRoutes = express.Router();

const client_id = 'MMej7E1hI1x82A'
const client_secret = 'uXp9n2I72W_ihiOoyYfW3-0txms'
const querystring = require('querystring')

app.use(bodyParser.json())

app.post('/login', function (req, res) {
    const params = querystring.stringify({
        grant_type: 'authorization_code',
        code: req.body.code,
        redirect_uri: 'http://localhost:3000/authorize',
    })

    axios({
        url: 'https://www.reddit.com/api/v1/access_token',
        method: 'post',
        data: params.toString(),
        auth: {
            username: client_id,
            password: client_secret,
        },
    })
        .then((responseData) => {
            res.send(responseData.data)
        })
        .catch((error) => {
            res.send('There seems to be an error ' + error)
        })
})

app.listen(PORT, function () {
    console.log('Server is running on PORT: ' + PORT)
})
