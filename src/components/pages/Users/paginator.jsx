import React from 'react';
import classes from './Users.module.css'

let Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [], startPageNumber, endPageNumber, style;

    switch (props.currentPage) {
        case 1:
        case 2:
        case 3:
            startPageNumber = 1;
            endPageNumber = 6;
            break;
        case pagesCount:
            startPageNumber = pagesCount - 5;
            endPageNumber = pagesCount;
            break;
        case pagesCount - 1:
            startPageNumber = pagesCount - 5;
            endPageNumber = pagesCount + 1;
            break;
        case pagesCount - 2:
            startPageNumber = pagesCount - 5;
            endPageNumber = pagesCount + 2;
            break;
        default:
            startPageNumber = props.currentPage - 2;
            endPageNumber = props.currentPage + 2;
            break;
    }

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (<>{pages.map(p => {
        if (p >= startPageNumber && p <= endPageNumber) {
            return (
                <div
                    key={p}
                    className={
                        props.currentPage === p
                            ? classes.selectedPage + " " + classes.page
                            : classes.page
                    }
                    onClick={(e) => { props.onPageChanged(p) }}>
                    {p}
                </div>
            )
        } else if (p === 1 || p === pagesCount) {
            style = (p === 1) ? classes.startPage : classes.endPage;

            return (
                <div
                    key={p}
                    className={
                        props.currentPage === p
                            ? classes.selectedPage + " " + classes.page
                            : classes.page + " " + style
                    }
                    onClick={(e) => { props.onPageChanged(p) }}>
                    {p}
                </div>
            )
        }
    })
    }</>)
}

export default Paginator;