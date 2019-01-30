import React, {Component} from 'react';

class DataGridPager extends Component {
    _goFirst() {
        this.props.onCurrentPageChanged(0);
    }

    _goBack() {
        const currentPage = this.props.currentPage;
        if (currentPage === 0) {
            return
        }
        this.props.onCurrentPageChanged(currentPage - 1);
    }

    _goForward() {
        const currentPage = this.props.currentPage;
        if (currentPage === this.props.pagesCount - 1) {
            return
        }
        this.props.onCurrentPageChanged(currentPage + 1);
    }

    _goLast() {
        this.props.onCurrentPageChanged(this.props.pagesCount - 1);
    }

    render() {
        const currentPage = this.props.currentPage;
        const pagesCount = this.props.pagesCount;

        const pagesBeforeCount = Math.min(
            currentPage,
            2 + (2 - Math.min(2, pagesCount - currentPage - 1)));
        const pagesBefore = [];
        for (let i = pagesBeforeCount; i > 0 ; i--) {
            const page = currentPage - i;
            pagesBefore.push(
                <button key={page}
                        type="button"
                        className="btn btn-light"
                        onClick={() => this.props.onCurrentPageChanged(page)}>
                    {page+1}
                </button>);
        }

        const pagesAfterCount = Math.min(
            pagesCount - currentPage - 1,
            2 + (2 - Math.min(2, currentPage)));
        const pagesAfter = [];
        for (let i = 1; i <= pagesAfterCount ; i++) {
            const page = currentPage + i;
            pagesAfter.push(
                <button key={page}
                        type="button"
                        className="btn btn-light"
                        onClick={() => this.props.onCurrentPageChanged(page)}>
                    {page+1}
                </button>);
        }

        return (
            <div>
                <button key="first"
                        type="button"
                        className="btn btn-light"
                        onClick={() => this._goFirst()}>Первая</button>
                <button key="prev"
                        type="button"
                        className="btn btn-light"
                        onClick={() => this._goBack()}>Влево</button>
                {pagesBefore}
                <button key="current"
                        type="button"
                        className="btn btn-primary">{currentPage+1}</button>
                {pagesAfter}
                <button key="next"
                        type="button"
                        className="btn btn-light"
                        onClick={() => this._goForward()}>Вправо</button>
                <button ley="last"
                        type="button"
                        className="btn btn-light"
                        onClick={() => this._goLast()}>Последняя</button>
            </div>
        );
    }
}

export {DataGridPager};