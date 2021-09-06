import './App.css';
import Login from './components/admin/login/Login';
import MainComponent from './components/admin/MainComponent';
import instance from './axios/axios-config';
import { useState, useEffect } from 'react';
import ReactNotification from 'react-notifications-component'

function App() {
  const [authentication, setAuthentication] = useState([]);
  const [type, setType] = useState([]);
  //const login = true;

  useEffect(() => {
    instance().post('/auth/isauth').then((response)=>{
      setAuthentication(response.data.isAuth)
      setType(response.data.authType)
    }).catch((err)=>{
      console.log(err)
    })
    
  },[]);

  return (
    <div className="App">
          <ReactNotification />
        {((authentication && type===0) &&<MainComponent/>) || (!(authentication || type===0) && <Login/> ) }
      
    </div>
  );
}

export default App; 




/**import './App.css';
import MainComponent from './components/admin/MainComponent';
import Login from './components/admin/login/Login';
import React from 'react';
import instance from './axios/axios-config'


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      authentication: [],
      type:[]
    }
  }

  componentDidMount() {
    instance().post('/auth/isauth').then((response)=>{
      this.setState({ authentication: response.data.isAuth,type:response.data.authType});
      //alert(this.state.authentication)
 
  }).catch((err)=>{
    console.log(err)
  
  })
    console.log(this.state.type) //returns [];
  }


  render(){

    //console.log(String(window.location.origin).replace('3000','5000'))

    return (
      <div className="App">
          
          {((this.state.authentication && this.state.type===0) &&<MainComponent/>) || (!(this.state.authentication || this.state.type===0) && <Login/> )}
          
      </div>
    );
  

  }
  }

export default App; */









