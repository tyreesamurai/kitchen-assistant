# Use the correct image tag format
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /parser-service

# Copy requirements file to the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code into the container
COPY . .

# Specify the command to run the application
CMD ["python", "app.py"]
