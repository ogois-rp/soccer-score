import * as React from "react";
import * as ReactDOM from "react-dom/client";
import store from "../src/redux/store/store";
import { Provider } from "react-redux";
import App from "../App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App/>
		</Provider>
	</React.StrictMode>
);
