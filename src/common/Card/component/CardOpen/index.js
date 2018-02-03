/**
 * Created by nanhuijuan on 2016/12/27.
 */

import React, { PureComponent } from 'react';
import Markdown from '../../../../common/markdown';
import './style.css';
import { CARD_TYPE } from '../../constants';
import VideoCardFront from '../VideoCardFront';

export default class CardOpen extends PureComponent {
    state = {
        iframeHeight: null
    };

    componentDidMount() {
        window.addEventListener && window.addEventListener("message", this.getHeight, !1);
    }

    componentDidUpdate(prevProps, prevState) {
        const target = document.getElementById('card-main-content');
        if (prevState && !prevState.iframeHeight && target) {
            target.scrollTop = 0;
        }
    };

    componentWillUnmount() {
        window.removeEventListener && window.removeEventListener("message", this.getHeight, !1);
    };

    getHeight = (b) => {
        if (b.data) {
            const f = JSON.parse(b.data);
            this.setState({
                iframeHeight: f.height + 'px'
            })
        }
    };


    render() {
        const { card } = this.props;
        return (
            <div className="card-open-wrap">
                {this.renderFront(card)}
            </div>
        );
    }

    renderExam = (front_content) => {
        const { iframeHeight } = this.state;


        return (
            <div className="card-main-content" id="card-main-content"
                 style={{ padding: '0', borderRadius: '10px' }}>
                <iframe
                    src={front_content}
                    frameBorder="0"
                    // scrolling="no"
                    ref="iframe"
                    onLoad={() => {
                        this.refs.iframe.contentWindow.postMessage(JSON.stringify({ cif: 1 }), "*");
                    }}
                    style={{
                        display: 'block',
                        minWidth: '100%',
                        width: '100px',
                        height: iframeHeight || '100%',
                        border: 'none',
                        overflow: 'auto',
                        borderRadius: '10px',
                    }}
                    kwframeid="1" />
            </div>
        )
    };

    renderPower = (card) => (
        <div className="card-main-content" id="card-main-content">
            <h2 className="card-title">{card.card_name}</h2>
            <Markdown src={card.card_content} />
            {this.renderGradient()}
        </div>
    );

    renderFront = (card) => {

        const { card_content, card_type } = card;

        const containerClassList = ['card-open-main'];

        if (CARD_TYPE[card_type.toUpperCase()]) {
            containerClassList.push(card_type);
        }

        switch (card_type) {
            case CARD_TYPE.EXAM:
                return (
                    <div className={containerClassList.join(' ')}>
                        {this.renderExam(card_content)}
                    </div>
                );

            case CARD_TYPE.VIDEO:
                return (
                    <div className="card-open-main card-open-main-video">
                        <VideoCardFront card={card} ref={video => this.video = video} />
                    </div>
                );
            default:
                return (
                    <div className={containerClassList.join(' ')}>
                        {this.renderPower(card)}
                    </div>
                )
        }
    };

    renderGradient = () => {
        return (
            <div className="white-gradient-container">
                <img src="http://webstatic.openmindclub.com/static/media/grad.png" alt="gradient" />
            </div>
        );
    }

}

