import { useState } from 'react';
import { HiArrowNarrowUp } from "react-icons/hi";
import './App.css';

function App() {
  const [response, setResponse] = useState('Loading....');
  const [prompt, setPrompt] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    getPromptResponse();
  }

  async function getPromptResponse() {
    try {
      const resp = await fetch('http://localhost:3000/api/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await resp.json(); // Parse JSON response
      if (data.response) {
        setResponse(data.response);
      } else {
        setResponse('No response found');
      }
    } catch (err) {
      setResponse(`Error: ${err.message}`);
    }
  }

  return (
    <>
      <div className='prompt_response'>
        <textarea
          className='prompt_response prompt_response_text'
          value={response}
          readOnly
        ></textarea>
      </div>
      <form onSubmit={handleSubmit} className='prompt'>
        <input
          type='text'
          className='prompt_input'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
        />
        <button type='submit' className='submitBtn'>
          <HiArrowNarrowUp className='icon' size={'20px'} />
        </button>
      </form>
    </>
  );
}

export default App;
