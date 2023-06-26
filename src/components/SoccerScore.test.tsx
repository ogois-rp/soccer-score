import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import { SoccerScore } from "./SoccerScore";

describe("Soccer Score Component Testing Suite", () => {
	test("Should show the scores on the screen", () => {
		const games = [
			{
				id: "ce23",
				home_team: "Portugal",
				home_score: 1,
				away_team: "Morocco",
				away_score: 1,
			},
		];
		const { getByText } = render(<SoccerScore results={games} />);

		expect(getByText("Portugal : 1 - Morocco : 1")).toBeInTheDocument();
	});
});
