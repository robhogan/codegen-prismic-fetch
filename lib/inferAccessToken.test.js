const { inferAccessToken } = require("./inferAccessToken");

const BASE_URL = "https://example.com/graphql";
const positiveCases = [
  [BASE_URL + "?access_token=mytoken", undefined],
  [BASE_URL, { headers: { authorization: "Bearer mytoken" } }],
  [BASE_URL, { headers: { authorization: "Token mytoken" } }],
  [BASE_URL, { headers: { Authorization: "token mytoken" } }],
];

const negativeCases = [
  [BASE_URL, undefined],
  [BASE_URL, { headers: { authorization: "mytoken" } }],
  [BASE_URL, { headers: {} }],
];

test.each(positiveCases)(
  "inferAccessToken finds mytoken in %s, %o",
  (url, options) => {
    expect(inferAccessToken(new URL(url), options)).toEqual("mytoken");
  }
);

test.each(negativeCases)(
  "inferAccessToken returns null for %s, %o",
  (url, options) => {
    expect(inferAccessToken(new URL(url), options)).toEqual(null);
  }
);
