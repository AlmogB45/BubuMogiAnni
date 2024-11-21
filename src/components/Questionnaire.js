import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Questionnaire.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Questionnaire = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
        q6: ''
    });

    const questions = [
        {
            id: 'q1',
            text: '?בדייט הראשון, מה הסקופ הגדול שסיפרת לי',
            options: ['שמקס טרנסגנדר' ,'שיש לך כלבים וחתולים ואוגר', 'שאת נמשכת לתימנים'],
            correctAnswer: 'שמקס טרנסגנדר'
        },
        {
            id: 'q2',
            text: '?מה הדבר שאת הכי אוהבת במוגי',
            options: ['העיניים', 'הבלורית', 'מוגי 2'],
            correctAnswer: 'הבלורית'
        },
        {
            id: 'q3',
            text: '?בנופש שלנו, מה הדבר שהכי התלהבנו ממנו',
            options: [ 'הגקוזי', 'הצירותים', 'המרפסת'],
            correctAnswer: 'הגקוזי'
        },

        {
            id: 'q4',
            text: '?ביומולדת הראשון שלך שחגגנו יחד, מה אמרתי לך בפעם הראשונה',
            options: ['שהשיער שלך שופע', 'אני אוהב אותך', 'שהעיניים שלך מדהימות'],
            correctAnswer: 'אני אוהב אותך'
        },

        {
            id: 'q5',
            text: '?מה הדבר שרצית והתחייבתי שיבוא היום אני אביא לך',
            options: ['צבע לשיער', 'טבעת סוכריה', 'גלולת השמנה'],
            correctAnswer: 'טבעת סוכריה'
        },

        {
            id: 'q6',
            text: '?בכל ברכה, ובכל נאום אהבה, מה אנחנו תמיד אומרים',
            options: ['יהיה בסדר', 'מחר יום חדש נקום מאוהבים מתמיד', 'אל האינסוף ומעבר לו'],
            correctAnswer: 'אל האינסוף ומעבר לו'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnswers(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allCorrect = questions.every(q => answers[q.id] === q.correctAnswer);
        
        if (allCorrect) {
            toast.success("ברכות! יש תקווה בזיכרון שלך אבל צריך עוד מבחן קטן כדי להיות בטוחים")
            navigate('/Icon-Page'); 
        } else {
            toast.error('😝 נשמה תרענני את הזיכרון קצת');
        }
    };

    return (
        <div className="panel-two">
        <div className="questionnaire-container">
            <h1>שאלון הבובו ומוגי האולטמטיבי</h1>
            <form onSubmit={handleSubmit}>
                {questions.map(q => (
                    <div key={q.id} className="question">
                        <p>{q.text}</p>
                        <div className="radio-options-container">
                            {q.options.map((option, index) => (
                                <div key={index} className="radio-option">
                                    <input
                                        type="radio"
                                        id={`${q.id}-${index}`}
                                        name={q.id}
                                        value={option}
                                        checked={answers[q.id] === option}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label htmlFor={`${q.id}-${index}`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            </div>
        </div>
    );
};

export default Questionnaire;