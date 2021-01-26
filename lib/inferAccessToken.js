function inferAccessToken(urlObj, options) {
  if (urlObj.searchParams.has("access_token")) {
    return urlObj.searchParams.get("access_token");
  }

  if (options && options.headers) {
    const authHeader =
      options.headers.authorization || options.headers.Authorization;
    if (authHeader) {
      const parts = authHeader.split(" ");
      if (parts[1]) {
        return parts[1];
      }
    }
  }

  return null;
}

module.exports = { inferAccessToken };
