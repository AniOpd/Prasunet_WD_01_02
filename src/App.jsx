import { useState,useRef, useEffect } from 'react'
import './App.css'

function App() {

  const [time,setTime]=useState(0);
  const [lap,setLap]=useState([]);
  const [isrunning,setIsrunning]=useState(false);
  const timeRef=useRef(null);

  const handleStart=()=>{
    if(!isrunning)setIsrunning(true);
    clearInterval(timeRef.current);
     timeRef.current=setInterval(
      ()=>{
        setTime((prev)=>prev+1); 
      }
      ,10);
  }

  const handleReset=()=>{
    clearInterval(timeRef.current);
    setTime(0);
    setIsrunning(false);
    setLap([]);
  }

  const handleStop=()=>{
    clearInterval(timeRef.current);
    setIsrunning(false);
  }

  const handleLap=()=>{
    if(time===0) return;
    const pr=formatTime(time);
    if(lap.find((item)=>item===pr)) return;
    setLap((prev)=>[...prev,pr]);
  }

  const formatTime = (time)=>{
      const getmilisecond = `0${time % 1000}`.slice(-2);
      const getsecond = `0${Math.floor(time / 100) % 60}`.slice(-2);
      const getminute = `0${Math.floor(time / 6000) % 60}`.slice(-2);
      const gethour = `0${Math.floor(time / 360000)}`.slice(-2);
      return `${gethour}:${getminute}:${getsecond}:${getmilisecond}`;
  }

  useEffect(()=>{
        let str=document.querySelector('#start').classList;
        let stp=document.querySelector('#stop').classList;
        let rst=document.querySelector('#reset').classList;
        if(isrunning){
          str.remove('bg-blue-500');
          str.add('bg-gray-500');
          stp.remove('bg-gray-500');
          stp.add('bg-green-500');
        }else if(!isrunning){
          str.add('bg-blue-500');
          str.remove('bg-gray-500');
          stp.add('bg-gray-500');
          stp.remove('bg-green-500');
      }
      if(time===0){
        rst.add('bg-gray-500');
        rst.remove('bg-red-500');
      }else{
        rst.add('bg-red-500');
        rst.remove('bg-gray-500');
      }
  },[isrunning,time])



  return (
     <>
      <div>
          <h1 className='text-5xl text-center my-5 font-bold text-orange-600'>Stop Watch</h1>
      </div>
     <div className='flex justify-center'>
     <div className='w-3/4 md:w-1/2 shadow-white flex flex-col justify-center items-center'>
        <div className='w-80 h-80 rounded-full flex justify-center items-center bg-slate-500 text-5xl my-5'>
          {formatTime(time)}
        </div>
        <div className='flex gap-2 flex-wrap'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-md  hover:scale-110 hover:shadow-lg hover:shadow-orange-400'id='start' onClick={handleStart}>Start</button>
          <button className='bg-red-500 text-white px-4 py-2 rounded-md  hover:scale-110 hover:shadow-lg hover:shadow-orange-400' id='reset' onClick={handleReset}>Reset</button>
          <button className='bg-green-500 text-white px-4 py-2 rounded-md  hover:scale-110 hover:shadow-lg hover:shadow-orange-400' id='stop' onClick={handleStop}>Stop</button>
          <button className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:scale-110 hover:shadow-lg hover:shadow-orange-400' onClick={handleLap}>lap</button>
        </div>
        <div className=''>
          <h1 className='text-3xl my-5'>Lap Time</h1>
          <div className='flex gap-2 flex-wrap'>
            {
              lap.map((item)=>(
                <div  className='bg-blue-500 text-white px-4 py-2 rounded-md'>{item}</div>
              ))
            }
          </div>
        </div>
      </div>
     </div>
     </>
  )
}

export default App
