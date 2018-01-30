/**
 * Created by wangna on 2018/1/29.
 */
import qs from 'query-string';
import axios from 'axios';
import config from '../configs';

const urlPrefix = config.domain;
const isDebugging = process.env.NODE_ENV !== 'production';

const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DEL: 'DELETE',
    PATCH: 'PATCH',
};

function filterStatus(res) {
    if (res.status >= 200 && res.status < 300) {
        return res;
    }

    const error = new Error(res.statusText);
    error.res = res;
    error.type = 'http';
    if (isDebugging) {
        console.error(error);
    }
    console.log(res);
}

function request(url, paramsOrBody, method, hasToken) {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    url = urlPrefix + url;
    if (method === METHOD.GET && paramsOrBody) {
        url += `?${qs.stringify(paramsOrBody)}`;
    }

    const option = {
        url,
        headers,
        method,
        // timeout: 60000,
        // withCredentials: true,
    };

    if (method !== METHOD.GET) {
        option.data = paramsOrBody;
    }
    option.validateStatus = function (status) {
        return status
    };

    if (isDebugging) {
        console.info(option, url);
    }

    return axios
        .request(option)
        .then(filterStatus)
        .then(resp => resp.data);
}


export function get(url, params) {
    const hasToken = false;
    return request(url, params, METHOD.GET, hasToken);
}

export function post(url, body) {
    const hasToken = false;
    return request(url, JSON.stringify(body), METHOD.POST, hasToken);
}

export function put(url, body) {
    const hasToken = false;
    return request(url, JSON.stringify(body), METHOD.PUT, hasToken);
}

export function patch(url, body) {
    const hasToken = false;
    return request(url, JSON.stringify(body), METHOD.PATCH, hasToken);
}

export function del(url, body) {
    const hasToken = false;
    return request(url, JSON.stringify(body), METHOD.DEL, hasToken);
}
