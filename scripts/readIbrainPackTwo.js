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

const rawCsv = fs.readFileSync(path.join(__dirname, '3specialTopic.csv'));

const packIds = [], packMap = {}, packArr = [], cardIds = [], cardMap = [], cardArr = [];
parse(rawCsv, { header: true, skip_empty_lines: true }, function (err, output) {
    if (err) console.log('解析 csv 失败');
    output.map((row, index) => {
        const open_read = row[0],
            packName = row[1],
            card_name = row[2],
            card_content = row[3];
        const pack_id = packName && md5(packName);
        const card_id = card_content && md5(card_content);
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
    fs.writeFile(path.join(__dirname, '../src/data/packList_two.js'), `const packList_two = ${JSON.stringify(packArr)}; export default packList_two`, 'utf8');
    fs.writeFile(path.join(__dirname, '../src/data/cardList_two.js'), `const cardList_two = ${JSON.stringify(cardArr)}; export default cardList_two`, 'utf8');
});


