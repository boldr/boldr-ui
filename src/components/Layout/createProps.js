export default function createProps(propTypes, props) {
  const newProps = {};

  Object.keys(props)
    .filter(key => ~['children'].indexOf(key) || !propTypes[key]) // eslint-disable-line
    .forEach(key => newProps[key] = props[key]); // eslint-disable-line

  return newProps;
}
