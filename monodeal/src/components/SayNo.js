import { useState, useEffect } from "react"
import'../components/css/sayno.css'


const SayNo = (props) => {

    const [bool, setBool] = useState(false)
    const [index, setIndex] = useState()

    useEffect(()=>{
        props.drawn.some((val, index) => {
            if(val.name == "Just Say No"){
                setBool(true)
                setIndex(index)
            }
        })
    },[])

    return (
        <div className="no-center">
        {bool ?
            <div className="no-title">
                <p>Do you wanna say NO?</p>
                <button className="no-button" onClick={()=>{
                    props.answer("No")
                    props.update(index)
                }}> Just say no</button>
            </div> :

            <div className="no-title">
                <p>Nothing you can do about it!</p>
            </div>
        }
            
        </div>
    )
}

export default SayNo
