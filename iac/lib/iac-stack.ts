import { CloudFrontToS3 } from "@aws-solutions-constructs/aws-cloudfront-s3";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cloudFrontAndS3 = new CloudFrontToS3(this, "CloudFrontToS3", {
      bucketProps: {
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      },
    });
  }
}
