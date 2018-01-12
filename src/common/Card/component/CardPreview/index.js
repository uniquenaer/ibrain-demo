/**
 * Created by nanhuijuan on 2016/12/27.
 */
/* eslint-disable */
import React, { PureComponent } from 'react';
import './CardPreview.css';
import { CARD_STATUS } from '../../constants';

export default class CardPreview extends PureComponent {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.renderCardType = this.renderCardType.bind(this);
    }

    render() {
        const { card } = this.props;

        return (
            <div className={`card-preview ${card.status.toLowerCase()}`} onClick={this.onClick}>
                {this.renderCardType(card.type, card.status)}
                <div className="card-title">{card.name}</div>
                <div className="card-preview-bottom" />
            </div>
        );
    }

    renderCardType(type, status) {
        let cardTypeImg;
        if (status === CARD_STATUS.FINISH) {
            cardTypeImg = require(`./image/${type}.png`);
        } else if (status === CARD_STATUS.ONGOING) {
            cardTypeImg = require(`./image/${type}_ongoing.png`);
        } else if (status === CARD_STATUS.LOCK) {
            cardTypeImg = require('./image/lock.png');
        } else {
            return null;
        }

        return (
            <div className="flex-center card-type">
                <img src={cardTypeImg} alt="card type" />
            </div>
        );
    }

    onClick(e) {
        e.preventDefault();
        this.props.onClickCard(this.props.card.id);
    }
}
