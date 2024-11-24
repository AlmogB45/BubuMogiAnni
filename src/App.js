import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './Firebase/ProtectedRoute';
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
        <Route path="/DateRedirect" element={<ProtectedRoute><DateRedirectForm /> </ProtectedRoute>} />
        <Route path="/Story" element={<ProtectedRoute><StoryScroll /> </ProtectedRoute>} />
        <Route path="/BubuMogi-Page" element={<ProtectedRoute><Questionnaire /> </ProtectedRoute>} />
        <Route path="/Icon-Page" element={<ProtectedRoute><IconQuestionnaire /> </ProtectedRoute>} />
        <Route path="/tubby-surprise" element={<ProtectedRoute><TubbySuprise /> </ProtectedRoute>} />
        <Route path="/MovieQuiz" element={<ProtectedRoute><IconMovieQuiz /> </ProtectedRoute>} />
        <Route path="/Greeting-Page" element={<ProtectedRoute><Cards /> </ProtectedRoute>} />
        <Route path="/create-card" element={<ProtectedRoute><CreateCard /> </ProtectedRoute>} />
        <Route path="/item/:itemId" element={<ProtectedRoute><CardPage /> </ProtectedRoute>} />
       </Routes>
    </Router>
    </div>
  );
}

export default App;