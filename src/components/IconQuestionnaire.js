import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/IconQuestionnaire.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const IconQuestionnaire = () => {
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
            text: '?מי היה האייקון הראשון שכבש אותנו',
            options: ['טאבי', 'הסטיקרים של הזוג', 'בובו דודו'],
            correctAnswer: 'טאבי'
        },
        {
            id: 'q2',
            text: '?מה היה הסרטון הכובש הראשון ששיתפנו באינסטושגרם',
            options: ['בובו דודו', 'שיר הטאבי', 'הכלב הדוגמן'],
            correctAnswer: 'הכלב הדוגמן'
        },
        {
            id: 'q3',
            text: '?מהו סוג הריל שהכי שובר את ליבו העדין של מוגי',
            options: ['רילים של בובו ודודו שהם לא ביחד או שאחד הלך לעולמו', 'שירים של טאבי', 'משפטים רומנטיים עם רקע דרמטי'],
            correctAnswer: 'רילים של בובו ודודו שהם לא ביחד או שאחד הלך לעולמו'
        },

        {
            id: 'q4',
            text: '?מי שלח ראשון את השיר המפורסם של טאבי',
            options: ['אנוכי', 'אנוכך', 'מקס ומילקי'],
            correctAnswer: 'אנוכי'
        },

        {
            id: 'q5',
            text: '?מה הדבר בסטיקרים של הזוג שמוגי הכי שונא',
            options: ['שלא מעדכנים כל הזמן', 'שאין מגוון', 'שלך יש יותר אלימים'],
            correctAnswer: 'שלך יש יותר אלימים'
        },

        {
            id: 'q6',
            text: '?האם את מוכנה ',
            options: ['כן', 'לא', 'הצילו יש לי פוצי'],
            correctAnswer: 'הצילו יש לי פוצי'
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
            alert(" 😝 בניגוד למקודם, פה אני רוצה לבנות מתח ולהתפעל שהצלחת  😝")
            navigate('/tubby-surprise'); 
        } else {
            toast.error('😝 נשמה תרענני את הזיכרון קצת');
        }
    };

    return (
        <div className="panel-three">
        <div className="icon-questionnaire-container">
            <h1>שאלון האייקונים של בובו ומוגי האולטמטיבי</h1>
            <form onSubmit={handleSubmit}>
                {questions.map(q => (
                    <div key={q.id} className="i-question">
                        <p>{q.text}</p>
                        <div className="radio-ioptions-container">
                            {q.options.map((option, index) => (
                                <div key={index} className="radio-ioption">
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

export default IconQuestionnaire;