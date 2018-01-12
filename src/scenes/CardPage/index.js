/**
 * Created by nanhuijuan on 2016/12/26.
 */

import React, { PureComponent } from 'react';
import Carousel from '../../common/Carousel/index';
import CardPreview from '../../common/Card/component/CardPreview';
import TopNav from '../../common/TopNav';
import Card from '../../common/Card';
import dataUtils from '../../data/dataUtils';
import './container.css';
const rows = 4;
const cols = 5;

class CardPage extends PureComponent {
    constructor(props) {
        super(props);
        const { data_source } = props.params;
        this.packId = props.params.pack_id;
        this.state = {
            OpenCard: false,
            initialOpenCardIndex: null,
        };
        this.packList = dataUtils[data_source].packList;
        this.cardList = dataUtils[data_source].cardList;
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.cardList) {
        //     this.setState({
        //         visibleCardList: nextProps.cardList,
        //     });
        // }
        if (nextProps.params.pack_id !== this.props.params.pack_id) {
            this.packId = nextProps.params.pack_id;
            this.setState({
                OpenCard: false,
                initialOpenCardIndex: null,
            });
        }
    }


    renderCardPreview(card) {
        return (
            <CardPreview key={card.id} card={card} onClickCard={this.onClickCard} />
        );
    }

    onClickCard = (id) => {
        const index = this.cardArr.findIndex(card => card.id === id);
        this.setState({
            OpenCard: true,
            initialOpenCardIndex: index,
        });
    };

    closeCard = () => {
        this.setState({
            OpenCard: false,
            initialOpenCardIndex: null,
        });
    };


    render() {
        const { OpenCard, initialOpenCardIndex } = this.state;
        const index = this.packList.findIndex(pack => pack.id === this.packId);
        const pack = this.packList[index];
        this.cardArr = this.cardList.filter(card => card.pack_id === this.packId);
        const cardCount = this.cardArr.length;

        const cardOpen = OpenCard && initialOpenCardIndex !== null ?
            (
                <Card
                    cardList={this.cardArr}
                    initialOpenCardIndex={initialOpenCardIndex}
                    count={cardCount}
                    closeCard={this.closeCard} />
            )
            : null;
        return (
            <TopNav
                title={pack.packName}
                router={this.props.router}>
                <div style={{ height: '100%', width: '100%' }}>
                    {cardOpen}
                    <Carousel
                        dataSource={this.cardArr}
                        renderCell={this.renderCardPreview.bind(this)}
                        maxRows={rows}
                        maxCols={cols}
                        shortcut={!OpenCard} />
                </div>
            </TopNav>
        );
    }
}


export default CardPage;
