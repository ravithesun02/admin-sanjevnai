import React ,{Component} from 'react';
import Toast from 'react-bootstrap/Toast';
import './login.css';
var userName = null ,password = null;
class Login extends Component{
    constructor(props)
    {
        super(props);
        this.state={
          showTost:false,
        }
    }
  
    user(e){
      userName = e.target.value
      //console.log(userName)
    }
    password(e){
      password = e.target.value
      //console.log(password)
    }
    handleSubmit(){
      //alert(JSON.stringify(userName))
      if( userName===null || userName===""){
       // this.state.showTost=true
       return( 
         <div>
          <Toast >
              <Toast.Header>
                <strong>ENTER USER_NAME</strong>
              </Toast.Header>
          </Toast>
          </div>
        );
      }
    }
    render()
    {
        return(
            <div class='box'>
  <div class='box-form'>
    <div class='box-login-tab'></div>
    <div class='box-login-title'>
      <div class='i i-login'></div>
      <h2>LOGIN</h2>
    </div>
    <div class='box-login'>
      <div class='fieldset-body' id='login_form'>
        <p class='field'>
          <label for='user'>USER_NAME</label>
          <input type='text' id='user' name='user' title='Username' onChange={this.user} />
          <span id='valida' class='i i-warning'></span>
        </p>
        <p class='field'>
          <label for='pass'>PASSWORD</label>
          <input type='password' id='pass' name='pass' title='Password' onChange={this.password} />
          <span id='valida' class='i i-close'></span>
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