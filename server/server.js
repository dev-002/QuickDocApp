require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(process.env.MONGO_URI, {})
  .then((data) => {
    const port = process.env.PORT || 5001;

    app.listen(port, () =>
      console.log(
        `Server Running:\nPORT:${port}\ndatabase connected: ${data.connection.host}`
      )
    );
  })
  .catch((err) => console.log(`Error during Mongoose Connection:`, err));
