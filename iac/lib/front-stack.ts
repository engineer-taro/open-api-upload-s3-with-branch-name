import { CloudFrontToS3 } from "@aws-solutions-constructs/aws-cloudfront-s3";
import * as cdk from "aws-cdk-lib";

import { Construct } from "constructs";
import * as aws_iam from "aws-cdk-lib/aws-iam";

export interface FrontStackProps extends cdk.StackProps {
  gitHubOrg: string;
}

export class FrontStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FrontStackProps) {
    super(scope, id, props);

    const cloudFrontAndS3 = new CloudFrontToS3(this, "CloudFrontToS3", {
      bucketProps: {
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      },
      cloudFrontDistributionProps: {
        cachePolicy: {
          defaultTtl: cdk.Duration.seconds(0),
        },
      },
      // NOTE: redocから生成されるhtmlが cdnのscript, inline style を使っており、セキュリティヘッダを付与していると弾かれてしまうため無効化
      insertHttpSecurityHeaders: false,
    });

    const openIdConnectProvider = new aws_iam.OpenIdConnectProvider(
      this,
      "OpenIdConnectProvider",
      {
        url: "https://token.actions.githubusercontent.com",
        clientIds: ["sts.amazonaws.com"],
      }
    );

    const githubActionsToS3AccessRole = new aws_iam.Role(
      this,
      "GithubActionsToS3AccessRole",
      {
        assumedBy: new aws_iam.FederatedPrincipal(
          openIdConnectProvider.openIdConnectProviderArn,
          {
            StringLike: {
              "token.actions.githubusercontent.com:sub": `${props.gitHubOrg}/*`,
            },
          },
          "sts:AssumeRoleWithWebIdentity"
        ),
      }
    );

    const s3UploadPolicy = new aws_iam.Policy(this, "S3UploadPolicy", {
      statements: [
        new aws_iam.PolicyStatement({
          effect: aws_iam.Effect.ALLOW,
          actions: ["s3:PutObject", "s3:DeleteObject"],
          resources: [`${cloudFrontAndS3.s3Bucket?.bucketArn}/*`],
        }),
      ],
    });

    githubActionsToS3AccessRole.attachInlinePolicy(s3UploadPolicy);
  }
}
