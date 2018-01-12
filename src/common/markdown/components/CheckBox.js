/**
 * Created by nanhuijuan on 2016/12/30.
 */


import React, { PureComponent } from 'react';
import '../style/checkbox.css';

export default class RadioBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
        };

        if (this.props.onSelect) {
            this.props.onSelect(this.state.selected);
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(index) {
        return () => {
            this.setState((prevState) => {
                const selected = [...prevState.selected];
                const indexInSelected = selected.indexOf(index);
                if (indexInSelected >= 0) {
                    selected.splice(indexInSelected, 1);
                } else {
                    selected.push(index);
                }

                if (this.props.onSelect) {
                    this.props.onSelect(selected);
                }

                return { selected };
            });
        };
    }

    render() {
        const selectedIndex = this.state.selected;
        return (
            <form>
                {
                    this.props.items.map((item, index) =>
                        this.renderItem(item, index, selectedIndex.indexOf(index) >= 0))
                }
            </form>
        );
    }

    renderItem(data, index, checked) {
        const id = this.props.name + index;
        return (
            <p key={index}>
                <input
                    type="checkbox"
                    checked={checked}
                    value={index}
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
