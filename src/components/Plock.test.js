import matchMediaPolyfill from "mq-polyfill";
import { render, screen } from "@testing-library/react";
import { Plock } from "./Plock";

beforeAll(() => {
  // resizeTo is not supported in JSDOM, so we need to polyfill it.
  matchMediaPolyfill(window);
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event("resize"));
  };
});

it("should render the container", () => {
  render(<Plock />);
  const element = screen.getByTestId("plock-container");
  expect(element).toBeInTheDocument();
});

it("should render one column", () => {
  render(<Plock nColumns={1} />);
  const elements = screen.getAllByTestId("plock-column");
  expect(elements).toHaveLength(1);
});

it("should render two columns", () => {
  render(<Plock nColumns={2} />);
  const elements = screen.getAllByTestId("plock-column");
  expect(elements).toHaveLength(2);
});

it("should render three columns", () => {
  render(<Plock nColumns={3} />);
  const elements = screen.getAllByTestId("plock-column");
  expect(elements).toHaveLength(3);
});

it("should render the children", () => {
  render(
    <Plock nColumns={3}>
      <div>I am a child on plock!</div>
    </Plock>
  );

  const element = screen.getByText("I am a child on plock!");
  expect(element).toBeInTheDocument();
});

it("should render the child in the first column", () => {
  render(
    <Plock nColumns={3}>
      <div>I am a child on plock!</div>
    </Plock>
  );

  const columns = screen.getAllByTestId("plock-column");
  expect(columns[0].childElementCount).toBe(1);
  expect(columns[1].childElementCount).toBe(0);
  expect(columns[2].childElementCount).toBe(0);
});

it("should render the first child in the first column and the second in the second column", () => {
  render(
    <Plock nColumns={3}>
      <div>I am the first child on plock!</div>
      <div>I am the second child on plock!</div>
    </Plock>
  );

  const columns = screen.getAllByTestId("plock-column");
  expect(columns[0].childElementCount).toBe(1);
  expect(columns[1].childElementCount).toBe(1);
  expect(columns[2].childElementCount).toBe(0);
});

it("should render the three elements in the first column", () => {
  render(
    <Plock nColumns={1}>
      <div>I am the first child on plock!</div>
      <div>I am the second child on plock!</div>
      <div>I am the third child on plock!</div>
    </Plock>
  );

  const columns = screen.getAllByTestId("plock-column");
  expect(columns[0].childElementCount).toBe(3);
});

it("should apply the correct gap by default", () => {
  render(<Plock />);

  const element = screen.getByTestId("plock-container");
  expect(element).toHaveStyle({ columnGap: "10px" });
});

it("should permit to override the default gap", () => {
  render(<Plock gap={20} />);

  const element = screen.getByTestId("plock-container");
  expect(element).toHaveStyle({ columnGap: "20px" });
});

it("should be possible to customize the styles of the main container using classes", () => {
  render(<Plock className="bg-gray-100" />);

  const element = screen.getByTestId("plock-container");
  expect(element).toHaveClass("bg-gray-100");
});

it("should be possible to customize the styles of the main container using styles", () => {
  render(<Plock styles={{ margin: "1px solid black" }} />);

  const element = screen.getByTestId("plock-container");
  expect(element).toHaveStyle({ margin: "1px solid black" });
});

it("should not override the default styles", () => {
  render(<Plock style={{ display: "flex" }} />);

  const element = screen.getByTestId("plock-container");
  expect(element).toHaveStyle({ display: "grid" });
});

it("should be possibile to pass an array in the nColumns prop", () => {
  const breakpoints = [
    { size: 640, columns: 1 },
    { size: 768, columns: 2 },
    { size: 1024, columns: 3 },
    { size: 1280, columns: 6 },
  ];

  render(
    <Plock nColumns={breakpoints}>
      <div>I am a child on plock!</div>
    </Plock>
  );
});

