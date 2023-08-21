import getUpcomingWeekdayDates from './GetUpcomingDays'
export const generateTimestamps = async (daysSelected, setTimestamps, customHours) => {
  const generatedTimestamps = [];

  for (const selectedDay of daysSelected) {
    const upcomingDates = getUpcomingWeekdayDates([selectedDay], 12);
    
    for (const upcomingDate of upcomingDates) {
      const selectedDate = new Date(upcomingDate);

      customHours[selectedDay]?.forEach((hour) => {
        const [hourValue, minuteValue] = hour.split(':');
        selectedDate.setHours(Number(hourValue));
        selectedDate.setMinutes(Number(minuteValue));

        const timestamp = Math.floor(selectedDate.getTime() / 1000);
        generatedTimestamps.push(timestamp);
      });
    }
  }

  setTimestamps(generatedTimestamps);
};
