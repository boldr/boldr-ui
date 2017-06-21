export default (path, baseUrlLink = '', baseUrlValue = null, pathSeparator = '/') => {
  const trimPath = (path, pathSeparator) => {
    const escapedString = pathSeparator.replace(/[[\](){}?*+^$\\.|-]/g, '\\$&');

    return path.replace(new RegExp(`^[ ${escapedString}]+|[ ${escapedString}]+$`, 'g'), '');
  };

  const explodePath = (path, pathSeparator) => {
    const trimedPath = trimPath(path, pathSeparator);

    if (trimedPath === '') {
      return [];
    }

    return trimedPath.split(pathSeparator);
  };

  const pathArr = explodePath(path, pathSeparator);
  const options = [];
  let link = baseUrlLink;
  const idOffset = baseUrlValue ? 1 : 0;

  if (baseUrlValue) {
    options.push({ id: 0, value: baseUrlValue, link });
  }

  pathArr.map((segment, id) => {
    link += `/${segment}`;
    options.push({ id: idOffset + id, value: segment, link });
    return options;
  });
  return options;
};
