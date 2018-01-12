/**
 * Created by nanhuijuan on 2017/1/5.
 */
/* eslint-disable */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import BACK from './img/back.png';
import './style.css';

class PackFinished extends PureComponent {
    constructor(props) {
        super(props);

        this.renderBackToPackList = this.renderBackToPackList.bind(this);
        this.renderNextPackBtn = this.renderNextPackBtn.bind(this);
        this.backToPackList = this.backToPackList.bind(this);
        this.renderNextPackName = this.renderNextPackName.bind(this);
        this._onKeyPress = this._onKeyPress.bind(this);
    }

    componentWillMount() {
        window.addEventListener('keydown', this._onKeyPress);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this._onKeyPress);
    }

    componentDidMount() {
        const { isLastPack, setCourseFinished } = this.props;
        if (isLastPack && setCourseFinished) {
            return setCourseFinished();
        }
    }

    _onKeyPress(e) {
        if (e.code === 'ArrowRight' || e.keyCode === 39) {
            e.preventDefault();
            if (this.props.toNextPack) {
                return this.props.toNextPack();
            }
        }
    }

    render() {
        return (
            <div className="card-open-wrap pack-finish-container">
                <div>
                    <img src="http://webstatic.openmindclub.com/static/media/pack-finished-head@2x.png" alt="congratulations" />
                    <h2>真棒！继续加油...</h2>
                    <hr />
                    {this.renderNextPackName()}
                    {this.renderNextPackBtn()}
                    {this.renderBackToPackList()}
                </div>
            </div>
        );
    }

    renderNextPackBtn() {
        if (this.props.toNextPack) {
            return (
                <div className="to-next-pack">
                    <button onClick={this.props.toNextPack}>继续</button>
                </div>
            );
        }
        return (
            <div>
                <p>已经是最后一个卡包啦~</p>
            </div>
        );
    }

    renderNextPackName() {
        const { nextPackName } = this.props;

        if (!nextPackName) {
            return null;
        }

        return (
            <p className="next-pack-name">
                {`下一卡包：${nextPackName}`}
            </p>
        );
    }

    renderBackToPackList() {
        return (
            <div className="back-to-pack-list">
                <img src={BACK} alt="back-to-pack-list" />
                <button onClick={this.backToPackList}>返回卡包列表</button>
            </div>
        );
    }

    backToPackList() {
        const { router, params } = this.props;
        router.push({
            pathname: `/course/packs/${params.packset_id}`,
        });
    }
}

export default withRouter(PackFinished);
