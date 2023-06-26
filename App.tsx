import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SoccerScore } from "src/components/SoccerScore"
import { get } from "src/redux/games/games-slice";
import { Game } from "src/types/types";

const App: React.FC = () => {
  const dispatch = useDispatch();
	const games = useSelector((state: Game[]) => state);

	useEffect(() => {
		dispatch(get());
	}, [dispatch]);
  
  return(
    <SoccerScore results={games}/>
  )
}

export default App