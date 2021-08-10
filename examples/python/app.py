import aws_cdk.core as cdk
import cdk_metaflow as metaflow
import os


class MetaflowStack(cdk.Stack):
    def __init__(self, scope, id, env):
        super().__init__(scope, id, env=env)
        self.metaflow = metaflow.Metaflow(self, "cdk-metaflow-py")


dev_env = {
    "account": os.environ.get("CDK_DEFAULT_ACCOUNT"),
    "region": os.environ.get("CDK_DEFAULT_REGION")
}

app = cdk.App()
MetaflowStack(app, "cdk-metaflow-py-stack", env=dev_env)
app.synth()
