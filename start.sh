echo "Starting backend..."
cd backend
npm start &

echo "Starting frontend..."
cd ../frontend
npm run dev

chmod +x start.sh