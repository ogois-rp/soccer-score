import { SoccerScore } from "./src/components/SoccerScore";
import { results } from "./src/data/data";

const App: React.FC = () => {
	return <SoccerScore results={results} />;
};

export default App;
