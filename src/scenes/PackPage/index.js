/**
 * Created by nanhuijuan on 2016/12/26.
 */
import React, { PureComponent } from 'react';
import moment from 'moment';
import Papa from 'papaparse';
import Carousel from '../../common/Carousel';
import TopNav from '../../common/TopNav';
import Pack from './component/Pack';
// import packList from './packList';
import packList from '../../data/packList';
const rows = 3;
const cols = 4;

class PackPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeTime: moment().format("MM-DD-YYYY"),
        };

    }


    renderPack(pack) {
        return (
            <a
                key={pack.id}
                id={pack.id}
                onClick={this.redirect.bind(this, pack.id)}>
                <Pack
                    PackTitle={pack.packName}
                    PackLocked={pack.locked}
                    PackProgressing={pack.progressing} />
            </a>
        );
    }

    redirect(id, e) {
        e.preventDefault();
        const { location } = this.props.router;
        this.props.router.push({ pathname: `${location.pathname}/cards/${id}` });
    }

    toggleActiveTime = (direct) => {
        this.setState((prevState, prevProps) => {
            const { activeTime } = prevState;
            const nextActiveTime = direct === 'next'
                ? moment(activeTime).add(1, 'day').format("YYYY-MM-DD")
                : moment(activeTime).subtract(1, 'day').format("YYYY-MM-DD");
            return { activeTime: nextActiveTime }
        }, () => {
            console.log(this.state.activeTime);
        });
    };

    renderNextTime = () => (
        <button style={{ lineHeight: '50px', fontSize: '14px' }} onClick={this.toggleActiveTime.bind(this, 'next')}>
            后一天</button>
    );

    renderPrevTime = () => (
        <button style={{ lineHeight: '50px', fontSize: '14px' }}
                onClick={this.toggleActiveTime.bind(this, 'prev')}>前一天</button>
    );

    renderCenter = () => (
        <span style={{ lineHeight: '50px', fontSize: '18px', display: 'inline-block', color: '#e75151' }}>脑计划</span>);

    render() {
        return (
            <TopNav
                router={this.props.router}
                centerComponent={this.renderCenter}
                leftComponent={this.renderPrevTime}
                rightComponent={this.renderNextTime}>
                <Carousel
                    dataSource={packList}
                    renderCell={this.renderPack.bind(this)}
                    maxRows={rows}
                    maxCols={cols}
                    shortcut />
            </TopNav>
        );
    }

}


export default PackPage
