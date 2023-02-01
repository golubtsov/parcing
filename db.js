const mysql = require('mysql');
const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'website_carabin'
};

const pool = mysql.createPool(config);

function boolean_el(){
    let num = Math.floor(Math.random()*2);
    if(num == 0) {
        return false;
    } else {
        return true;
    }
}

function send_data(id, id_cat, name_product, product_url, price, about, produser){
    pool.query(`INSERT INTO products(id, id_cat, name_product, product_url, popular, new, price, about, produser) VALUES ('${id}',${id_cat},'${name_product}','${product_url}',${boolean_el()},${boolean_el()},${price},'${about}','${produser}')`, (err, res) => {
        if(err){
            console.log(err);
        } else {
            console.log('send');
        }
    });
}

module.exports = boolean_el();
module.exports = send_data;