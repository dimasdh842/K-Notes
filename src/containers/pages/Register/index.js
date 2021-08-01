import React,{Component} from "react"
import Button from '../../../components/atoms/Button'
import {connect} from 'react-redux'
import { registerUserAPI } from "../../../config/redux/action"
import './Register.css'

class Register extends Component {

    state = {
        email: '',
        name: '',
        password: ''
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleRegisterSubmit = () => {
        const {email,password,name} = this.state

        this.props.registerAPI(email,password)
        .then(result => {
            localStorage.setItem('user',JSON.stringify(result))
            this.props.history.push('/')
        })
        .catch(error => {
            console.log(error)
        })
        
        this.handleClearForm()
    }

    handleClearForm = () => {
    }
    render() {
        return(
            <div className="register-container">
                <h2>Register Form</h2>
                <p>Register a new Account and enjoy the easiest way to keep your notes in the cloud</p>
                <div className="register-form">
                    <input type="text" id="name" placeholder="name" className="name"  onChange={this.handleChangeText} value={this.props.name}/> <br/>
                    <input type="text" id="email" placeholder="email"  className="email" onChange={this.handleChangeText} value={this.props.email}/> <br/>
                    <input type="password" id="password" placeholder="password" className="password" onChange={this.handleChangeText} value={this.props.password}/><br/>
                    <Button disabled={this.props.isLoading} onClick={this.handleRegisterSubmit} title="Register"/>
                </div>
            </div> 
        )

    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading,
    email: state.email,
    password: state.password,
    name: state.name

})

const reduxDispatch = (dispatch) => ({
    setIsloading: (data) => dispatch({type: 'CHANGE_ISLOADING',value: data}),
    registerAPI: (email,password) => dispatch(registerUserAPI(email,password)),
    setUser: (data) => dispatch({type: 'CAHNGE_USER',value: data}) 
})

export default connect(reduxState,reduxDispatch)(Register)