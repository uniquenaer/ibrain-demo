/**
 * Created by zhuzi on 9/1/2017.
 */

import { SERVER_USER_INFO } from '../../../../constants/ServerApi';
import { get } from '../../../../utils/request';
import OMCError from '../../../../common/OMCError';

export default {
    initOwner(userId) {
        return get(SERVER_USER_INFO.url, { userId })
            .then((res) => {
                const error = new OMCError(res);

                if (error.isVaild() && error.equalTo(error.Success)) {
                    return res.user;
                }
                throw res;
            })
            .catch((err) => {
                console.log(err);
            });
    },

    convertMarkdownToText(markdown) {
        return markdown.replace(/#\s*/g, '')
            .replace(/>\s*/g, '')
            .replace(/\n/g, '  ')
            .replace(/\*/g, '');
    },
};
