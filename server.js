const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const geocode = require('./controllers/geocode');
const port = process.env.PORT || 3000;

app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/dist', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    location = JSON.stringify(req.body);
    geocode.geocodeAddress(location, (error, result) => {
        if(error){
            res.json(error);
        } else {
            geocode.getAllDetails(result.Latitude, result.Longitude, (err, result1) => {
                if(err){
                    res.json(err);
                } else {
                    res.render("details", {
                        item : result, //used in details.ejs
                        item1 : result1 //used in details.ejs
                    });
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Application started on port: ${port}`);
});

module.exports = app;