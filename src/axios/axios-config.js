import Axios from 'axios'

const instance = () =>{

    console.log(window.location.origin)

    var portNumber = String(window.location.origin).split(':')[2] // 3000
    var serverPort = '5000'
    const instances = Axios.create({
        
        baseURL: String(window.location.origin).replace(portNumber,serverPort).replace('https','http'),
        timeout: 5000,
        withCredentials:true,
        
       
      });


      return instances

}



export default instance