
import Banner from '../components/Banner'
import Search from '../components/Search';

const Home = () => {
  
  return (
    <main>
      <Banner/>
      <div className=" max-w-[1264px] flex flex-wrap justify-around items-center mx-auto px-2 sm:p-4 md:p-4 lg:p-4" >
        <Search/>
    </div>
    </main>
  )
}

export default Home