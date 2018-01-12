/**
 * Created by wangna on 2017/2/17.
 * 我的创建 查看卡片/编辑卡片组件
 */

import React, {PureComponent} from 'react';
import Markdown from '../../../markdown';
import ToolTip from '../../../../common/ToolTip';
import './style.css';
import editBtn from './img/edit.png';

export default class PrivateCardOpen extends PureComponent {
    constructor(props) {
        super(props);
        this.renderEditBtn = this.renderEditBtn.bind(this);
        this.renderEditor = this.renderEditor.bind(this);
        this.cancelEditCard = this.cancelEditCard.bind(this);
        this.editCardDone = this.editCardDone.bind(this);
    }

    renderEditBtn() {
        return (
            <div>
                <ToolTip
                    tip="编辑卡片"
                    tipEvent={this.props.editCard}
                    position="top">
                    <button className="card-edit-btn">
                        <img src={editBtn} alt="edit card"/>
                    </button>
                </ToolTip>
            </div>
        );
    }

    renderEditor(card) {
        return (
            <div className="card-open-wrap card-single-side card-editor">
                <input type="text" ref={ref => this.cardTitle = ref} defaultValue={card.name}/>
                <textarea ref={ref => this.cardContent = ref} defaultValue={card.back_content}/>
                <div className="card-editor-action">
                    <button className="card-editor-btn cancel" onClick={this.cancelEditCard}>取消</button>
                    <button className="card-editor-btn finish" onClick={this.editCardDone}>完成</button>
                </div>
            </div>
        );
    }

    render() {
        const {card, editing, isEditAllowed} = this.props;
        if (editing) {
            return this.renderEditor(card);
        }
        return (
            <div className="card-open-wrap card-single-side">
                <div className="card-single">
                    <h3 className="card-title">{card.name}</h3>
                    <Markdown src={card.back_content}/>
                </div>
                {isEditAllowed ? this.renderEditBtn() : null}
            </div>
        );
    }

    editCardDone() {
        const {editCardDone, card} = this.props;
        const newTitle = this.cardTitle.value;
        const newContent = this.cardContent.value;
        if (newTitle === card.name && newContent === card.back_content) {
            return this.props.cancelEditCard();
        }
        card.name = newTitle;
        card.back_content = newContent;
        return editCardDone && editCardDone(card);
    }

    cancelEditCard() {
        const {cancelEditCard} = this.props;
        if (cancelEditCard) {
            cancelEditCard();
        }
    }
}
