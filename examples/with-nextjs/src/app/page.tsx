"use client";

import { images } from "@assets/data/images";
import { Masonry } from "@local/lib";

export default function Home() {
  return (
    <Masonry
      items={images}
      config={{
        columns: [1, 2, 3],
        gap: [24, 12, 6],
        media: [640, 1024, 1280],
      }}
      render={(item, idx) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={idx}
          src={item}
          loading="lazy"
          alt="Unsplash Image"
          style={{ width: "100%", height: "auto" }}
        />
      )}
    />
  );
}
