import aws_cdk.core as cdk
import cdk_metaflow as metaflow


class MetaflowStack(cdk.Stack):
    def __init__(self, scope, id, env):
        super().__init__(scope, id, env=env)
        self.metaflow = metaflow.Metaflow(self, "cdk-metaflow-py")


dev_env = {
    "account": "123456789",
    "region": "us-west-2"
}

app = cdk.App()
MetaflowStack(app, "cdk-metaflow-py-stack", env=dev_env)
app.synth()
