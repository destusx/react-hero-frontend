import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../redux/authSlice'

const HeroItem = ({ nickname, images, slug }) => {
    const isAuth = useSelector(selectIsAuth)

    return (
        <div className='bg-slate-200 rounded-2xl mb-4 p-4'>
            <Link to={slug}>
                <h2 className='mb-4 font-semibold'>{nickname}</h2>
                <img
                    className="object-cover h-[350px] w-[100%]"
                    src={`http://localhost:4444${images[0]}`}
                    alt=""
                />
            </Link>
            {isAuth ? 
            <Link to={`/edit/${slug}`}>
                <button className="btn-red-transparent mt-4">Edit</button>
            </Link> : null}
        </div>
    )
}

export default HeroItem