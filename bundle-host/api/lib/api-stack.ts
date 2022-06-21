import * as path from "path";
import { Stack, StackProps, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime, FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Table, AttributeType } from "aws-cdk-lib/aws-dynamodb";

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const table = new Table(this, "bundles-table", {
      tableName: "Bundles",
      partitionKey: { name: "id", type: AttributeType.STRING },
    });

    const apiLambda = new NodejsFunction(this, "api-lambda", {
      bundling: { externalModules: ["aws-sdk"] },
      runtime: Runtime.NODEJS_16_X,
      entry: path.resolve(__dirname, "lambda", "index.ts"),
      logRetention: RetentionDays.ONE_MONTH,
      environment: {
        BUNDLES_TABLE_NAME: table.tableName,
      },
    });

    table.grantReadData(apiLambda);

    const functionUrl = apiLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, "endpoint", { value: functionUrl.url });
  }
}
