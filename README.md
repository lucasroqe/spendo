# 💸 Spendo

Spendo is an application designed to help you manage your spending effortlessly. With a simple and user-friendly interface, Spendo allows you to track your expenses, categorize them, and visualize your financial habits through insightful graphs. 

## Technologies
**Next.js, Prisma, React, TypeScript, TailwindCSS, BetterAuth, and others.**

## Screenshots
<img src="src\public\images\dashboard.png" width="675"/>
<img src="src\public\images\table.png" width="675"/> and more...

##  Ambient Configuration ⚙️

1. Open a terminal and clone the repository:
```bash
git clone https://github.com/lucasroqe/spendo.git

cd spendo
```

2. Create and adjust a .env file with database credentials, base URL, and secret key:
```bash
DATABASE_URL="file:./dev.db"  # Or replace with your database URL

BETTER_AUTH_URL=http://localhost:3000 # Base URL of your app

BETTER_AUTH_SECRET=  # Use something like openssl or generate in https://www.better-auth.com/docs/installation
```

3. Install dependencies:
```sh
npm i # Due to some trouble with React 19 and other dependencies, the package.json is temporarily using overrides
```

4. Run Prisma migration:
```sh
npx prisma migrate dev
```

5. Run the app:
```sh
npm run dev
```

The application will run on http://localhost:3000.

## Contribution
Feel free to contribute. Please, fork the repository and make a pull request. 😉
