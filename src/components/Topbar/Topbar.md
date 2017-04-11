# Topbar

```javascript
type Props = {
  toggle: () => void,
  // The links prop refers to links located to the right of the logo.
  links: Array<Object>,
  // Dropdown menu links for the username / avatar
  userLinks: Array<Object>,
  // Links to the left of the user avatar on the righthand side of bar.
  rightLinks: Array<Object>,
  // User object expecting at minimum, user.avatarUrl and user.username
  user: Object,
  // Where should the logo link to? Default is /
  logoLink: string,
};
```
