import React, { Component } from 'react';
import { 
    View, 
    SafeAreaView, 
    Text, 
    TextInput, 
    Alert, 
    StyleSheet, 
    Image, 
    ImageBackground, 
    TouchableOpacity,
    Platform,
    StatusBar,
    Dimensions 
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config';

const background = require('../assets/background.png');
const logo = require('../assets/logo.png');

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
          email: "",
          password: ""
        };
    }

    handleLogin = () => {
        const { email, password } = this.state;

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          this.props.navigation.navigate("Home");
        })
        .catch(err => {
          console.log(err.message);
        });
    };

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}/>
                <ImageBackground source={background} style={styles.background}>
                    <View style={styles.upperContainer}>
                      <Image source={logo} style={styles.logo}/>
                      <Text style={styles.title}>FasTalk</Text>
                    </View>
                    <View style={styles.lowerContainer}>
                      <TextInput
                      style={styles.textInput}
                      placeholder='Insira seu endereço de email'
                      placeholderTextColor='#5C5C5C'
                      inputMode='email'
                      onChangeText={text => this.setState({email: text})}
                      autoFocus
                      />
                      <TextInput
                      style={styles.textInput}
                      placeholder='Insira sua senha'
                      placeholderTextColor='#5C5C5C'
                      onChangeText={text => this.setState({password: text})}
                      secureTextEntry
                      />
                      <View style={styles.signUpBlock}>
                        <Text style={{color: '#5C5C5C', ...styles.signUpText}}>Não tem uma conta?</Text>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate("SignUp")}>
                            <Text style={{color: '#2576C1', ...styles.signUpText}}> Registrar</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity 
                      style={styles.signInButton} 
                      onPress={() => this.handleLogin()}>
                            <Text style={styles.signInText}>Entrar</Text>
                      </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#007AFF'
    },
    safeArea:{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    background:{
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    upperContainer:{
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    lowerContainer:{
        flex: 0.5,
    },
    logo:{
      width: 100,
      height: 100,
      flex: 0.3,
      marginTop: 20
    },
    title:{
      fontFamily: 'Font',
      fontSize: 40,
      fontWeight: 300,
      flex: 0.2
    },
    textInput:{
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#727272',
        padding: 10,
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 30,
        fontSize: 15,
        fontFamily: 'Font'
    },
    signUpBlock:{
        flexDirection: 'row',
        alignSelf: 'center'
    },
    signUpText:{
        textAlign: 'center',
        fontFamily: 'Font',
        fontSize: 15
    },
    signInButton:{
        marginTop: 40,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#727272',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 50
    },
    signInText:{
        fontFamily: 'Font',
        fontSize: 20,
        textAlign: 'center',
        color: '#5C5C5C'
    }
})