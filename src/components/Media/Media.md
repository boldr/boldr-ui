# Media / Media Overlay

The `Media` component is used to display images, videos, ...media.  

```javascript
  type Props = {
    // Any media elements to display.
    children: ?ReactChildren,
    //  An optional css className to apply.
    className: ?string,
    // Boolean if the aspect ratio should be forced.
    forceAspect: ?boolean,
    // The aspect ratio to use.
    aspectRatio: string,
    // Boolean if this component should be expandable when there is a `CardExpander`
    expandable: ?string,
    // The component to render the card media as.
    component: Function | string,
  };
  <Media aspectRatio="16-9">
    <img src="https://boldr.io/logo.png" role="presentation" />
  </Media>
```

The `MediaOverlay` component is just a very simple wrapper that adds the `.boldrui-media-overlay` class name to a div. The overlay will be positioned
at the bottom of the `Media` by default.  

```javascript
type Props = {
  // Any children to display in the overlay.
  children: ?ReactChildren,
  //  An optional css className to apply.
  className: ?string,
  // An optional inline-style to apply to the overlay.
  style: ?Object,
  // The aspect ratio to use.
  aspectRatio: string,
  // Boolean if this component should be expandable when there is a `CardExpander`
  expandable: ?string,
  // The component to render the media overlay as.
  component: Function | string,
};

<Media>
  <MediaOverlay>
    <h1>MediaOverlay</h1>
  </MediaOverlay>
    <img src="https://boldr.io/logo.png" role="presentation" />
</Media>

```
