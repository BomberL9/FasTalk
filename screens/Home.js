import React, { Component } from 'react';
import { 
  View, 
  SafeAreaView, 
  Text, 
  TextInput, 
  Image, 
  ImageBackground, 
  Alert, 
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
  StyleSheet,
  FlatList,
  Pressable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, where, query, getDocs } from 'firebase/firestore';
import { db } from '../config';

const background = require('../assets/background.png');

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      userResults: [],
      searchText: "",
      selectedUser: null,
      error: false
    };
  }

  findUsername = async(searchText) => {
    searchText = searchText.trim();
    
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username","==",searchText));
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => doc.data());
    if(users.length > 0){
      this.setState({userResults: users, error: false});
    }else{
      this.setState({userResults: [], error: true});
    }
  }
  
  handleUserSelection = () => {
    const user = this.state.userResults[0];
    if(user === null || user === undefined){
      Alert.alert("Falha ao conectar com o usuário");
    }else{
      console.log("Dados do usuário encontrado:", user);
      this.props.navigation.navigate("Chat", {selectedUser: user});
    }
  }

  renderItem = ({item, i}) => {
    if(this.state.error){
      return(
        <View>
          <Ionicons name="sad" size={40}/>
          <Text style={styles.errorText}>
            Não encontramos ninguém com esse nome de usuário. Verifique se você escreveu corretamente.
          </Text>
        </View>
      );
    }else{
      return(
        <TouchableOpacity onPress={() => {this.handleUserSelection(item)}} style={styles.listItem}>
          <Ionicons name="person-add" size={24} style={{left: 10}}/>
          <Text style={styles.listItemText}>{item.username}</Text>
        </TouchableOpacity>
      ); 
    }
  }

  render() {
    const { searchText, userResults } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaView}/>
        <ImageBackground source={background} style={styles.background}>
          <View style={styles.header}>
            <Text style={styles.title}>FasTalk</Text>
            <TouchableOpacity>
              <Ionicons name="person-circle-outline" size={50}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Suas FasTalks</Text>
          {/*aqui vai entrar a lista dos contatos adicionados*/}
          <View style={styles.textInputWrapper}>
            <TextInput
            placeholder="Procure por um usuário"
            placeholderTextColor={'#5C5C5C'}
            style={styles.textInput}
            onChangeText={text => this.setState({searchText: text})}
            onSubmitEditing={() => this.findUsername(searchText)}
            />
            <Pressable onPress={() => this.findUsername(searchText)}>
            <Ionicons name="search-outline" size={32} color={'#5C5C5C'} style={styles.searchIcon}/>
            </Pressable>
          </View>
          <FlatList 
          data={userResults} 
          renderItem={this.renderItem} 
          keyExtractor={(item) => (item && item.id) ? item.id.toString() : Math.random().toString()}
          />
          {/*mensagem de erro exibida quando um nome de usuário inexistente é inserido na caixa de texto*/}
          <View style={{display: this.state.error ? 'flex' : 'none', ...styles.errorBlock}}>
            <Ionicons name="sad" size={40}/>
            <Text style={styles.errorText}>Não encontramos ninguém com esse nome de usuário.</Text>
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
  safeAreaView:{
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
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
    justifyContent: 'space-between',
    padding: 15
  },
  title:{
    fontFamily: 'Font',
    fontSize: 32,
    fontWeight: '300',
    left: 30,
  },
  subtitle:{
    fontFamily: 'Font',
    fontSize: 24,
    marginTop: 20,
    left: 20
  },
  textInputWrapper:{
    backgroundColor: '#A7D3FC',
    padding: 20,
    marginLeft: 20,
    marginTop: 30,
    right: 10,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInput:{
    fontFamily: 'Font',
    fontSize: 15,
    width: Dimensions.get('window').width/2
  },
  listItem:{
    backgroundColor: '#fff',
    borderTopColor: '#5C5C5C',
    borderBottomColor: '#5C5C5C',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 20,
    flexDirection: 'row',
    padding: 20
  },
  listItemText:{
    fontFamily: 'Font',
    fontSize: 16,
    left: 30,
  },
  errorBlock:{
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: Dimensions.get('window').height/3 + 50
  },
  errorText:{
    fontFamily: 'Font',
    fontSize: 20,
    textAlign: 'center'
  },
  searchIcon:{
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#5C5C5C',
    padding: 2
  }
})