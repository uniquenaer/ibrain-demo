/**
 * Created by nanhuijuan on 2017/1/11.
 */
/* eslint-disable */
import React, { PureComponent } from 'react';
import Video from '../../../Video';
import PLAY_BTN from './img/play@2x.png';
import './style.css';

const EXT_REG = /\[==([a-zA-Z]\w+)==\] *(?:\n+|$)/;

export default class VideoCardFront extends PureComponent {
    constructor(props) {
        super(props);

        this.hidePlayBtn = false;
        this.onClickPlay = this.onClickPlay.bind(this);
        this.isOnPlaying = this.isOnPlaying.bind(this);

        this.state = {
            hidePlayBtn: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.card.id !== this.props.card.id) {
            this.setState({ hidePlayBtn: false });
        }
    }

    onClickPlay() {
        this.video.play();
        this.setState({ hidePlayBtn: true });
    }

    isOnPlaying() {
        return this.video.isOnPlaying();
    }

    render() {
        const { card } = this.props;
        const videoName = EXT_REG.exec(card.front_content)[1];
        const videoUrl = card.extension[videoName].url;

        let posterClass = 'video-poster-container';

        if (this.state.hidePlayBtn) {
            posterClass += ' hide';
        }
        return (
            <div className="video-card-front-container">
                <div className={posterClass} >
                    <div>
                        <h2>{card.name}</h2>
                        <button onClick={this.onClickPlay}>
                            <img src={PLAY_BTN} alt="play button" className="play-btn" />
                        </button>
                    </div>
                </div>
                <Video
                    ref={video => this.video = video}
                    source={videoUrl} />
            </div>
        );
    }
}
