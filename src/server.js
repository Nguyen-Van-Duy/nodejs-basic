import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
// import connection from './configs/connectDB'
import initAPIRoute from './route/api';
require('dotenv').config()

const app = express();
const port = process.env.PORT || 8080

app.use(express.urlencoded({extended: true}))
app.use(express.json())

//set up view engine
configViewEngine(app)
//set up routes
initWebRoute(app)
//api
initAPIRoute(app)

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})