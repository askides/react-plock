import { Plock } from "react-plock";

const random = (min = 300, max = 450) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export function Tile({ children }) {
  const height = random();

  return (
    <div
      style={{ height }}
      className="bg-gray-800 text-white text-3xl flex justify-center items-center rounded-lg"
    >
      {children}
    </div>
  );
}

export function Github(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function App() {
  const breakpoints = [
    { size: 640, columns: 2 },
    { size: 768, columns: 3 },
    { size: 1024, columns: 4 },
    { size: 1280, columns: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#da2c38]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-10 py-10 sm:py-12">
          <h1 className="text-6xl sm:text-8xl font-bold tracking-tight text-[#f5fbef]">
            React Plock
          </h1>

          <p className="text-3xl sm:text-5xl max-w-4xl font-bold text-[#0d1321] leading-tight sm:leading-tight">
            Plock is a responsive{" "}
            <span className="text-[#f5fbef]">masonry layout</span> package for{" "}
            <span className="text-[#f5fbef]">React</span>
          </p>
        </div>

        <div className="mb-20 mt-0">
          <a
            href="https://github.com/itsrennyman/react-plock"
            className="text-white sm:max-w-xs justify-center font-medium outline-none px-4 py-3 rounded-md bg-gray-800 hover:ring ring-offset-4 ring-offset-red-600 ring-white transition-all duration-200 flex"
          >
            <Github className="w-6 h-6" />
            <span className="pl-3">See the Documentation</span>
          </a>
        </div>

        <Plock nColumns={breakpoints} gap={10}>
          {Array(101)
            .fill(0)
            .map((el, index) => (
              <Tile key={index}>{index}</Tile>
            ))}
        </Plock>
      </div>
    </div>
  );
}

export default App;
