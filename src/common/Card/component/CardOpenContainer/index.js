/**
 * Created by nanhuijuan on 2017/1/5.
 */
/* eslint-disable */
import React, { PureComponent } from 'react';
import './style.css';

import prevArrow from './img/prevBtn.png';
import nextArrow from './img/nextBtn.png';
import closeBtn from './img/close.png';

export default class CardOpenContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.renderNextBtn = this.renderNextBtn.bind(this);
        this.renderPrevBtn = this.renderPrevBtn.bind(this);
        this._onKeyPress = this._onKeyPress.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.state = {
            changeCardDirection: null,
            moving: false,
        }
    }

    componentWillMount() {
        window.addEventListener('keydown', this._onKeyPress);
        document.body.addEventListener('touchstart', this.touchStart);
        document.body.addEventListener('touchmove', this.changeCard);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this._onKeyPress);
        document.body.removeEventListener('touchstart', this.touchStart);
        document.body.removeEventListener('touchmove', this.changeCard);
    }

    _onKeyPress(e) {
        const { nextCard, prevCard, showMoreViewer } = this.props;
        if ((e.code === 'ArrowRight' || e.keyCode === 39) && nextCard && !showMoreViewer) {
            e.preventDefault();
            return this.props.nextCard();
        }
        if ((e.code === 'ArrowLeft' || e.keyCode === 37) && prevCard && !showMoreViewer) {
            e.preventDefault();
            return this.props.prevCard();
        }
    }


    touchStart = (e) => {
        this.setState({
            moving: true
        });
        // e.preventDefault();
        e.stopPropagation();
        this.startX = e.changedTouches[0].pageX;
        this.startY = e.changedTouches[0].pageY;
    };

    changeCard = (e) => {
        const { prevCard, nextCard } = this.props;
        // e.preventDefault();
        e.stopPropagation();
        const { moving } = this.state;
        const moveEndX = e.changedTouches[0].pageX;
        const moveEndY = e.changedTouches[0].pageY;
        const X = moveEndX - this.startX;
        const Y = moveEndY - this.startY;
        if (!moving) return;

        if (Math.abs(X) > Math.abs(Y) && X > 0) {
            this.setState({ changeCardDirection: 'prev', moving: false }, () => {
                prevCard();
                console.log("left 2 right");
            });
        } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
            this.setState({ changeCardDirection: 'next', moving: false }, () => {
                nextCard();
                console.log("right 2 left");
            });
        } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
            console.log("top 2 bottom");
        } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
            console.log("bottom 2 top");
        }
    };

    render() {
        return (
            <div className="card-open-container-mask">
                <div className="card-open-container">
                    <div className="card-open">
                        {this.props.children}
                    </div>
                    {this.renderClose()}
                </div>
                {this.renderFooter()}
            </div>
        );
    }

    renderNextBtn() {
        const { nextCard, showMoreViewer } = this.props;
        if (nextCard && !showMoreViewer) {
            return (
                <button onClick={nextCard} className="card-open-container-btn next-card">
                    <img src={nextArrow} alt="next" />
                </button>
            );
        }
    }

    renderPrevBtn() {
        const { prevCard, showMoreViewer } = this.props;
        if (prevCard && !showMoreViewer) {
            return (
                <button onClick={prevCard} className="card-open-container-btn prev-card">
                    <img src={prevArrow} alt="prev" />
                </button>
            );
        }
    }

    renderClose() {
        const { closeCard, showMoreViewer } = this.props;
        if (closeCard && !showMoreViewer) {
            return (
                <button onClick={closeCard} className="card-open-container-close">
                    <img src={closeBtn} alt="close" />
                </button>
            );
        }
    }

    renderFooter() {
        return (<div className="card-open-container-footer">
            {this.props.footer}
        </div>);
    }
}

