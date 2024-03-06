import React, { useEffect, useState } from 'react';
import { GiCoffeeCup } from 'react-icons/gi';
import { FaTwitter } from 'react-icons/fa';

function RandomQuoteMachine() {
  const [quote, setQuote] = useState({ text: '', author: '' });

  const fetchQuote = async () => {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    setQuote({ text: data.content, author: data.author });
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div id="quote-box">
      <GiCoffeeCup size="3em" />
      <p id="text">{quote.text}</p>
      <p id="author">{quote.author}</p>
      <button id="new-quote" onClick={fetchQuote}>New Quote</button>
      <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`}>
        <FaTwitter />
        Tweet Quote
      </a>
    </div>
  );
}

export default RandomQuoteMachine;