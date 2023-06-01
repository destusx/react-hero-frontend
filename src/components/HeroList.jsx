import { useState } from 'react';
import { useGetHeroesQuery } from '../services/heroes'
import HeroItem from './HeroItem'
import PaginatedItems from './Pagination';
import Skeleton from './Skeleton';

const HeroList = () => {
    const [limit, setLimit] = useState(5);
    const [skip, setSkip] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const {data = [], isFetching, isLoading} = useGetHeroesQuery({ skip, limit })

    const { heroes, heroesCount } = data

    let pageCount = 0;
    const itemsPerPage = 5;

    if (heroesCount > itemsPerPage) {
        pageCount = Math.ceil(heroesCount / itemsPerPage);
    }
    const handlePageClick = e => {
        console.log(e);
        setLimit(itemsPerPage * (e.selected + 1));
        setSkip(itemsPerPage * (e.selected));
        setCurrentPage(e.selected + 1);
    };

    console.log('current',currentPage)

    const skeleton = [...new Array(5)].map(item => <Skeleton/>)

    if (isFetching || isLoading) {
        return skeleton;
    }


    const renderItems = (heroes) => {
        if (!heroes.length) {
            return <h2>There are no heroes</h2>
        }

        return heroes.map(item => {
            return (
                <HeroItem key={item.id} {...item} />
            )
        })
    }

    const elements = renderItems(heroes)

    return (
    <section className='col-span-4'>
        {elements}
        <PaginatedItems handlePageClick={handlePageClick} pageCount={pageCount} currentPage={currentPage}  />
    </section>
    )
}

export default HeroList