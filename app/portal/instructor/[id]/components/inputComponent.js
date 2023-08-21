import React, { useState, useMemo } from 'react';
import { Stack, TextField, Container, Button, Grid } from '@mui/material';
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form'; // Added imports
import { generateTimestamps } from '../../func/GenerateTimeStamp';
import { essentials } from './Essentials';
import { handleHourChange } from '../../func/HandleHourChange';
import { handleDeleteHour } from '../../func/DeleteHour';
import {PostSession} from '../request/PostSession'
const WeekDayChipSelector = dynamic(() => import('./WeekDayChip'), { loading: () => <p>loading...</p> });

function InputComponent({url}) {
  const [daysSelected, setDaysSelected] = useState([]);
  const [customHours, setCustomHours] = useState({});
  const [timestamps, setTimestamps] = useState([]);

  const customHoursMapping = useMemo(() => {
    const mapping = {};
    daysSelected.forEach((selectedDay) => {
      mapping[selectedDay] = customHours[selectedDay] || [];
    });
    return mapping;
  }, [daysSelected, customHours]);

  const { handleSubmit, control, formState } = useForm(); // Initialize react-hook-form
  const { isSubmitting } = formState;

  const handleHourInputChange = (selectedDay, value) => {
    handleHourChange(selectedDay, value, setCustomHours);
  };

  

  return (
    <Container className="w-full flex justify-center">
      <form onSubmit={handleSubmit((data) => PostSession(data,timestamps,url))}>
        <Stack spacing={2} className="">
          {essentials.map((essen) => (
            <Controller
              key={essen.label}
              name={essen.value}
              control={control}
              rules={{ required: true }} // Add validation rule
              render={({ field }) => (
                <TextField
                  {...field}
                  label={essen.label}
                  type={essen.type}
                  variant='filled'
                  error={Boolean(formState.errors[essen.value])} // Show error state
                  helperText={formState.errors[essen.value]?.type === 'required' && 'Field is required'}
                />
              )}
            />
          ))}
          <WeekDayChipSelector daysSelected={daysSelected} setDaysSelected={setDaysSelected} />
          <div className='flex'>
            {daysSelected.map((selectedDay) => (
              <Grid item md={2} key={selectedDay} className='mx-2'>
                <p>hours for {selectedDay}</p>
                <input
                  type="time"
                  value=""
                  onChange={(e) => handleHourInputChange(selectedDay, e.target.value)}
                />
                {customHoursMapping[selectedDay] &&
                  customHoursMapping[selectedDay].map((hour, index) => (
                    <div key={index}>
                      {hour}
                      <Button onClick={() => handleDeleteHour(selectedDay, hour,setCustomHours)}>Delete</Button>
                    </div>
                  ))}
              </Grid>
            ))}
          </div>
          <Button
            variant="contained"
            color="primary"
            className="w-10"
            onClick={() => generateTimestamps(daysSelected, setTimestamps, customHours)}
          >
            Generate Timestamps
          </Button>
          <Button type="submit" disabled={!timestamps.length || isSubmitting} className='bg-primary' variant='contained' color='primary'> {/* Use type="submit" for the submit button */}
            Create
          </Button>
        </Stack>
      </form>
      <div>
        <p>Generated Timestamps:</p>
        {timestamps.map((timestamp, index) => (
          <div key={index}>{timestamp}</div>
        ))}
      </div>
    </Container>
  );
}

export default InputComponent;
