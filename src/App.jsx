import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // ref hook
  const passwordRef = useRef(null) //any default value


  //func definition
  const passwordGenerator = useCallback(() => {
    let pass = "";
    // password will be generatoed using this string
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAllowed) str+= "0123456789";
    if(charAllowed) str+="!@#$%^&*~";

    // now create a password that will contain letters from above str
    
    for(let i=1; i<= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword])
  // setPassword is passed bec it's also a dependency
  // setPasswordset is added for optimization of func (kept the process in chache)
  // if "password" was given then it'll run an infinite loop

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); // to highlight the text while on selection
    // "?" --> optional selector i.e. will select only if the input is not-null

    //passwordRef.current?.setSelectionRange(0,3) --> will select only 3 values

    window.navigator.clipboard.writeText(password)
  }, [password])

  // for running of function
  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-4 text-orange-500 bg-gray-800'>
    <h1 className='my-3 text-4xl text-center text-white '>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        ></input>

        <button 
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
          type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          ></input>
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={numAllowed}
            id='numberInput'
            onChange={ () => {
              setNumAllowed((prev) => !prev); //on checking, turn true to false and vice vera
            } }
          ></input>
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={charAllowed}
            id='numberInput'
            onChange={ () => {
              setCharAllowed((prev) => !prev); //on checking, turn true to false and vice vera
            } }
          ></input>
          <label htmlFor='numberInput'>Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
