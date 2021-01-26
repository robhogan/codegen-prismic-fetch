const fetch = require("node-fetch");

async function fetchMasterRef(apiUrl) {
  const response = await fetch(apiUrl, {
    headers: { accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(
      `Bad response from Prismic API endpoint: ${response.status}.`
    );
  }
  const payload = await response.json();
  if (!payload || !Array.isArray(payload.refs)) {
    throw new Error(`Unexpected response from Prismic API, missing refs array`);
  }
  const masterRef = payload.refs.find((ref) => ref.isMasterRef);
  if (!masterRef?.ref) {
    throw new Error(`Unable to get latest version ref from Prismic API`);
  }
  return masterRef.ref;
}

module.exports = { fetchMasterRef };
