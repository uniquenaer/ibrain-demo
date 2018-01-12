/**
 * Created by zhuzi on 10/2/2017.
 * 卡片组件
 */
/* eslint-disable */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import CardOpenContainer from './component/CardOpenContainer';
import CardOpen from './component/CardOpen';

class Card extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            openCardIndex: props.initialOpenCardIndex,
        };
        this.closeCard = this.closeCard.bind(this);
        this.nextCard = this.nextCard.bind(this);
        this.prevCard = this.prevCard.bind(this);
    }

    render() {
        const { openCardIndex } = this.state;
        const { count, gameStatus, cardList, } = this.props;

        const footer = `${openCardIndex + 1} / ${count}`;
        return (
            <CardOpenContainer
                closeCard={this.closeCard}
                nextCard={openCardIndex === count - 1 && !gameStatus ? null : this.nextCard}
                prevCard={openCardIndex === 0 ? null : this.prevCard}
                footer={footer}>
                <CardOpen
                    card={cardList[openCardIndex]} />

            </CardOpenContainer>
        );
    }


    closeCard() {
        this.props.closeCard();
    }

    nextCard() {
        const { gameStatus, count } = this.props;
        const { openCardIndex } = this.state;
        if (!gameStatus && openCardIndex === count - 1) {
            return;
        }
        this.setState(prevState => ({
            openCardIndex: prevState.openCardIndex + 1,
        }));
    }

    prevCard() {
        if (this.state.openCardIndex === 0) return;
        this.setState(prevState => ({
            openCardIndex: prevState.openCardIndex - 1,
        }));
    }

}

export default withRouter(Card);
