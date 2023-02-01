const mysql = require('mysql');
const jsonfile = require('jsonfile');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'website_carabin'
};
const pool = mysql.createPool(config);

const data_odezhda = require('./json_files/data_odezhda.json');
const data_equipment = require('./json_files/data_equipment.json');
const data_rope = require('./json_files/data_rope.json');
const data_sets = require('./json_files/data_sets.json');
const data_shoes = require('./json_files/data_shoes.json');
const data_sleepbag = require('./json_files/data_sleepbag.json');
const data_tents = require('./json_files/data_tents.json');
const data_cookware = require('./json_files/data_cookware.json');

function read_file(file, id_cat){
    for (const el of file) {
        send_data(`${el.id}`, id_cat, `${el.name}`, `${el.url}`, el.price, `${el.about}`, `${el.producer}`);
    }
}

function send_data(id, id_cat, name_product, product_url, price, about, produser) {
    let str = `INSERT INTO products(id, id_cat, name_product, product_url, popular, new, price, about, produser) VALUES ('${id}',${id_cat},'${name_product}','${product_url}',${boolean_el()},${boolean_el()},${price},'${about}','${produser}')`;
    pool.query(str, (err, res) => {
        if (err) {
            console.log(`${id} - ${err.message} <br><br>`);
        } else {
            create_sqlt(str);
        }
    });
}

let count = 1;
function create_sqlt(str) {
    jsonfile.writeFile(`./sql_comands/${count}.sql`, str);
    count++;
}

function boolean_el() {
    let num = Math.floor(Math.random() * 2);
    if (num == 0) {
        return false;
    } else {
        return true;
    }
}

function count_null(){
    count = 0;
}

read_file(data_odezhda, 1);
read_file(data_equipment, 3);
read_file(data_rope, 4);
read_file(data_sets, 5);
read_file(data_shoes, 6);
read_file(data_sleepbag, 7);
read_file(data_tents, 8);
read_file(data_cookware, 2);

count_null()