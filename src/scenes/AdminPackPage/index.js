/**
 * Created by wangna on 2018/1/26.
 */

import React, { PureComponent } from 'react';
import { Layout, Select, message, Button } from 'antd';
import UploadCards from './component/UploadCards';
import { getGroupLists, getCardLists, UpdateCard, delCard, addCardBatch } from '../../actions/card';
import CommonTable from '../../common/CommonTable';
import SearchBar from '../../common/SearchBar';
import columns from './constants';

const { Content, Header, } = Layout;
const Option = Select.Option;
const ButtonGroup = Button.Group;

export default class AdminPackPage extends PureComponent {
    state = {
        groupNames: [],
        cardList: {},
        activeGroup: null,
        filter: false,
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
            .catch((err) => message.error('获取失败'))
    }

    getGroupCardLists = (group) => {
        this.setState({
            activeGroup: group,
            filter: false
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
                .catch((err) => message.error('获取失败'))
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
            .catch((err) => message.error('修改失败'))
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
            .catch((err) => message.error('删除失败'))
    };

    addCardsBatch = (cards) => {
        const { cardList, groupNames } = this.state;
        const packs = {};

        const cardArr = cards.map((card, index) => {
            const { group_name, pack_name } = card;
            if (groupNames.indexOf(group_name) === -1 && !cardList[group_name]) {
                groupNames.push(group_name);
            }
            if (!packs[pack_name]) {
                packs[pack_name] = []
            }
            card.order_code = packs[pack_name].length;
            packs[pack_name].push(card);
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
                        this.getGroupCardLists(this.state.activeGroup);
                        message.success('添加成功');
                    });
                }
            })
            .catch((err) => message.error('添加失败'))
    };

    render() {
        const { groupNames, activeGroup, cardList, filter, filterCards } = this.state;
        return (
            <Layout>
                <Header style={{ background: '#fff' }}>
                    卡片管理
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

                    <ButtonGroup>
                        <Button icon="link"
                                href={`${window.location.origin}/packs/${activeGroup}`}
                                target="_blank">展示地址</Button>
                        <Button icon="eye-o"
                                href={`${window.location.origin}/preview/packs/${activeGroup}`}
                                target="_blank">预览该分类下的所有卡包</Button>
                    </ButtonGroup>


                </Header>
                <Content style={{ margin: '10px 0 0' }}>

                    <SearchBar onSearch={this.onSearch}
                               select={this.SearchCondition()}
                               containerStyle={{ margin: '0 10px 10px' }} />
                    <CommonTable
                        dataSource={filter ? filterCards : (cardList[activeGroup] || [])}
                        pageSizeOptions={['50', '100', '200']}
                        defaultPageSize={50}
                        columns={columns(this.onDeleteCard, this.onUpdateCard)} />

                </Content>
            </Layout>
        )
    }

    onSearch = (key, val) => {
        const { cardList, activeGroup } = this.state;
        if (!val) {
            this.setState({ filter: false });
            return;
        }
        const reg = new RegExp(val, 'gi');
        const filterCards = cardList[activeGroup].filter(card => card[key].match(reg));
        this.setState({ filterCards, filter: true });
    };

    SearchCondition = () => {
        const options = columns().map(column => ({
            'value': column.dataIndex, 'name': column.title
        }));
        return {
            default: '请选择筛选的类别',
            options
        };
    }
}