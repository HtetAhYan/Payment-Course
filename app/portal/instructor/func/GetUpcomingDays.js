export default function getUpcomingWeekdayDates(weekdayNumbers, numberOfDates) {
  const today = new Date();
  const upcomingDates = [];
  const daysPerWeek = 7; // Number of days in a week

  while (upcomingDates.length < numberOfDates) {
    // Find the difference between the desired weekday and the current weekday
    let daysToAdd = weekdayNumbers[0] - today.getDay();

    if (daysToAdd <= 0) {
      daysToAdd += daysPerWeek; // Add a week if the desired weekday has already passed this week
    }

    today.setDate(today.getDate() + daysToAdd);

    upcomingDates.push(new Date(today)); // Add the upcoming date to the array

    // Move to the next desired weekday for the next iteration
    weekdayNumbers.push(weekdayNumbers.shift());
  }

  return upcomingDates;
}
