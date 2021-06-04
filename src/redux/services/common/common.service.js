import {httpService} from '../http.service'
import { apiEndPoints } from "../../../constant/commonDS"

export const commonService = {
    loadNavigation
};

function loadNavigation(data) {
    
    return httpService.httpGet(apiEndPoints.loadNavigation,data);
}

