
import {useState} from 'react'
import './App.css'

interface Language {
  code: string;
  name: string;
}

const LANGUAGES: Language[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
]

/**
 * TEMP translator for development:
 * - Pretends to translate after ~300ms
 * - Honors AbortSignal so we can cancel in-flight work
 * Replace this with a real fetch to /api/translate later.
 */

function mockTranslate({
  q, source, target, signal,
}: {
  q: string; source: string; target: string; signal?: AbortSignal;
}): Promise<string> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      resolve(q ? `${q} → [${source.toUpperCase()}→${target.toUpperCase()}]` : "");
    }, 300);

    const onAbort = () => {
      clearTimeout(timer);
      reject(Object.assign(new Error("Aborted"), { name: "AbortError" }));
    };

    if (signal) {
      if (signal.aborted) return onAbort();
      signal.addEventListener("abort", onAbort, { once: true });
    }
  });
}


function App() {
  const [sourceLang, setSourceLang] = useState<string>("en"); // Language user types in
  const [targetLang, setTargetLang] = useState<string>("es"); // output language
  const [text, setText] = useState<string>(""); // user input
  const [translation, setTranslation] = useState<string>(""); // translated user input (API translation result)
  const [loading, setLoading] = useState<boolean>(false) // Boolean if we are waiting for translation
  const [error, setError] = useState<string>("") // If API fails

   return (
    <>
      <h1>Instant Translator</h1>
      <p>React + Typescript practice</p>

      <div style={{display: "flex", gap: "1rem", marginBottom: "1rem"}}>
        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          {LANGUAGES.map((lang) => 
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          )}
        </select>

        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          {LANGUAGES.map((lang) => 
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          )}
        </select>
      </div>

      <textarea
        rows={5}
        style={{width: "100%"}}
        placeholder='Type Something...'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={{ marginTop: "1rem", minHeight: "2rem"}}>
        {loading ? <em>Translating...</em> : translation}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

    </>
  );
}

export default App
