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
        const { pathname, query } = location;
        // if(pathname.indexOf('packs')!==-1) {
        //     query ? this.props.router.go(-2):this.props.router.goBack();
        //     return
        // }

        const pathArr = pathname.split('/');
        const length = pathArr.length;
        const step = this.props.step || 2;

        // if (pathArr.indexOf('cards')!==-1 && Object.keys(query).length > 0) {
        //     if (page) query.page = page;
        //     this.props.router.push({
        //         query,
        //     });
        // } else if (pathArr.indexOf('packs')!==-1 && Object.keys(query).length > 0) {
        //     const page = localStorage.getItem(localSetting.OMC_PACKSET_PAGE);
        //     const tag = localStorage.getItem(localSetting.OMC_PACKSET_TAB);
        //     const search = localStorage.getItem(localSetting.OMC_PACKSET_SEARCH);
        //     if (page) query.page = page;
        //     if (tag) query.tag = tag;
        //     if (search) query.search = search;
        //     this.props.router.push({
        //         query,
        //     });
        // }

        this.props.router.push({
            pathname: pathArr.slice(0, length - step).join('/'),
            // query,
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
