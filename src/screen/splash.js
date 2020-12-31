import React, {Component} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import GlobalStyle from "../style/globalStyle";

class Splash extends Component {            
  
    render() {
        return (
            <View style={GlobalStyle.fill}>                
                <View style={styles.positionTextCenter}>                    
                    <Text style={styles.textCenter}>Search Github Users </Text>
                </View>
            </View>
        );
    }
}

export default Splash

const styles = StyleSheet.create({    
    textCenter:{
        textAlign :'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: GlobalStyle.black,
    },
    positionTextCenter:{
        justifyContent: 'center',
        height: '100%'
    },
    image: {
        width: 70,
        height: 70,
        alignSelf: 'center'
    },
});