it("should render one column with a 500px window", () => {
  const breakpoints = [
    { size: 640, columns: 1 },
    { size: 768, columns: 2 },
    { size: 1024, columns: 3 },
    { size: 1280, columns: 6 },
  ];

  window.resizeTo(500, 1000);

  render(
    <Plock nColumns={breakpoints}>
      <div>I am a child on plock!</div>
    </Plock>
  );

  const columns = screen.getAllByTestId("plock-column");
  expect(columns).toHaveLength(1);
});

it("should render one column with a 639px window", () => {
  const breakpoints = [
    { size: 640, columns: 1 },
    { size: 768, columns: 2 },
    { size: 1024, columns: 3 },
    { size: 1280, columns: 6 },
  ];

  window.resizeTo(639, 1000);

  render(
    <Plock nColumns={breakpoints}>
      <div>I am a child on plock!</div>
    </Plock>
  );

  const columns = screen.getAllByTestId("plock-column");
  expect(columns).toHaveLength(1);
});

it("should render two columns with a 768px window", () => {
  const breakpoints = [
    { size: 640, columns: 1 },
    { size: 768, columns: 2 },
    { size: 1024, columns: 3 },
    { size: 1280, columns: 6 },
  ];

  window.resizeTo(768, 1000);

  render(
    <Plock nColumns={breakpoints}>
      <div>I am a child on plock!</div>
    </Plock>
  );

  const columns = screen.getAllByTestId("plock-column");
  expect(columns).toHaveLength(2);
});

it("should render two columns with a 800px window", () => {
  const breakpoints = [
    { size: 640, columns: 1 },
    { size: 768, columns: 2 },
    { size: 1024, columns: 3 },
    { size: 1280, columns: 6 },
  ];

  window.resizeTo(800, 1000);

  render(
    <Plock nColumns={breakpoints}>
      <div>I am a child on plock!</div>
    </Plock>
  );

  const columns = screen.getAllByTestId("plock-column");
  expect(columns).toHaveLength(2);
});

it("should render two columns with a 1023px window", () => {
  const breakpoints = [
    { size: 640, columns: 1 },
    { size: 768, columns: 2 },
    { size: 1024, columns: 3 },
    { size: 1280, columns: 6 },
  ];

  window.resizeTo(1023, 1000);

  render(
    <Plock nColumns={breakpoints}>
      <div>I am a child on plock!</div>
    </Plock>
  );

  const columns = screen.getAllByTestId("plock-column");
  expect(columns).toHaveLength(2);
});

it("should render three columns with a 1024px window", () => {
  const breakpoints = [
    { size: 640, columns: 1 },
    { size: 768, columns: 2 },
    { size: 1024, columns: 3 },
    { size: 1280, columns: 6 },
  ];

  window.resizeTo(1024, 1000);

  render(
    <Plock nColumns={breakpoints}>
      <div>I am a child on plock!</div>
    </Plock>
  );

  const columns = screen.getAllByTestId("plock-column");
  expect(columns).toHaveLength(3);
});

it("should render six columns with a 1280px window", () => {
  const breakpoints = [
    { size: 640, columns: 1 },
    { size: 768, columns: 2 },
    { size: 1024, columns: 3 },
    { size: 1280, columns: 6 },
  ];

  window.resizeTo(1280, 1000);

  render(
    <Plock nColumns={breakpoints}>
      <div>I am a child on plock!</div>
    </Plock>
  );

  const columns = screen.getAllByTestId("plock-column");
  expect(columns).toHaveLength(6);
});

it("should keep the default number of columns if a number is passed", () => {
  render(
    <Plock nColumns={3}>
      <div>I am a child on plock!</div>
    </Plock>
  );

  window.resizeTo(100, 1000);
  expect(screen.getAllByTestId("plock-column")).toHaveLength(3);

  window.resizeTo(500, 1000);
  expect(screen.getAllByTestId("plock-column")).toHaveLength(3);

  window.resizeTo(1000, 1000);
  expect(screen.getAllByTestId("plock-column")).toHaveLength(3);

  window.resizeTo(2000, 1000);
  expect(screen.getAllByTestId("plock-column")).toHaveLength(3);
});
