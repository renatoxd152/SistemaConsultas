import { AxiosResponse } from "axios";
import { httpClient } from "../htpp";
import { DashboardData } from "../models/dashboard";

const resourceURL:string = "/api/dashboard"

export const useDashboardService = () =>
{
    return{
        get:async():Promise<DashboardData>=>
        {
            const response: AxiosResponse<DashboardData> = await httpClient.get(resourceURL);
            return response.data;
        }
    }
}