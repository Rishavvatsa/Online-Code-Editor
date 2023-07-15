import React, { useState, useEffect } from 'react';
import Editor from "./Components/Editor";
import useLocalStorage from "./Context/Dataprovider";
import Header from './Components/Header';

function App() {
  const [html, setHtml] = useLocalStorage('html', '');
  const [css, setCss] = useLocalStorage('css', '');
  const [javascript, setJavascript] = useLocalStorage('javascript', '');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${javascript}</script>
        </html>
      `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, javascript]);

  return (
    <div className="app">
      <Header/>
      <div className="pane top-pane">
        <Editor
          language="xml"
          label="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          label="CSS"
          value={css}
          onChange={setCss}
          
        />
        <Editor
          language="javascript"
          label="JavaScript"
          value={javascript}
          onChange={setJavascript}
        />
      </div>
      <div className="bottom-pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="1"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </div>
  );
}

export default App;
