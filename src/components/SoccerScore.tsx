import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Game } from "src/types/types";
import { get } from '../redux/games/games-slice';

const SoccerScore: React.FC = () => {
	const dispatch = useDispatch()
	const games = useSelector((state: Game[]) => state);
	
	useEffect(() => {
		dispatch(get())
	}, [dispatch])
	return (
		<>
			{games.map((game) => {
				return (
					<div>
						<span>{game.home_team}</span>
						<span>{game.home_score}</span>
						<span>{game.away_team}</span>
						<span>{game.away_score}</span>
					</div>
				);
			})}
		</>
	);
};

export { SoccerScore };
