

import { Button, Typography } from "@mui/material";


import { TextField } from "@mui/material";
import { Divider } from "@mui/material";


import {User,authErrorCodeToUser} from "./firebase";

import GoogleIcon from '@mui/icons-material/Google';
import { Alert } from "@mui/material";


import React from "react";


const requiredValidator = (e) => {
    return e.trim().length >= 1 ? '' : " is required"
}


const email_pattern = mail => 
{
    // eslint-disable-next-line
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return ''
  }
   return ' is not valid'
}

const minLengthValidator = (length) => {
    return e => {
        return e.length >= length ? '' : ' should have at least '+length+' characters'
    }
}

const passwordValidator=  e => {
    const letters = e.split("");
    const isHaveANumeric  = letters.filter(x => x.toLowerCase() === x.toUpperCase()).length >= 1;
    const isHaveLetters = letters.filter(x => x.toLowerCase() !== x.toUpperCase()).length >= 1;
    const isHaveASymbol = letters.filter(x => x.toLowerCase() === x.toUpperCase() && isNaN(x)).length >= 1;
    const isMinLength = letters.length >= 8;

    if(!isMinLength){
        return " Should have 8 characters or more"
    }else if(!isHaveANumeric){
        return " Should have a numeric character"
    }else if(!isHaveLetters){
        return " Should have letters"
    }else if(!isHaveASymbol){
        return " Should have a symbol"
    }
    return ""
}


export class SignIn extends React.Component{


    signWithGoogleProvider(){
        User.signInWithGoogle().then(e => {
            this.closePanel()
        }).catch(e => {
            console.log(e)
        })
    }


    signInWithEmailAndPassword(e){
        e.preventDefault();
        this.setState(x  => {
            x.requests.signIn.isPending = true
            return x;
        })
        const signInForm = this.state.forms.user_sign_in;
        const email = signInForm.email.val;
        const password = signInForm.password.val;

        

        User.signInWithEmailAndPassword(email,password).then(e => {
            

            setTimeout(() => {
                this.closePanel()
            },200)
            
            this.setState(x  => {
                x.requests.signIn.isPending = false
                setTimeout(() => 
                {
                this.setState(x  => {
                    x.requests.signIn.isPending = false
                    return x;
                })},0)

                return x;
            })
        }).catch(e => {
            const alertMessage = authErrorCodeToUser(e.code)
            this.setState(x => {
                x.formLevelErrors.sign_in.isAnError =true;
                x.formLevelErrors.sign_in.error = alertMessage;
                setTimeout(() => 
                {
                this.setState(x  => {
                    x.requests.signIn.isPending = false
                    return x;
                })},0)
                setTimeout(() => {
                    this.eraseUserEmailPasswordError()
                    
                }, 1500);
                return x;
            })
        });
    }


    eraseUserEmailPasswordError(){
        this.setState(x => {
            x.formLevelErrors.sign_in.isAnError =false;
            x.formLevelErrors.sign_in.error = '';
            return x;
        })
    }

    signUpWithEmailAndPassword(){
        const signUpForm = this.state.forms.user_sign_up;
        const email = signUpForm.email.val;
        const password = signUpForm.password.val;
        const username = signUpForm.username.val;
        User.signupUserWithEmailAndPassword(email,password).then(e => {
            User.updateUserDisplayName(username).then(s => {
                console.log(s)
                this.closePanel()
            }).catch(b => {
                console.log(b)
            })
        }).catch(x => {
            const response = authErrorCodeToUser(x.code)
            this.setState(x => {
                x.formLevelErrors.sign_up.isAnError = true;
                x.formLevelErrors.sign_up.error = response;
                setInterval(() => {
                    this.setState(y => {
                        y.formLevelErrors.sign_up.isAnError = false;
                        y.formLevelErrors.sign_up.error = '';  
                        return y;
                    })
                } ,2000)

                return x;
            })
        })
    }

