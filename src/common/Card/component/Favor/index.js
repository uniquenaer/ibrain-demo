/**
 * Created by nanhuijuan on 2017/1/3.
 */
/* eslint-disable */
import React, { PureComponent } from 'react';
import BtnOn from './image/on@2x.png';
import BtnOff from './image/off@2x.png';
import BtnGroup from './image/Btn_group@2x.png';
import './style.css';

export default class Favor extends PureComponent {
    render() {
        const { isFavor, onFavor } = this.props;
        let src = isFavor ? BtnOn : BtnOff;
        if (this.props.type === 'group' || this.props.type === 'video') {
            src = isFavor ? BtnOn : BtnGroup;
        }
        return (
            <div className="favor-box">
                <img src={src} alt="favor-btn" className="favor-btn" onClick={onFavor} />
            </div>
        );
    }
}
