import React from 'react';
import classes from './Users.module.css'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
}

let Paginator: React.FC<PropsType> = ({ totalUsersCount, pageSize, currentPage, onPageChanged }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages: Array<number> = [],
        startPageNumber: number,
        endPageNumber: number,
        style: string;

    switch (currentPage) {
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
            startPageNumber = currentPage - 2;
            endPageNumber = currentPage + 2;
            break;
    }

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div className={classes.wrapper}>{pages.map(p => {
            if (p >= startPageNumber && p <= endPageNumber) {
                return (
                    <div
                        key={p}
                        className={
                            currentPage === p
                                ? classes.selectedPage + " " + classes.page
                                : classes.page
                        }
                        onClick={(e) => { onPageChanged(p) }}>
                        {p}
                    </div>
                )
            } else if (p === 1 || p === pagesCount) {
                style = (p === 1) ? classes.startPage : classes.endPage;

                return (
                    <div
                        key={p}
                        className={
                            currentPage === p
                                ? classes.selectedPage + " " + classes.page
                                : classes.page + " " + style
                        }
                        onClick={(e) => { onPageChanged(p) }}>
                        {p}
                    </div>
                )
            }
        })
        }</div>
    )
}

export default Paginator;