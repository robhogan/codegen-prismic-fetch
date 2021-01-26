# codegen-prismic-fetch

[![npm version](https://badge.fury.io/js/codegen-prismic-fetch.svg)](https://badge.fury.io/js/codegen-prismic-fetch)

A `customFetch` implementation for using [GraphQL Code Generator](https://graphql-code-generator.com/) with [Prismic CMS](https://prismic.io)

## Usage

```shell
npm i --save codegen-prismic-fetch
```

**Or** with yarn

```shell
yarn add codegen-prismic-fetch
```

Add a `customFetch` to your `codegen.yml`:

```yaml
customFetch: codegen-prismic-fetch
```

See [the codegen docs](https://graphql-code-generator.com/docs/getting-started/schema-field/#customfetch) for details
on `customFetch` usage.

## Authentication

If your API is private you'll need to specify an access token. You can do this in any of three ways:

- Set the `PRISMIC_ACCESS_TOKEN` environment variable
- Include `access_token` in your `codegen.yml` schema URL: `schema: "https://[your-repo-name].cdn.prismic.io/graphql?access_token=YOUR_TOKEN"`
- Include an `Authorization` header under `schema` in your `codegen.yml`. Make sure to include the prefix `Token `, eg:

```yaml
schema:
  https://[your-repo-name].cdn.prismic.io/graphql:
    headers:
      Authorization: Token YOUR_TOKEN
```

## Example

Setting `customFetch` globally

```yaml
customFetch: "codegen-prismic-fetch"
schema: https://[your-repo-name].cdn.prismic.io/graphql
```

Setting `customFetch` under the `schema`

```yaml
schema:
  https://[your-repo-name].cdn.prismic.io/graphql:
    customFetch: "codegen-prismic-fetch"
```

With an access token

```yaml
schema:
  https://[your-repo-name].cdn.prismic.io/graphql:
    customFetch: "codegen-prismic-fetch"
    headers:
      Authorization: Token YOUR_TOKEN
```

## How does it work?

Prismic has an unusual requirement which makes this library necessary - before making a graphql query we must make a call to
the REST API to find the identifier of the current "master" ref, and then we must pass it along in any graphql query
by setting the `Prismic-ref` HTTP header. This library infers the API endpoint from your graphql endpoint, performs a
`fetch` to get your master ref, and then adds that into codegen's graphql introspection queries.

Prismic also requires all queries to use the `GET` method. You can specify this with codegen's `method: GET` option,
but that's not necessary when using this library - we effectively set it for you by transforming all requests to `GET`
requests.
