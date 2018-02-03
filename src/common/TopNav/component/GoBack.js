/**
 * Created by wangna on 2017/1/6.
 */

import React, { PureComponent } from 'react';
import '../topNav.css';
import goback from '../images/goBack.png';
// import { localSetting } from '../../../constants/UrlQueryLocal';

class GoBack extends PureComponent {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        const { location } = this.props.router;
        const { pathname } = location;

        const pathArr = pathname.split('/');
        const length = pathArr.length;
        const step = this.props.step || 2;
        this.props.router.push({
            pathname: pathArr.slice(0, length - step).join('/'),
        });
    }

    render() {
        const pathname = this.props.router.location.pathname;
        const pathArr = pathname.split('/');
        if (pathArr.length <= this.props.step + 1) {
            return (
                <button className="go_back">
                    {this.props.title}
                </button>
            );
        }
        return (
            <button className="go_back" onClick={this.goBack}>
                <img src={goback} alt="" />
                {this.props.title}
            </button>
        );
    }
}
export default GoBack;
