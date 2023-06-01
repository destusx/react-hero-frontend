import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './redux/authSlice';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleHero from './pages/SingleHero';
import HeroEditForm from './pages/HeroEditForm';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, []);

    return (
        <div className="min-h-screen flex flex-col text-center">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path=":slug" element={<SingleHero />} />{' '}
                <Route path="/edit/:slug" element={<HeroEditForm />} />
            </Routes>
        </div>
    );
}

export default App;
