import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/IconMovieQuiz.css';
import Alvin from '../assets/Alvin.jpg';
import Frozen2 from '../assets/Frozen2.jpg';
import HP from '../assets/Harry Potter.jpg';
import SW from '../assets/Star Wars.jpg';
import Showman from '../assets/Showman.jpg';
import Encanto from '../assets/Encanto2.jpg';
import NextGen from '../assets/NextGen.jpg';
import Stitch from '../assets/Stitch.jpg';
import Sing from '../assets/Sing2.jpg';
import HT from '../assets/Transalvanya.jpg';
import Minions from '../assets/Minions.jpg';
import Moana from '../assets/Moana.jpg';
import Spiderman from '../assets/Spiderman2.jpg';
import Sonic from '../assets/Sonic.jpg';
import Puss from '../assets/Puss in Boots.jpg';

const CheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  );
  
  const AlertIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
  
  const RefreshIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
      <path d="M3 22v-6h6"/>
    </svg>
  );

const IconMovieQuiz = () => {
  const navigate = useNavigate();
  const [questions] = useState([
    {
      id: 1,
      imageUrl: [Alvin],
      imageAlt: "A&C",
      correctAnswer: "Alvin and the Chipmunks"
    },
    {
      id: 2,
      imageUrl: [Moana],
      imageAlt: "MA",
      correctAnswer: "Moana"
    },
    {
      id: 3,
      imageUrl: [Stitch],
      imageAlt: "OA",
      correctAnswer: "Lilo and Stich"
    },
    {
        id: 4,
        imageUrl: [Frozen2],
        imageAlt: "F",
        correctAnswer: "Frozen"
      },
      {
        id: 5,
        imageUrl: [HP],
        imageAlt: "HP",
        correctAnswer: "Harry Potter"
      },
      {
        id: 6,
        imageUrl: [SW],
        imageAlt: "SW",
        correctAnswer: "Star Wars"
      },
      {
        id: 7,
        imageUrl: [Showman],
        imageAlt: "SN",
        correctAnswer: "The Greatest Showman"
      },
      {
        id: 8,
        imageUrl: [Encanto],
        imageAlt: "EO",
        correctAnswer: "Encanto"
      },
      {
        id: 9,
        imageUrl: [NextGen],
        imageAlt: "NG",
        correctAnswer: "NextGen"
      },
      {
        id: 10,
        imageUrl: [Sing],
        imageAlt: "SG",
        correctAnswer: "Sing"
      },
      {
        id: 11,
        imageUrl: [HT],
        imageAlt: "HT",
        correctAnswer: "Hotel Transylvania"
      },
      {
        id: 12,
        imageUrl: [Minions],
        imageAlt: "MS",
        correctAnswer: "Despicable Me"
      },
      {
        id: 13,
        imageUrl: [Spiderman],
        imageAlt: "SM",
        correctAnswer: "Spiderman"
      },
      {
        id: 14,
        imageUrl: [Sonic],
        imageAlt: "SC",
        correctAnswer: "Sonic"
      },
      {
        id: 15,
        imageUrl: [Puss],
        imageAlt: "PIB",
        correctAnswer: "Puss in Boots"
      }
  ]);

  const [answers] = useState([
    "Moana",
    "Lilo and Stich",
    "Sonic",
    "Madagascar",
    "Frozen",
    "The Polar Express",
    "Spiderman",
    "Superhero",
    "Despicable Me",
    "Hotel Transylvania",
    "Puss in Boots",
    "Shrek",
    "Sing",
    "Batman",
    "Superpets",
    "NextGen",
    "Transformers",
    "Encanto",
    "Leo",
    "Harry Potter",
    "V for Vendetta",
    "Alvin and the Chipmunks",
    "Zootopia",
    "Star Wars",
    "2001: A Space Odyssey",
    "Forrest Gump",
    "The Greatest Showman"

  ]);

  const [droppedAnswers, setDroppedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (showResults) {
      const score = getScore();
      if (score === 15) { // Check for all 15 correct answers
        setIsCompleted(true);
        toast.success('מושלם! ממשיכים בדרכנו אל הגרנד פינלה');
        setTimeout(() => {
          navigate('/Greeting-Page'); // Replace with your route
        }, 2000);
      }
    }
  }, [droppedAnswers, showResults, navigate]);

  const handleDragStart = (e, answer) => {
    e.dataTransfer.setData('text', answer);
    setDraggedItem(answer);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, questionId) => {
    e.preventDefault();
    const answer = e.dataTransfer.getData('text');
    
    setDroppedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));

    // If results are showing, check if this new answer makes all correct
    if (showResults) {
      const updatedAnswers = {
        ...droppedAnswers,
        [questionId]: answer
      };
      
      const allCorrect = questions.every(q => 
        updatedAnswers[q.id] === q.correctAnswer
      );

      if (allCorrect) {
        setIsCompleted(true);
        setTimeout(() => {
          navigate('/Greeting-Page'); // Replace with your route
        }, 2000);
      }
    }
  };

  const isCorrect = (questionId) => {
    const question = questions.find(q => q.id === questionId);
    return droppedAnswers[questionId] === question.correctAnswer;
  };

  const getScore = () => {
    return questions.reduce((score, question) => {
      return score + (isCorrect(question.id) ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setDroppedAnswers({});
    setShowResults(false);
    setIsCompleted(false);
  };


  return (
    <div className="quiz-page">
      <ToastContainer />
      
      <div className="quiz-container">
        <h1 className="quiz-title">חידון האימוג'י סרטים האימתני</h1>

        {/* Answer Bank */}
        <div className="answers-section">
          <h2 className="answers-title">תשובות אפשריות</h2>
          <div className="answers-grid">
            {answers.map((answer, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, answer)}
                onDragEnd={handleDragEnd}
                className={`answer-item ${draggedItem === answer ? 'dragging' : ''}`}
              >
                {answer}
              </div>
            ))}
          </div>
        </div>

        {/* Questions Grid */}
        <div className="questions-grid">
          {questions.map((question) => (
            <div
              key={question.id}
              className="question-card"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, question.id)}
            >
              <img
                src={question.imageUrl}
                alt={question.imageAlt}
                className="question-image"
              />
              <div className={`drop-zone ${droppedAnswers[question.id] ? 'has-answer' : ''}`}>
                {droppedAnswers[question.id] ? (
                  <div className="answer-display">
                    <span>{droppedAnswers[question.id]}</span>
                    {showResults && (
                      <span className={`result-icon ${isCorrect(question.id) ? 'correct' : 'incorrect'}`}>
                        {isCorrect(question.id) ? '✓' : '×'}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="drop-placeholder">זרקי אותי פה</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="controls">
          <button
            onClick={() => setShowResults(true)}
            className="quiz-button check-button"
          >
            Check Answers
          </button>
          <button
            onClick={resetQuiz}
            className="quiz-button reset-button"
          >
            Reset Quiz
          </button>
        </div>

        {/* Score Display */}
        {showResults && (
          <div className="score-display">
            Score: {getScore()} out of {questions.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default IconMovieQuiz;