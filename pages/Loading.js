import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Image} from 'react-native';


const Loading = ({ navigation }) => {
    const handleLoginSelect = (userLogin) => {
      navigation.navigate('login', { userLogin });
    };


    return (
        <View style={styles.container}>
            <View>
                <View style={styles.title}>
                  <Text style={styles.text_title}>Shopper</Text>
                </View>
                <View style={styles.column_logo}>
                  <Image source ={require('../assets/logo.png')} style={styles.logo}/> 
                </View>
            </View>
        </View>
    
      );
    };


    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#182F4B",
          alignItems: "center"
        },
        title:{
          marginTop: 40,
          alignItems: "center",
          padding: 10,
          transform: [{ translateY: 5 }, { rotate: '-5deg' }], // Altera a posição e a rotação
        },
        text_title:{
          color:"#FFFFFF",
          fontSize: 52,
          fontWeight: "bold",
          fontFamily: "sans-serif-condensed" 
        },
        column_logo: {
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 50
        },
        logo:{
          width: 200,
          height:200
          
        }
      });
      
export default Loading ;