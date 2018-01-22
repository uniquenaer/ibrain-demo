/**
 * Created by nanhuijuan on 2016/12/27.
 */

import React, { PureComponent } from 'react';
import Markdown from '../../../../common/markdown';
import './style.css';
import { CARD_TYPE } from '../../constants';

const CARD_TYPE_WITH_GRADIENT = ['action', 'power', 'remember'];
const CARD_TYPE_WITH_ONLY_MARKDOWN = ['action', 'power', 'remember'];

const LINK_INSIDE = '(?:\\[[^\\]]*\\]|[^\\]]|\\](?=[^\\[]*\\]))*';
const LINK_HREF_AND_TITLE = "\\s*<?([^\\s]*?)>?(?:\\s+['\"]([\\s\\S]*?)['\"])?\\s*";
const IMG_REGEXP = new RegExp(
    `!\\[(${LINK_INSIDE})\\]\\(${LINK_HREF_AND_TITLE}\\)`,
);


export default class CardOpen extends PureComponent {

    componentDidUpdate(prevProps, prevState) {
        const target = document.getElementById('card-main-content');
        target.scrollTop = 0;
    };

    render() {
        const { card } = this.props;
        return (
            <div className="card-open-wrap">
                {this.renderFront(card)}
            </div>
        );
    }

    renderFront = (card) => {

        const front_content = card.front_content;

        const containerClassList = ['card-open-main'];

        if (CARD_TYPE[card.type.toUpperCase()]) {
            containerClassList.push(card.type);
        }

        return (
            <div className={containerClassList.join(' ')}>
                <div className="card-main-content" id="card-main-content">
                    <h2 className="card-title">{card.name}</h2>
                    <Markdown src={front_content} />
                </div>
                {this.renderGradient()}
            </div>
        );
    };

    renderGradient() {
        return (
            <div className="white-gradient-container">
                <img src="http://webstatic.openmindclub.com/static/media/grad.png" alt="gradient" />
            </div>
        );
    }

}

