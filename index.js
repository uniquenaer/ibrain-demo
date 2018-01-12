/**
 * Created by wangna on 2018/1/12.
 */
const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();

app.use(compression());

app.use(express.static('./build'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(7000);