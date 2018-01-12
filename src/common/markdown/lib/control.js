/**
 * Created by nanhuijuan on 2016/12/30.
 */
/* eslint-disable */
import React from 'react';
import RadioBox from '../components/RadioBox';
import CheckBox from '../components/CheckBox';
import * as ControlEvent from './events';

import '../style/control.css';

export default class Control {
    constructor(name, ext, eventHandler) {
        this.name = name;
        this.ext = ext;
        this.eventHandler = eventHandler;
        this.createControl();
    }

    getControl() {
        return this._ctrl;
    }

    createControl() {
        switch (this.ext.type) {
            case 'input':
                this._createInput();
                break;
            case 'radio':
                this._createRadio();
                break;
            case 'checkbox':
                this._createCheckbox();
                break;
            case 'submit':
                this._createSubmit();
                break;
            default:
                break;
        }
    }

    _createInput() {
        const multiline = this.ext.multiline;
        const maxLength = this.ext.maxLength ? this.ext.maxLength : 1000;
        if (multiline) {
            const numberOfLines = this.ext.numberOfLines ? this.ext.numberOfLines : 6;
            this._ctrl = (
                <textarea
                    key={this.name}
                    rows={numberOfLines}
                    maxLength={maxLength}
                    placeholder="点击输入文字"
                    onChange={this.onInputChange.bind(this)} />
            );
        } else {
            this._ctrl = (<input
                className="form-control"
                key={this.name}
                type="text"
                maxLength={maxLength}
                onKeyDown={(e) => {
                    e.stopPropagation()
                }}
                onChange={this.onInputChange.bind(this)} />);
        }
    }

    _createRadio() {
        this._ctrl = (<RadioBox
            key={this.name}
            items={this.ext.item}
            name={this.name}
            onSelect={this.onRadioChange.bind(this)} />);
    }

    _createCheckbox() {
        this._ctrl = (<CheckBox
            key={this.name}
            items={this.ext.item}
            name={this.name}
            onSelect={this.onCheckBoxChange.bind(this)} />);
    }

    _createSubmit() {
        this._ctrl = (
            <div key={this.name} className="md-submit-btn">
                <button onClick={this.onSubmit.bind(this)}>
                    {this.ext.caption}
                </button>
            </div>
        );
    }

    onInputChange(e) {
        if (this.eventHandler) {
            this.eventHandler(ControlEvent.TextChange, this.name, e.target.value);
        }
    }

    onRadioChange(index) {
        if (this.eventHandler) {
            this.eventHandler(ControlEvent.RadioChange, this.name, this.ext.item[index]);
        }
    }

    onCheckBoxChange(selected) {
        const ext = this.ext;
        const selectedItem = selected.map(selectedIndex => ext.item[selectedIndex]);

        if (this.eventHandler) {
            this.eventHandler(ControlEvent.CheckBoxChange, this.name, selectedItem);
        }
    }

    onSubmit() {
        if (this.eventHandler) {
            this.eventHandler(ControlEvent.Submit, this.name);
        }
    }
}
