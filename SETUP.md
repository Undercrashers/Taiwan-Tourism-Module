# Taiwan Tourism Module - Setup Guide

## Prerequisites

- Node.js installed
- MongoDB running locally (on `mongodb://localhost:27017/`)

## Backend Setup

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Seed the database

Before running the server, you MUST seed the MongoDB database with region and attraction data:

```bash
npm run seed
```

This will:

- Read CSV files from `server/data/`
- Create 4 regions (North, Central, South, East)
- Associate 12 attractions with these regions
- Output confirmation in console

### 3. Start the backend server

```bash
npm run dev
```

The server will run on `http://localhost:5000`

## Frontend Setup

### 1. Install dependencies

```bash
cd client
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## How It Works

1. The **Regional Guide** component loads when you scroll to that section
2. It fetches regions from `/api/regions` (backend API)
3. Each region displays as a clickable card with:
   - Region name
   - Color indicator dot
   - Brief summary
4. **Click a card to expand** and see attractions for that region
5. Attractions show pin icon + name + description

## Troubleshooting

### "No regions available" message

- MongoDB is not running
- Seed script was not executed (`npm run seed`)

### Error loading regions

- Backend server is not running
- Check if `http://localhost:5000/api/regions` is accessible
- Check browser console for network errors


## Database Info

- Database name: `taiwan_tours` (created by MongoDB on first connection)
- Collections: `regions`, `infoitems`, `submissions`
