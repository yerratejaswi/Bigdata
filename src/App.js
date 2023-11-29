import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [gameName, setGameName] = useState('');
  const [gameData, setGameData] = useState([]);

  const handleInputChange = (event) => {
    setGameName(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://vict3odkfb.execute-api.us-east-2.amazonaws.com/newstage/games');
        setGameData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  const selectedGame = gameData.find((game) => game.name === gameName);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Game Description </h1>
        <label>
          Enter Game Name:
          <input
            type="text"
            value={gameName}
            onChange={handleInputChange}
          />
        </label>
        <div>
          {selectedGame && (
            <div>
              <h2>Game Information</h2>
              <p>Game Name: {selectedGame.name}</p>
              <p>Release Date: {selectedGame.release_date}</p>
              <p>Price: ${selectedGame.price}</p>
              <p>About the Game: {selectedGame.about_the_game}</p>
              <p>Website: <a href={selectedGame.website} target="_blank" rel="noopener noreferrer">{selectedGame.website}</a></p>
              <h3>Screenshots:</h3>
              <div>
                {selectedGame.screenshots.map((screenshot, index) => (
                  <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} style={{ maxWidth: '20%', margin: '5px' }} />
                ))}
              </div>
              {/* Add additional game information as needed */}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
