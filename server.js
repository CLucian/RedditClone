const express = require('express')

// initialize express
const app = express()

const dotenv = require('dotenv')
dotenv.config()

const path = require('path')

const axios = require('axios')
const bodyParser = require('body-parser')

// const PORT = process.env.PORT || 4000
// const todoRoutes = express.Router();

// const client_id = 'MMej7E1hI1x82A'
// const client_secret = 'uXp9n2I72W_ihiOoyYfW3-0txms'
const querystring = require('querystring')

app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json())

const REDIRECT_URI = process.env.REACT_APP_REDIRECT
const PORT = process.env.PORT
const CLIENT_SECRET = process.env.CLIENT_SECRET
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

app.post('/login', function (req, res) {
    const params = querystring.stringify({
        grant_type: 'authorization_code',
        code: req.body.code,
        // redirect_uri: 'http://localhost:4000/authorize',
        redirect_uri: REDIRECT_URI,
    })

    axios({
        url: 'https://www.reddit.com/api/v1/access_token',
        method: 'post',
        data: params.toString(),
        auth: {
            username: CLIENT_ID,
            password: CLIENT_SECRET,
        },
    })
        .then((responseData) => {
            res.send(responseData.data)
        })
        .catch((error) => {
            res.send('There seems to be an error ' + error)
        })
})

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.listen(PORT, function () {
    console.log('Server is running on PORT: ' + PORT)
})
