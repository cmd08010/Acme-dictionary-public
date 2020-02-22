const pg = require("pg")
const { Client } = pg
const uuid = require("uuid/v4")
const client = new Client("postgres://localhost/acme_dictionary")
const faker = require("faker")

client.connect()

const sync = async () => {
  const SQL = `    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS nouns;
  DROP TABLE IF EXISTS verbs;
  DROP TABLE IF EXISTS adjectives;
  CREATE TABLE nouns
  (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    date_create TIMESTAMP default CURRENT_TIMESTAMP
  );
  CREATE TABLE verbs
  (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   name VARCHAR NOT NULL,
    date_create TIMESTAMP default CURRENT_TIMESTAMP
  );
  CREATE TABLE adjectives
  (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    date_create TIMESTAMP default CURRENT_TIMESTAMP
  );
  INSERT INTO nouns (name) VALUES ('cat');
  `
  await client.query(SQL)
}

const getNouns = async () => {
  const SQL = `
  SELECT * from nouns;
  `
  const response = await client.query(SQL)
  return response.rows
}

const createNoun = async () => {
  const SQL = `
  INSERT INTO nouns (name) VALUES ('${faker.hacker.noun()}')
  returning *`
  const response = await client.query(SQL)
  return response.rows[0]
}

const deleteNoun = async id => {
  const SQL = `
  DELETE FROM nouns WHERE id = $1
  `
  await client.query(SQL, [id])
}

//Verbs

const getVerbs = async () => {
  const SQL = `
  SELECT * from verbs;
  `
  const response = await client.query(SQL)
  return response.rows
}

const createVerb = async () => {
  const SQL = `
  INSERT INTO verbs (name) VALUES ('${faker.hacker.verb()}')
  returning *`
  const response = await client.query(SQL)
  return response.rows[0]
}

const deleteVerb = async id => {
  const SQL = `
  DELETE FROM verbs WHERE id = $1
  `
  await client.query(SQL, [id])
}

//Adjectives

const getAdjectives = async () => {
  const SQL = `
  SELECT * from adjectives;
  `
  const response = await client.query(SQL)
  return response.rows
}

const createAdjective = async () => {
  const SQL = `
  INSERT INTO adjectives (name) VALUES ('${faker.hacker.adjective()}')
  returning *`
  const response = await client.query(SQL)
  return response.rows[0]
}

const deleteAdjective = async id => {
  const SQL = `
  DELETE FROM adjectives WHERE id = $1
  `
  await client.query(SQL, [id])
}

//createnoun, deleteNoun, getNoun - same for verbs and adjectives

module.exports = {
  sync,
  getNouns,
  createNoun,
  deleteNoun,
  createAdjective,
  deleteAdjective,
  getAdjectives,
  createVerb,
  deleteVerb,
  getVerbs
}
