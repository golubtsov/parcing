const { JSDOM } = require('jsdom');
const jsonfile = require('jsonfile');
let boolean_el = require('./db.js');
const send_data = require('./db.js');
const data_odezhda = [];
const data_obuv = [];
const https = 'https://trofey.ru/catalog/';

class Product{
    constructor(id, name, producer, price, url, link){
        this.id = id,
        this.name = name,
        this.producer = producer,
        this.price = price,
        this.url = url,
        this.link = link
    }
}

function create_json(arr){
    jsonfile.writeFile('data.json', arr);
    console.log('write');
}

async function get_more_info(arr){
    for (const el of arr) {
        const dom = await JSDOM.fromURL(`${el.link}`);
        const doc = dom.window.document;
        let prod_descript = doc.querySelector('div.text>p').innerHTML;
        el.about = prod_descript;
    }
    create_json(arr);
}

async function get_data(param, arr){
    try {
        const dom = await JSDOM.fromURL(`${https}${param}`);
        const doc = dom.window.document;
        let products = doc.querySelectorAll('div.item-e');
        for (let i = 23; i < 25; i++) {
            let prod_id = products[i].querySelector('div.text>p>a').id;
            let prod_name = products[i].querySelector('div.text>p>a>span').innerHTML;
            let prod_producer = products[i].querySelector('div.text>div.item-list-title>span').textContent;
            let prod_price = products[i].querySelector('div.text>div.item-list-title span.price').innerHTML;
            let prod_url = products[i].querySelector('picture>img').src;
            let link = products[i].querySelector('div.text>p>a').href;
            let el_prod = new Product(prod_id, prod_name, prod_producer, prod_price, prod_url, link);
            arr.push(el_prod);
        }
    } catch (e) {
        console.log(e);
    }
    get_more_info(arr);
}

get_data('odezhda/odezhda_dlya_okhoty/', data_odezhda);
// get_data('obuv/obuv_dlya_turizma/', data_obuv);
