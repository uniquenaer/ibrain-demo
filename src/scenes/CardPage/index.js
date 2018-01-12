/**
 * Created by nanhuijuan on 2016/12/26.
 */

import React, { PureComponent } from 'react';
import Carousel from '../../common/Carousel/index';
import CardPreview from '../../common/Card/component/CardPreview';
import TopNav from '../../common/TopNav';
import Card from '../../common/Card';
import cardList from '../../data/cardList';
import packList from '../../data/packList';

import './container.css';
const rows = 4;
const cols = 5;

class CardPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            OpenCard: false,
            initialOpenCardIndex: null,
        };
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
        const index = cardList.indexOf(id);
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
        const packIds = packList.map(pack => pack.id);
        const cardCount = cardList.length;
        const isLastPack = packIds.indexOf(this.packId) === (packIds.length - 1);
        const activePackIndex = packIds.findIndex(id => id === this.packId);
        const nextPackIndex = isLastPack ? activePackIndex : activePackIndex + 1;
        const nextPack = packList[nextPackIndex];
        const nextPackId = packList[nextPackIndex].id;

        const cardOpen = OpenCard && initialOpenCardIndex !== null ?
            (
                <Card
                    cardList={cardList}
                    initialOpenCardIndex={initialOpenCardIndex}
                    count={cardCount}
                    nextPackId={nextPackId}
                    nextPack={nextPack}
                    gameStatus
                    isLastPack={isLastPack}
                    closeCard={this.closeCard} />
            )
            : null;
        return (
            <TopNav
                title={'脑计划'}
                router={this.props.router}>
                <div style={{ height: '100%', width: '100%' }}>
                    {cardOpen}
                    <Carousel
                        dataSource={cardList}
                        renderCell={this.renderCardPreview.bind(this)}
                        maxRows={rows}
                        maxCols={cols}
                        shortcut={!OpenCard} />
                </div>
            </TopNav>
        );
    }
}


export default CardPage
