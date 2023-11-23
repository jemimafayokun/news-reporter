# My News API

Welcome to the News Reporter API! This project provides a set of HTTP endpoints for fetching and manipulating data in a PostgreSQL database.

# Hosted Version

- Check out the hosted version of the News Reporter API: https://my-news-reporter-k1n3.onrender.com/
- To view the available endpoints: https://my-news-reporter-k1n3.onrender.com/api

# Overview

The News Reporter API allows users to interact with a PostgreSQL database to retrieve and manipulate news data. It exposes various HTTP endpoints for tasks such as fetching news articles, creating or deleting new entries, viewing comments and more.

# Getting Started

Prerequisites:

- Before you begin, ensure you have the following installed:

- Node.js minimum version: v18.18.2
- PostgreSQL minimum version: v14.9

Clone the Repository:

- git clone https://github.com/jemimafayokun/news-reporter
- cd news-reporter

# Dependencies required:

- dotenv
- express
- fs.promises
- pg
- pg-format

# Dev-Dependencies required:

- jest
- supertest

# Set Up the Database:

- npm run setup-db
- npm run seed

# Run Tests:

- npm test

# Creating Environment Variables:

- In order to connect successfully to the two databases locally you must create a .env.development file which contains the PGDATABASE of the development data as well as a .env.test file which contains the PGDATABASE of the test data.

- The inside of each file should look like the following:
- PGDATABASE=name_of_database
