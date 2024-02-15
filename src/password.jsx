import React, { useCallback, useEffect, useRef, useState } from 'react'

const Passwordgenerator = () => {
  const [length, setlength] = useState(8);
  const [charallowed, setcharallowed] = useState(false);
  const [numallowed, setnumallowed] = useState(false);
  const [password, setpassword] = useState("")

  const passwordref = useRef(null)

  const savepasswordinclipboard = useCallback(()=>{
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordgenerate = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numallowed) str+= "0123456789";
    if(charallowed) str+= "!@#$%^&*()_+";
    for(let i =1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);

  },[length, charallowed, numallowed, setpassword])
  useEffect(()=>{
    passwordgenerate()
  },[length,numallowed,charallowed,passwordgenerate])
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-400 text-blue-800 mt-0'>
      {/* <h1 className='text-white text-center'>Password Generator</h1> */}
      <div className="flex rounded-lg overflow-hidden mb-4">
      <input 
      type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordref}
      />
      <button className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 hover:text-lg' onClick={savepasswordinclipboard}>Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={8}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{
            setlength(e.target.value)
          }}
           />
          <label> Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          id='num'
          defaultChecked={numallowed}
          className='cursor-pointer'
          onChange={()=>{
            setnumallowed(prev=>!prev)
          }}
           />
          <label htmlFor='num'> Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          id='char'
          defaultChecked={charallowed}
          className='cursor-pointer'
          onChange={()=>{
            setcharallowed(prev=>!prev)
          }}
           />
          <label htmlFor='char'> Characters</label>
        </div> 
      </div>
    </div>
  )
}

export default Passwordgenerator