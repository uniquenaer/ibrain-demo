/**
 * Created by wangna on 2017/1/9.
 */
/* eslint-disable */
import React, { PureComponent } from 'react';
import {
    SERVER_CARD_STUDENT,
} from '../../../../constants/ServerApi';
import { get } from '../../../../utils/request';

const OMCError = require('../../../OMCError/index');

import './CardWhoViewed.css';
import classNames from 'classnames';

import Avatar from '../../../Avatar';

export default class CardViewed extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            viewCount: null,
            avatars: null,
        };
    }

    componentDidMount() {
        this.getViewCount(this.props.card.id);
    }

    componentWillReceiveProps(props) {
        if (props.card && props.card.id !== this.props.card.id) {
            this.getViewCount(props.card.id);
        }
    }

    componentWillUnmount() {
        this._unmounted = true;
    }

    getViewCount(cardId) {
        get(SERVER_CARD_STUDENT.url, { cardId, simple: true })
            .then((result) => {
                const error = new OMCError(result);
                if (error.isVaild() && error.equalTo(error.Success) && result.students.length > 0) {
                    if (!this._unmounted) {
                        this.setState({
                            avatars: result.students,
                            viewCount: result.count,
                        });
                    }
                }
            });
    }

    onClick() {
        this.props.onClick();
    }

    _renderViewList() {
        let ViewedList = [<i key={0} />, <i key={1} />, <i key={2} />, <i key={3} />, <i key={4} />];
        if (this.state.avatars) {
            ViewedList = this.state.avatars.map((item, index) => <Avatar key={index} src={item} className="view_header" />);
        }

        return (
            <div className="viewed" onClick={this.onClick.bind(this)}>
                {ViewedList}
            </div>
        );
    }
    render() {
        return (
            <div>
                <div className={
                    classNames('who_viewd',
                        { isgroup: this.props.card.type === 'group' },
                        { isvideo: this.props.card.type === 'video' })
                }>
                    <div className="who_viewd_img">
                        {this._renderViewList()}
                        <span className="viewd_count">{this.state.viewCount}
                            <span className={
                            classNames(
                                { dotting: !this.state.viewCount },
                                )
                        } />
                            人已浏览
                        </span>
                    </div>
                </div>
            </div>

        );
    }
}
