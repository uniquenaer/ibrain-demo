/**
 * Created by nanhuijuan on 2017/1/9.
 */

import React, { PureComponent } from 'react';
import './style.css';

export default class Flipper extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            flipped: false,
            disableAnimation: true,
        };

        this.flip = this.flip.bind(this);
    }

    flip({ isFlipped, disableAnimation = false } = {}) {
        this.setState(prevState => ({
            disableAnimation,
            flipped: typeof isFlipped === 'boolean' ? isFlipped : !prevState.flipped,
        }));
    }

    render() {
        const containerClassList = ['flip-container flipped'];
        // if (this.state.flipped) {
        //     containerClassList.push('flipped');
        // } else {
        //     containerClassList.push('overturn');
        // }
        //
        const flipperClassList = ['flipper'];
        if (!this.state.disableAnimation) {
            flipperClassList.push('anim');
        }

        return (
            <div className={containerClassList.join(' ')}>
                <div className={flipperClassList.join(' ')}>
                    <div className="front">
                        {this.props.front}
                    </div>
                </div>
            </div>
        );
    }
}
