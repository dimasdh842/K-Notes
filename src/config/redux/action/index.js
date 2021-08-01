import firebase from '../../firebase'

export const registerUserAPI = (email,password) => (dispatch) => {
    return new Promise((resolve,reject) => {
        dispatch({type: 'CHANGE_ISLOADING', value: true})
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(result => {
            dispatch({type: 'CHANGE_ISLOADING', value: false})
            resolve(result.user)
        })
        .catch(error => {
            dispatch({type: 'CHANGE_ISLOADING', value: false})
            reject(error)    
        })
    })
}

export const loginUserAPI = (email,password) => (dispatch) => {
    const promise = new Promise((resolve,reject) => {
        dispatch({type: 'CHANGE_ISLOADING', value: true})
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(result => {
            console.log(result.user);
            dispatch({type: 'CHANGE_ISLOADING', value: false})
            resolve(result.user)
        })
        .catch(error => {
            let errorCode = error.code
            let errorMessage = error.message
            console.log(errorCode);
            console.log(errorMessage);
            dispatch({type: 'CHANGE_ISLOADING', value: false})
            reject(error)
            })
    })

    return promise
}


export const addDataToAPI = (data) => (dispatch) => {
        firebase.database().ref('notes/' + data.userId).push({
            title: data.title,
            content: data.content,
            date: data.date
        })
}

export const getDataAPI = (userId) => (dispatch) => {
    const urlNotes = firebase.database().ref('notes/'+ userId)
    return new Promise((resolve) => {
        urlNotes.on('value', (snapshoot) => {
            const dataNotes = Object.keys(snapshoot.val())
            let dataArray = []

            dataArray = dataNotes.map(key => ({
                id: key,
                data: snapshoot.val()[key]
            }))

            dispatch({type:'SET_NOTES',value:dataArray})
            resolve(dataArray)
        })
    })        
    }

export const updateDataAPI = (data) => (dispatch) => {
    console.log(data);
    const urlNotes = firebase.database().ref(`notes/${data.userId}/${data.noteId}`)
    return new Promise((resolve,reject) => {
        urlNotes.set(data.body, (result) => { 
            if (result) {
                reject(false)
            }
            else {
                resolve(true)
            }
        })

    })        
    }

export const deleteDataAPI = (data) => (dispatch) => {
    const urlNotes = firebase.database().ref(`notes/${data.userId}/${data.noteId}`)
    return new Promise((resolve,reject) => {
        urlNotes.remove()
    })        
    }