const fetch = require("node-fetch");
const { inferAccessToken } = require("./lib/inferAccessToken");
const { fetchMasterRef } = require("./lib/fetchMasterRef");

async function codegenFetch(url, options = {}) {
  const urlObj = new URL(url);

  if (!urlObj.hostname.includes("prismic.io")) {
    console.warn(`Warning: ${url} does not look like a prismic URL`);
  }

  const accessToken =
    process.env.PRISMIC_ACCESS_TOKEN || inferAccessToken(urlObj, options);

  let apiUrl = `https://${urlObj.host}/api/v2`;
  if (accessToken) {
    apiUrl += "?access_token=" + encodeURIComponent(accessToken);
  }

  const newOptions = { ...options, headers: { ...(options.headers || {}) } };

  newOptions.headers["Prismic-ref"] = await fetchMasterRef(apiUrl);

  // If a 'POST' request is used
  if (options.method && options.method.toLowerCase() === "post") {
    const { query, variables } = JSON.parse(options.body);
    urlObj.searchParams.set("query", query);
    if (variables && Object.keys(variables).length > 0) {
      urlObj.searchParams.set("variables", JSON.stringify(variables));
    }
    url = urlObj.toString();
    delete newOptions.body;
    newOptions.method = "GET";
  }

  return fetch(url, newOptions);
}

module.exports = exports = codegenFetch;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports;
