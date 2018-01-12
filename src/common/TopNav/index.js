/**
 * Created by wangna on 2017/9/5.
 *
 * TopNav
 * 1 params:title、router---默认的goback使用
 * 2 leftComponent:default=goback;centerComponent rightComponent
 * 3 页面的主要内容区域被包在TopNav中
 */
import React, { PureComponent } from 'react';
import TopBar from './component/TopBar';
import GoBack from './component/GoBack';
import './topNav.css'

export default class TopNav extends PureComponent {

    renderLeftPosition = () => {
        const { leftComponent, title, router, step } = this.props;
        if (!leftComponent) return (<GoBack title={title || '开智学堂'}
                                            router={router}
                                            step={step || 2} />);
        return leftComponent();
    };

    render() {
        const { centerComponent, rightComponent } = this.props;
        return (
            <div className="top-nav cover-full">
                <TopBar
                    leftComponent={this.renderLeftPosition()}
                    centerComponent={centerComponent || null}
                    rightComponent={rightComponent || null} />
                <div className="single-main">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
