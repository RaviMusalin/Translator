
import {useState} from 'react'
import './App.css'

interface Language {
  code: string;
  name: string;
}

const Languages: Language[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
]

function App() {

   return (
    <>
      <h1>Instant Translator</h1>
      <p>
        React + Typescript practice
      </p>
    </>
  );
}

export default App
