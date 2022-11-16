const db = require("./pool");

const init = async () => {
  await db.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await db.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (  
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  
    username VARCHAR(36) UNIQUE NOT NULL CHECK (LENGTH(username) >= 6),
    password VARCHAR(100) NOT NULL CHECK (LENGTH(password) >= 6)    
  )`);

  await db.query(`
    CREATE TABLE IF NOT EXISTS notes ( 
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    body TEXT NOT NULL CHECK (LENGTH(body) <= 5000),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    category VARCHAR(50) NOT NULL DEFAULT '#General')
    `);
};

module.exports = init;
