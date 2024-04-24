require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const { updatePendingAppointments } = require("./utilities/cronTask");

mongoose
  .connect(process.env.MONGO_URI, {})
  .then((data) => {
    const port = process.env.PORT || 5001;

    // cron Tasks
    updatePendingAppointments();
    setInterval(updatePendingAppointments, 24 * 60 * 60 * 1000);

    app.listen(port, () =>
      console.log(
        `Server Running:\nPORT:${port}\ndatabase connected: ${data.connection.host}`
      )
    );
  })
  .catch((err) => console.log(`Error during Mongoose Connection:`, err));
