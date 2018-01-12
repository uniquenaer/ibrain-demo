/**
 * Created by wangna on 2018/1/12.
 */
import cardList_one from './cardList_one';
import packList_one from './packList_one';

import cardList_two from './cardList_two';
import packList_two from './packList_two';

import cardList_three from './cardList_three';
import packList_three from './packList_three';

const dataUtils = {
    '1.5specialTopic': {
        cardList: cardList_one,
        packList: packList_one
    },
    '3specialTopic': {
        cardList: cardList_two,
        packList: packList_two
    },
    '3fixedTopic': {
        cardList: cardList_three,
        packList: packList_three
    },
};

export default dataUtils;