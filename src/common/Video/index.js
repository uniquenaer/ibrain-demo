/**
 * Created by nanhuijuan on 2017/1/11.
 */
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import plyr from 'plyr';

import 'plyr/dist/plyr.css';
import './video.css';

const TYPE_MP4 = 'video/mp4';

class Video extends PureComponent {

    constructor(props) {
        super(props);
        this.play = this.play.bind(this);
        this.isOnPlaying = this.isOnPlaying.bind(this);
    }

    componentDidMount() {
        // eslint-disable-next-line
        this.player = plyr.setup(ReactDOM.findDOMNode(this), this.props.options)[0];
        if (!this.player) return;
        this.video = this.player.getMedia();
        this.player.on('ended', () => {
            this.props.autoPlayNext();
        });

        const { containerWidth, containerHeight } = this.props;

        if (!containerWidth || !containerHeight) return;

        this.video.onloadedmetadata = function (e) {
            // 使视频大小适应 container
            const { videoWidth, videoHeight } = e.target;
            const videoRatio = videoWidth / videoHeight;
            const containerRatio = containerWidth / containerHeight;
            if (videoRatio > containerRatio) {
                e.target.style.width = '100%';
                e.target.style.height = 'auto';
            } else {
                e.target.style.height = '100%';
                e.target.style.width = 'auto';
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.source !== this.props.source && this.player) {
            this.player.source({
                type: 'video',
                sources: [{
                    src: nextProps.source,
                    type: TYPE_MP4,
                }],
            });
            this.video = this.player.getMedia();
        }
    }

    play() {
        this.player.play();
    }

    pause() {
        this.player.pause();
    }

    componentWillUnmount() {
        if (!this.player) return;
        this.player.destroy();
    }

    isOnPlaying() {
        return !!(
        this.video &&
        this.video.duration > 0 &&
        !this.video.paused &&
        !this.video.ended &&
        this.video.readyState > 2);
    }

    render() {
        return (
            <video poster={this.props.cover} controls style={{ maxWidth: '100%' }}>
                <source src={this.props.source} type={TYPE_MP4} />
            </video>
        );
    }
}

export default Video;
