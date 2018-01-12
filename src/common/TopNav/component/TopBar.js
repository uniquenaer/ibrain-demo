/**
 * Created by wangna on 2017/9/6.
 */
import React, { PureComponent } from 'react';

export default class TopBar extends PureComponent {
    render() {
        const { leftComponent, centerComponent, rightComponent } = this.props;
        return (<div className="top-bar">
            <div className="top-bar-left">
                {leftComponent}
            </div>
            <div className="top-bar-center">
                {centerComponent && centerComponent()}
            </div>
            <div className="top-bar-right">
                {rightComponent && rightComponent()}
            </div>
        </div>)
    }
}