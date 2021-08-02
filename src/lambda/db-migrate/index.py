from typing import Dict, Any
import os
import json
from urllib import request
from aws_lambda_powertools import Logger, Metrics, Tracer
from aws_lambda_powertools.utilities.typing import LambdaContext

logger = Logger()
tracer = Tracer()
metrics = Metrics()

@metrics.log_metrics(capture_cold_start_metric=True)
@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
def lambda_handler(event: Dict[str, Any], context: LambdaContext):
  logger.info(json.dumps(event, indent=2))
  response = {}
  status_endpoint = "{}/db_schema_status".format(os.environ.get('MD_LB_ADDRESS'))
  upgrade_endpoint = "{}/upgrade".format(os.environ.get('MD_LB_ADDRESS'))
  
  with request.urlopen(status_endpoint) as status:
    response['init-status'] = json.loads(status.read())
  
  logger.info(f"status endpoint response: {json.dumps(response['init-status'], indent=2)}")
  upgrade_patch = request.Request(upgrade_endpoint, method='PATCH')
  with request.urlopen(upgrade_patch) as upgrade:
    response['upgrade-result'] = upgrade.read().decode()
  
  logger.info(f"upgrade endpoint response: {json.dumps(response['upgrade-result'], indent=2)}")
  with request.urlopen(status_endpoint) as status:
    response['final-status'] = json.loads(status.read())
  logger.info(f"final response: {json.dumps(response['final-status'], indent=2)}")
  return(response)
