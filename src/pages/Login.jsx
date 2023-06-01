import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchLogin, selectIsAuth } from '../redux/authSlice';
import { useForm } from 'react-hook-form';

const Login = () => {
    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const onSubmit = async data => {
        const response = await dispatch(fetchLogin(data));

        if (!response.payload.token) {
            return alert(`${response.payload.message}`);
        }

        if ('token' in response.payload) {
            console.log(response.payload.token);
            window.localStorage.setItem('token', response.payload.token);
        }
    };

    useEffect(() => {
        setFocus('email');
    }, []);

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container relative">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="absolute left-1/2 transform -translate-x-1/2 mt-16 w-80 flex flex-col bg-gray-200 p-4 rounded-xl"
            >
                <h1 className="text-2xl mb-3">Login</h1>
                <input
                    {...register('email', { required: 'Email is required' })}
                    className="block w-full rounded-md border-0 py-3 px-4 mt-1 mb-1 shadow-sm placeholder:text-gray-400"
                    placeholder="Email"
                    type="email"
                />
                {errors.email && <span>Email is required</span>}
                <input
                    {...register('password', {
                        required: 'Passwrod is required',
                        minLength: 5,
                    })}
                    className="block w-full rounded-md border-0 py-3 px-4 mt-1 mb-1 shadow-sm placeholder:text-gray-400"
                    placeholder="Password   "
                    type="password"
                />
                {errors.password && <span>The password must be 5 characters or more</span>}
                <button
                    className="w-full py-3 px-4 mb-2 mt-3 bg-red-500 hover:bg-red-600 transition rounded-md text-xl text-white disabled:bg-red-700"
                    title={!isValid ? 'Сперва введите данные' : 'Войти'}
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Login;
