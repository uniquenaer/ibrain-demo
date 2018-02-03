import React, { PureComponent } from 'react';
import './Pack.css';

class Pack extends PureComponent {

    render() {
        let className = 'container pack ';
        return (
            <div className={className}>
                <h3 className="pack-title">{this.props.PackTitle}</h3>
            </div>
        );
    }

}

export default Pack;
