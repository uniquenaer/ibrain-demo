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
const rows = 3;
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
        this.packList = dataUtils[data_source] && dataUtils[data_source].packList;
        this.cardList = dataUtils[data_source] && dataUtils[data_source].cardList;
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.pack_id !== this.props.params.pack_id) {
            this.packId = nextProps.params.pack_id;
            this.setState({
                OpenCard: false,
                initialOpenCardIndex: null,
            });
        }
    };


    renderCardPreview(card) {
        return (
            <CardPreview key={card.id} card={card} onClickCard={this.onClickCard} />
        );
    };

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
        const { data_source } = this.props.params;
        const index = this.packList && this.packList.findIndex(pack => pack.id === this.packId);
        if (index == null || index === -1) return (
            <TopNav
                title={pack && pack.packName}
                router={this.props.router}>
                <p style={{ textAlign: 'center', marginTop: '20px', color: '#383838' }}>暂无可看内容</p>
            </TopNav>
        );
        const pack = this.packList[index];
        const card = {
            "id": "0",
            "name": "问卷调查",
            "front_content": "http://ibrianclub.mikecrm.com/71aZkrO",
            "pack_id": "",
            "status": "FINISH",
            "type": "exam"
        };
        const videoCard = {
            "id": "1",
            "name": "开智部落玩法简介",
            "front_content": "http://1931.vod.myqcloud.com/1931_8b39d8e0c5b011e6bc811bda67685817.f30.mp4",
            "pack_id": "",
            "status": "FINISH",
            "type": "video"
        };
        this.cardArr = this.cardList.filter(card => card.pack_id === this.packId);
        if (data_source === 'demo') {
            this.cardArr.push(videoCard);
            this.cardArr.push(card);
        }
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
                title={pack && pack.packName}
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
