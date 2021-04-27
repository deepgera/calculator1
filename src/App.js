
import React from 'react';
import './App.css';
import { useState } from 'react';
// eslint-disable-next-line 
//jshint ignore: start
function App() {
  
  var [oldexpression,setoldexpression] = useState("");
  var [expression,setexpression] = useState("");
  var [prev,setprev]=useState("clear");
  var numerics=new Set("1234567890.()");
  var operators=new Set("+-/%*");
  var butt=["(",")","CE","AC","1","2","3","+","4","5","6","-","7","8","9","*",".","=","%","/"];

  let deleteVal = (()=>{
    if(expression.length>=1){
        if(prev==="op"){
          setprev("num");
      }
        setexpression(expression.slice(0,-1));
      }
  });
  let appendnum=((val)=>{
     if(prev==="ans"){
        setoldexpression("Ans = " + expression);
        setexpression(val);
        setprev("num");
      }
      else{
        setexpression(expression+val);
        setprev("num");
      }
  })
  let appendop=(val)=>{
    if(prev!=="op"){
        setexpression(expression+val);
        setprev("op");
      }
      else if(prev==="op"){
          setexpression(expression.slice(0,-1)+val);
          setprev("op");
      }
      else if(prev==="clear"){
         setexpression(expression);
         setprev("clear");
      }  
  }
  let evaluater=function(){
    let evalution = eval(expression);
    setoldexpression(expression);
    setexpression(String(evalution));
    setprev("ans");
  }
  let clear=()=>{
    setexpression("");
  }
  onkeydown= function(event){
    if(event.key==="Backspace"){
      deleteVal();
    }
    else if(numerics.has(event.key)){
      appendnum(event.key);
    }
    else if(operators.has(event.key)){
      appendop(event.key);
    }
    else if(event.key === "Enter"){
        evaluater();
    }
  };
  return (
    <div className="App"  >
        <img src="https://i.pinimg.com/474x/dd/33/d7/dd33d7691b8e734aab844d4f311cd10e.jpg" className="App-logo" alt="logo" />
      <br/>
      <div tabIndex={0} style={{
          height: "40px",
          width: "380px",
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          textAlign:"right",
          alignItems:"flexend",
          padding:"30px",
          margin:"10 px",
          borderRadius: "4vh",
          background:"white"
      }}>
          <h5 style={{
            color:"GrayText"
          }}>{oldexpression}</h5>
          <h2>{expression}</h2>
        </div>
        
      <br/>
      <div style={{
        width:"400px",
        height:"50vh",
        display:"flex",
        flexDirection:"row",
        background:"white",
        borderRadius:"3vh",
        padding:"15px",
        flexWrap:"wrap",
        backgroundColor:"#7d7f90"
      }
      }>
        {butt.map(function(buttonval,idx) {
          return (<button style ={{
          width:"70px",
          height:"40px",
          margin:"13px",
          padding:"5px",
          borderRadius:"5px",
          fontSize:"20px"}}
          onClick={function (){
            if(buttonval==="CE"){
              deleteVal();
            }
            else if(numerics.has(buttonval)){
              appendnum(buttonval);
            }
            else if(operators.has(buttonval)){
              appendop(buttonval);
            } 
            else if(buttonval==="="){
              evaluater();
            }
            else if(buttonval==="AC"){
              clear();
            }
          }}
          >{buttonval}</button>);
        })}
        
    </div>
      </div>
  
  );
}

export default App;
