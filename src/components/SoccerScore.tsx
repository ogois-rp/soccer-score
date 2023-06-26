import React from "react";
import { Game } from "src/types/types";


type Props = {
	results: Game[];
}

const SoccerScore: React.FC<Props> = ({results}) => {

	return (
		<ul>
			{results.map((result) => {
				return (
					<li key={result.id}>
						<span>{`${result.home_team} : ${result.home_score} - ${result.away_team} : ${result.away_score}`}</span>
					</li>
				);
			})}
		</ul>
	);
};

export { SoccerScore };
