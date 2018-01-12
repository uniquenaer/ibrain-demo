/**
 * Created by wangna on 2017/1/9.
 */
/* eslint-disable */
import React, { PureComponent } from 'react';
import {
    SERVER_CARD_STUDENT,
} from '../../../../constants/ServerApi';
import { get } from '../../../../utils/request';
import moment from 'moment';

const OMCError = require('../../../OMCError/index');

import Avatar from '../../../Avatar';

export default class StudentViewList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            dataSource: null,
            viewCount: null,
        };
    }
    getTimeSection() {
        return [
            {
                id: 'today',
                name: '今天',
                startPoint: moment().startOf('day'),
            },
            {
                id: 'yesterday',
                name: '昨天',
                startPoint: moment().subtract(1, 'days').startOf('day'),
            },
            {
                id: 'thisWeek',
                name: '上周',
                startPoint: moment().subtract(7, 'days').startOf('day'),
            },
            {
                id: 'evenEarlier',
                name: '更早',
                startPoint: moment().subtract(10, 'years'),
            },
        ];
    }

    componentDidMount() {
        this.getViewList(this.props.card.id);
    }
    // componentWillReceiveProps(props) {
    //     if(props.card&&this.props.card){
    //         if(props.card.id!==this.props.card.id){
    //             this.getViewList(props.card.id);
    //         }
    //     }
    // }


    getViewList(cardId) {
        get(SERVER_CARD_STUDENT.url, { cardId })
            .then((result) => {
                const error = new OMCError(result);
                if (error.isVaild() && error.equalTo(error.Success) && result.students.length > 0) {
                    this.setState({
                        dataSource: result.students,
                        loaded: true,
                        viewCount: result.count,
                    });
                }
            });
    }

    _close() {
        this.props.onClose();
    }
    render() {
        const timeSection = this.getTimeSection();
        const rowIDs = timeSection.map(() => []);
        if (this.state.loaded && this.state.dataSource.length > 0) {
            const students = this.state.dataSource;
            students.forEach((student) => {
                for (let i = 0; i < timeSection.length; i++) {
                    if (moment(student.updated_at).isAfter(timeSection[i].startPoint)) {
                        rowIDs[i].push(student);
                        return;
                    }
                }
            });
        }
        return (
            <div className="stu_view_box">
                <div className="student_view">
                    <h3 onClick={this._close.bind(this)}>{this.state.viewCount}人看过</h3>
                    <div className="stu_content">
                        <div className="stu_view_detail">
                            {rowIDs.map((row, index) => this._renderSection(row, timeSection[index]))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _renderSection(data, section) {
        if (data.length > 0) {
            return (
                <div className="viewed" key={section.name} >
                    <p className="view_date">{section.name}共（{data.length}人）</p>
                    <div className="view-people">
                        {data.map((item, index) => (<Avatar key={index} src={item.head_img} className="view_header" />))}
                    </div>
                </div>
            );
        }
    }

}
