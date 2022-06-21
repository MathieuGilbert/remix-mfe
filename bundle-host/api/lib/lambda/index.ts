import { DynamoDB } from "aws-sdk";

interface FunctionUrlRequest {
  requestContext: {
    http: {
      method: string;
      path: string;
    };
  };
}

const db = new DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  region: "us-west-2",
});

const tableName = process.env.BUNDLES_TABLE_NAME!;

export const handler = async (event: FunctionUrlRequest) => {
  const { method, path } = event.requestContext.http;

  if (method === "GET") {
    if (path.startsWith("/latest/")) {
      const [name, contractVersion] = path.replace("/latest/", "").split("/");

      if (name == null || contractVersion == null) {
        throw new Error("Invalid request for latest.");
      }

      const key = `${name}-${contractVersion}-latest`;

      const { Item } = await db
        .get({
          TableName: tableName,
          Key: { id: key },
          AttributesToGet: ["umdBundle"],
        })
        .promise();

      if (Item == null) {
        throw new Error(`${key} not found.`);
      }

      const body = Item;

      const headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, max-age=0",
      };

      return {
        statusCode: 200,
        body,
        headers,
      };
    }

    if (path.startsWith("/bundle")) {
      const bundleFileName = path.replace("/bundle/", "");

      if (bundleFileName === "/bundle" || bundleFileName == null) {
        throw new Error("Invalid request for bundle.");
      }

      const { Item } = await db
        .get({
          TableName: tableName,
          Key: { id: bundleFileName },
          AttributesToGet: ["source"],
        })
        .promise();

      if (Item == null) {
        throw new Error(`${bundleFileName} not found.`);
      }

      const body = Item["source"];

      const headers = {
        "Content-Type": "application/javascript",
        "Cache-Control": "no-cache, max-age=0",
      };

      return {
        statusCode: 200,
        body,
        headers,
      };
    }
  }

  throw new Error("Invalid request");
};
