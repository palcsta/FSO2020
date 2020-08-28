import React from 'react'



const error = {
    color: "red",
    backgroundColor: "lightgrey",
    "font-size": "20px",
    padding: "10px",
    fontFamily: "Arial"
    /*
    border-style: solid;
border-radius: 5px;
padding: 10px;
margin-bottom: 10px;
    */
};

const success = {
    color: "green",
    backgroundColor: "lightgrey",
    "font-size": "20px",
    padding: "10px",
    fontFamily: "Arial"
    /*
    border-style: solid;
border-radius: 5px;
padding: 10px;
margin-bottom: 10px;
    */
};


const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    if (message.includes('ess')) {
        return (
            <div style={success} className="error">
                {message}
            </div>
        )
    }


    return (
        <div style={error} className="error">
            {message}
        </div>
    )
}

export default Notification