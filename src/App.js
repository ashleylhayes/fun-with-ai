import React, { useState, useEffect } from 'react';
import OpenAI from 'openai-api';
import Header from './components/Header/Header';
import Intro from './components/Intro/Intro';
import './App.scss';

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
      <Header />
      <div className="container">
        <Intro />
        <section>
          <form className="form" onSubmit={handleSubmit}>
            <label className="form__label">Enter Prompt</label>
            <textarea className="form__input" name="prompt" placeholder='Type your prompt here...' onChange={e => setInput(e.target.value)}></textarea>
            <div className="form__button-container">
              <button type="reset" className="form__reset">Clear</button>
              <button className="form__submit" type="submit">Submit</button>
            </div>
          </form>
        </section>
        <section className="cards">
          <h3 className="cards__title">Responses</h3>
          {cards.map((item) => {
            return (
              <div className="cards__card" key={item.id}>
                <p className="cards__card-prompt-title">Prompt:</p>
                <p className="cards__card-prompt">{item.prompt}</p>
                <p className="cards__card-response-title">Response:</p>
                <p className="cards__card-response">{item.response}</p>
              </div>
            )})
          }
        </section>
      </div>
    </div>
  );
}

export default App;
