import React, {Component,Fragment} from 'react'
import { addDataToAPI, deleteDataAPI, getDataAPI,updateDataAPI } from "../../../config/redux/action"
import {connect} from 'react-redux'
import './Dashboard.css'

class Dashboard extends Component {
    state = {
        title: '',
        content: '',
        isActive: false,
        user: {},
        notes: [],
        editStatus: false
    }

    componentDidMount() {
        
        // this.setState({
        //     user: ,
        // })

        const userLocalStorage = JSON.parse(localStorage.getItem('user'))
        this.state.user = userLocalStorage
        console.log('localstorage',userLocalStorage)
        console.log(this.state.user)
        this.props.getDataAPI(this.state.user.uid).then(res => {
            this.setState({
                notes:res
            })
            this.setState({
                title:'',
                content:''
            })
        })
    }
    
    handleSubmitedNote = () => {
        const data = {
            title : this.state.title,
            content: this.state.content,
            date: new Date().getTime(),
            userId: this.state.user.uid
        }

        
        this.props.addDataToAPI(data)
        this.setState({
            title:'',
            content:''
        })
        console.log(this.state)
        // this.props.getDataAPI(this.state.user.uid).then(res => {
        //     this.setState({
        //         notes:res
        //     })
        // })
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    
    handleUpdateChange = (e) => {
        
    }

    handleInputForm = () => {
        if (this.state.isActive) {
            this.setState({
                isActive: false
            })
        } else {
            this.setState({
                isActive: true
            })
        }

        console.log(this.state);
    }

    handleUpdateNote = (note) => {

        if (this.state.title === '') {
            // this.setState({
            //     title: note.data.title
            // })

            this.state.title = note.data.title 
        }
        
        if (this.state.content === '') {
            // this.setState({
            //     content:note.data.content,
            // })
            
            this.state.content = note.data.content 
        }

        const data = {
            userId: this.state.user.uid,
            noteId: note.id,
            body: {
                date: new Date().getTime(),
                content:this.state.content,
                title: this.state.title
            }
        }

        console.log(data)

        this.props.updateDataAPI(data).then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleDeleteNote = (note) => {  
        const data = {noteId:note.id,userId:this.state.user.uid}
        this.props.deleteDataAPI(data)
    } 

    render() {    
        return (
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h2>hello {this.state.user.email}</h2>
                    <p>Type something matter today and let me to keep it for you</p>
                    <div className="header-notes">
                        <input className="search" type="text" placeholder="search your notes"/>
                        <button className="new-note-btn" onClick={this.handleInputForm}><i className="fas fa-pencil-alt"></i></button>
                    </div>
                </div>
                <div className="all-notes">
                {
                        this.state.isActive ? (

                    <div className="add-new-note-form">
                        <input id="title" className="title-note" placeholder="title" type="text" value={this.state.title} onChange={this.handleChangeText}/>
                        <textarea id="content" value={this.state.content} className="content-note" placeholder="content" onChange={this.handleChangeText}>
                        </textarea>
                        <span className="date-note">{new Date(new Date().getTime()).toLocaleTimeString()}</span>
                        <button className="submit-note" onClick={this.handleSubmitedNote}>
                                <i className="fas fa-save"></i>
                        </button>
                    </div>)
                    :
                    null
                }    

                </div>

                <div className="all-notes">
                    <Fragment>
                    {
                        
                        this.props.notes.length > 0 ? 
                        this.props.notes.map(note => {
                            return (
                                <div className="add-new-note-form" key={note.id} onClick={this.handleUpdatebar}>
                                    <input id="title" className="title-note" placeholder="title" type="text" defaultValue={note.data.title} onChange={this.handleChangeText}/>
                                    <textarea id="content" defaultValue={note.data.content} className="content-note" placeholder="content" onChange={this.handleChangeText}>
                                    </textarea>

                                            <div className="submit-note-bar" >
                                                <span className="date-note">{new Date(note.data.date).toLocaleTimeString()}</span>
                                                <div>
                                                    <i className="fas fa-trash" onClick={() => this.handleDeleteNote(note)}></i>
                                                    <i className="fas fa-save" onClick={() => this.handleUpdateNote(note)}></i>
                                                </div>
                                            </div> 
                                            
                                </div>
                                
                            )   
                        })
                        : 'Tidak ada catatan'
                    }
                    </Fragment>
                </div>            

            
                
            </div>


        )
}
}

const reduxState = (state) => ({
    user: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    addDataToAPI: (data) => dispatch(addDataToAPI(data)),
    getDataAPI: (userId) => dispatch(getDataAPI(userId)),
    updateDataAPI: (data) => dispatch(updateDataAPI(data)),
    deleteDataAPI: (data) => dispatch(deleteDataAPI(data)),
})

export default connect(reduxState,reduxDispatch)(Dashboard)