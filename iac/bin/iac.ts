#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { FrontStack } from "../lib/front-stack";
import { devParameter } from "../parameter";

const app = new cdk.App();

new FrontStack(app, "IacStack", {
  gitHubOrg: devParameter.gitHubOrg,
});
