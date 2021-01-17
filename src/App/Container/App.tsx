import React, {useState} from "react";

const App:React.FC = () => {
    const [isRed, setIsRed] = useState(false);

    return <div style = {{backgroundColor:isRed? "red" : "black", height: 5000, width: "100%"}}>
        <button onClick = {() => setIsRed((CurrentIsRed) => !CurrentIsRed)}>dame click</button>
    </div>
}

export default App; 