    constructor(props){
        super(props);

        this.closePanel = this.closePanel.bind(this)
        this.eraseUserEmailPasswordError = this.eraseUserEmailPasswordError.bind(this)
        this.signWithGoogleProvider = this.signWithGoogleProvider.bind(this)
        this.signUpWithEmailAndPassword = this.signUpWithEmailAndPassword.bind(this)
        
        this.signInWithEmailAndPassword = this.signInWithEmailAndPassword.bind(this);
        this.state = {
            'forms':{

                // Sign In Form
                'user_sign_in':{
                    'email':{
                        val:'',
                        isValid:false,
                        validators:[
                            requiredValidator,
                            email_pattern
                        ],
                        error:'',
                        touched:false
                    },
                    'password':{
                        val:'',
                        isValid:false,
                        validators:[
                            requiredValidator,
                            
                        ],
                        error:'',
                        touched:false
                    }
                },

                'user_sign_up':{
                    'email':{
                        val:'',
                        isValid:false,
                        validators:[
                            requiredValidator,
                            email_pattern
                        ],
                        error:'',
                        touched:false 
                    },
                    'username':{
                        val:'',
                        isValid:false,
                        validators:[
                            requiredValidator,
                            minLengthValidator(3)
                        ],
                        error:'',
                        touched:false
                    },
                    'password':{
                        val:'',
                        isValid:false,
                        validators:[
                            requiredValidator,
                            passwordValidator
                        ],
                        error:'',
                        touched:false
                    }
                }
            },
            'formLevelErrors':{
                'sign_in':{
                      
                    'error':'',
                    'isAnError':false
                },
                'sign_up':{
                    'error':'',
                    'isAnError':false
                }
            },
            'requests':{
                'signIn':{
                    'isPending':false
                }
            }
            
        }

        this.formHandler = this.formHandler.bind(this);
        this.runValidators = this.runValidators.bind(this);
        this.focusHandler = this.focusHandler.bind(this);
    }



    closePanel(){
        this.setState({})
        this.props.closeAction(false)
    }

    getErrorOrNothing(groupname,formName,addText){
        const error =   this.state.forms[groupname][formName].error
        return  error && this.state.forms[groupname][formName].touched ? addText + error :''
    }


    getFormLevelErrorHaveOrNot(groupname){
        const form = this.state.forms[groupname]
        const formKeys = Object.keys(form)
        for(let i = 0 ; i < formKeys.length;i++){
            const instance = this.state.forms[groupname][formKeys[i]]
            if(instance.error || !instance.touched){
                return true;
            }
        }

        return false;
    }

    focusHandler(e) {

       
        const name  = e.target.name;
        const value = e.target.value;

        const groupName = name.split("-")[0]
        const formName = name.split('-')[1]

        this.setState(x => {
            x.forms[groupName][formName].touched = true;
        })

        if(e.type === 'blur'){
        const validators = this.state.forms[groupName][formName].validators;
        this.runValidators(value,validators,groupName,formName)
        }
    }

    formHandler(e){
        const name  = e.target.name;
        const value = e.target.value;

        const groupName = name.split("-")[0]
        const formName = name.split('-')[1]
        this.setState(x => {
            x.forms[groupName][formName].val = value;
            return x
        });

        const validators = this.state.forms[groupName][formName].validators;
        this.runValidators(value,validators,groupName,formName)

       
    }

    runValidators(value,validators,groupName,formName){
        for(let i = 0 ; i< validators.length;i++){
            const result = validators[i](value)
            if(result){
                this.setState(x => {
                    x.forms[groupName][formName].error = result;
                    return x;
                })
                break;
            }else{
                this.setState(x => {
                    x.forms[groupName][formName].error = '';
                    return x;
                })
            }
        }
    }

