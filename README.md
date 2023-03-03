# React Plock

React Plock is an npm package that allows you to create amazing masonry layouts with an amazing developer experience. With React Plock, you can easily create responsive and customizable layouts that adapts to different screen sizes and devices.

### Features

- **Masonry Layout**: Create beautiful masonry layouts with ease.
- **Responsive**: Automatically adapts to different screen sizes and devices.
- **Customizable**: Customize the layout to match your needs.
- **TypeScript Ready**: Get the strength of type-safe languages.
- **Amazing DX**: Easy to use and well-documented.

### Installation

```bash
npm install react-plock
```

### Usage

Using Plock with the new v3 APIs it's a piece of cake. Here's an example of how can you create an [Unsplash-Like](https://unsplash.com/) masonry grid. You can even see a demo of this example by clicking here.

```tsx
const ImagesMasonry = () => {
  const items = [...imageUrls];

  return (
    <Masonry
      items={items}
      config={{ columns: [1, 2, 3], media: [640, 768, 1024] }}
      render={(item, idx) => (
        <div key={idx} style={{ width: "100%" }}>
          <img src={item} style={{ width: "100%", height: "auto" }} />
        </div>
      )}
    />
  );
};
```

### API Reference

Here's the TypeScript definition for the Masonry Component, below you can find a more detailed explanation.

```ts
export type MasonryProps<T> = {
  items: T[];
  render: (item: T, idx: number) => React.ReactNode;
  config?: {
    columns?: number | number[];
    media?: number[];
  };
};
```

#### Items

This prop accepts a generic array of elements, each one will be passed to the **render** property.

#### Render

The masonry render prop. Here's where you define the styles of every tile of the grid, the function takes the current looping item and the relative index.

#### Config

A configuration object that is used to define the number of columns, media queries and other stuff.

### Important Note

Please, note that in case you are passing an array to the columns attribute of the config property, the number of elements **MUST** be equal to the number of media breakpoints provided!

```tsx
// Correct: This will be responsive with 3 breakpoints.
<Masonry
  config={{
    columns: [1, 2, 3],
    media: [640, 768, 1024],
  }}
/>

// Correct: This will be responsive with 2 breakpoints.
<Masonry
  config={{
    columns: [1, 2],
    media: [640, 1024],
  }}
/>

// Correct: This will be fixed with 4 columns in every screen size.
<Masonry
  config={{
    columns: 4,
  }}
/>

// NOT Correct: This will cause trouble in rendering.
<Masonry
  config={{
    columns: [4],
    media: [640, 768],
  }}
/>
```
