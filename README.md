# Back-Yard-Brewing-JavaScript

###**REQUIRED**

[NodeJS](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com), [NPM](https://www.npmjs.com)

###**SET UP**

1. Run `npm init` to set up npm package manager.

2. Use `npm install` to download the necesarry dependencies.

  Gulp is **NOT** included in the JSON package. If you plan to make changes, see the `gulpfile.js` to find out which dependencies are needed. 

3. To start running Mongodb, use the command `sudo Mongod`. From another terminal window, use the command `mongo` to connect.

4. Create the `BackYardBrewing` database by using the command `use BackYardBrewing`. Insert the following collections with the command `db.createCollection('COLLECTION_NAME')`:

  * beertypes
  * events
  * recipes
  * system.indexes
  * userrecipes
  * users

5. use the following command to push the `beertypes.json` file into your `beertypes` collection: 

  `mongoimport --db BackYardBrewing --collection beertypes --file beertypes.json`

6. Install `nodemon` using `npm install -g nodemon`. This will be used to start your local host.

7. Run `nodemon server.js` to start your local site at `localhost:3000`.
