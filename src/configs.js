/**
 * Created by wangna on 2018/1/29.
 */
const dev = {
    host: 'http://192.168.0.189',
    port: '3000',
};

const pro = {
    host: 'http://101.200.135.183',
    port: '3030',
};

let config = pro;
config.domain = config.host + ':' + config.port;

export default config;