import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/config';
import '../CSS/CardPage.css';

function CardPage() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const docRef = doc(db, 'cards', itemId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  if (loading) return <div>Loading...</div>;
  if (!item) return <div>Item not found</div>;

  return (
    <div className="item-container">
      <div className="container mt-5">
        <div className="item-card">
          <div id="itemCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {item.imageUrls.map((url, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img className="d-block w-100" src={url} alt={`Slide ${index}`} />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#itemCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#itemCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="item-card-body">
            <h1 className="item-card-title">
              {item.title.length > 40 ? `${item.title.substring(0, 40)}...` : item.title}
            </h1>
            <div className="item-labels">
              {item.labels && item.labels.map((label, index) => (
                <span key={index} className="item-label">{label}</span>
              ))}
            </div>
            <p className="item-card-text location-text">{item.location}</p>
            <div className="item-desc mt-3">
              <h2 className="item-h2">תוכן הברכה</h2>
              <p className="item-text">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPage;