 export const handleHourChange = (day, hour,setCustomHours) => {
    setCustomHours((prevCustomHours) => ({
      ...prevCustomHours,
      [day]: [...(prevCustomHours[day] || []), hour], // Add new hour to the array
    }));
  };