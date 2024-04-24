const Appointment = require("../models/appointment");

// Function to update pending appointments to rejected for the current day
module.exports.updatePendingAppointments = async () => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison

    // Use MongoDB aggregation pipeline to identify pending appointments for the current day
    const pendingAppointments = await Appointment.aggregate([
      {
        $match: {
          status: "pending",
          date: { $lt: currentDate },
        },
      },
    ]);
    console.log("Pending appointments:", pendingAppointments);

    // Update status to rejected for pending appointments found
    await Appointment.updateMany(
      { _id: { $in: pendingAppointments.map((appt) => appt._id) } },
      { $set: { status: "rejected" } }
    );

    console.log(
      "Pending appointments updated to rejected:",
      pendingAppointments.length
    );
  } catch (error) {
    console.error("Error updating pending appointments:", error);
  }
};

// Schedule the update function to run once a day (adjust schedule as needed)
// Run every 24 hours
