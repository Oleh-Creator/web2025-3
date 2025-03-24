const https = require('https');
const fs = require('fs');

const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        fs.writeFileSync('data.json', data);
        console.log('Дані збережено у data.json');
    });
}).on('error', (err) => {
    console.log('Помилка:', err.message);
});