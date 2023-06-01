import HeroAddForm from '../components/HeroAddForm';
import HeroList from '../components/HeroList';

const Home = () => {
  return (
    <main className="container grid grid-cols-6 gap-x-8 mt-6">
        <HeroList />
        <HeroAddForm />
    </main>
  )
}

export default Home