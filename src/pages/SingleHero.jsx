import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleHeroQuery, useDeleteHeroMutation } from "../services/heroes"
import { selectIsAuth } from '../redux/authSlice';

const SingleHero = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const isAuth = useSelector(selectIsAuth)
    const { data: hero = [], isFetching, isLoading } = useGetSingleHeroQuery(slug);
    const [ deleteHero, { isLoading: isLoadingDeleteHero }] = useDeleteHeroMutation(slug);

    const onDeleteHero = async e => {
        e.preventDefault();

        if (window.confirm('Do you really want to delete the hero?')) {
            try {
                await deleteHero(slug).unwrap();
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (isFetching) {
        return <h1>Loading hero...</h1>
    }
    
    const { nickname, realName, originDescription, superpowers, catchPhrase, images } = hero

    const imageItems = images.map(item => {
        return (
            <img
                key={item}
                className="object-cover h-[300px] w-[100%]"
                src={`http://localhost:4444${item}`}
                alt=""
            />
        )
    })

    return (
        <div className="container bg-slate-200 rounded-2xl mt-6 p-4">
            <div className="grid grid-cols-4 gap-4">
                {imageItems}
            </div>
            <div className="flex flex-col items-start justify-center mt-4">
                <h1 className='mb-3 text-left'>Name - {nickname}</h1>
                <div className='mb-3 text-left'>Real Name - {realName}</div>
                <div className='mb-3 text-left'>Origin Description - {originDescription}</div>
                <div className='mb-3 text-left'>Superpowers - {superpowers}</div>
                <div className='mb-3 text-left'>Catch Phrase - {catchPhrase}</div>
            </div>
            {isAuth ? <button className="btn-red-transparent mt-2" onClick={onDeleteHero}>Delete</button> : null}
        </div>
    )
}

export default SingleHero