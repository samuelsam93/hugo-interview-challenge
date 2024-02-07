# This Repository

This is a completed implementation for the Hugo Insurance take home challenge. It utilizes some of the
basic structure provided, but some aspects were changed based on personal preference.

The `api` is a basic Express application and uses Prisma for data access with a Postgres database.

The `client` is a basic Vite + React application.

All dependencies are installed in the root of the project for simplicity. You can run both projects
together with

```
$> npm run start
```

or individually with

```
$> npm run start:api
$> npm run start:client
```

# Setup
The following steps are required to setup and run the demo:

1. Install both Postgres server and psql CLI on your machine, if you don't have them already. If you don't have them installed, the following guides might be helpful:
   1. How to Install psql on Mac, Ubuntu, Debian, Windows (https://www.timescale.com/blog/how-to-install-psql-on-mac-ubuntu-debian-windows/)
   2. How to start a PostgreSQL server on Mac OS X (https://www.atlassian.com/data/sql/how-to-start-a-postgresql-server-on-mac-os-x)
2. Make sure the Postgres server is running (for me the command was: `pg_ctl -D /usr/local/var/postgres start`) and create a new database for this project by running `createdb hugo-demo-db` (or whatever you would like to call your db). You can confirm you db is working by running `psql hugo-demo-db`
3. Once you have the db created, update line 10 of the prisma.schema file (located at ./api/prisma) so that url points to your db.  If you are on mac, it should look something like this: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`. Refer to https://www.prisma.io/docs/orm/overview/databases/postgresql for more information.

4. Next generate your prisma client using `prisma generate` and install any necessary dependencies (`npm install`)
5. After following these steps you should be able to run the app using `npm run start` as described above (or `npm run start:api` and `npm run start:client`)

# Next Steps

I enjoyed working on this project, however, given the timeframe and my schedule, there are some items that I was not able to include in the scope. My main focus was on creating all the required functionality. Below are some thoughts on what features/hardening I would implement next, given more time:
- Proper Typing of all Typescript Objects
  - This is one of the listed stretch goals, and I think would help with future extensibility of the code alot. While this code technically follows all Typescript rules (No red underlines!), there are too many `: any`s to call this proper Typescript. I would start by defining the following templates: Application (People, Addreess, Vehicles), Person (firstName, LastName, DOB), Address (streetAddress, city, state, zip), Vehicle (year, make, model, vin)
- Testing 
  - As I was focused on functinality, I did not spend any time developing tests. However, as the project grows, it would be important to have exhaustive testing to ensure that new changes do not break existing work. I would start by writing validation tests for each of the backend routes to ensure that they consistently return expected values.
- Separating db into multiple tables for extensibility (Applications, People, Vehicles)
  - Adding a few more tables to the db would help this project as it scales. Having additional tables for people and vehicles would allow data for these entities to be more easily used elsewhere in the app. This would also help with the other stretch goal of including multiple people on each application. In this setup, there could be a primary insured on the policy, referenced by id, and then a list of additional insured people (also referenced/listed by id). Similarly, rather than having all the data for each vehicle included in a list on the application, vehicles could be a list of vehicle ids (potentially by VIN) that reference the Vehicles table.

Thanks to Hugo for the opportunity to work on this take-home challenge, I have enjoyed working on it and look forward to hearing about next steps in the interview process!

# Hugo Full Stack Challenge

## Scenario

At Hugo, customers often start the insurance application process on an external third party site,
where that third party site then sends the collected information to our service so that the user can
continue their application process and receive a price quote.

## Task

### Backend

Create a web API that exposes four endpoints:

1. `POST` route that starts a new insurance application and initializes it with the provided data -
   This route should return a “resume” route that points to the frontend URL to load the created
   application
2. `GET` route that can retrieve the current insurance application
3. `PUT` route that will update the insurance application with provided data
    - This should accept partial fields from the quote application. Each submitted field needs to
      pass validation in order to be updated.
    - The quote application as a whole may still be incomplete and should not cause this route to
      fail.
4. `POST` route that validates the entire application and returns a price
    - You do not actually need to do any calculation here, returning a random number value would be
      sufficient

### Frontend

Create a React frontend that can display the current application state, and can allow information to
be added or edited. The frontend should do basic validation, and when all the required information
is completely filled out, allow the application to be submitted for completion, and display either
an error message if the application is not complete or the quoted price to purchase insurance.

## Data Specifications

The data that an insurance application needs consists of the following:

-   First and Last name
-   Date of Birth (validate that input is a date and at least 16 years old)
-   Address
    -   Street
    -   City
    -   State
    -   ZipCode (validate numeric, but don’t worry about validating if zip code exists)
-   Vehicle(s) (must have 1 vehicle, cannot have more than 3 total)
    -   VIN
    -   Year (validate numeric and valid year between 1985 and current year + 1)
    -   Make and Model

## Guidelines

-   Provide setup instructions for the frontend and backend projects
-   The submission should be self-contained and ran locally. Please avoid connecting to external
    services or databases.
    -   Instructions/scripts to provision local databases should be included with the submission.
-   Feel free to use any starter kit/bootstrapping tools you feel comfortable with to create the
    initial project (i.e. create-react-app, vite, etc for the front end) or use this one.
-   Don’t focus too much on the styling/UX of the frontend. Focus more on component
    organization/structure
-   Backend can use any flavor of SQL for data storage.
    -   Ensure that the frontend can resume the same application if the page is closed and reopened

## Stretch Goals

Implement the following if you have time or can plan to include within the time frame:

-   Use TypeScript with appropriate type definitions
-   Allow adding additional people to the insurance application:
    -   First and Last name
    -   Date of Birth
    -   Relationship (Spouse, Sibling, Parent, Friend, Other)
