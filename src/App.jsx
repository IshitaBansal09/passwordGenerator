import { useState, useCallback, useEffect, useRef } from 'react'


function App() { 
  const [length, setLength] = useState(8);
  const[numberAllowed, setNumberAllowed] = useState(false);
  const[charAllowed, setCharAllowed] = useState(false);
  const[password, setPassword] = useState("");

  //useRef hook

  const passwordRef = useRef(null); //default value can be given, here i have given default value equals null

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for(let i=1; i<=length; i++){
      //now we'll generate a random number between 1 and length of string
      let char = Math.floor(Math.random() * str.length + 1); //generates index

      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);  //setPassword is just for optimization, agr na de fir bhi koi problem nahi hogii

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();  //taki password copy karne pr vo blue shade aaye  
    passwordRef.current?.setSelectionRange(0, 99); //range of characters jo copy hoge when we'll click on copy button

    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]) 
  
  //dependencies needs to be written in array format 

  //useCallBack ki dependencies mein we use, jin variables ke ya methods ke change hone se function pr koi effect hoga 
  //useCallback talks about optimisation of the method whereas useEffect talks about re rendering of the method 
  //useEffect ek toh page reload hote hi call hota hai and dusra agr dependencies mein koi change ho toh fir se call hota hai, ya fir function re run hota hai

  //useCallback ki dependencies mein agr change hua toh method ko optimise kro, and useEffect ki dependencies mein change hua toh method ko dobara se run karo
  // dono ki dependencies mein difference hai, please don't compare the dependencies array of useCallback and useEffect
  // hence, hmne usecallBack mein function ki definition likhi and useEffect mein function ko execute kiya  



  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className='text-white text-center my-3'>Password generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type="text" 
          value= {password}
          className='outline-none w-full py-1 px-3'
          placeholder= 'Password'
          readOnly
          ref={passwordRef}
          />

          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 '
          >Copy</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type="checkBox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </>
  )
}

export default App