import React, { useEffect, useState } from 'react'
import { View,Text,StyleSheet,TextInput } from 'react-native'
import Axios from 'axios';
import {Button} from 'native-base';
import User from './User';
import Snackbar from 'react-native-snackbar'
const App = ()=>{

  const [details, setDetails] = useState(null)
  const [gitUser, setGitUser] = useState('')

  const fetchDetails = async ()=>{
    try {
      const {data} = await Axios.get(`https://api.github.com/users/${gitUser}`)
      
      const details = data
      setDetails(details)
    } catch (error) {
      console.log(error)
      Snackbar.show({
        text:'Fetching Error',
        textColor:'white',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor:'red'
      })
      
    }

    setGitUser('')
  }

  const fetchDefaultDetails = async ()=>{
    
    try {
      const initialData = await Axios.get('https://api.github.com/users/google')
      const details = initialData
      console.log(details)
      setDetails(details.data)
    } catch (error) {
      console.log(error)
      Snackbar.show({
        text:'Fetching Error',
        textColor:'white',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor:'red'
      })

      
    }
  }

  

  useEffect(() => {
    fetchDefaultDetails()
  }, [])

  if(!details){
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  } else {

    return (
      <View style={styles.container}>
        <Text style={{color:'white',fontSize:30,marginBottom:55,fontWeight:'bold',marginTop:-40}}>Find GitHub User Details</Text>
        <View>
          <User details={details}  />
          <TextInput 
          style={{marginTop:10,marginBottom:-15,backgroundColor:'yellow',borderRadius:999,paddingLeft:10}}
          
          
          placeholder="Enter GitHub Username" 
          value={gitUser}
          onChangeText={text => setGitUser(text)}
          />
          <Button
          rounded
          block
          style={styles.button}
          onPress={()=> fetchDetails()}
          >
            <Text>Fetch User Details</Text>
          </Button>
          

        </View>
        
      </View>
    )
  }

}


export default App;

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    backgroundColor:'#222831'
  },
  button:{
    marginTop:30,
    paddingHorizontal:30
  }

})