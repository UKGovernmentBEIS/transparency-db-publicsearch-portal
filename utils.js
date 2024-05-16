setURIParameter = function (uri, key, value) {
  var updatedURI = new URL(uri);
  if (updatedURI.searchParams.has(key)) {
    updatedURI.searchParams.set(key, value);
  }
  else {
    updatedURI.searchParams.append(key, value);
  }
  return updatedURI.href;

}

setURIParameters = function (uri, paramValues) {
  Object.entries(paramValues).forEach(([paramKey, paramValue]) => {
    uri = setURIParameter(uri, paramKey, paramValue)
  });
  return uri;

}