const ip = "192.168.0.157";
const baseUrl = `http://${ip}:5000/api/v1`;

export default {
  Auth: {
    register: baseUrl + "/auth/register",
    login: baseUrl + "/auth/login",
  },
  Profile: {
    getProfile: baseUrl + "/profile/profile",
    getAppointments: baseUrl +'/profile/appointments', //post
  },
  Doctor: {
    getDoctors: baseUrl + "/doctor/list", // get
    getSpecialization: baseUrl + "/doctor/specialization", // get
    fetchPatient: baseUrl+ '/doctor/fetchPaitent', //post
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
