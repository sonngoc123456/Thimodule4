const fs = require('fs');
const qs = require('qs');
const url = require('url');
const CityModel = require('../model/customer.model');

class CityController{

    constructor() {
        this.citymodel = new CityModel();
    }

    async showList(req,res){
        let city = await this.citymodel.getCity();
        fs.readFile('./templates/listcity.html','utf8',(err,data)=>{
            if(err){
                throw new Error(err.message)
            }
            let html='';
            city.forEach((value,index)=>{
                html+=`<tr>`;
                html+=`<td>${index+1}</td>`;
                html+=`<td><a href="/city/detail?id=${value.id}">${value.nameCity}</a></td>`;
                html+=`<td>${value.Nation}</td>`;
                html+= `<td><a href="/city/edit?id=${value.id}" class="btn btn-warning">Edit</a></td>`;
                html+= `<td><a href="/city/delete?id=${value.id}" class="btn btn-info">delete</a></td>`;
                html+=`</tr>`;
            })
            data=data.replace('{list-city}',html);
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            res.end();
        })
    }

    async deleteCity(req, res) {
        let id = qs.parse(url.parse(req.url).query).id;
        await this.citymodel.deleteCity(id);
        res.writeHead(301,{'Location':'/'})
        res.end();
    }

    async showDetail(req, res) {
        let id = qs.parse(url.parse(req.url).query).id;
        let city = await this.citymodel.getCityDetail(id);
        console.log(city);
        fs.readFile('./templates/detailcity.html', 'utf8', function (err, datahtml) {
            if (err) {
                console.log(err);
            }
            datahtml = datahtml.replace('{nameCityMain}', city[0].nameCity);
            datahtml = datahtml.replace('{nameCity}', city[0].nameCity);
            datahtml = datahtml.replace('{Nation}', city[0].Nation);
            datahtml = datahtml.replace('{Area}', city[0].Area);
            datahtml = datahtml.replace('{Population}', city[0].Population);
            datahtml = datahtml.replace('{GDP}', city[0].GDP);
            datahtml = datahtml.replace('{Describes}', city[0].Describes);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(datahtml);
            return res.end();
        });
    }

    async showFormAddCity(req, res) {
        fs.readFile('./templates/addcity.html', 'utf8', (err, data) => {
            if(err) {
                throw new Error(err.message)
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    }

    async addCity(req,res) {
        let data = ''
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end',async () => {
            let dataForm = qs.parse(data);
            await this.citymodel.addCity(dataForm);
            res.writeHead(301,{'Location':'/'})
            res.end();
        })
    }

    async showFormUpdate(req, res) {
        fs.readFile('./templates/update.html', 'utf8', (err, data) => {
            if(err) {
                throw new Error(err.message)
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    }

    async updateCity(req, res) {
        let id = qs.parse(url.parse(req.url).query).id;
        let data = ''
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end',async () => {
            let dataForm = qs.parse(data);
            await this.citymodel.updateCity(dataForm,id);
            console.log(dataForm);
            res.writeHead(301,{'Location':'/'})
            res.end();
        })
    }



}

module.exports=CityController;