/**
 * Created by zhuzi on 9/1/2017.
 * 笔记卡组件
 */
/* eslint-disable */
import
    React, {
    PureComponent
} from 'react';
import './NoteCard.css';
import Markdown from '../../../../common/markdown';
import comma from './comma.png';

class NoteCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ownerInfo: null,
        };

        this.renderBack = this.renderBack.bind(this);
    }


    render() {
        if (!this.props.front) {
            return this.renderBack();
        }

        return (
            <div className="card-note-wrap">
                <div className={'card-note-top'}>
                    <img src={this.props.card.extension.note.image} alt="" />
                    {this.renderTopOverlay()}
                </div>
                {this.renderContent()}
            </div>
        );
    }

    renderTopOverlay() {
        const { ownerInfo } = this.state;
        const { card } = this.props;
        const date = new Date(card.created_at);
        let head_img;
        if (ownerInfo) {
            head_img = ownerInfo.head_img.startsWith('res') ? (`${config.domain}/${ownerInfo.head_img}`) : ownerInfo.head_img;
        }
        return (
            <div className="card-note-top-overlay">
                <div className="card-note-date text">{date.toLocaleString()}</div>
            </div>
        );
    }

    renderContent() {
        const { card } = this.props;
        if (this.props.front) {
            return (
                <div className="card-note-content">
                    <h2>{card.name}</h2>
                    <div className="card-note-inner-content">
                        <img src={comma} alt="" />
                    </div>
                </div>
            );
        }
        return (
            <div className="card-note-content-back">
                <div className="text">
                    <Markdown
                        src={card.back_content}
                        extension={card.extension} />
                </div>
            </div>
        );
    }

    renderBack() {
        return (
            <div className="card-note-back-wrap">
                <img src={this.props.card.extension.note.image} alt="note card" />
                <div className="card-note-back-content">
                    {this.renderContent()}
                </div>
                {this.renderGradient()}
            </div>
        );
    }

    renderGradient() {
        return (
            <div className="white-gradient-container">
                <img src="http://webstatic.openmindclub.com/static/media/gradient.png" alt="gradient" />
            </div>
        );
    }
}

export default NoteCard;
