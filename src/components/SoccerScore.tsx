import React from "react";
import { Game } from "src/types/types";

type Props = {
	results?: Game[];
};

const SoccerScore: React.FC<Props> = ({ results }) => {
	return (
		<>
			{results.map((game) => {
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
