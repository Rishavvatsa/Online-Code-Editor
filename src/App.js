
import React, { useState, useEffect, useRef } from "react";

import Editor from "./Components/Editor";
// Other Imports
import useLocalStorage from "./Context/Dataprovider";
import {
	initialCssContent,
	initialHtmlContent,
	initialJsContent,
} from "./Constants/index.js";
import { imageSources } from "./assets/index";
import Imageloader from "./Context/Imageloader";
import Header from "./Components/Header.jsx";

function App() {
	
	const [html, setHtml] = useLocalStorage("html", initialHtmlContent);
	const [css, setCss] = useLocalStorage("css", initialCssContent);
	const [js, setJs] = useLocalStorage("js", initialJsContent);
	const [srcDoc, setSrcDoc] = useState("");

	const [showIframe, setShowIframe] = useState(false);
	const timerRef = useRef(null);
	const iframeRef = useRef(null);

	
	const handleIframeLoad = () => {
		const iframe = iframeRef.current;
		if (iframe) {
			const iframeDocument =
				iframe.contentDocument || iframe.contentWindow.document;
			iframeDocument.body.style.height = "100vh";
		}
	};

	
	useEffect(() => {
		timerRef.current = setTimeout(() => {
			setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
		}, 250);

		return () => clearTimeout(timerRef.current);
	}, [html, css, js]);

	const handleTopPaneAnimationEnd = () => setShowIframe(true);

	return (
    <>
    <Header/>
		<Imageloader images={imageSources}>
			<div
				className="container primary-container"
				onAnimationEnd={handleTopPaneAnimationEnd}
			>
				<Editor
					language="html"
					displayName="HTML"
					value={html}
					onChange={setHtml}
					animationQueue={0.6}
				/>
				<Editor
					language="css"
					displayName="CSS"
					value={css}
					onChange={setCss}
					animationQueue={0.55}
				/>
				<Editor
					language="javascript"
					displayName="JS"
					value={js}
					onChange={setJs}
					animationQueue={0.5}
				/>
			</div>
			{showIframe && (
				<div className="container iframe-container">
					<iframe
						width="100%"
						height="100%"
						srcDoc={srcDoc}
						title="sandbox output"
						sandbox="allow-same-origin allow-scripts"
						ref={iframeRef}
						onLoad={handleIframeLoad}
					/>
				</div>
			)}
		</Imageloader>
    </>
	);
}

export default App;