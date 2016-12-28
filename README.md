# Ticketing System

SPA Ticketing System

## Requirements

* Ruby version 2.3.0
* Rails version 5.0.0.1
* node 4.2+
* npm 3+

## Quick Start

* bundle install
* rake db:create
* rake db:migrate
* rake db:seed_fu
* npm install
* npm install typescript@2.0.10

## Run project

In project folder run this commands:

* rails s
* npm start

## Run tests

* rspec spec
* npm test

## Seed data

After seed data sucessfuly loaded following user accounts will be present:
* Customer: email: 'customer@fakemail.com', password: 'foobar123'
* Support agent: email: 'agent@fakemail.com', password: 'foobar123'
* Admin: email: 'admin@fakemail.com', password: 'foobar123'

## Authorization rules

Customer:
  1. can view all own tickets
  2. can create tickets
  3. can edit tickets
  4. can add comments to tickets

Support User:
  1. can view all tickets in the system
  2. can assign ticket to himself
  3. can edit tickets
  4. can add comments to tickets
  5. can review report with all closed tickets in the last one month

Admin User:
  1. can view all tickets in the system
  2. can assign tickets to any support agent
  3. can edit tickets
  4. can delete tickets
  5. can add comments to tickets
  6. can delete comments
  7. can view all users in the system
  8. can delete users
  9. can edit users

## Proposals for improving the assignment

1. Add better error rendering in forms
2. Add integration tests. Only unit tests were added
3. Add more unit tests. Only part of the app code was covered
