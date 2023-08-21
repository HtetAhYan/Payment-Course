import getData from "./getWebinarData";

   export default async function fetchData(url) {
      try {
        const responseData = await getData(url);
        
        return responseData
      } catch (error) {
        // Handle error
        console.error(error);
      }
   
    }