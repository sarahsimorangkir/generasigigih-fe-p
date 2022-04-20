import { render, screen } from "@testing-library/react";
import Song from "components/Song";

describe("Search", () => {
  test("MSW in search", () => {
    render(
      <Song
        uri={""}
        image={""}
        title={""}
        album={""}
        selectState={function (uri: string): void {
          throw new Error("Failed");
        }}
        isSelected={false}
      />
    );
    const checkData = screen.findByText("Not With Me");
    expect(checkData).toBeInTheDocument
  });
});