    render(){
        return ( <>
            <form className="form signInForm">        


            { this.state.formLevelErrors.sign_in.isAnError &&  <Alert severity="error">Invalid UserName or Password</Alert>}
                                         <Typography variant="h6" className="sub-title">Sign In</Typography>
                                            {/* {this.getErrorOrNothing("user_sign_in","email","Email") } */}
                                         <TextField 
                                         id="user-sign-in-email" 
                                         label="UserEmail"
                                        variant="standard" 
                                        name="user_sign_in-email" 
                                        helperText={this.getErrorOrNothing('user_sign_in','email','Email')}
                                        error={this.getErrorOrNothing('user_sign_in','email','Email') ? true : false}
                                        onChange={this.formHandler} onBlur={this.focusHandler} onFocus={this.focusHandler}/>
                                
                                         <TextField 
                                         id="user-sign-in-password" 
                                         label="UserPassword" 
                                         type="password" 
                                         name="user_sign_in-password" 
                                         variant="standard" 
                                         onChange={this.formHandler} 
                                         onBlur={this.focusHandler} 
                                         error={this.getErrorOrNothing('user_sign_in','password','Password') ? true : false}
                                         helperText={this.getErrorOrNothing('user_sign_in','password','Password')}
                                         onFocus={this.focusHandler}/>
                                         <Button variant="contained" type="submit" disabled={this.getFormLevelErrorHaveOrNot('user_sign_in') || this.state.requests.signIn.isPending} onClick={this.signInWithEmailAndPassword}>Sign In</Button>
         
         
                                         </form>
                                     
         
                                         <Divider variant="middle" />
                                         <Typography variant="h6" className="form-note">Don't have a account. Sign Up. It's free</Typography>
         
         
                                     <form className="form signUpForm">

                                        {
                                            this.state.formLevelErrors.sign_up.isAnError && <Alert variant="filled" severity="error">
                                            {this.state.formLevelErrors.sign_up.error}
                                          </Alert>
                                        }

                                         <Typography variant="h6" className="sub-title signup-title">Sign Up</Typography>

                                         <TextField id="user-sign-up-email"
                                         label="UserEmail"
                                         variant="standard" 
                                         name="user_sign_up-email" 
                                         onChange={this.formHandler}
                                         onBlur={this.focusHandler}
                                         onFocus={this.focusHandler}
                                         error={this.getErrorOrNothing('user_sign_up','email','Email ') ? true : false}
                                         helperText={this.getErrorOrNothing('user_sign_up','email','Email ')}
                                         />


                                         <TextField id="user-sign-up-username" 
                                         label="UserName" 
                                         variant="standard" 
                                         name= "user_sign_up-username"
                                         onChange={this.formHandler}
                                         onBlur={this.focusHandler}
                                         onFocus={this.focusHandler}
                                         error={this.getErrorOrNothing('user_sign_up','username','Username ') ? true : false}
                                         helperText={this.getErrorOrNothing('user_sign_up','username','Username ')}
                                         
                                         />


                                         <TextField id="user-sign-up-password" 
                                         label="UserPassword" 
                                         type="password" 
                                         variant="standard" 
                                         name="user_sign_up-password" 
                                         onChange={this.formHandler}
                                         onBlur={this.focusHandler}
                                         onFocus={this.focusHandler}
                                         error={this.getErrorOrNothing('user_sign_up','password','Password ') ? true : false}
                                         helperText={this.getErrorOrNothing('user_sign_up','password','Password ')}
                                         />
                                         <Button variant="contained" disabled={this.getFormLevelErrorHaveOrNot('user_sign_up')} onClick={this.signUpWithEmailAndPassword}>Sign Up</Button>
                                     </form>
                                     
                                     <Divider variant="middle" />
                                     <Button variant="contained" className="google-sign-in-button" onClick={this.signWithGoogleProvider}><GoogleIcon color="primary"></GoogleIcon>Sign In With Google</Button>
                                    
            </>
         
           )
    }
  
}