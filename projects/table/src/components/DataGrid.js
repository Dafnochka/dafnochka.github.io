import memoize from 'memoize-one';
import React, {Component} from 'react';
import {DataGridBody} from './DataGridBody.js';
import {DataGridHeader} from './DataGridHeader.js';
import {DataGridPager} from './DataGridPager.js';

const MAX_ROWS = 5;

function filterData(data, columns, searchString) {
    return !searchString ?
        data :
        data.slice().filter(item => {
            const searchStringLower = searchString.toLowerCase();
            for (const column of columns) {
                const columnForFilter = column.formatter(item).toString().toLowerCase();
                if (columnForFilter.includes(searchStringLower)) {
                    return true;
                }
            }
            return false;
        });
}

const filterDataMemoized = memoize(filterData);

function sortData(data, sortColumn, sortDirection) {
    return !sortColumn ?
        data :
        data.slice().sort((a, b) => {
            const valueA = sortColumn.formatter(a);
            const valueB = sortColumn.formatter(b);
            return valueA === valueB ?
                0 :
                ((valueA > valueB ? 1 : -1) * (sortDirection ? 1 : -1));
        });
}

const sortDataMemoized = memoize(sortData);

class DataGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            sortColumn: null,
            sortDirection: true,
        }
    }

    _onSortChange(sortParams) {
        const column = sortParams.column;
        if (this.state.sortColumn === column) {
            this.setState({
                sortDirection: !this.state.sortDirection,
            });
        } else {
            this.setState({
                sortColumn: column,
                sortDirection: true,
            })
        }
    }

    _onCurrentPageChanged(newPage) {
        this.setState({
            currentPage: newPage,
        });

    }

    _onActiveRowChanged(newActiveRow) {
        if (!this.props.onActiveRowChanged) {
            return;
        }
        this.props.onActiveRowChanged(newActiveRow);
    }

    render() {
        const filteredData = filterDataMemoized(
            this.props.data,
            this.props.columns,
            this.props.searchString);
        const filteredAndSortedData = sortDataMemoized(
            filteredData,
            this.state.sortColumn,
            this.state.sortDirection);
        const filteredAndSorteredAndPaged = filteredAndSortedData.slice(
            MAX_ROWS * this.state.currentPage,
            MAX_ROWS * (this.state.currentPage + 1));
        const pagesCount = Math.ceil(filteredAndSortedData.length / MAX_ROWS);
        return (
            <div>
                <DataGridPager onCurrentPageChanged={p => this._onCurrentPageChanged(p)}
                               pagesCount={pagesCount}
                               currentPage={this.state.currentPage}/>
                <table className='table-striped table-bordered'>
                    <DataGridHeader columns={this.props.columns}
                                    sortColumn={this.state.sortColumn}
                                    sortDirection={this.state.sortDirection}
                                    onSortChange={e => this._onSortChange(e)}/>
                    <DataGridBody data={filteredAndSorteredAndPaged}
                                  columns={this.props.columns}
                                  onActiveRowChanged={r => this._onActiveRowChanged(r)}/>
                </table>
            </div>
        );
    }
}

export {DataGrid};