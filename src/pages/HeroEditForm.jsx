import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/authSlice';
import { useGetSingleHeroQuery, useUpdateHeroMutation } from '../services/heroes';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../axios'

const HeroEditForm = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const { data: hero = [], isFetching} = useGetSingleHeroQuery(slug);
    const isAuth = useSelector(selectIsAuth)
    const [files, setFiles] = useState([])
    const [updateHero, { isLoading, isError, error }] = useUpdateHeroMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            nickname: '',
            realName: '',
            originDescription: "",
            superpowers: "",
            catchPhrase: "",
        },
        mode: 'onChange',
    });

    useEffect(() => {
        if (hero) {
            reset({
                nickname: hero.nickname,
                realName: hero.realName,
                originDescription: hero.originDescription,
                superpowers: hero.superpowers,
                catchPhrase: hero.catchPhrase,
            });
            setFiles(hero.images);
        }
    }, [hero]);

    if (isFetching) {
        return <h2>Loading data....</h2>
    }



    const onSubmit = async data => {
        const newHero = {
            nickname: data.nickname,
            realName: data.realName,
            originDescription: data.originDescription,
            superpowers: data.superpowers,
            catchPhrase: data.catchPhrase,
            images: files
        }

        const heroData = {
            slug,
            newHero,
        }

        try {
            const response = await updateHero(heroData).unwrap();
            if (response) {
                reset()
                setFiles([])
                navigate(`/${slug}`)
            }
        } catch (error) {
            alert(error.data.message)
        }

    };


    const handleChangeFile = async e => {
        try {
            const formData = new FormData();
            const files = e.target.files;
            for (let i = 0; i < files.length; i++) {
                formData.append('file', files[i]);
            }
            const data = await axios.post('/uploadMultipleFiles', formData);
            const uploadedFiles = data.data.data;
            const fileUrls = uploadedFiles.map(file => file.url);
            setFiles(fileUrls);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const onClickRemoveImg = () => {
        setFiles([]);
    };

    const imagesItem = files?.map(item => (
        <div key={item}>
            <img
                className="object-cover h-[100px] w-full mt-4 mb-4"
                src={`http://localhost:4444${item}`}
                alt=""
            />
        </div>
    ));

    return (
        <section className='container w-1/3 mt-5 col-span-2 bg-slate-200 rounded-2xl p-4'>
            <h2>Hero Edit Form</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-4'>
                    <input {...register('nickname', { required: 'Nickname is required' })} 
                        className="input-custom" 
                        placeholder="Nickname" />
                    {errors.nickname && <span>Nickname is required</span>}
                    
                    <input {...register('realName', { required: 'realName is required' })} 
                        className="input-custom"  
                        placeholder="Real name" />
                    {errors.realName && <span>Nickname is required</span>}
                    
                    <textarea {...register('originDescription', { required: 'Origin description is required' })} 
                        className="input-custom" placeholder="Origin description" style={{resize: "none"}} cols="20" rows="5"></textarea>
                    {errors.originDescription && <span>Origin description is required</span>}
                    
                    <input {...register('superpowers', { required: 'Superpowers is required' })} 
                        className="input-custom" 
                        placeholder="Superpowers" />
                    {errors.superpowers && <span>Superpowers is required</span>}
                    
                    <input {...register('catchPhrase', { required: 'Catch phrase is required' })} 
                        className="input-custom" 
                        placeholder="Catch phrase" />
                    {errors.catchPhrase && <span>Catch phrase is required</span>}
                    
                    <input type="file" multiple onChange={handleChangeFile} />
                    {!files.length && <span>Please select an image</span>}

                    {imagesItem}

                    {files && files.length > 0 ? <button
                        className="mt-2 bg-transparent text-red-500 hover:bg-red-500 hover:text-white transition duration-200 ease-linear border border-red-500 py-1 px-4 rounded-2xl"
                        onClick={onClickRemoveImg}
                    >
                        Delete Images
                    </button> : null}
                    
                    {isAuth ? (<button className='btn-red-transparent text-2xl mt-8'>Edit Hero</button>) : (
                        <Link to={'/login'} className='btn-red-transparent text-2xl mt-8'>
                                You need to sign in
                        </Link>)
                    }
                </form>
        </section>
    )
};

export default HeroEditForm;