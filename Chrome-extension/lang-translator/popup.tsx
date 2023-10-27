import React, { useState } from 'react';
import './popup.css';
const Popup = () => {
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [error, setError] = useState('');

  const fetchTranslation = async () => {
    setError('');
    setTranslation('');

    try {
      // Assuming you want to translate from English ("en") to another language
      const targetLanguage = 'es'; // Example: Spanish. Change as needed.
      const response = await fetch(`http://localhost:3001/${word}:${targetLanguage}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setTranslation(data.Translatedtext);
    } catch (err) {
      setError(err.message || 'Failed to fetch translation');
    }
  };

  const handleInputChange = (e) => {
    setWord(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchTranslation();
    }
  };

  return (
    <div>
      <h2>Word Translator</h2>
      <input
        type="text"
        value={word}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter a word"
      />
      <button onClick={fetchTranslation}>Translate</button>
      <div>
        {translation && <p>Translation: {translation}</p>}
        {error && <p className="error">Error: {error}</p>} {/* Apply error class */}
      </div>
    </div>
  );
};

export default Popup;
