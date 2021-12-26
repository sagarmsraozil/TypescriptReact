import axios from 'axios';

import * as TYPES from 'types/type';
import * as helper from 'utils/helper';
import * as API_END_POINTS from 'constants/endPoints';

export const getAPIData = async (
  apiDetails = {
    method: 'GET',
    endPoint: '',
    data: {},
    queryParams: {},
    requiresAuth: false,
    additionalHeaders: {},
  } as TYPES.AxiosType
): Promise<object | undefined | null> => {
  try {
    const apiInfos = Object.assign({}, apiDetails);

    const baseURL = API_END_POINTS.baseURL;
    let headers = Object.assign(apiInfos.additionalHeaders, { 'Content-Type': 'application/json' });

    if (apiInfos.requiresAuth) {
      headers = Object.assign(headers, { Authorization: `Bearer ${helper.getUserToken() ?? ''}` });
    }

    // Axios part
    const response = await axios({
      method: apiInfos.method,
      baseURL: baseURL,
      url: apiInfos.endPoint,
      data: apiInfos.data,
      params: apiInfos.queryParams,
      headers: headers,
      timeout: 3000,
    });

    return response.data;
  } catch (err) {
    return null;
  }
};
