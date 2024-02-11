import { StyleSheet, Text, View } from 'react-native';


export default function App() {     
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shopper</Text>
    </View>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: '#182F4B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: '#B7EFEC',
    fontSize: 48,
    fontFamily: 'sans-serif-medium',
    flex: 1,
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
