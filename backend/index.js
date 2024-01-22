import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestrauntsDAO from "./dataaccessobject/restaurantsDAO.js"
import ReviewsDAO from "./dataaccessobject/reviewsDAO.js"

dotenv.config();

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT;

MongoClient.connect(
  process.env.REST_DB_URI, 
  {
  maxPoolSize: 10,
  wtimeoutMS: 2500,
  }
  )

  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })

  .then(async client => {
    await RestrauntsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
