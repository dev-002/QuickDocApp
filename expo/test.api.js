const ip = "192.168.1.35";
const baseUrl = `http://${ip}:5000/api/v1`;

export default {
  Auth: {
    register: baseUrl + "/auth/register",
    login: baseUrl + "/auth/login",
  },
  Profile: {
    getProfile: baseUrl + "/profile",
  },
  Doctor: {
    getDoctors: baseUrl + "/doctor/list", // get
  },
  Appointment: {
    appointmentReqest: baseUrl + "/appointment/", // post
    statusChange: baseUrl + "/appointment/statusChange", // post
    todayAppointment: baseUrl + "/appointment/today", // post
  },
  Admin: {
    fetchPatientList: baseUrl + "/admin/fetch/patient", // get
    fetchDoctorList: baseUrl + "/admin/fetch/doctor", // get
  },
};
