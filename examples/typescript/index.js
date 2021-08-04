"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaflowStack = void 0;
const cdk_metaflow_1 = require("cdk-metaflow");
const cdk = require("@aws-cdk/core");
class MetaflowStack extends cdk.Stack {
    constructor(scope, id, props = {}) {
        super(scope, id, props);
        this.metaflow = new cdk_metaflow_1.Metaflow(this, 'metaflow-ts');
    }
}
exports.MetaflowStack = MetaflowStack;
const devEnv = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};
const app = new cdk.App();
new MetaflowStack(app, 'metaflow-stack-ts', { env: devEnv });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBd0M7QUFDeEMscUNBQXFDO0FBRXJDLE1BQWEsYUFBYyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBRTFDLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsUUFBd0IsRUFBRTtRQUN0RSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksdUJBQVEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNGO0FBTkQsc0NBTUM7QUFFRCxNQUFNLE1BQU0sR0FBRztJQUNiLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQjtJQUN4QyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0I7Q0FDdkMsQ0FBQztBQUVGLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLElBQUksYUFBYSxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWV0YWZsb3cgfSBmcm9tICdjZGstbWV0YWZsb3cnO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgTWV0YWZsb3dTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIHB1YmxpYyByZWFkb25seSBtZXRhZmxvdzogTWV0YWZsb3c7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogY2RrLlN0YWNrUHJvcHMgPSB7fSkge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuICAgIHRoaXMubWV0YWZsb3cgPSBuZXcgTWV0YWZsb3codGhpcywgJ21ldGFmbG93LXRzJyk7XG4gIH1cbn1cblxuY29uc3QgZGV2RW52ID0ge1xuICBhY2NvdW50OiBwcm9jZXNzLmVudi5DREtfREVGQVVMVF9BQ0NPVU5ULFxuICByZWdpb246IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX1JFR0lPTixcbn07XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5uZXcgTWV0YWZsb3dTdGFjayhhcHAsICdtZXRhZmxvdy1zdGFjay10cycsIHsgZW52OiBkZXZFbnYgfSk7XG4iXX0=