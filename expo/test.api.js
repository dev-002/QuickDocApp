const baseUrl = "http://192.168.1.35:5000/api/v1";

const routes = {
  Auth: {
    register: baseUrl + "/auth/register",
    login: baseUrl + "/auth/login",
  },
};

export default routes;
