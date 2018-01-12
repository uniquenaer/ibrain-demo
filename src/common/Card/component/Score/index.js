/**
 * Created by zhuzi on 12/1/2017.
 */
/* eslint-disable */
import React, { PureComponent } from 'react';
import { CARD_SCORE } from '../../constants';
import './Score.css';

class Score extends PureComponent {
    render() {
        return (
            <div className="card-score-container">
                <p>这张卡片对你帮助如何？</p>
                <div className="card-score-icons-container">
                    {
                        CARD_SCORE.map((diff) => {
                            if (this.props.score === diff.score) {
                                return (
                                    <div key={diff.score} className="card-score-icon active">
                                        <button>
                                            <img src={diff.img.active} alt="active" />
                                        </button>
                                        <p>{diff.title}</p>
                                    </div>
                                );
                            }
                            return (
                                <div key={diff.score} className="card-score-icon">
                                    <button onClick={this.props.onScore.bind(this, diff.score)}>
                                        <img src={diff.img.inactive} alt="inactive" />
                                    </button>
                                    <p>{diff.title}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Score;
