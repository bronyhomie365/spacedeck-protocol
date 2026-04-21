FROM python:3.12-slim

WORKDIR /app

# [THERMODYNAMICS]: Light-weight environment
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Port for the API Orchestrator
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
