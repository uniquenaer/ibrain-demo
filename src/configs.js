/**
 * Created by wangna on 2018/1/29.
 */
const dev = {
    host: 'http://192.168.0.189',
    port: '3000',
};

const pro = {
    host: 'http://192.168.0.189',
    port: '3000',
};

let config =dev;
config.domain = config.host + ':' + config.port;

export default config;