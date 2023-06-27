import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
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
		const { getByText } = render(
			<SoccerScore results={games} />
		);

		expect(getByText("Portugal : 1 - Morocco : 1")).toBeInTheDocument();
	});

	test("End Game Button should display on hover", () => {
		const games = [
			{
				id: "ce23",
				home_team: "Portugal",
				home_score: 1,
				away_team: "Morocco",
				away_score: 1,
			},
			{
				id: "ce1223",
				home_team: "Argentina",
				home_score: 1,
				away_team: "Morocco",
				away_score: 1,
			},
		];
		render(<SoccerScore results={games} />);

		screen.debug()

    const listItemElement = screen.getByTestId("game-ce23");
    fireEvent.mouseEnter(listItemElement);

    const buttonElement = screen.getByTestId("button-ce23");

    expect(buttonElement).toHaveStyle("display: inline-block");
	});
})
