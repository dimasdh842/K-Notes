import React,{Component} from "react";
import {connect} from 'react-redux'
import { loginUserAPI } from "../../../config/redux/action";
import Button from "../../../components/atoms/Button"; 
import './Login.css'

class Login extends Component{
    state = {
        email: '',
        password: '',
        name: ''
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })   
    }

    handleLoginSubmit = (e) => {
        e.preventDefault()
        const {email,password} = this.state
        this.props.loginAPI(email,password)
        .then(result => {
                localStorage.setItem('user',JSON.stringify(result))
                this.handleClearForm()
                this.props.history.push("/")        
        })
        .catch(err => {
            console.log('login failed',err)
        })
    }


    handleClearForm = () => {
        this.setState({
            email: '',
            password: ''
        })
    }

    render() {
        return (
            <div className="login-container">
                <h2>Login Form</h2>
                <p>Welcome to Your online notebook it's  very usefull right? don't you think so?</p>
                <div className="login-form">
                    <input type="text" id="email" placeholder="Email" className="email" value={this.state.email} onChange={this.handleChangeText}/> <br/>
                    <input type="password" id="password" placeholder="Password" className="password" value={this.state.password} onChange={this.handleChangeText}/><br/>
                    <Button onClick={this.handleLoginSubmit} disabled={this.props.isLoading} title="Login"/>
                </div>
            </div>
        )
    }
}



const reduxState = (state) => ({
    isLoading: state.isLoading,
})

const reduxDispatch = (dispatch) => ({
    setIsloading: (data) => dispatch({type: 'CHANGE_ISLOADING',value: data}),
    loginAPI: (email,password) => dispatch(loginUserAPI(email,password)),
    setUser: (data) => dispatch({type: 'CHANGE_USER',value:data})
})

export default connect(reduxState,reduxDispatch)(Login)