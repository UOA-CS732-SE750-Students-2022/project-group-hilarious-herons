import { apiGET, apiPOST, apiPUT, apiDELETE} from './api/apiAccessFunctions'

export const getUser = async (userID) => {
    return await apiGET('/users/' + userID)
}

export const createUser = async(newUser) => {
    return await apiPOST('/users/', newUser)
}