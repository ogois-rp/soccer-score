import React from "react";
import { Game } from "src/types/types";
import styles from "./SoccerScore.module.css";

type Props = {
	results: Game[];
};

const SoccerScore: React.FC<Props> = ({ results }) => {
	return (
		<ul>
			{results.map((result) => {
				return (
					<li className={styles.gameListItem} key={result.id}>
						<span
							data-testid={`game-${result.id}`}
						>{`${result.home_team} : ${result.home_score} - ${result.away_team} : ${result.away_score}`}</span>
						<button data-testid={`button-${result.id}`} onClick={() => ({})}>
							End Game
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export { SoccerScore };
