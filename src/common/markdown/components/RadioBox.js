/**
 * Created by nanhuijuan on 2016/12/30.
 */

import React, { PureComponent } from 'react';
import '../style/radio.css';

export default class RadioBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
        };

        if (this.props.onSelect) {
            this.props.onSelect(this.state.selected);
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(index) {
        return () => {
            this.setState({
                selected: index,
            });

            if (this.props.onSelect) {
                this.props.onSelect(index);
            }
        };
    }

    render() {
        const selectedIndex = this.state.selected;
        return (
            <form>
                {
                    this.props.items.map((item, index) => this.renderItem(item, index, selectedIndex === index))
                }
            </form>
        );
    }

    renderItem(data, index, checked) {
        const id = this.props.name + index;
        return (
            <p key={index}>
                <input
                    type="radio"
                    checked={checked}
                    value={index}
                    name={this.props.name}
                    id={id}
                    onChange={this.handleChange(index)} />

                <label htmlFor={id}>
                    <span />
                    {data}
                </label>
            </p>
        );
    }
}
