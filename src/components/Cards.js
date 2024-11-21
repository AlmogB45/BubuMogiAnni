import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/config';
import { truncateText } from '../utils/truncateText';
import '../CSS/Cards.css';

function Cards() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cards'));
        const cardsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCards(cardsData);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleCardClick = (cardId) => {
    navigate(`/item/${cardId}`);
  };

  const handleAddNewCard = () => {
    navigate('/create-card');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="custom-cards-container">
      <div className="cards-panel">
        <div className="header-section">
          <h2 id="cards-title">❤מאגר הברכות של דת הפארקר❤</h2>
          <button 
            onClick={handleAddNewCard}
            className="add-card-button"
          >
            הוסף ברכה חדשה +
          </button>
        </div>
        <p id="cards-desc">המאגר הזה הוא שלנו, הוא נבנה בזכות ולא בחסד, והוא עדות להתפתחות הענקית שעברנו ונעבור בקשר שלנו כי כמו הדרייב, נמשיך לעדכן אותו כל פעם בעוד ברכה ועוד רגע טהור ומלא אהבה בקשר שלנו אני אוהב אותך לאב, אל האינסוף ומעבר לו</p>
        <div className='separator'></div>
        <div className='cards-row'>
          {cards.map(card => (
            <div key={card.id} className="card" onClick={() => handleCardClick(card.id)}>
              <img src={card.imageUrls[0]} alt={card.title} />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{truncateText(card.description, 30)}</p>
                <p className="card-location">{card.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;