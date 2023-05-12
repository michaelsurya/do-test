import axios from "axios";

const resolver = {
  Query: {
    // Only for dev
    getToken: async (_: any, { email, password }: any, __: any) => {
      const response = await axios.post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );

      return response?.data?.idToken
    },
  },
};

export default resolver;
