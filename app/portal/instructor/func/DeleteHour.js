  export const handleDeleteHour = (day, hourToDelete,setCustomHours) => {
    setCustomHours((prevCustomHours) => {
      const updatedHours = prevCustomHours[day].filter((hour) => hour !== hourToDelete);
      return {
        ...prevCustomHours,
        [day]: updatedHours,
      };
    });
  };