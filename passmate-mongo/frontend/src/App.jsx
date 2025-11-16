import Navbar from '../components/Navbar'
import Manager from '../components/Manager'
import Footer from '../components/Footer';
import './App.css'

function App() {

  return (
    <>
      <div className="absolute inset-0 -z-10 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
      <Navbar />
      <Manager/>
      <Footer/>
    </>
  );
}

export default App
