console.log('APP running on Database ==> ', process.env.DATABASE_URL)
module.exports = {
  "type": "postgres",
  "port": 5432,
  "url": process.env.DATABASE_URL,
  // "ssl": true,
  // "extra": {
  //   "ssl": {
  //     "rejectUnauthorized": false
  //   }
  // },
  "migrations": [
    `./${process.env.MODELS}/database/migrations/*.{ts,js}`
  ],
  "entities": [`./${process.env.MODELS}/models/*.{ts,js}`],
  "cli": {
    "migrationsDir": `./${process.env.MODELS}/database/migrations`
  }
}