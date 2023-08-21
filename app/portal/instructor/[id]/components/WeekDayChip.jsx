import React from 'react';
import { Box, Chip, Stack } from '@mui/material';

// Define the weekdays as an array of objects
const weekdays = [
  { label: 'Mon', value: 1 },
  { label: 'Tue', value: 2 },
  { label: 'Wed', value: 3 },
  { label: 'Thu', value: 4 },
  { label: 'Fri', value:5},
  { label: 'Sat', value: 6 },
  { label: 'Sun', value: 7 },
];

// Define a custom component that renders a weekday chip
const WeekdayChip = ({ day, selected, onSelect }) => {
  // Handle the click event on the chip
  const handleClick = () => {
    // Call the onSelect prop with the day value
    onSelect(day.value);
  };

  return (
    // Render a chip component with the day label and selected state
    <Chip
      label={day.label}
      variant="outlined"
      color={selected ? 'primary' : 'secondary'}
      clickable
      selected={selected}
      onClick={handleClick}
    />
  );
};

// Define a custom component that renders a weekday chip selector
const WeekdayChipSelector = ({daysSelected,setDaysSelected}) => {
  // Use React state to store the selected days as an array of values
  const [selectedDays, setSelectedDays] = React.useState([]);

  // Define a function that toggles the selection of a day
  const toggleDay = (day) => {
    // Check if the day is already selected
      const isSelected = selectedDays.includes(day);
       

    // If yes, remove it from the selected days array
    if (isSelected) {
        setSelectedDays((prev) => prev.filter((d) => d !== day));
     setDaysSelected((prev) => prev.filter((d) => d !== day));
    }
    // If no, add it to the selected days array
    else {
        setSelectedDays((prev) => [...prev, day]);
         setDaysSelected((prev) => [...prev, day]);
    }
  };

  return (
    // Render a box component with some padding and margin
    <Box p={2} m={2}>
      {/* Render a stack component with some spacing and alignment */}
      <Stack spacing={1} direction="row" justifyContent="center">
        {/* Map over the weekdays array and render a weekday chip for each item */}
        {weekdays.map((day) => (
          <WeekdayChip
            key={day.value}
            day={day}
            // Check if the day is selected using the selected days state
            selected={selectedDays.includes(day.value)}
            // Pass the toggle day function as the onSelect prop
            onSelect={toggleDay}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default WeekdayChipSelector;
