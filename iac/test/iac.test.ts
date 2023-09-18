import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as Iac from "../lib/iac-stack";

test("Snap shot testing", () => {
  const app = new cdk.App();
  const stack = new Iac.IacStack(app, "MyTestStack");
  const template = Template.fromStack(stack);

  expect(template.toJSON()).toMatchSnapshot();
});
