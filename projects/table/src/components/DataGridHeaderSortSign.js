import React, {Component} from 'react';

class DataGridHeaderSortSign extends Component {
    render() {
        const className = this.props.direction === 'up' ?
            'glyphicon glyphicon-triangle-top' :
            'glyphicon glyphicon-triangle-bottom';
        return (<span className={className}></span>)
    }
}

export {DataGridHeaderSortSign};