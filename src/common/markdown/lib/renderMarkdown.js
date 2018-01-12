/**
 * Created by nanhuijuan on 2016/12/30.
 */
/* eslint-disable */
const marked = require('./marked');

import ControlCreator from './control';
import React from 'react';
import '../style/default.css';


const extReg = /\[==([a-zA-Z]\w+)==\] *(?:\n+|$)/;
const TYPE = {
    TEXT: 'text',
    EXT: 'ext',
};

export default function (src, extension, onMarkdownEvent) {
    let cap;
    const tokens = [];
    const elements = [];

    while (src) {
        if (cap = extReg.exec(src)) {
            if (cap.index > 0) {
                const strBeforeExt = src.substring(0, cap.index);
                tokens.push({
                    data: strBeforeExt,
                    type: TYPE.TEXT,
                });
            }

            tokens.push({
                data: cap,
                type: TYPE.EXT,
            });

            src = src.substring(cap.index + cap[0].length);
        } else {
            tokens.push({
                data: src,
                type: TYPE.TEXT,
            });
            src = null;
        }
    }

    for (let i = 0; i < tokens.length; i++) {
        const tok = tokens[i];
        let ele;

        if (tok.type === TYPE.TEXT) {
            ele = <div key={i} dangerouslySetInnerHTML={{ __html: marked(tok.data) }} />;
        } else {
            const name = tok.data[1];
            const ctrl = new ControlCreator(name, extension[name], onMarkdownEvent);
            ele = ctrl.getControl();
        }

        elements.push(ele);
    }

    return (
        <div className="markdown">
            {elements}
        </div>
    );
}
