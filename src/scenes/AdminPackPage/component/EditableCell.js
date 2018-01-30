/**
 * Created by wangna on 2018/1/29.
 */
import React, { PureComponent } from 'react';
import { Input, Icon, message, Select, DatePicker } from 'antd';
import moment from 'moment';
const { TextArea } = Input;

const dateFormat = 'YYYY/MM/DD';
const Option = Select.Option;

export default class EditableCell extends PureComponent {
    state = {
        value: this.props.value,
        editable: false,
    };
    handleChange = (e) => {
        const { type } = this.props;
        let value;
        switch (type) {
            case 'select':
                value = e;
                break;
            case 'input':
                value = e.target.value.trim();
                break;
            case 'textarea':
                value = e.target.value.trim();
                break;
            case 'DatePicker':
                value = e && moment(e).format(dateFormat);
                break;
            default:
                value = e.target.value.trim();
        }
        this.setState({ value });
    };

    check = () => {
        const { value } = this.state;
        if (!value) {
            message.error('不能为空');
            return;
        }
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    };
    edit = () => {
        this.setState({ editable: true });
    };

    checkIcon = () => (<Icon
        type="check"
        style={{ float: 'right', lineHeight: 'unset', color: '#1890ff' }}
        className="editable-cell-icon-check"
        onClick={this.check}
    />)

    editingDatePicker = (value) => (<div className="editable-cell-input-wrapper">
        <DatePicker
            defaultValue={moment(value, dateFormat)}
            format={dateFormat}
            onChange={this.handleChange} />
        {this.checkIcon()}
    </div>);

    editingInput = (value) => (
        <div className="editable-cell-input-wrapper">
            <Input
                style={{ width: '90%' }}
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
            />
            {this.checkIcon()}
        </div>
    );

    editingTextarea = (value) => (
        <div className="editable-cell-input-wrapper">
            <TextArea
                autosize
                style={{ width: '90%' }}
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
            />
            {this.checkIcon()}
        </div>
    )


    editingSelect = (optionsArr, value) => (
        <div className="editable-cell-input-wrapper">
            <Select
                defaultValue={value}
                style={{ width: '85%' }}
                onChange={this.handleChange}>
                {optionsArr.map(group => <Option
                    value={group}
                    key={group}>{group}</Option>)}
            </Select>
            {this.checkIcon()}
        </div>
    );

    renderEditingCell = () => {
        const { optionsArr, type } = this.props;
        const { value } = this.state;
        switch (type) {
            case 'select':
                return this.editingSelect(optionsArr, value);
            case 'input':
                return this.editingInput(value);
            case 'textarea':
                return this.editingTextarea(value)
            case 'DatePicker':
                return this.editingDatePicker(value);
            default:
                return this.editingInput(value);
        }
    };

    render() {
        const { value, editable } = this.state;
        return (
            <div className="editable-cell">
                {
                    editable ?
                        this.renderEditingCell()
                        :
                        <div className="editable-cell-text-wrapper">
                            {value || ' '}
                            <Icon
                                type="edit"
                                style={{ float: 'right', lineHeight: 'unset', color: '#1890ff' }}
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                }
            </div>
        );
    }
}


