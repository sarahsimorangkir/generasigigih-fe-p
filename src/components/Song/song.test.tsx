import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Song from "components/Song";

const renderSong = (
  <Song
    uri="testimage"
    image="testimage"
    title="Soledad"
    album="Westlife"
    selectState={function (uri: string): void {
      throw new Error("FAILED");
    }}
    isSelected={false}
  />
);

describe("Song", () => {
  test("Render song album", async () => {
    render(renderSong);
    const songAlbum = screen.findByTestId("song-album");
    expect((await songAlbum).textContent).toBe("Westlife");
  });

  test("Render Song Button", async () => {
    render(renderSong);
    const songButton = screen.findByTestId("song-button");
    expect((await songButton).textContent).toBe("Select");
  });
});
