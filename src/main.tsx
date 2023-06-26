import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { SoccerScore } from "./components/SoccerScore";
import { results } from "./data/data";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<SoccerScore results={results} />
	</React.StrictMode>
);
