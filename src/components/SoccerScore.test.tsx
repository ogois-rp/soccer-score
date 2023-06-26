import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "src/redux/store/store";
import { describe, test } from "vitest";
import { SoccerScore } from "./SoccerScore";

describe("Soccer Score Component Testing Suite", () => {
	test("Should show the scores on the screen", () => {
		const { getByText } = render(
			<Provider store={store}>
				<SoccerScore />
			</Provider>
		);

		expect(getByText("Austria")).toBeInTheDocument();
		expect(getByText("Belgium")).toBeInTheDocument();
		expect(getByText("Ukraine")).toBeInTheDocument();
		expect(getByText("England")).toBeInTheDocument();
		expect(getByText("Senegal")).toBeInTheDocument();
		expect(getByText("South Africa")).toBeInTheDocument();
		expect(getByText("Belarus")).toBeInTheDocument();
		expect(getByText("Argentina")).toBeInTheDocument();
	});
});
