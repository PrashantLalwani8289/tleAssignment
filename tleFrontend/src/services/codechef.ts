import axios from "axios";
import ApiResponse from "../resources/entity/IApiResponse";
import endpoints from "../constants/endpoints";

export const GetCodechefContests = async (): Promise<ApiResponse> => {
    const { data } = await axios.get(
      `${endpoints.Contests.CODECHEF_CONTEST}`
    );
    console.log(data);
    return data;
  };