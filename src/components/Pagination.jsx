import ReactPaginate from 'react-paginate';

function PaginatedItems({ handlePageClick, pageCount, currentPage }) {
    console.log(currentPage)
    return (
        <>
            <ReactPaginate
                className="flex items-center gap-x-5 mb-4 mt-2 w-min p-4 m-auto rounded-2xl"
                breakLabel="..."
                nextLabel="NEXT"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                forcePage={currentPage - 1}
                previousLabel="PREVIOUS"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default PaginatedItems;