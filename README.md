# Create a .env file in the project root:
```text
PORT=3000
POSTGRES_HOST=postgres-db
POSTGRES_PORT=5432
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=weather_tracker
WEATHER_GEO_API=https://geocoding-api.open-meteo.com/v1
WEATHER_API=https://api.open-meteo.com/v1
```
# Install dependencies
```bash
npm install
```

# Run the project
```bash
docker-compose up
```