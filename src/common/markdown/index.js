/**
 * Created by nanhuijuan on 2016/12/30.
 */
/* eslint-disable */
import React, { PureComponent } from 'react';
import renderMardown from './lib/renderMarkdown';
import * as ControlEvent from './lib/events';

export default class Markdown extends PureComponent {
    constructor(props) {
        super(props);

        this.onMarkdownEvent = this.onMarkdownEvent.bind(this);
    }

    onMarkdownEvent(evt, name, info) {
        switch (evt) {
            case ControlEvent.TextChange:
            case ControlEvent.RadioChange:
            case ControlEvent.CheckBoxChange:
                this.markdownData = this.markdownData || {};
                this.markdownData[name] = info;
                break;
            default:
                break;
        }
    }

    render() {
        const { src, extension } = this.props;
        return renderMardown(src, extension, this.onMarkdownEvent);
    }
}
