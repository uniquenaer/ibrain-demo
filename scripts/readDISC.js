/**
 * Created by wangna on 2018/1/12.
 */
/**
 * Created by nanhuijuan on 2017/7/26.
 */
"use strict";

const parse = require('csv-parse');
const fs = require('fs');
const path = require('path');
const md5 = require('md5');

const rawCsv = fs.readFileSync(path.join(__dirname, 'disc.csv'));

const chooseMap = {}, orderArr = [], orderMap = {};
parse(rawCsv, { header: true, skip_empty_lines: true }, function (err, output) {
    if (err) console.log('解析 csv 失败');
    output.map((row, index) => {
        const order = row[0],
            sentence = row[1],
            M = row[2],
            L = row[3];
        const sentence_id = sentence && md5(sentence + order);
        const choose = { id: sentence_id, order_id: order, most: M, less: L, sentence };
        if (orderArr.indexOf(order) === -1) {
            orderArr.push(order);
            orderMap[order] = [];
        }
        orderMap[order].push(sentence_id);

        if (!chooseMap[sentence_id]) {
            chooseMap[sentence_id] = choose
        }

    });
    fs.writeFile(path.join(__dirname, '../src/data/chooseMap.js'), `const chooseMap = ${JSON.stringify(chooseMap)}; export default chooseMap`, 'utf8');
    fs.writeFile(path.join(__dirname, '../src/data/orderArr.js'), `const orderArr = ${JSON.stringify(orderArr)}; export default orderArr`, 'utf8');
    fs.writeFile(path.join(__dirname, '../src/data/orderMap.js'), `const orderMap = ${JSON.stringify(orderMap)}; export default orderMap`, 'utf8');
});


