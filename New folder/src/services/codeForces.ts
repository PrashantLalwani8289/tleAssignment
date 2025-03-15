import axios from "axios";
import ApiResponse from "../resources/entity/IApiResponse";
import endpoints from "../constants/endpoints";

export const GetCodeforcesContests = async (): Promise<ApiResponse> => {
    const { data } = await axios.get(
      `${endpoints.Contests.CODEFORCES_CONTEST}`
    );
    console.log(data);
    return data;
  };


  export const GetPcdLinks = async (): Promise<ApiResponse> => {
    const { data } = await axios.get(
      `${endpoints.Contests.GET_PCD_LINKS}`
    );
    console.log(data);
    return data;
  };