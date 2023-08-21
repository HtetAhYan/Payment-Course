export const Reject = async (id, setLoad) => {
  setLoad(true);
console.log(id);
  try {
    const response = await fetch(`/api/admin/orders`, {
      method: 'DELETE',
      body: id,
    });

    if (response.ok) {
      const data = await response.json(); // Parse the response data
      console.log('Data:', data);
    } else {
      console.error('Error fetching data');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    setLoad(false); // Set load to false regardless of success or error
  }
};

export const Approve = async (row, setLoad) => {
  console.log(row);
  const user_id = row?.user_id;
const order_id = row?.id;
const webinar_id = row?.webinar_id.split(', ').map(idStr => parseInt(idStr));

  try {
  
    const response = await fetch(`/api/admin/orders/approve`, {
      method: 'POST',
      body: JSON.stringify({ user_id,webinar_id,order_id }), // Include webinar_id and user_id in the request body
      headers: {
        'Content-Type': 'application/json',
        
      },
    });

    if (response.ok) {
      const data = await response.json(); // Parse the response data
      console.log('Data:', data);
    } else {
      console.error('Error fetching data');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    setLoad(false); 
  }
};
