import getData from './FetchOrder'
   export default async function fetchData() {
      try {
        const responseData = await getData();
        
        return responseData
      } catch (error) {
        // Handle error
        console.error(error);
      }
   
    }