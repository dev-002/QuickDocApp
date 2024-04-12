import React from 'react';
import { View, Text, Button } from 'react-native';

const AdminDashboard = ({ navigation }) => {
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Admin Dashboard
      </Text>
      <Button
        title="Add Doctor"
        onPress={() => navigation.navigate('DoctorForm')}
      />
      <Button
        title="View Appointments"
        onPress={() => navigation.navigate('AppointmentList')}
      />
    </View>
  );
};

export default AdminDashboard;
