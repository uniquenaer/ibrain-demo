/**
 * Created by zhuzi on 27/12/2016.
 */

import React, { PureComponent } from 'react';
import './Pack.css';

class Pack extends PureComponent {

    render() {
        let className = 'container pack ';
        if (this.props.PackLocked) { className += 'locked'; }
        if (this.props.PackProgressing) { className += 'progressing'; }
        return (
            <div className={className}>
                <h3 className="pack-title">{this.props.PackTitle}</h3>
                {this.props.PackLocked ? null :
                <div className="pack-status">{this.props.PackProgressing ? '进行中' : '已完成'}</div>
                }
            </div>
        );
    }

}

export default Pack;
