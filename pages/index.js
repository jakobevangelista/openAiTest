import Head from 'next/head';
import { useState } from 'react';
import styles from './index.module.css';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: userInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setUserInput('');
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel='icon' href='/dog.png' />
      </Head>

      <main className={styles.main}>
        <h3>Ask me anything</h3>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            name='animal'
            placeholder='Ask me a question'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input type='submit' value='Submit Question' />
        </form>
        <div>{result}</div>
      </main>
    </div>
  );
}
