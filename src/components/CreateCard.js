import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../Firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/CreateCard.css';

function CreateCard() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
  });
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      toast.error('יש להתחבר כדי להוסיף ברכה חדשה');
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file size (max 5MB per image)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const invalidFiles = files.filter(file => file.size > maxSize);
    
    if (invalidFiles.length > 0) {
      toast.error('גודל כל תמונה חייב להיות קטן מ-5MB');
      return;
    }

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setImages(prevImages => {
      const updatedImages = [...prevImages, ...newImages].slice(0, 5);
      if (updatedImages.length >= 5) {
        toast.info('ניתן להעלות עד 5 תמונות');
      }
      return updatedImages;
    });
    
    toast.success("התמונה נוספה בהצלחה!");
  };

  const removeImage = (index) => {
    setImages(prevImages => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      URL.revokeObjectURL(prevImages[index].preview);
      return updatedImages;
    });
    toast.warning("התמונה הוסרה!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('יש להתחבר כדי להוסיף ברכה חדשה');
      navigate('/');
      return;
    }

    if (images.length === 0) {
      toast.error('יש להעלות לפחות תמונה אחת');
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload images to Firebase Storage
      const imageUploadPromises = images.map(async (image) => {
        const storageRef = ref(storage, `cards/${user.uid}/${Date.now()}_${image.file.name}`);
        const snapshot = await uploadBytes(storageRef, image.file);
        return getDownloadURL(snapshot.ref);
      });

      const imageUrls = await Promise.all(imageUploadPromises);

      // Add document to Firestore
      await addDoc(collection(db, 'cards'), {
        ...formData,
        imageUrls,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        createdBy: user.email
      });

      // Clean up preview URLs
      images.forEach(image => URL.revokeObjectURL(image.preview));
      
      toast.success('הברכה נוספה בהצלחה!');
      navigate('/Greeting-Page');
    } catch (error) {
      console.error('Error creating card:', error);
      toast.error('שגיאה ביצירת הברכה. אנא נסה שנית.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">טוען...</div>;
  }

  if (!user) {
    return null; // The useEffect will handle the redirect
  }

  return (
    <div className="create-card-container">
      <div className="create-card-panel">
        <div className="auth-info">
          מחובר כ: {user.email}
          <button 
            onClick={() => auth.signOut()} 
            className="logout-button"
          >
            התנתק
          </button>
        </div>
        <h2>הוסף ברכה חדשה</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>כותרת</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label>תיאור</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="4"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label>מיקום (אופציונלי)</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label>תמונות (מקסימום 5)</label>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleImageUpload} 
              disabled={images.length >= 5 || isSubmitting}
            />
            <small className="file-hint">כל תמונה עד 5MB</small>
            
            <div className="image-preview-container">
              {images.map((image, index) => (
                <div key={index} className="image-preview">
                  <img src={image.preview} alt={`Preview ${index + 1}`} />
                  <button 
                    type="button" 
                    onClick={() => removeImage(index)}
                    disabled={isSubmitting}
                    className="remove-image-button"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="buttons-group">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? 'מעלה...' : 'שמור ברכה'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/Greeting-Page')}
              className="cancel-button"
              disabled={isSubmitting}
            >
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCard;