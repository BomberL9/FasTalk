import React, { Component } from 'react';
import { 
  View, 
  SafeAreaView, 
  Text,
  TextInput,
  ImageBackground, 
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert, 
  KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc, Timestamp, query, where, getDocs, orderBy } from 'firebase/firestore';
import { auth, db } from '../config';

const background = require('../assets/background.png');

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: props.route.params.selectedUser,
      messageText: "",
      loggedUser: [],
      allMessages: []
    };
  }
  
  componentDidMount(){
    this.getLoggedUser();
  }

  getLoggedUser = async() => {
    //pega o email do usuário logado
    const loggedEmail = auth.currentUser.email;
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("user_email", "==", loggedEmail));
    try{
      const querySnapshot = await getDocs(q);
      if(!querySnapshot.empty){
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          this.setState({loggedUser: userData});
          console.log("Dados do usuário logado:", userData);
          this.getMessages();
        });
      }
    }catch(error){
      console.error("Erro ao buscar usuário:", error);
    }
    //pega o nome de usuário com os dados do usuário logado
  };

  handleSending = async() => {
    const { messageText, selectedUser, loggedUser } = this.state;
    const trimmedMessageText = messageText.trim();
    if(trimmedMessageText){
      await addDoc(collection(db, "messages"),{
        date: Timestamp.now().toDate(),
        sender: loggedUser.username,
        receiver: selectedUser.username,
        message: trimmedMessageText
      });
      this.setState({messageText: ""});
    }
  };

  getMessages = async() => {
    const { selectedUser, loggedUser } = this.state;
    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where('sender', '==', loggedUser.username),
      where('receiver', '==', selectedUser.username),
      orderBy('date', 'asc')
    );
  
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const messages = querySnapshot.docs.map(doc => doc.data().message);
      this.setState(prevState => ({
        allMessages: [...prevState.allMessages, ...messages],
      }));
    }
  };

  renderItem = ({item, i}) => {
    return(
      <View style={styles.message}>
        <Text style={{fontFamily: 'Font'}}>{item}</Text>
      </View>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <SafeAreaView style={styles.safeAreaView}/>
        <ImageBackground source={background} style={styles.background}>
          <View style={styles.header}>
            <Ionicons name="person-circle" size={50}/>
            <Text style={styles.username}>{this.state.selectedUser.username}</Text>
            <TouchableOpacity style={{alignSelf: 'center'}} onPress={()=>this.props.navigation.navigate("Home")}>
              <Ionicons name="chevron-back" size={40}/>
            </TouchableOpacity>
          </View>
          <View style={styles.chatView}>
            <FlatList
            data={this.state.allMessages}
            renderItem={this.renderItem}
            keyExtractor={(item) => (item && item.id) ? item.id.toString() : Math.random().toString()}
            />
          </View>
          <View style={styles.bottomBlock}>
            <TextInput
            placeholder="Digite sua mensagem"
            placeholderTextColor={'#C3C3C3'}
            style={styles.textInput}
            onChangeText={text => this.setState({messageText: text})}
            />
            <TouchableOpacity 
            onPress={() => {this.handleSending()}}>
              <Ionicons name="send" size={40} style={{left: 40}}/>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#007AFF'
  },
  safeAreaView:{
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  background:{
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  header:{
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  username:{
    fontFamily: 'Font',
    fontSize: 24,
    fontWeight: '300',
    alignSelf: 'center'
  },
  chatView:{
    height: Dimensions.get('window').height/1.3,
  },
  textInput:{
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    left: 20,
    width: Dimensions.get('window').width/1.4,
    padding: 15,
    borderRadius: 20,
    fontFamily: 'Font',
    color: '#C3C3C3',
    fontSize: 15
  },
  bottomBlock:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  message:{
    backgroundColor: '#fff',
    marginLeft: 20,
    marginTop: 30,
    padding: 20,
    alignSelf: 'flex-start',
    borderRadius: 20,
  }
})