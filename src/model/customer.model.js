const DatabaseConnect = require('./databaseConnect');

class CityModel {
    constructor() {
        let database = new DatabaseConnect();
        this.conn = database.connect();
    }

    querySQL(sql) {
        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            })
        })
    }

    async getCity() {
        const sql = `select id, nameCity, Nation,Area,Population,GDP,Describes
                     from city `;
        return await this.querySQL(sql);
    }

    async deleteCity(id) {
        const sql = `delete from city where id = ${id}`
        return await this.querySQL(sql);
    }

    async getCityDetail(id) {
        const sql = `select nameCity, Nation,Area,Population,GDP,Describes
                     from city where id = ${id} `;
        return await this.querySQL(sql);
    }

    async addCity(dataForm) {
        const sql = `insert into city (nameCity, Nation, Area, Population, GDP, Describes)
        value('${dataForm.nameCity}', '${dataForm.Nation}', '${dataForm.Population}', '${dataForm.Area}', '${dataForm.GDP}', '${dataForm.Describes}')`
        return await this.querySQL(sql);
    }

    async updateCity(dataForm,id) {
        const sql = `update city
                     set nameCity   = '${dataForm.nameCity}',
                         Nation     = '${dataForm.Nation}',
                         Area       = '${dataForm.Area}',
                         Population = '${dataForm.Population}',
                         GDP        = '${dataForm.GDP}',
                         Describes  = '${dataForm.Describes}'
                     where id = ${id}`;
        return await this.querySQL(sql);
    }
    



}

module.exports = CityModel;