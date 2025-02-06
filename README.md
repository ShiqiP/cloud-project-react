# Cloud Final Project Front End Part

## How it works

1. create a connection connecting Github repository in AWS.
2. create lambda function to invalidate cloudfront
3. grant permission to lambda function which can operate cloudfront
4. create CloudFormation stack using template yml file. which is in /CloudFormtion/build.yml

## Lambda function

```js
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
const cloudfront = new CloudFrontClient();

export const handler = async (event) => {
  const DISTRIBUTION_ID = JSON.parse(
    event["CodePipeline.job"].data.actionConfiguration.configuration
      .UserParameters
  ).distributionId;
  const params = {
    DistributionId: DISTRIBUTION_ID,
    InvalidationBatch: {
      CallerReference: Date.now().toString(),
      Paths: {
        Quantity: 1,
        Items: ["/*"],
      },
    },
  };
  const command = new CreateInvalidationCommand(params);
  const response = await cloudfront.send(command);
  return response;
};
```

## Lambda role policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "logs:CreateLogGroup",
      "Resource": "arn:aws:logs:us-east-1:640168446780:*"
    },
    {
      "Effect": "Allow",
      "Action": ["logs:CreateLogStream", "logs:PutLogEvents"],
      "Resource": [
        "arn:aws:logs:us-east-1:640168446780:log-group:/aws/lambda/invalidateCloudFront:*"
      ]
    },
    {
      "Effect": "Allow",
      "Resource": ["arn:aws:cloudfront::640168446780:*"],
      "Action": ["cloudfront:CreateInvalidation"]
    }
  ]
}
```
