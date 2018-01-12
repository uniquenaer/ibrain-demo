/**
 * Created by nanhuijuan on 2017/1/6.
 */

export const CARD_STATUS = {
    LOCK: 'LOCK',
    FINISH: 'FINISH',
    ONGOING: 'ONGOING',
};

export const CARD_TYPE = {
    REMEMBER: 'remember',
    POWER: 'power',
    VIDEO: 'video',
    EXAM: 'exam',
    EVALUATE: 'evaluate',
    ACTION: 'action',
    GROUP: 'group',
    ASGN:'asgn'
};

export const CARD_SCORE = [
    {
        img: {
            inactive: require('./component/Score/img/expert.png'),
            active: require('./component/Score/img/expert_active.png'),
        },
        score: 1,
        title: '没帮助',
    },
    {
        img: {
            inactive: require('./component/Score/img/hard.png'),
            active: require('./component/Score/img/hard_active.png'),
        },
        score: 2,
        title: '一般',
    },
    {
        img: {
            inactive: require('./component/Score/img/normal.png'),
            active: require('./component/Score/img/normal_active.png'),
        },
        score: 3,
        title: '有点帮助',
    },
    {
        img: {
            inactive: require('./component/Score/img/easy.png'),
            active: require('./component/Score/img/easy_active.png'),
        },
        score: 4,
        title: '很有帮助',
    },
];
