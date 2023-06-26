import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { describe, test } from "vitest"
import { SoccerScore } from "./SoccerScore"
import { results } from 'src/data/data'

describe("Soccer Score", () => {
  test("Should show the scores on the screen", () => {
    const data = results

    const { getByText } = render(<SoccerScore results={data} />)

    expect(getByText('Austria')).toBeInTheDocument();
    expect(getByText('Belgium')).toBeInTheDocument();
    expect(getByText('Ukraine')).toBeInTheDocument();
    expect(getByText('England')).toBeInTheDocument();
    expect(getByText('Senegal')).toBeInTheDocument();
    expect(getByText('South Africa')).toBeInTheDocument();
    expect(getByText('Belarus')).toBeInTheDocument();
    expect(getByText('Argentina')).toBeInTheDocument();
  })
})
