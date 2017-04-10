# Paper

The `Paper` component is a simple wrappper that adds box-shadow.

You can also use the scss mixin instead of paper.

```scss
  @include md-shadow(5);
```

```javascript
  type Props = {
    //  The component to render the paper as.
    component: Function | string,
    //  An optional css className to apply.
    className: ?string,
    // The depth of the paper. This should be a number between 0 - 5. If
    // the depth is 0, it will raise to a depth of 3 on hover.
    zDepth: number,
    // Any children to display in the paper.
    children: ReactChildren,
    //  Boolean if the paper should raise to the `zDepth` of `3` on hover when the initial
    raiseOnHover: boolean,
  };

  <Paper zDepth={ 2 } raiseOnHover>
    child elements
  </Paper>
```
