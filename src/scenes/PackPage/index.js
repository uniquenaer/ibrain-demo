import React, { PureComponent } from 'react';
import moment from 'moment';
import md5 from 'md5';
import { message } from 'antd';
import Carousel from '../../common/Carousel';
import TopNav from '../../common/TopNav';
import Pack from './component/Pack';
import { getCardLists } from '../../actions/card';

const rows = 3;
const cols = 4;

class PackPage extends PureComponent {
    constructor(props) {
        super(props);

        this.defaultTime = this.getDefaultTime();

        this.state = {
            cardList: [],
            activeTime: this.defaultTime || moment().format("MM/DD/YYYY"),
        };
        this.MaxTime = moment().format("MM/DD/YYYY");
        this.minTime = moment('2018-01-13').format("MM/DD/YYYY");

    }

    getDefaultTime = () => {
        const { preview } = this.props.params;
        this.isPreviewPage = preview && preview === 'preview';
        this.keyName = this.isPreviewPage ? 'previewActive' : 'activeTime';
        return window.sessionStorage.getItem(this.keyName);
    };

    componentWillMount() {
        const { data_source } = this.props.params;
        getCardLists(data_source)
            .then((data) => {
                if (data && data.length > 0) {
                    // 调整卡包的显示时间
                    data.forEach(card => {
                        card.release_date = moment(card.release_date).add(18, 'days').format("MM/DD/YYYY");
                    });
                    let maxTime = Math.max.apply(this, data.map(card => moment(card.release_date)));
                    let minTime = Math.min.apply(this, data.map(card => moment(card.release_date)));
                    maxTime = moment(maxTime).format("MM/DD/YYYY");
                    this.MaxTime = this.isPreviewPage ? maxTime : moment().format("MM/DD/YYYY");
                    this.minTime = minTime;
                    this.setState((prevState, prevPorps) => {
                        maxTime = this.isPreviewPage ? maxTime : prevState.activeTime;
                        return { cardList: data, activeTime: this.defaultTime || maxTime, }
                    }, () => {
                        window.localStorage.setItem(data_source, JSON.stringify(data))
                    })
                }
            })
            .catch(err => {
                message.error('请求失败');
                console.log(err)
            })
    };

    renderPack(pack) {
        return (
            <a
                key={pack.id}
                id={pack.id}
                onClick={this.redirect.bind(this, pack.id)}>
                <Pack
                    PackTitle={pack.packName} />
            </a>
        );
    }

    redirect(id, e) {
        e.preventDefault();
        const { location } = this.props.router;
        this.props.router.push({ pathname: `${location.pathname}/cards/${id}` });
    }

    toggleActiveTime = (direct) => {
        const { preview } = this.props.params;
        const isPreviewPage = preview && preview === 'preview';
        this.setState((prevState, prevProps) => {
            const { activeTime } = prevState;
            const nextActiveTime = direct === 'next'
                ? moment(activeTime).add(1, 'day').format("MM/DD/YYYY")
                : moment(activeTime).subtract(1, 'day').format("MM/DD/YYYY");
            return { activeTime: nextActiveTime }
        }, () => {
            window.sessionStorage.setItem(this.keyName, this.state.activeTime)
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
        const { activeTime, cardList } = this.state;
        const packArr = [];
        cardList && cardList.forEach(card => {
            const { pack_name, release_date } = card;
            const Index = packArr.findIndex(pack => pack.packName === pack_name);
            if (Index === -1 && moment(release_date).isSame(activeTime)) {
                const pack = {
                    id: md5(pack_name),
                    packName: pack_name,
                    release_date,
                };
                packArr.push(pack)
            }
        });

        const IsNext = moment(activeTime).isBefore(moment(this.MaxTime));
        const IsPrev = moment(activeTime).isAfter(moment(this.minTime));

        return (
            <TopNav
                router={this.props.router}
                centerComponent={this.renderCenter}
                leftComponent={this.renderPrevTime.bind(this, IsPrev)}
                rightComponent={this.renderNextTime.bind(this, IsNext)}>

                {packArr && packArr.length > 0 ? <Carousel
                    dataSource={packArr}
                    renderCell={this.renderPack.bind(this)}
                    maxRows={rows}
                    maxCols={cols}
                    shortcut /> : <p style={{ textAlign: 'center', marginTop: '20px', color: '#383838' }}>暂无可看内容</p>}
            </TopNav>
        );
    }
}


export default PackPage
