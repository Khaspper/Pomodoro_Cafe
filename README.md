# Pomodoro Cafe

An interactive cafe review web app that helps users find the perfect study spot in Las Vegas. I Built this with React, Node.js, and an interactive map powered by MapLibre!

![Pomodoro Cafe Logo](./client/src/assets/pomodoro-cafe.png)

## Features

### Interactive Map

- **MapLibre Integration**: An open source mapping solution (no Google Maps fees!)
- **Real-time Cafe Discovery**: Browse cafes across Las Vegas (There are some cafes missing! I will add them if you want to tell me about them [here](https://docs.google.com/forms/d/1XGOo7LylmJiIRsTXhg2EgM-6pq-ff13tCEsRpsP7g60/viewform?edit_requested=true))
- **Animations**: Framer Motion powered transitions
- **Dark/Light Mode**: Toggle light and dark themes

### Cafe Reviews & Ratings

- **Rating System**: Rate cafes on multiple criteria:
  - WiFi Strength
  - Free WiFi availability
  - Outlet availability (1-5 "stars")
  - Seating comfort (1-5 "stars")
- **Aggregated Statistics**: View community-driven cafe statistics
- **Live Updates**: See ratings update instantly

### Community Features

- **Comment System**: Share experiences about cafes
- **User Authentication**: Login/sign-up with session management
- **Protected Routes**: Review and comment functionality

### Modern UI/UX

- **Responsive Design**: Works on desktop and mobile
- **TailwindCSS Styling**: Modern interface
- **Animations**: Framer Motion for some interactions

## Tech Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **React Router DOM** for navigation
- **MapLibre GL** for interactive maps
- **Framer Motion** for animations
- **React Icons** for iconography

### Backend

- **Node.js** with Express
- **TypeScript** for type safety
- **Prisma ORM** for database management
- **PostgreSQL** as the primary database
- **Passport.js** for authentication (sessions, not JWT!)
- **Express Session** with PostgreSQL store
- **Morgan** for request logging
- **CORS** for cross-origin requests

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Git

### 1. Clone the Repository

```bash
git clone <https://github.com/Khaspper/Pomodoro_Cafe#>
cd Pomodoro_Cafe
```

### 2. Backend Setup

```bash
cd server
npm install

# Edit .env with your database credentials

# Set up the database
npx prisma migrate dev --name init
npx prisma generate
npm run prisma:seed

# Start the development server
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install

# Edit .env with your backend URL

# Start the development server
npm run dev
```

### 4. Environment Variables

#### Backend (.env)

```env
DEV_DATABASE_URL="postgresql://username:password@localhost:5432/pomodoro_cafe"
SECRET_KEY="your-secret-key-here"
PORT=3000
```

#### Frontend (.env)

```env
VITE_BACKEND_URL="http://localhost:3000"
```

## Database Setup

The application uses PostgreSQL with Prisma ORM. The database includes:

- **Cafe data** seeded from OpenStreetMap via Overpass API
- **User authentication** with bcrypt password hashing
- **Session management** with PostgreSQL session store
- **Review and comment** systems

### Database Commands

```bash
# Reset and migrate database
npx prisma migrate reset

# Generate Prisma client
npx prisma generate

# Seed the database with cafe data
npm run prisma:seed
```

## Usage

### For Users

1. **Browse Cafes**: Open the app to see an interactive map of Las Vegas cafes
2. **Select a Cafe**: Click on any coffee emoji marker to view cafe details
3. **View Information**: Check WiFi strength, outlet availability, and seating
4. **Read Comments**: See what other users have to say
5. **Leave Reviews**: Sign up to rate cafes and leave comments
6. **Toggle Theme**: Switch between light and dark modes

### For Developers

1. **API Endpoints**: RESTful API with proper error handling
2. **Authentication**: Session-based auth with protected routes
3. **Real-time Updates**: State management for live data updates
4. **Type Safety**: Full TypeScript implementation

## Development

### Available Scripts

#### Backend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm test            # Run tests
npm run migrate:dev  # Run database migrations
```

#### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Project Structure

```
Pomodoro_Cafe/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   └── types/         # TypeScript type definitions
│   └── dist/              # Built frontend
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/        # API routes
│   │   ├── db/           # Database queries
│   │   └── config/       # Configuration files
│   ├── prisma/           # Database schema and migrations
│   └── tests/            # Test files
└── README.md
```

## Testing

The project includes backend testing using supertest:

```bash
# Run backend tests
cd server
npm test
```

## Acknowledgments

- **MapLibre** for the open source mapping solution (shout out to Syntax and CJ!)
- **OpenStreetMap** for the cafe data via Overpass API
- **TailwindCSS** for the utility-first CSS framework
- **Prisma** for the ORM experience

---

## My Development Journey

Dear Diary...

Sun Aug 24 11:58 PM --- I forgot about race conditions Bruh so now im implementing how to do stop race conditions...

I also am learning how to fetch and post data in React with a server

Mon Aug 25th 2:40 AM --- MY PERFORMANCE IS SO BAD WHAT THE BAKA!!!

Tues Aug 26th 2:11 AM School started im so happy and sad...
Anyways I am adding JWT to authenticate the users and will probably start
by making a database and then making a prisma models for users
WISH ME LUCK!!!!

Tues Aug 26th 7:08 PM Messed up I chose JWT when I didn't need it
and session data would've suffice... wasted hours omg

Wed Aug 27th 11:03 PM I Added errors to show in the UI
BUT I FORGOT TO ADD TESTS FIRST AHHHHHHHHHHHHHHHHHHHHHHHHH

Mon Sept 1st 12:45 AM I didn't realize how hard it is to authenticate a user with a separate front and
backend wow that was annoying... But I learned about protect routes

Mon Sept 1st 10:01 PM I learned more about mocking functions And how much I hate Mocking I will start writing pure functions from now on...

Wed Sept 3rd 2:18 PM OMG I FINISHED THE TESTS!!!! NOW I GET TO IMPLEMENT
GOOGLE MAPS API IM SCARED BUT EXCITED AT THE SAME TIME

Thu Sept 4th 3:25 AM FREAK google maps I don't wanna pay...
So shout out to Syntax and CJ on youtube I found
OpenFreeMaps and I found react-maplibre!!!!
I so EXCITED

Fri Sept 19th 7:10 PM Greetings... it's been a while XD I'm pretty much done with the project... I just need to polish it
sorry for not updating... I just got really lazy... but today I am going to try to get rid of all the todos as fast as I can
so I can deploy this project... but I am going to start off with learning what Logging is... I am researching about morgan
right now!

Fri Sept 19th 8:23 PM Just put dotenv client side... yeah yeah yeah i know i know

Fri Sept 19th 10:34 PM Omg I have to add rate limiting

Fri Sept 19th 11:51 PM Rate limiting... I hate you why is it so complicated
I thought it was so easy UNTIL I SAW MY TERMINAL TALKING BOUT IPv6
WHAT THE FREAK!!!! I'm on a time crunch so I will ignore this for now and will get back to this later...
Rate limit: 1
Markus: 0

Fri Sept 19th 12:45 PM I will add health check API idk I saw a youtube video talking about it so now I just wanna implement it

Tue Sep 23rd 6:58 PM Finished the project... I hate front end I hate margins I hate figma I hate padding I hate color theory I hate it all but it has taught me a lot 10 / 10 would hate again I just have to deploy this website and then I am done frfr
