import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DateRedirectForm from './components/DateRedirect';
import Questionnaire from './components/Questionnaire';
import IconQuestionnaire from './components/IconQuestionnaire';
import TubbySuprise from './components/Tubby'
import Cards from './components/Cards';
import CreateCard from './components/CreateCard';
import CardPage from './components/CardPage';
import StoryScroll from './components/Story';
import Login from './components/Login';
import IconMovieQuiz from './components/IconMovieQuiz';



function App() {
  return (
    
    <div className="App">
      <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/DateRedirect" element={<DateRedirectForm />} />
        <Route path="/Story" element={<StoryScroll />} />
        <Route path="/BubuMogi-Page" element={<Questionnaire />} />
        <Route path="/Icon-Page" element={<IconQuestionnaire />} />
        <Route path="/tubby-surprise" element={<TubbySuprise />} />
        <Route path="/MovieQuiz" element={<IconMovieQuiz />} />
        <Route path="/Greeting-Page" element={<Cards />} />
        <Route path="/create-card" element={<CreateCard />} />
        <Route path="/item/:itemId" element={<CardPage />} />
       </Routes>
    </Router>
    </div>
  );
}

export default App;