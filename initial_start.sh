cd backend
echo "Installing dependencies for backend..."
npm install

cd ../frontend
echo "Installing dependencies for frontend..."
npm install

cd ../backend
echo "Starting backend..."
npm start &

cd ../frontend
echo "Starting frontend..."
npm run dev

chmod +x initial_start.sh