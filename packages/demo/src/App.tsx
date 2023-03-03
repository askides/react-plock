import { Masonry } from "react-plock";
import { datasource } from "./assets/datasource";

const ImagesMasonry = () => {
  return (
    <Masonry
      items={datasource}
      config={{
        columns: [1, 2, 3],
        gap: [24, 12, 6],
        media: [640, 1024, 1280],
      }}
      render={(item, idx) => (
        <img
          key={idx}
          src={item}
          loading="lazy"
          style={{ width: "100%", height: "auto" }}
        />
      )}
    />
  );
};

export default function App() {
  return <ImagesMasonry />;
}
