import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { SoccerScore } from "./components/SoccerScore";
import store from "../src/redux/store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<SoccerScore/>
		</Provider>
	</React.StrictMode>
);
