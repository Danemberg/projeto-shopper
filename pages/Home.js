import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const Home = ({ navigation }) => {
    const handleLoginSelect = (userLogin) => {
      navigation.navigate('login', { userLogin });
    };


    return (
        <View style={styles.container}>
            <View>
                <View style={styles.title}>
                  <Text style={styles.text_title}>Shopper</Text>
                </View>
                <View style={styles.imageArea}>

                </View>
                <View style={styles.buttonArea}>
                  <TouchableOpacity  style={styles.button} onPress={() => handleLoginSelect('Iniciar')}>
                      <Text style={styles.buttonText}>Iniciar Sessão</Text>
                  </TouchableOpacity>
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
        imageArea:{
          flex: 1

        },
        buttonArea:{
          marginBottom: 50,
          backgroundColor: "#00FFFF",
          borderRadius: 30
        },
        button: {
          alignItems: "center",
          padding: 10

        },
        buttonText:{
          fontSize: 24,
          color: "#182F4B",
          fontWeight: "bold",
          fontFamily: "sans-serif-condensed"
          
        },
        title:{
          marginTop: 40,
          alignItems: "center"
    
        },
        text_title:{
          color:"#FFFFFF",
          fontSize: 42,
          fontWeight: "bold",
          fontFamily: "sans-serif-condensed"

        }
      });
      
export default Home ;