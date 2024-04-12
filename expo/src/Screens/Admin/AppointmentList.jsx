// AppointmentList.js

import React from 'react';
import { View, Text } from 'react-native';

const AppointmentList = () => {
  // Fetch appointments from your backend (e.g., Firebase, Express.js, MongoDB)
  const appointments = [
    { id: 1, patientName: 'John Doe', time: '10:00 AM' },
    { id: 2, patientName: 'Jane Smith', time: '11:30 AM' },
    // ...more appointments
  ];

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Appointments
      </Text>
      {appointments.map((appointment) => (
        <View key={appointment.id}>
          <Text>Patient: {appointment.patientName}</Text>
          <Text>Time: {appointment.time}</Text>
        </View>
      ))}
      <Text>Total Appointments: {appointments.length}</Text>
    </View>
  );
};

export default AppointmentList;
