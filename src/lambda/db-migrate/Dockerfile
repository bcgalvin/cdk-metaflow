FROM public.ecr.aws/lambda/python:3.8

COPY index.py   ./
COPY requirements.txt ./
RUN pip install -r requirements.txt
CMD ["index.lambda_handler"]