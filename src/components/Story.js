import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Story1 from '../assets/Story1.jpg'
import Story2 from '../assets/Story2.jpg'
import Story3 from '../assets/Story3.jpg'
import Story4 from '../assets/BubuMogiSafari1.png'
import Story5 from '../assets/Story4.jpg'
import Story6 from '../assets/Story5.jpg'
import Story7 from '../assets/Story6.jpg'
import Story8 from '../assets/Story7.jpg'
import Story9 from '../assets/Story8.jpg'
import Story10 from '../assets/Story9.jpg'
import '../CSS/StoryScroll.css';

const StoryScroll = () => {
    const [visibleItems, setVisibleItems] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const containerRef = useRef(null);
    const navigate = useNavigate();

  const contentItems = [
    { type: 'text', content: 'פעם, לפני המון המון שנים היו להם בובו ומוגי קטנים', id: 1 },
    { type: 'image', src: [Story1], alt: 'Story image 1', id: 2 },
    { type: 'text', content: 'אך בחלוף השנים, גדלו השניים, וחיוכים רבים היו על פניהם אך התחושה שמשהו חסר ליוותה אותם בחייהם', id: 3 },
    { type: 'image', src: [Story2], alt: 'Story image 2', id: 4 },
    { type: 'text', content: 'שנים חיפשו השניים, את מקור התחושה, אך בחלוף השנים מאמציהם היו ללא הצלחה', id: 5 },
    { type: 'image', src: [Story3], alt: 'Story image 3', id: 6 },
    { type: 'text', content: 'היה זה יום חורף בהיר בשלהי נובמבר, שגרם לשניים להבין בדיוק מה לא בסדר', id: 7 },
    { type: 'image', src: [Story4], alt: 'Story image 4', id: 8 },
    { type: 'text', content: 'וכך התחיל סיפורם הקסום של בובו ומוגי', id: 9 },
    { type: 'image', src: [Story5], alt: 'Story image 5', id: 10 },
    { type: 'text', content: 'סיפור של נשמות אבודות, עם חלקים בלב ובנפש שהיו חסרים, אך מאז ידעו לרפא אחד אצל השני את הנזקים', id: 11 },
    { type: 'image', src: [Story6], alt: 'Story image 6', id: 12 },
    { type: 'text', content: 'והיום כבר שנתיים אנחנו מציינים, ויחד מחכים לנצח המיוחל לו אנחנו כמהים', id: 13 },
    { type: 'image', src: [Story7], alt: 'Story image 7', id: 14 },
    { type: 'text', content: 'אך בסיפור זה לא מציינים את הסוף, כי הסוף הוא רק ההתחלה', id: 15 },
    { type: 'image', src: [Story8], alt: 'Story image 8', id: 16 },
    { type: 'text', content: 'עברו השניים דרך לא קלה, אך מלאה בידע והתפתחות היא הייתה', id: 17 },
    { type: 'image', src: [Story9], alt: 'Story image 9', id: 18 },
    { type: 'text', content: 'והיום, כשנתיים אחרי תחילת סיפורנו, אי אפשר שלא להסתכל על המסע המופלא שעברנו, מסע שבו למדנו להתאהב, לשתף, לחלום, ולהכיל, מסע שבו למדנו להוריד את המגננות שגידלנו במשך שנים ולתת אחד לשני להיכנס לרבדים הכי עמוקים של הלב והנפש שלנו', id: 19 },
    { type: 'image', src: [Story10], alt: 'Story image 10', id: 20 },
    { type: 'text', content: 'אז בובו יקירתי, סיפור זה הוא לא עוד אגדה של דיסני, הוא הסיפור שלנו, סיפור של פעם בדור, של אהבה שעומדת איתנה מהמבט הראשון ועד הנשימה האחרונה. אני אוהב אותך אל האינסוף ומעבר לו, מוגי אהובך', id: 21 },
];

useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, Number(entry.target.dataset.id)])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const itemElements = containerRef.current.querySelectorAll('.story-item');
    itemElements.forEach((el) => observer.observe(el));

    return () => {
      itemElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition + windowHeight >= documentHeight - 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, x: 50, rotateY: -90 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotateY: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2
      } 
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -90 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2
      } 
    }
  };

  const handleContinue = () => {
    alert('עכשיו הגיע הזמן להפעיל קצת את השכל, האם את מוכנה? ')
    navigate('/BubuMogi-Page');  // Replace with your desired route
  };


  return (
    <div className="Background-container">
    <div ref={containerRef} className="fairytale-container rtl">
      <div className="book-cover">
        <h1>מעשה בבובו ומוגי</h1>
      </div>
      {contentItems.map((item, index) => (
        <motion.div
          key={item.id}
          data-id={item.id}
          className={`story-item ${visibleItems.includes(item.id) ? 'visible' : ''}`}
          initial="hidden"
          animate={visibleItems.includes(item.id) ? "visible" : "hidden"}
          variants={item.type === 'text' ? textVariants : imageVariants}
        >
          {item.type === 'text' ? (
            <p className="story-text">{item.content}</p>
          ) : (
            <div className="image-frame">
              <img src={item.src} alt={item.alt} className="story-image" />
            </div>
          )}
        </motion.div>
      ))}
      
      {showButton && (
        <motion.button
          className="story-button"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleContinue}
        >
יאללה בואי נמשיכה את ההרפתקאה
        </motion.button>
      )}
    </div>
    </div>
  );
};

export default StoryScroll;