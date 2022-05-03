import { apiGET } from "./api/apiAccessFunctions"

export const postService = {
  getPostDetails
}

async function getPostDetails(id) {
  try {
    console.log("call");
    const result = await apiGET("/posts/" + id);
    return result;
  } catch (err) {
    if(err.response) {
      return err.response.status;
    }
  }
}




