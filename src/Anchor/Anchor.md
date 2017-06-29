# Anchor

Nothing more exciting than a wrapped React-Router Link component with a class name attached to it.

### Usage
  <Anchor
    href="/some-page-over-there"
    className="anchorage"
    label="AK"
  />

### Props

| Name            | Type                     | Default      | Required   | Description |
|-----------------|--------------------------|--------------|------------|-------------|
| children        | ReactChildren            |              |   ----     |   ----      |
| href            | string                   |              |   true     |  URL you are linking to.          |
| className       | string                   |    ----      |   ----     |  css class name         |
| label           | string                   |    ----      |   ----     |  text for the link. You may use label or children, but not both.        |
