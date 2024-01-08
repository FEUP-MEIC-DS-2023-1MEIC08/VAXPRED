# ./api/Dockerfile
FROM python:3.9

WORKDIR /app/api

# Copy the requirements file and install dependencies
COPY ./requirements.txt /app/api/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /app/api

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8123"]
