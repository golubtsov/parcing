const { JSDOM } = require('jsdom');
const jsonfile = require('jsonfile');
const https = 'https://trofey.ru/catalog/';

const data_odezhda = [];
const data_equipment = [];
const data_rope = [];
const data_sets = [];
const data_shoes = [];
const data_sleepbag = [];
const data_tents = [];
const data_cookware = [];
class Product {
    constructor(id, name, producer, price, url, link) {
        this.id = id,
            this.name = name,
            this.producer = producer,
            this.price = price,
            this.url = url,
            this.link = link
    }
}

function create_json(arr, name_file) {
    jsonfile.writeFile(`${name_file}.json`, arr);
    console.log('write');
}

async function get_more_info(arr, name_file) {
    for (const el of arr) {
        const dom = await JSDOM.fromURL(`${el.link}`);
        const doc = dom.window.document;
        let prod_descript = doc.querySelector('div.text>p').innerHTML;
        el.about = prod_descript;
    }
    create_json(arr, name_file);
}

async function get_data(param, arr, name_file) {
    try {
        const dom = await JSDOM.fromURL(`${https}${param}`);
        const doc = dom.window.document;
        let products = doc.querySelectorAll('div.item-e');
        for (let i = 23; i < 30; i++) {
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
    get_more_info(arr, name_file);
}

get_data('odezhda/odezhda_dlya_okhoty/', data_odezhda, 'data_odezhda');
get_data('obuv/obuv_dlya_turizma/', data_shoes, 'data_shoes');
get_data('turizm/', data_equipment, 'data_equipment');
get_data('turizm/?digiSearch=true&term=Веревки&params=%7Csort%3DDEFAULT', data_rope, 'data_rope');
get_data('turizm/?digiSearch=true&term=Посуда&params=%7Csort%3DDEFAULT', data_cookware, 'data_cookware');
get_data('turizm/?digiSearch=true&term=Наборы&params=%7Csort%3DDEFAULT', data_sets, 'data_sets');
get_data('turizm/?digiSearch=true&term=спальники&params=%7Csort%3DDEFAULT', data_sleepbag, 'data_sleepbag');
get_data('turizm/?digiSearch=true&term=Палатки&params=%7Csort%3DDEFAULT', data_tents, 'data_tents');
