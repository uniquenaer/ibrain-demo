/**
 * Created by wangna on 2018/1/29.
 */
import {
    SERVER_GROUP_NAME,
    SERVER_CARD_LISTS,
    SERVER_CARD_ADD,
    SERVER_CARD_ADD_BATCH,
    SERVER_CARD_UPDATE,
    SERVER_CARD_DELETE,
} from '../constants/ServerApi';

import { post, patch, del, get } from '../utils/request';

export function getGroupLists() {
    return get(SERVER_GROUP_NAME.url)
}

export function getCardLists(group) {
    return get(`${SERVER_CARD_LISTS.url}/${group}`)
}

export function UpdateCard(id, params) {
    return patch(`${SERVER_CARD_UPDATE.url}/${id}`, params)
}

export function delCard(id) {
    return del(`${SERVER_CARD_DELETE.url}/${id}`)
}

export function addCardBatch(cards) {
    return post(SERVER_CARD_ADD_BATCH.url, cards)
}
