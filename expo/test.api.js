const ip = "192.168.1.35";
const baseUrl = `http://${ip}:5000/api/v1`;

export default {
  Auth: {
    register: baseUrl + "/auth/register",
    login: baseUrl + "/auth/login",
  },
  Profile: {
    getProfile: baseUrl + "/patient/profile", //get, put
    getAppointments: baseUrl + "/patient/appointments", //get
    getSpecificScpecialization: baseUrl + "/patient/specific", //get
    cancelApp: baseUrl + "/patient/cancelapp",
  },
  Doctor: {
    getDoctors: baseUrl + "/doctor/list", // get
    getSpecialization: baseUrl + "/doctor/specialization", // get
    fetchPatient: baseUrl + "/doctor/fetchPaitent", // post
    fetchAppointmentDate: baseUrl + "/doctor/appointment", //get
    fetchList: baseUrl + "/doctor/fetch/list", // get,
    applyLeave: baseUrl + "/doctor/leave", // post
    updateProfile: baseUrl + "/doctor/profile", // put, get
  },
  Appointment: {
    appointmentReqest: baseUrl + "/appointment/", // post
    statusChange: baseUrl + "/appointment/statusChange", // post
    todayAppointment: baseUrl + "/appointment/today", // get
  },
  Admin: {
    fetchAnalytic: baseUrl + "/admin/anayltic", //get
    fetchPatientList: baseUrl + "/admin/fetch/patient", // get
    doctorSignup: baseUrl + "/admin/add/doctor", //post
    fetchDoctorList: baseUrl + "/admin/fetch/doctor", // get
    fetchAppointmentList: baseUrl + "/admin/fetch/appointments", // get
  },
};
