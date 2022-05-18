import React, { useState, useEffect } from 'react';
import OpenAI from 'openai-api';
import './App.css';

function App() {

  const [input, setInput] = useState("");
  const [cards, setCards] = useState([]);
  
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI;
  const openai = new OpenAI(OPENAI_API_KEY);

  useEffect(() => {
    const localStoredQueries = localStorage.getItem('storedQueries');

    if (localStoredQueries) {
      setCards(JSON.parse(localStoredQueries));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gptResponse = await openai.complete({
        engine: 'text-curie-001',
        prompt: input,
        maxTokens: 100,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
    });

    setCards([
      {
        id: gptResponse.data.id,
        prompt: input,
        response: gptResponse.data.choices[0].text
      },
      ...cards]
    );
    
    localStorage.setItem('storedQueries', JSON.stringify([
      {
        id: gptResponse.data.id,
        prompt: input,
        response: gptResponse.data.choices[0].text
      },
      ...cards]
    ));
    
  }

  return (
    <div className="App">
      <section>
        <form onSubmit={handleSubmit}>
          <textarea name="prompt" placeholder='Enter a prompt here...' onChange={e => setInput(e.target.value)}></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>
      <section>
        {cards.map((item) => {
          return (
            <div key={item.id}>
              <p>{item.prompt}</p>
              <p>{item.response}</p>
            </div>
          )})
        }
      </section>
    </div>
  );
}

export default App;
