# About Plock 🌈

Plock is a responsive masonry layout implementation for React. Very simple to use and easy to understand.

## Can I see a demo? 👀

I'm working on a demo, please check back soon.

### Getting Started 🤩

The most simple way to use Plock is to import it in your React app:

```jsx
<Plock>
  <SuperComponent>I'm a super component! 😎</SuperComponent>
  <SuperComponent>I'm a super component too! 🤓</SuperComponent>
  <SuperComponent>Don't forget me! 😏</SuperComponent>
</Plock>
```

And that's it! 🎉 🎉 🎉 By default, Plock will use the `grid` layout with three columns. You can also override this prop by setting the `nColumns` prop:

```jsx
<Plock nColumns={2}>
  <div style={{ height: 100, width: "100%", background: "yellow" }}>1</div>
  <div style={{ height: 200, width: "100%", background: "blue" }}>2</div>
  <div style={{ height: 150, width: "100%", background: "red" }}>3</div>
  <div style={{ height: 500, width: "100%", background: "orange" }}>4</div>
</Plock>
```

Also the gap between columns can be set by setting the `gap` prop:

`````jsx
<Plock nColumns={3} gap={10}>
    <div style={{ height: 100, width: "100%", background: "yellow" }}>1</div>
    <div style={{ height: 200, width: "100%", background: "blue" }}>2</div>
    <div style={{ height: 150, width: "100%", background: "red" }}>3</div>
    <div style={{ height: 500, width: "100%", background: "orange" }}>4</div>
</Plock>
```

Needs also some extra styling? No problem, you can extend the default styles by setting the `style` or the `className` prop:

````jsx
<Plock style={{ background: "red" }} className="an-happy-class">
  <div style={{ height: 100, width: "100%", background: "yellow" }}>1</div>
  <div style={{ height: 200, width: "100%", background: "blue" }}>2</div>
  <div style={{ height: 150, width: "100%", background: "red" }}>3</div>
  <div style={{ height: 500, width: "100%", background: "orange" }}>4</div>
</Plock>
```

### Built With 🏗️

- [ReactJS](https://reactjs.org/) - React

### Versioning 🚦

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/itsrennyman/react-plock/tags).

### Authors 🙋

- **Renato Pozzi** - _Initial work_ - [itsrennyman](https://github.com/itsrennyman)

### Stargazers 🌟

[![Stargazers repo roster for @itsrennyman/react-plock](https://reporoster.com/stars/itsrennyman/react-plock)](https://github.com/itsrennyman/react-plock/stargazers)

See also the list of [contributors](https://github.com/itsrennyman/react-plock/contributors) who participated in this project.

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
`````
