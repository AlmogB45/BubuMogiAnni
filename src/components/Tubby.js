import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/TubbySuprise.css';
import { toast } from 'react-toastify';
import VideoPlayer from './VideoPlayer';
import 'react-toastify/dist/ReactToastify.css';
import videoSource from '../assets/TubbyAnni.mp4';



const TubbySuprise = () => {
    return (
        <div className='tubby-main-container'>
            <div className='tubby-content'>
                <div className='tubby-panel'>
                    <div className= 'tubby-vid'>
                    <video controls style={{ width: '640px', height: '480px' }}>
                        <source src={videoSource} type="video/mp4" />
                    </video>
                    </div>
                    <h1 id='MainTitle'> מה חשבת שלא מסתתרת פה הפתעה? תראי את הסרטון ולאחר מכן תקליקי על הכפתור</h1>
                </div>
                <div className='tubby-button-container'>
                    <Link to="/MovieQuiz" className="reg-button">
                        הקליקי עליי כפרה
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default TubbySuprise;