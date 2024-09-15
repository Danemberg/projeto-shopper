import React from 'react';
import { StyleSheet, Text, View } from 'react-native';



const Login = ({ navigation }) => {
    const handleLoginSelect = (userLogin) => {
      navigation.navigate('login', { userLogin });
    };

    
    return (
        
        <View>
        
    </View>
    
    );
  };


export default Login;