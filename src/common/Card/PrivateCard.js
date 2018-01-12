/**
 * Created by zhuzi on 20/2/2017.
 * 我的创建-卡片 组件
 */

import React, { PureComponent } from 'react';
import CardOpenContainer from './component/CardOpenContainer';
import PrivateCardOpen from './component/PrivateCardOpen';
import { editPrivateCard } from '../../actions/cardStudent';

export default class PrivateCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            openCardIndex: props.initialOpenCardIndex,
            editing: false,
        };
        this.closeCard = this.closeCard.bind(this);
        this.nextCard = this.nextCard.bind(this);
        this.prevCard = this.prevCard.bind(this);
        this.editCard = this.editCard.bind(this);
        this.cancelEditCard = this.cancelEditCard.bind(this);
        this.editCardDone = this.editCardDone.bind(this);
    }

    render() {
        const { openCardIndex, editing } = this.state;
        const { count, cardList } = this.props;
        const footer = `${openCardIndex + 1} / ${count}`;
        return (
            <CardOpenContainer
                closeCard={editing ? null : this.closeCard}
                nextCard={openCardIndex === count - 1 || editing ? null : this.nextCard}
                prevCard={openCardIndex === 0 || editing ? null : this.prevCard}
                footer={footer}>
                <PrivateCardOpen
                    card={cardList[openCardIndex]}
                    isEditAllowed
                    editing={editing}
                    editCard={this.editCard}
                    cancelEditCard={this.cancelEditCard}
                    editCardDone={this.editCardDone} />
            </CardOpenContainer>
        );
    }
    editCardDone(card) {
        const { dispatch, packId } = this.props;
        dispatch(editPrivateCard(card, packId))
            .then(() => {
                this.setState({ editing: false });
            });
    }

    cancelEditCard() {
        this.setState({ editing: false });
    }

    editCard() {
        this.setState({ editing: true });
    }

    closeCard() {
        this.props.closeCard();
    }

    nextCard() {
        const { count } = this.props;
        const { openCardIndex } = this.state;
        if (openCardIndex === count - 1) {
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
