// const URL = "http://13.127.131.122/api/v1"
const URL = "http://127.0.0.1:3000/api/v1";

export default {
  User: {
    SIGNUP: `${URL}/user/signup`,
    LOGIN: `${URL}/user/login`,
  },

  Contests: {
    CODEFORCES_CONTEST: `${URL}/codeforces/get-codeforces-contests`,
    GET_PCD_LINKS:`${URL}/codeforces/get-pcd-links`,
    LEETCODE_CONTEST: `${URL}/leetcode/get-leetcode-contests`,
    CODECHEF_CONTEST: `${URL}/codechef/get-codechef-contests`,
  },
} as const;
