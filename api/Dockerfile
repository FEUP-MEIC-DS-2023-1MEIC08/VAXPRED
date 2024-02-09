# ./api/Dockerfile
FROM python:3.9

WORKDIR /app

# Copy the requirements file and install dependencies
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8123"]
