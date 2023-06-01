import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../redux/authSlice';

const Auth = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickLogout = async () => {
        if (window.confirm('Do you really want to logout?')) {
            await dispatch(logout());
            navigate('/');
        }
    };

    return isAuth ? (
        <>
            <h3 className='text-center'>Hello User</h3>
            <button
                onClick={onClickLogout}
                className="bg-transparent text-red-500 hover:bg-red-500 hover:text-white transition duration-200 ease-linear border border-red-500 py-1 px-4 rounded-2xl"
            >
                Logout
            </button>
        </>
    ) : (
        <>
        <Link to='/login' className='btn-red-transparent font-semibold'>Login</Link>
        <Link to='/register' className='btn-red-transparent font-semibold'>Register</Link>
    </> 
    );
};

export default Auth;
