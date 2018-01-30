/**
 * Created by wangna on 2018/1/26.
 */

import React, { PureComponent } from 'react';
import { Layout, Select, message } from 'antd';
import UploadCards from './component/UploadCards';
import { getGroupLists, getCardLists, UpdateCard, delCard, addCardBatch } from '../../actions/card';
import CommonTable from '../../common/CommonTable';
import columns from './constants';


const { Content, Header, } = Layout;
const Option = Select.Option;

export default class AdminPackPage extends PureComponent {
    state = {
        groupNames: [],
        cardList: {},
        activeGroup: null,
    };

    componentWillMount() {
        getGroupLists()
            .then((groups) => {
                if (groups && groups.length > 0) {
                    this.setState({
                        groupNames: groups,
                        activeGroup: groups[0]
                    });
                    this.getGroupCardLists(groups[0])
                }
            })
    }

    getGroupCardLists = (group) => {
        this.setState({
            activeGroup: group
        }, () => {
            getCardLists(group)
                .then((data) => {
                    if (data && data.length > 0) {
                        this.setState((prevState, prevProps) => {
                            const { cardList } = prevState;
                            cardList[group] = data;
                            return { cardList: { ...cardList } }
                        })
                    }
                })
        });
    };

    onUpdateCard = (id, params) => {
        UpdateCard(id, params)
            .then((data) => {
                if (data && data.card) {
                    const { cardList, activeGroup } = this.state;
                    const activeCardList = cardList[activeGroup];
                    const index = activeCardList.findIndex(card => card._id === id);
                    activeCardList[index] = data.card;
                    this.setState({
                        cardList: { ...cardList }
                    }, () => {
                        message.success('修改成功');
                    })
                }
            })
    };

    onDeleteCard = (id) => {
        delCard(id)
            .then((data) => {
                if (data) {
                    const { cardList, activeGroup } = this.state;
                    const activeCardList = cardList[activeGroup];
                    const index = activeCardList.findIndex(card => card._id === id);
                    activeCardList.splice(index, 1);
                    this.setState({
                        cardList: { ...cardList }
                    }, () => {
                        message.success('删除成功');
                    })
                }
            })
    };

    addCardsBatch = (cards) => {
        const { cardList, groupNames } = this.state;


        const cardArr = cards.map((card, index) => {
            const { group_name } = card;
            if (groupNames.indexOf(group_name) === -1 && !cardList[group_name]) {
                groupNames.push(group_name);
            }
            card.order_code = new Date().getTime();
            return card
        });

        return addCardBatch(cardArr)
            .then((data) => {
                if (data && data.length > 0) {
                    this.setState((prevState) => {
                        return {
                            groupNames: groupNames,
                            activeGroup: prevState.activeGroup || groupNames[0]
                        }
                    }, () => {
                        this.getGroupCardLists(this.state.activeGroup)
                    });
                }
            })
    };


    render() {
        const { groupNames, activeGroup, cardList, } = this.state;
        return (
            <Layout>
                <Header style={{ background: '#fff' }}>卡片管理</Header>
                <Content style={{ margin: '10px 0 0' }}>
                    {groupNames.length > 0 ?
                        (<Select
                            defaultValue={`${activeGroup || groupNames[0]}`}
                            style={{ width: 150, margin: '0 10px' }}
                            onChange={this.getGroupCardLists}>
                            {groupNames.map(group => <Option
                                value={group}
                                key={group}>{group}</Option>)}
                        </Select>) : null}

                    <UploadCards addCardsBatch={this.addCardsBatch} groupNames={groupNames} />

                    <CommonTable
                        dataSource={cardList[activeGroup] || []}
                        pageSizeOptions={['50', '100', '200']}
                        defaultPageSize={50}
                        columns={columns(this.onDeleteCard, this.onUpdateCard)} />

                </Content>
            </Layout>
        )
    }
}