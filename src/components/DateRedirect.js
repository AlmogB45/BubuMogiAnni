import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/logoImage.png'
import '../CSS/DateRedirect.css';
import { toast } from 'react-toastify';
import SkipImage from '../assets/Worthy.webp';
import 'react-toastify/dist/ReactToastify.css';

const DateRedirect = () => {
    const [date, setDate] = useState('');
    const [isSkipped, setIsSkipped] = useState(false);
    const navigate = useNavigate();

    // Specify the target date here (format: 'YYYY-MM-DD')
    const targetDate = '2022-11-24';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSkipped) {
            navigate('/Greeting-Page');
            return;
        }
        if (date === targetDate) {
            // Redirect to the desired page
            alert(' 😝 ברכות! סימן שהזיכרון עובד! עכשיו הגיע הזמן לשעת סיפור קצרה')
            navigate('/Story');
        } else {
            // Optionally, you can show an error message or handle non-matching dates
            toast.error(' 😝 לא זה כפרה, נסי שוב או שאני אגיד למקס לאכול אותך');
        }
    };

    const handleSkipRedirect = () => {
        navigate('/Greeting-Page'); // Replace with your desired route
    };

    return (
        <div className='main-container'>
            <div className='panel'>
                <div className='logoMain'>
            
                    <img src={logoImage} alt="logoBubu" />
                    <h1 id='MainTitle'>?שלומות בובו, האם את מוכנה</h1>
                </div>
                <div className='input-container'>
                    <form onSubmit={handleSubmit}>
                    <div className='skip-checkbox-container'>
                            <input
                                type="checkbox"
                                id="skipCheckbox"
                                checked={isSkipped}
                                onChange={(e) => setIsSkipped(e.target.checked)}
                            />
                            <label htmlFor="skipCheckbox">דלג</label>
                        </div>
                        <input
                            id='FirstMeeting'
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                        <button id="DateSub" type="submit">שלחי אותי</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DateRedirect;