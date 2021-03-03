import './Big.css'
function Big(props){
    
    return <div className='Big'>
        <div onClick={props.remove}>X</div>
        <img src={props.image} />
    </div>
}
export default Big;