import React from 'react';
import './SignIn.css';
class SignIn extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           typedEmail: '',
           typedPassword: '',
           errorMessage: ''
       }
   }

   onEmailChange = (event) => {
       this.setState({ typedEmail: event.target.value });
   }

   onPasswordChange = (event) => {
    this.setState({ typedPassword: event.target.value });
 }

 onSubmitClicked = () => {
     fetch('https://safe-springs-72553.herokuapp.com/signin', {
     method:'post',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({
         email: this.state.typedEmail,
         password: this.state.typedPassword
     })
     }).then(respose => respose.json())
     .then(user => {
          if(user.id) {
          this.props.loaduser(user);
          this.props.onRouterChange('home')
          } else {
           this.setState({errorMessage: user})
          }
     })
 }
//    onRouterChange = (event) => {
//        this.setState({typedPassword: event.target.value});
//    }
    render() {
    const { onRouterChange } = this.props;
    return(
        <article className='card shadow'>
            <div className='formTag'>
                <legend>Sign In</legend>
                    <div className='user'>
                     <label>Email</label>
                     <input onChange = {this.onEmailChange} type='email'></input>
                    </div>
                    <div className='password'>
                     <label>Password</label>
                     <input onChange = {this.onPasswordChange} type='password'></input>
                    </div>
            </div>
            <div className='submitBtn'>
                <input type='submit' onClick= {this.onSubmitClicked} value='Sign-in'></input>
            </div>
            <div className='signUp'>
                <p onClick= {() => {onRouterChange('register')}}>Register?</p>
            </div>
            {this.state.errorMessage.length > 0 ? <div className='errorDiv'>
               <span>{this.state.errorMessage}</span>
            </div> : <div></div> }
        </article>
    );
    
}
}
 
export default SignIn;