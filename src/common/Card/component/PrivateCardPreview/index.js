/**
 * Created by wangna on 2017/2/16.
 */
/* eslint-disable */
import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import Markdown from '../../../../common/markdown';
import ToolTip from '../../../../common/ToolTip';
import moment from 'moment';
import './style.css';
import errorBtn from './img/errorBtn.png';
import addToPack from './img/addToPack.png';
import delCard from './img/delCard.png';
import {CARD_SYNC_STATUS} from '../../../../constants/CardSyncStatus';
import classnames from 'classnames';

class PrivateCardPreview extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            limitContent: false,
        }
        this.cardCellContainer = null;
        this.markdownContainer = null;
        this.onClick = this.onClick.bind(this);
        this.syncCard = this.syncCard.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClickSelectPacks = this.onClickSelectPacks.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this._getElemHeight = this._getElemHeight.bind(this);
        this.renderLimitContent = this.renderLimitContent.bind(this);
    }

    onMouseEnter() {
        this.setState({hover: true});
    }

    onMouseLeave() {
        this.setState({hover: false});
    }

    componentDidMount() {
        this.renderLimitContent();
    }

    _getElemHeight(element) {
        return element && element.getBoundingClientRect().height;
    }

    renderLimitContent() {
        const MarkdownHeight = this._getElemHeight(ReactDOM.findDOMNode(this.markdownContainer));
        const cardCellContainerHeight = this._getElemHeight(ReactDOM.findDOMNode(this.cardCellContainer));
        if (MarkdownHeight > cardCellContainerHeight) {
            this.setState({
                limitContent: true,
            });
        }
    }

    onClick(e) {
        e.preventDefault();
        const escapeClass = ['error-btn', 'card-cell-tool-bar-icon', 'card-cell-tool-bar'];
        const isEscape = escapeClass.some(c => (
        e.target.parentNode.classList.contains(c) ||
        e.target.classList.contains(c)));
        if (isEscape) {
            // click on error-btn and tool-bar, not trigger onClickCard event

        } else {
            this.props.onClickCard(this.props.card.id);
        }
    }

    syncCard(e) {
        e.preventDefault();
        const {card, syncCard} = this.props;
        if (syncCard) {
            syncCard(card);
        }
    }

    onClickSelectPacks() {
        if (this.props.onClickSelectPacks) {
            const {card} = this.props;
            this.props.onClickSelectPacks(card);
        }
    }

    deleteCard() {
        if (this.props.deleteCard) {
            const {card} = this.props;
            this.props.deleteCard(card);
        }
    }

    renderErrorBtn() {
        return (
            <div>
                <ToolTip
                    tip="同步"
                    tipEvent={this.syncCard}
                    position="down"
                >
                    <button className="error-btn">
                        <img src={errorBtn} alt="error button"/>
                    </button>
                </ToolTip>
            </div>
        );
    }

    renderCopyToPackBtn() {
        return (
            <div>
                <ToolTip
                    tip="将卡片加入到卡包"
                    tipEvent={this.onClickSelectPacks}
                    position="down"
                >
                    <img src={addToPack} className="add-to-pack" alt="add to pack"
                         style={{width: '18px', height: '23px'}}/>
                </ToolTip>
            </div>
        );
    }

    renderDelCardBtn() {
        return (
            <div>
                <ToolTip
                    tip="删除卡片"
                    tipEvent={this.deleteCard}
                    position="top"
                >
                    <img src={delCard} alt="del card" style={{width: '24px', height: '24px'}}/>
                </ToolTip>
            </div>
        );
    }

    renderToolBar() {
        return (
            <div className="card-cell-tool-bar">
                {this.renderCopyToPackBtn()}
                {this.props.deleteCard && this.renderDelCardBtn()}
            </div>
        );
    }

    render() {
        const {card} = this.props;
        const {hover} = this.state;
        const cardName = card.name ? (<h4>{card.name}</h4>) : null;
        return (
            <div
                className="card-cell"
                id={card.id}
                onClick={this.onClick}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}>
                {cardName}
                <div className="card-cell-preview" ref={ref => this.cardCellContainer = ref}>
                    <Markdown src={card.back_content} ref={ref => this.markdownContainer = ref}/>
                    <i className={classnames('limit', {limitContent: this.state.limitContent})}/>
                </div>
                <p className="card-cell-time">{moment(card.updated_at).format('YYYY/MM/DD')}</p>
                {card.status !== CARD_SYNC_STATUS.SYNCED && this.renderErrorBtn()}
                {hover && this.renderToolBar()}
            </div>
        );
    }
}

export default PrivateCardPreview;
