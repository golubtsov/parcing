const mysql = require('mysql');
const jsonfile = require('jsonfile');
const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'website_carabin'
};
let file = require('./data.json');

const pool = mysql.createPool(config);


function read_file(){
    for (const el of file) {
        send_data(`${el.id}`, 1, `${el.name}`, `${el.url}`, el.price, `${el.about}`, `${el.producer}`);
    }
    console.log('send');
}
read_file();

function create_txt(str) {
    jsonfile.writeFile('sql_comand.txt', str);
    console.log('write');
}

function boolean_el() {
    let num = Math.floor(Math.random() * 2);
    if (num == 0) {
        return false;
    } else {
        return true;
    }
}

function send_data(id, id_cat, name_product, product_url, price, about, produser) {
    let str = `INSERT INTO products(id, id_cat, name_product, product_url, popular, new, price, about, produser) VALUES ('${id}',${id_cat},'${name_product}','${product_url}',${boolean_el()},${boolean_el()},${price},'${about}','${produser}')`;
    pool.query(str, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('send');
        }
    });
    // create_txt(str);
}

module.exports = boolean_el();
module.exports = send_data;