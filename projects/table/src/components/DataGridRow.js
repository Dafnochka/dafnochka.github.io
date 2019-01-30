import React, {Component} from 'react';

class DataGridRow extends Component {
    render() {
        const row = [];
        for (const column of this.props.columns) {
            const value = column.formatter(this.props.rowData);
            row.push(<td key={column.key}>{value}</td>);
        }
        return (<tr onClick={this.props.onClick}>{row}</tr>);
    }
}

export {DataGridRow};