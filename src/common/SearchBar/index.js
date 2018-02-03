/**
 * Created by zhuzi on 20/3/2017.
 * SearchBar 搜索工具条组件
 */

import React, { PureComponent } from 'react';
import { Select, Input, Button, message } from 'antd';

const Option = Select.Option;
const InputGroup = Input.Group;

export default class SearchBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            select: null,
        };
        this.onSelect = this.onSelect.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onSelect(value) {
        this.setState({ select: value });
    }

    onSearch() {
        const { select } = this.props;
        const inputVal = this.input.input.value;
        if (this.props.onSearch && select) {
           return this.state.select ? this.props.onSearch(this.state.select, inputVal) : message.error('请选择筛选条件');
        }
        return  this.props.onSearch(inputVal);
    }

    clearInput = () => {
        this.input.input.value = '';
        if (this.props.onClear) {
            this.props.onClear();
        }
    };

    render() {
        const { select, containerStyle, allowClear = false } = this.props;
        const style = containerStyle || {};
        const searchBtn = (
            <Button
                className="search-bar-button" type="primary"
                onClick={this.onSearch}>
                搜索
            </Button>
        );
        return (
            <div style={style}>
                <InputGroup compact>
                    {
                        select ? (
                            <Select
                                className="search-bar-selector"
                                defaultValue={select.default}
                                style={{ width: '10%' }}
                                onChange={this.onSelect}>
                                {select.options.map(opt =>
                                    <Option value={opt.value} key={opt.value}>{opt.name}</Option>)}
                            </Select>
                        ) : null
                    }
                    <Input
                        placeholder={this.props.placeholder || '请输入搜索关键词'}
                        style={{ width: this.props.width || '30%' }}
                        id="search-bar-input"
                        ref={(input) => {
                            this.input = input;
                        }}
                        onChange={this.onSearch} />
                    {
                        allowClear ? (
                            <Button.Group>
                                {searchBtn}
                                <Button onClick={this.clearInput}>{this.props.clearText || '清空'}</Button>
                            </Button.Group>
                        ) : searchBtn
                    }
                </InputGroup>
            </div>
        );
    }
}
