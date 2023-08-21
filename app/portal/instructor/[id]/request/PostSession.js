export const PostSession = async(data,timestamps,url) => {
   console.log(data);
      try {
  
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({data,timestamps}), // Include webinar_id and user_id in the request body
      headers: {
        'Content-Type': 'application/json',
        
      },
    });

    if (response.ok) {
      const res = await response.json(); // Parse the response data
      console.log('Data:', res);
    } else {
      console.error('Error fetching data');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}