# Pylon TypeScript SDK

The official TypeScript SDK for the [Pylon API](https://docs.usepylon.com).

> **Alpha.** The SDK is new and its interface may change between `0.x` releases.

## Installation

```bash
npm install @usepylon/sdk
```

Requires Node.js 18 or later. The package ships both ES module and CommonJS entry points.

## Usage

```ts
import { PylonClient, PylonEnvironment } from "@usepylon/sdk";

const client = new PylonClient({ token: "YOUR_API_TOKEN" });

const { data: issue } = await client.issues.get({ id: "issue_id" });

// List methods page through results automatically.
for await (const account of await client.accounts.list()) {
    console.log(account.name);
}
```

Pylon accounts live in either the US or the EU region, and the client defaults to the US. EU accounts must select the EU region:

```ts
const client = new PylonClient({ token: "YOUR_API_TOKEN", environment: PylonEnvironment.Eu });
```

### Errors

Requests that fail throw a `PylonError` carrying the status code and response body:

```ts
import { PylonError } from "@usepylon/sdk";

try {
    await client.issues.get({ id: "missing" });
} catch (error) {
    if (error instanceof PylonError) {
        console.log(error.statusCode, error.body);
    }
}
```

## Reference

The [Pylon API documentation](https://docs.usepylon.com) covers every endpoint. Method names follow the API paths, and each method takes one request object holding its path parameters and fields under their API names: `GET /knowledge-bases/{id}/articles` is `client.knowledgeBases.articles.list({ knowledge_base_id })`.

## Contributing

This SDK is generated from Pylon's OpenAPI spec, so changes to `src/` are overwritten by the next sync. Please open an issue for bugs or missing endpoints.
