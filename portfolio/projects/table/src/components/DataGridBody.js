import React, {Component} from 'react';
import {DataGridRow} from './DataGridRow.js';

class DataGridBody extends Component {
    render() {
        const rows = [];

        for (const rowData of this.props.data) {
            rows.push(<DataGridRow key={rowData.id}
                                   rowData={rowData}
                                   columns={this.props.columns}
                                   onClick={() => this.props.onActiveRowChanged(rowData)}/>);
        }
        return (
            <tbody>
                {rows}
            </tbody>
        )
    }
}

export {DataGridBody};