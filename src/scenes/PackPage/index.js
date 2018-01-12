/**
 * Created by nanhuijuan on 2016/12/26.
 */
import React, { PureComponent } from 'react';
import moment from 'moment';
import Carousel from '../../common/Carousel';
import TopNav from '../../common/TopNav';
import Pack from './component/Pack';
import dataUtils from '../../data/dataUtils';
const rows = 3;
const cols = 4;

class PackPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeTime: moment().add(3, 'days').format("MM/DD/YYYY"),
            // activeTime: moment().format("MM-DD-YYYY"),
        };
        this.MaxTime = moment().add(5, 'days').format("MM/DD/YYYY");
        this.minTime = moment('2018-01-13').format("MM/DD/YYYY");
        const { data_source } = props.params;
        this.packList = dataUtils[data_source].packList;
    }

    renderPack(pack) {
        return (
            <a
                key={pack.id}
                id={pack.id}
                onClick={this.redirect.bind(this, pack.id)}>
                <Pack
                    PackTitle={pack.packName}
                    PackLocked={pack.locked} />
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
                ? moment(activeTime).add(1, 'day').format("MM/DD/YYYY")
                : moment(activeTime).subtract(1, 'day').format("MM/DD/YYYY");
            return { activeTime: nextActiveTime }
        }, () => {
            console.log(this.state.activeTime);
        });
    };

    renderNextTime = (IsNext) => (
        <button style={{ lineHeight: '50px', fontSize: '14px' }} onClick={this.toggleActiveTime.bind(this, 'next')}
                disabled={!IsNext}>
            后一天</button>
    );

    renderPrevTime = (IsPrev) => (
        <button style={{ lineHeight: '50px', fontSize: '14px' }}
                disabled={!IsPrev}
                onClick={this.toggleActiveTime.bind(this, 'prev')}>前一天</button>
    );

    renderCenter = () => (
        <span style={{ lineHeight: '50px', fontSize: '18px', display: 'inline-block', color: '#e75151' }}>脑计划</span>);

    render() {
        const { activeTime } = this.state;
        const packArr = this.packList.filter((pack) => (moment(pack.open_read).isSame(activeTime)));
        const IsNext = moment(activeTime).isBefore(moment(this.MaxTime));
        const IsPrev = moment(activeTime).isAfter(moment(this.minTime));
        console.log('min', this.minTime, 'active', activeTime, 'max:', this.MaxTime);
        return (
            <TopNav
                router={this.props.router}
                centerComponent={this.renderCenter}
                leftComponent={this.renderPrevTime.bind(this, IsPrev)}
                rightComponent={this.renderNextTime.bind(this, IsNext)}>
                <Carousel
                    dataSource={packArr}
                    renderCell={this.renderPack.bind(this)}
                    maxRows={rows}
                    maxCols={cols}
                    shortcut />
            </TopNav>
        );
    }

}


export default PackPage
