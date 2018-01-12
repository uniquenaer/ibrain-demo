/**
 * Created by wangna on 2018/1/12.
 */
/**
 * Created by nanhuijuan on 2017/7/26.
 */
"use strict";

const parse = require('csv-parse');
const Papa = require('papaparse');
const fs = require('fs');
const path = require('path');
const md5 = require('md5');

const rawCsv = fs.readFileSync(path.join(__dirname, 'packList.csv'));

const packIds = [], packMap = {}, packArr = [], cardIds = [], cardMap = [], cardArr = [];
parse(rawCsv, { header: true }, function (err, output) {
    if (err) console.log('解析 csv 失败');
    output.map(row => {
        const pack_style = row[0],
            open_read = row[1],
            packName = row[2],
            card_name = row[3],
            card_content = row[4];
        const pack_id = packName && md5(packName);
        const card_id = card_name && md5(card_name);
        const pack = { id: pack_id, packName, open_read, locked: false };
        const card = {
            id: card_id,
            name: card_name,
            front_content: card_content,
            pack_id,
            status: "FINISH",
            type: "power",
        };
        if (pack_id != null && packIds.indexOf(pack_id) === -1) {
            packIds.push(pack_id);
            packMap[pack_id] = pack;
            packArr.push(pack)
        }
        if (cardIds.indexOf(card_id) === -1) {
            cardIds.push(card_id);
            cardMap[card_id] = card;
            cardArr.push(card)
        }
    });
    fs.writeFile(path.join(__dirname, '../src/data/packList.js'), `const packList = ${JSON.stringify(packArr)}; export default packList`, 'utf8');
    fs.writeFile(path.join(__dirname, '../src/data/cardList.js'), `const cardList = ${JSON.stringify(cardArr)}; export default cardList`, 'utf8');
});


