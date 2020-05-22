import React ,{Component} from 'react';
import {toast} from 'react-toastify';
import './login.css';
import {baseURL} from '../../reuse/baseURL';
import { Redirect } from 'react-router-dom';

var userName = '';
var passWord = '';
toast.configure();
class Login extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            loggedIn_DC:false
        }
    }
  

    componentDidMount()
    {
        if(localStorage.getItem('token') && localStorage.getItem('location'))
                this.setState({loggedIn_DC:true});
    }

    user(e){
      userName = e.target.value
      console.log(userName)
    }
    password(e){
      passWord = e.target.value;
      //console.log(password)
    }

    getLOginDone= async ()=>{
        let data={
            'username':userName,
            'password':passWord
        };
        let res=await fetch(baseURL+'/admin/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });

        if(res.ok)
        {
            let DATA=await res.json();

            console.log(DATA);

            localStorage.setItem('token',DATA.Token);

            if(DATA.admin_type==='DC')
            {
                let location={
                    'latitude':DATA.latitude,
                    "longitude":DATA.longitude
                }
                localStorage.setItem('location',JSON.stringify(location));
                toast.success('Signed In successfully!',{position:toast.POSITION.TOP_CENTER});
                this.setState({loggedIn_DC:true});
            }
                


        }

    }

    handleSubmit=()=>{
      //alert(JSON.stringify(userName))
      console.log(userName);
      userName=userName.trim();
      if(userName===""){
        toast.error('Username cannot be empty',{position:toast.POSITION.TOP_CENTER});
      }
      if(passWord==='')
      toast.error('Password must not be empty',{position:toast.POSITION.TOP_CENTER});

      if(userName!=='' && passWord!=='')
        this.getLOginDone();
    }




    render()
    {

        if(this.state.loggedIn_DC)
        {
            return <Redirect to="/admin"/>
        }

        else

        return(
            <div className='box'>
  <div className='box-form'>
    <div className='box-login-tab'></div>
    <div className='box-login-title'>
      <div className='i i-login'></div>
      <h2>LOGIN</h2>
    </div>
    <div className='box-login'>
      <div className='fieldset-body' id='login_form'>
        <p className='field'>
          <label htmlFor='user'>USER_NAME</label>
          <input type='text' id='user' name='user' title='Username' onChange={this.user} />
          <span id='valida' className='i i-warning'></span>
        </p>
        <p className='field'>
          <label htmlFor='pass'>PASSWORD</label>
          <input type='password' id='pass' name='pass' title='Password' onChange={this.password} />
          <span id='valida' className='i i-close'></span>
        </p>

        <input type='submit' id='do_login' value='GET STARTED' title='Get Started' onClick={this.handleSubmit} />
      </div>
    </div>
  </div>
</div>
        )
    }
}

export default Login;