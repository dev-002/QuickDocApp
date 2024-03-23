const Appointment = require("../models/appointment");

const listTodayAppointment = async (req, res, next) => {
  let { doctorId } = req.body;
  doctorId = new ObjectId(doctorId);
  console.log(doctorId);

  const date = new Date();
  let today = [date.getDate(), date.getMonth(), date.getFullYear()].join("-");

  try {
    if (Boolean(doctorId)) {
      const appointmentList = await Appointment.find({
        $and: [
          {
            doctorId,
            date: today,
          },
          {
            $or: [
              { status: "pending" },
              { status: "approved" },
              { status: "rejected" },
            ],
          },
        ],
      });

      if (appointmentList)
        return res.status(200).json({ ack: true, appointmentList });
      else
        return res
          .status(500)
          .json({ ack: false, err: "Error Fetching Appoinment" });
    } else
      return res.status(404).json({ ack: false, err: "No Values Provided" });
  } catch (err) {
    return res.status(500).json({ ack: false, err });
  }
};
