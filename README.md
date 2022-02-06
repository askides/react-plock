<br/>

<p align="center">
<img src="public/header.png" />
</p>

<br/>

<p align="center" style="padding-bottom:3rem">
<img alt="Build Status" src="https://img.shields.io/github/workflow/status/itsrennyman/react-plock/Build%20CI?style=for-the-badge" />
<img alt="Release" src="https://img.shields.io/github/v/release/itsrennyman/react-plock?style=for-the-badge" />
<img alt="Coverage" src="https://img.shields.io/codecov/c/gh/itsrennyman/react-plock?style=for-the-badge" />
<img alt="Stars" src="https://img.shields.io/github/stars/itsrennyman/react-plock?style=for-the-badge" />
<img alt="License" src="https://img.shields.io/github/license/itsrennyman/react-plock?style=for-the-badge" />
</p>

<br/>

# About Plock 🌈

Plock is a responsive masonry layout implementation for React. Very simple to use and easy to understand.

## Can I see a demo? 👀

The demo is available for you [here](https://react-plock.netlify.app/)!

### Getting Started 🤩

Install the package with [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/):

```bash
$ yarn add react-plock
$ npm install react-plock
```

The simplest way to use Plock is to import it in your React app:

```jsx
import { Plock } from "react-plock";

export function Komponent() {
  return (
    <Plock>
      <div>Sun is shining ☀️</div>
      <div>Moon is shining 🌙</div>
      <div>Stars are shining ✨</div>
    </Plock>
  );
}
```

And that's it! 🎉 🎉 🎉 By default, Plock will use the `grid` layout with three columns. You can also override this prop by setting the `nColumns` prop:

```jsx
import { Plock } from "react-plock";

const Tile = ({ children, style, ...rest }) => (
  <div style={{ width: "100%", ...style }} {...rest}>
    {children}
  </div>
);

export function Komponent() {
  return (
    <Plock nColumns={2}>
      <Tile>I love Plock! 💙</Tile>
      <Tile>I love React! 💛</Tile>
      <Tile>I love Javascript! 💝</Tile>
      <Tile>Give us a Star! 🌟</Tile>
    </Plock>
  );
}
```

If you need different breakpoints, you can use pass an array like this:

```jsx
import { Plock } from "react-plock";

export function Komponent() {
  const breakpoints = [
    { size: 640, columns: 1 },
    { size: 768, columns: 2 },
    { size: 1024, columns: 3 },
    { size: 1280, columns: 6 },
  ];

  return (
    <Plock nColumns={breakpoints}>
      <div>Pikachu</div>
      <div>Charmander</div>
      <div>Squirtle</div>
      <div>Bulbasaur</div>
    </Plock>
  );
}
```

> Note: The element resizing is automatically debounced with a delay of 200ms. You can override this delay by setting the `debounce` prop with a number in milliseconds.

Also the gap between columns can be set by setting the `gap` prop:

```jsx
import { Plock } from "react-plock";

export function Komponent() {
  return (
    <Plock nColumns={3} gap={10}>
      <div>Pikachu</div>
      <div>Charmander</div>
      <div>Squirtle</div>
      <div>Bulbasaur</div>
    </Plock>
  );
}
```

Needs also some extra styling? No problem, you can extend the default styles by setting the `style` or the `className` prop:

```jsx
import { Plock } from "react-plock";

export function Komponent() {
  return (
    <Plock style={{ background: "red" }} className="a-happy-class">
      <div>Pikachu</div>
      <div>Charmander</div>
      <div>Squirtle</div>
      <div>Bulbasaur</div>
    </Plock>
  );
}
```

### Built With 🏗️

- [ReactJS](https://reactjs.org/)

### Versioning 🚦

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/itsrennyman/react-plock/tags).

### Authors 🙋

- **Renato Pozzi** - [itsrennyman](https://github.com/itsrennyman)

### Stargazers 🌟

[![Stargazers repo roster for @itsrennyman/react-plock](https://reporoster.com/stars/itsrennyman/react-plock)](https://github.com/itsrennyman/react-plock/stargazers)

See also the list of [contributors](https://github.com/itsrennyman/react-plock/contributors) who participated in this project.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
