import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const Home = ({ navigation }) => {
    const handleLoginSelect = (userLogin) => {
      navigation.navigate('login', { userLogin });
    };


    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity  style={styles.button} onPress={() => handleLoginSelect('Iniciar')}>
                    <Text style={styles.buttonText}>Iniciar Sessão</Text>
                </TouchableOpacity>
            </View>
        </View>
    
      );
    };


    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#182F4B',
          alignItems: 'center',
          padding: 16
        },
        button: {
          marginTop: 500,
          alignItems: "center",

        },
        buttonText:{
          fontSize: 24,
          color: "#1E1E1E",
          fontWeight: "bold"

        }
      });
      
export default Home ;