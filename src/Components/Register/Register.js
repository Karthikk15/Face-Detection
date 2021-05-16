import React from 'react';
import './Register.css';
class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            isRegisterFailed: false 
        }
    }

    onSubmitClicked = () => {
        fetch('https://safe-springs-72553.herokuapp.com/register', {
        method:'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
        })
        }).then(respose => respose.json())
        .then(data => {
             if(data.id) {
             this.props.onRouterChange('signin');
             } else {
              this.setState({isRegisterFailed: true})
             }
        })
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }
 
    onPasswordChange = (event) => {
     this.setState({ password: event.target.value });
  }

    render() {
    return(
        <article className='card shadow'>
            <div className='formTag'>
                <legend>Register</legend>
                    <div className='user'>
                        <label>User Name </label>
                        <input onChange ={this.onNameChange} type='text'></input>
                    </div>
                    <div className='Email'>
                        <label>Email</label>
                        <input onChange ={this.onEmailChange} type='email'></input>
                    </div>
                    <div className='password'>
                        <label>Password</label>
                        <input onChange ={this.onPasswordChange} type='password'></input>
                    </div>
            </div>
            <div className='submitBtn'>
                <input type='submit' onClick= {this.onSubmitClicked} value='Register'></input>
            </div>
          {this.state.isRegisterFailed && 
           <span style={{display:'inline-block', marginTop:'15px',color:'yellow'}}>Registration failed !</span>
           }
        </article>
    );
}
}

export default Register;