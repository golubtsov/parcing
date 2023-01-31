const { JSDOM } = require('jsdom');
const data_odezhda = [];
const data_obuv = [];

class Book{
    constructor(name, price){
        this.name = name,
        this.price = price
    }
}
async function parsing(){
    try {
        const dom = await JSDOM.fromURL('https://books.toscrape.com/');
        const doc = dom.window.document;
        let books = doc.querySelectorAll('article.product_pod');
        books.forEach((book) => {
            let book_name = book.querySelector('h3>a').getAttribute('title');
            let book_price = book.querySelector('p.price_color').innerHTML;
            let el_book = new Book(book_name, book_price);
            data.push(el_book);
        });
        console.log(JSON.stringify(data, null, ' '));
    } catch (e) {
        console.log(e);
    }
}
// parsing();

class Product{
    constructor(name, producer, price, url, link){
        this.name = name,
        this.producer = producer,
        this.price = price,
        this.url = url,
        this.link = link
    }
}

const https = 'https://trofey.ru/catalog/';

async function get_more_info(arr){
    for (const el of arr) {
        const dom = await JSDOM.fromURL(`${el.link}`);
        const doc = dom.window.document;
        let prod_descript = doc.querySelector('div.text>p').innerHTML;
        el.about = prod_descript;
    }
    console.log(JSON.stringify(arr, null, ' '));
}

async function get_data(param, arr){
    try {
        const dom = await JSDOM.fromURL(`${https}${param}`);
        const doc = dom.window.document;
        let products = doc.querySelectorAll('div.item-e');
        for (let i = 23; i < 33; i++) {
            let prod_name = products[i].querySelector('div.text>p>a>span').innerHTML;
            let prod_producer = products[i].querySelector('div.text>div.item-list-title>span').textContent;
            let prod_price = products[i].querySelector('div.text>div.item-list-title span.price').textContent;
            let prod_url = products[i].querySelector('picture>img').src;
            let link = products[i].querySelector('div.text>p>a').href;
            let el_prod = new Product(prod_name, prod_producer, prod_price, prod_url, link);
            arr.push(el_prod);
        }
        // console.log(JSON.stringify(arr, null, ' '));
    } catch (e) {
        console.log(e);
    }
    get_more_info(arr);
}

get_data('odezhda/odezhda_dlya_okhoty/', data_odezhda);
