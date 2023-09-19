import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { FrontStack } from "../lib/front-stack";

test("Snap shot testing", () => {
  const app = new cdk.App();
  const stack = new FrontStack(app, "MyTestStack", {
    gitHubOrg: "sample",
  });
  const template = Template.fromStack(stack);

  expect(template.toJSON()).toMatchSnapshot();
});
