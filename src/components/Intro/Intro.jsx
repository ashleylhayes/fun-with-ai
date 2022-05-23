import React from 'react';
import './Intro.scss';

function Intro() {
    return (
        <section className='intro'>
            <h1 className="intro__greeting">Welcome!</h1>
            <p className="intro__info">GPT-3 is a powerful AI model created by <a href='https://openai.com/api/' target="_blank" rel="noreferrer">OpenAI</a>. It can process plain text prompts and produce outputs that are hard to distinguish from human writing.</p>
            <p className="intro__info">Here's how it works: You input some text as a prompt, and the AI model will generate a text completion that attempts to match whatever context or pattern you gave it. Like in the example below, if you give the API the prompt “Write a tagline for an ice cream shop”, it will return a completion like “We serve up smiles with every scoop!” You can even try sending a prompt requesting a joke or a poem. Check out some more <a href='https://beta.openai.com/examples/' target="_blank" rel="noreferrer">examples</a> of what it can do!</p>
            <p className="intro__info">Go ahead and try it for yourself - have some Fun with AI!</p>
        </section>
    );
}

export default Intro;