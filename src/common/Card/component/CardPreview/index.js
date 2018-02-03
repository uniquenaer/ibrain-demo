/**
 * Created by nanhuijuan on 2016/12/27.
 */
/* eslint-disable */
import React, { PureComponent } from 'react';
import './CardPreview.css';

export default class CardPreview extends PureComponent {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.renderCardType = this.renderCardType.bind(this);
    }

    render() {
        const { card } = this.props;

        return (
            <div className={`card-preview finish`} onClick={this.onClick}>
                {this.renderCardType(card.card_type)}
                <div className="card-title">{card.card_title}</div>
                <div className="card-preview-bottom" />
            </div>
        );
    }

    renderCardType(type) {
        let cardTypeImg;
        cardTypeImg = require(`./image/${type}.png`);

        return (
            <div className="card-type">
                <img src={cardTypeImg} alt="card type" />
            </div>
        );
    }

    onClick(e) {
        e.preventDefault();
        this.props.onClickCard(this.props.card._id);
    }
}
