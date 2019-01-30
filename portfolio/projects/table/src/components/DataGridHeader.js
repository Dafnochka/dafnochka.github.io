import React, {Component} from 'react';
import {DataGridHeaderSortSign} from "./DataGridHeaderSortSign";

class DataGridHeader extends Component {
    _onSortButtonClick(column) {
        this.props.onSortChange({
            column: column
        })
    }

    render() {
        const row = [];
        for (const column of this.props.columns) {
            const value = column.label;
            const sortButton = this.props.sortColumn===column?
                <DataGridHeaderSortSign direction={this.props.sortDirection? 'up' : 'down'}/> :
                '';
            row.push(
                <th key={column.key}
                    className={column.key}
                    onClick={() => this._onSortButtonClick(column)}>
                    {value}
                    {sortButton}
                </th>);
        }
        return (<thead><tr>{row}</tr></thead>);
    }
}

export {DataGridHeader};