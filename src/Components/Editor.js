import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/yonce.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/night.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import '../index.css';


const themeArray = ['dracula', 'material', 'mdn-like', 'the-matrix', 'night','yonce']

const Editor = (props) => {
  const[theme,setTheme]=useState("dracula");
  const [open, setOpen] = useState(true);
  const { language, label, value, onChange } = props;

  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className="dropdown "style={{marginTop: "10px"}}>
        <label for="cars" id="theme">Select Theme: </label>
        <select name="theme" onChange={(el) => {
          setTheme(el.target.value)
        }}>
          {
            themeArray.map( theme => (
              <option className="selected" value={theme}>{theme}</option>
            ))
          }
        </select>
      </div>
      <div className="editor-title">
        {label} 
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="expand-collapse-btn"
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      <CodeMirror
      
        value={value}
        className="code-mirror-wrapper"
        onBeforeChange={handleChange}
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          theme: theme,
          autoCloseTags:true,
          autoCloseBrackets:true,
          extraKeys:{"Ctrl-Space":"autocomplete"}
          
          
        }}
      />
      
    </div>
  );
};

export default Editor;
