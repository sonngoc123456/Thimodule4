const http = require('http');
const fs = require('fs');
const url = require('url')
const CityController = require('./src/controller/CityController');
const citycontroller = new CityController();
const port = 8080;



const server = http.createServer((req, res) => {
    let urlParse = url.parse(req.url);
    let pathUrl = urlParse.pathname;
        switch (pathUrl) {
            case '/' :
                citycontroller.showList(req, res)
                break;
                case '/city/delete':
                    citycontroller.deleteCity(req, res)
                break;
            case '/city/detail':
                citycontroller.showDetail(req, res)
                break;
            case '/create' :
                if (req.method === 'GET') {
                    citycontroller.showFormAddCity(req, res)
                }else {
                    citycontroller.addCity(req, res)
                }
                break;
            case '/city/edit' :
                if (req.method === 'GET') {
                    citycontroller.showFormUpdate(req, res)
                }else {
                    citycontroller.updateCity(req, res)
                }
                break;

            default:
                res.end();
        }

})

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
