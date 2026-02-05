import Navbar from '../components/Navbar'
import Manager from '../components/Manager'
import Footer from '../components/Footer';
import './App.css'

function App() {

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
      <Navbar />
      <main className="flex-grow">
        <Manager />
      </main>
      <Footer />
    </div>
  );
}

export default App
