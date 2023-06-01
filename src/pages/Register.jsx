import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../assets/user-avatar.png';
import { Link } from 'react-router-dom';
import { fetchRegister, selectIsRegiser } from '../redux/authSlice';
import { useForm } from 'react-hook-form';

const Register = () => {
    const {
        register,
        handleSubmit,
        setFocus,
        reset,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const isRegister = useSelector(selectIsRegiser);

    const dispatch = useDispatch();

    const onSubmit = async data => {
        const response = await dispatch(fetchRegister(data));

        if (!response.payload.token) {
            return alert(`${response.payload.message}`);
        }

        if ('token' in response.payload) {
            reset();
        }
    };

    useEffect(() => {
        setFocus('name');
    }, []);

    return (
        <div className="container relative">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="absolute left-1/2 transform -translate-x-1/2 mt-16 w-80 flex flex-col bg-gray-200 p-4 rounded-xl"
            >
                <h1 className="text-2xl mb-1">Register</h1>
                <img className="w-28 m-auto mb-3 mt-3" src={avatar} alt="" />
                <input
                    {...register('name', {
                        required: 'Name is required ',
                        minLength: 2,
                    })}
                    className="block w-full rounded-md border-0 py-3 px-4 mt-1 mb-1 shadow-sm placeholder:text-gray-400"
                    placeholder="Name"
                    type="text"
                />
                {errors.name && <span>At least 2 characters</span>}
                <input
                    {...register('email', { required: 'Email is required' })}
                    className="block w-full rounded-md border-0 py-3 px-4 mt-1 mb-1 shadow-sm placeholder:text-gray-400"
                    placeholder="Email"
                    type="email"
                />
                {errors.email && <span>Email is required</span>}
                <input
                    {...register('password', {
                        required: 'Password is required',
                        minLength: 5,
                    })}
                    className="block w-full rounded-md border-0 py-3 px-4 mt-1 mb-1 shadow-sm placeholder:text-gray-400"
                    placeholder="Password"
                    type="password"
                />
                {errors.password && <span>The password must be 5 characters or more</span>}
                <button className="w-full py-3 px-4 mb-2 mt-3 bg-red-500 hover:bg-red-600 transition rounded-md text-xl text-white">
                    Submit
                </button>
                {isRegister && (
                    <>
                        <p className="text-green-600">
                            Success
                        </p>
                        <Link
                            to={'/login'}
                            className="w-full py-3 px-4 mb-2 mt-3 bg-red-500 hover:bg-red-600 transition rounded-md text-xl text-white"
                        >
                            Sign In
                        </Link>
                    </>
                )}
            </form>
        </div>
    );
};

export default Register;
