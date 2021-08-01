import './Button.css'

const Button = (props) => {
    if(props.disabled){
        return <button className="btn-disabled" disabled>Loading...</button>
    }
    
    return <button className="btn-submit" onClick={props.onClick}>{props.title}</button>
}

export default Button