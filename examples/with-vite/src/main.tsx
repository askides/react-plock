import React from "react";
import ReactDOM from "react-dom/client";
import { images } from "../../../assets/data/images";
import { Masonry } from "../../../libs/react-plock";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Masonry
      items={images}
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
  </React.StrictMode>
);
