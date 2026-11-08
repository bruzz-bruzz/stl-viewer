import './App.css'
import {useState,useEffect} from 'react'
import {useCookies} from 'react-cookie'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model'
import Github from './Github'
export default function App(){
  const [userFile,setUserFile] = useState<null|File>(null)
  const [fileSize,setFileSize] = useState(0)
  const [fileUrl,setFileUrl] = useState("")
  const [userPosition,setUserPosition] = useState<[number,number,number]>([0,0,0])
  const [userRotation,setUserRotation] = useState<[number,number,number]>([0,0,0])
  const [ambientLightIntensity,setAmbientLightIntensity] = useState(0.5)
  const [directionalLightIntensity,setDirectionalLightIntensity] = useState(1)
  const [directionalLightPosition,setDirectionalLightPosition] = useState<[number,number,number]>([10,10,5])
  const [userColor,setUserColor] = useState("#000000")
  const [cookies,setCookie] = useCookies(['user'])
  function readFile(f:File|null){
    if(f === null){
      return
    }
    setFileSize(parseFloat((f.size / 1024).toFixed(2)))
    setFileUrl(URL.createObjectURL(f))
  } 
  useEffect(()=>{
    if(Object.keys(cookies).includes('mode') === false){
      setCookie('user','light',{path:'/'})
      setUserColor('#ffffff')
    } else {
      setUserColor(cookies.user === 'light' ? '#000000' : '#ffffff')
    }
  },[])
  return (
    <div className={`min-h-screen p-4 ${cookies.user === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
    <div className='flex flex-col items-center gap-6'>
      <h1 className="text-4xl font-extrabold tracking-tight">STL Viewer</h1>
      <button 
        className="absolute top-4 right-4 px-4 py-2 rounded-full bg-blue-600 text-white font-medium transition-colors duration-200 hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none" 
        onClick={()=>{
        setCookie('user',cookies.user === 'light' ? 'dark' : 'light',{path:'/'})
      }}>Toggle Mode</button>
      <div className={`border ${cookies.user === 'light' ? 'border-gray-300 bg-gray-50' : 'border-gray-600 bg-gray-900'} p-6 rounded-2xl w-full max-w-md shadow-sm`}>
        <h2 className="text-lg font-semibold mb-3">Upload STL File</h2>
        <p className={`text-sm ${cookies.user === 'light' ? 'text-gray-500' : 'text-gray-400'} mb-4`}>File Size: {fileSize} KB</p>
          <input 
            type="file" 
            className={`block w-full text-sm ${cookies.user === 'light' ? 'text-gray-600' : 'text-gray-400'} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`} 
            onChange={(e)=>{
            setUserFile(e.target.files !== null ? e.target.files[0] : null)
            readFile(e.target.files !== null ? e.target.files[0] : null)
            }}/>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl bg-white/10 p-6 rounded-lg">
          <div className="flex flex-col gap-2">
            <label className={`text-sm font-medium ${cookies.user === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Model Color</label>
            <input 
              type='color' 
              value={userColor} 
              onChange={(e)=>setUserColor(e.target.value)} 
              className={`w-full h-10 cursor-pointer rounded-lg border-2 ${cookies.user === 'light' ? 'border-gray-300' : 'border-gray-600'} focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none`} 
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className={`text-sm font-medium ${cookies.user === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Model Position</p>
            <div className="grid grid-cols-3 gap-2">
              {(['X', 'Y', 'Z'] as const).map((axis, i) => (
                <div key={axis}>
                  <label className={`text-xs ${cookies.user === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{axis}</label>
                  <input 
                    type='number' 
                    value={userPosition[i]} 
                    onChange={(e)=>setUserPosition(arr=>{
                      let newArr = [...arr]
                      newArr[i] = parseFloat(e.target.value)
                      return newArr as [number,number,number]
                    })} 
                    className={`w-full p-2 rounded-lg border ${cookies.user === 'light' ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-800'} text-sm focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none`} 
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className={`text-sm font-medium ${cookies.user === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Model Rotation</p>
            <div className="grid grid-cols-3 gap-2">
              {(['X', 'Y', 'Z'] as const).map((axis, i) => (
                <div key={axis}>
                  <label className={`text-xs ${cookies.user === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{axis}</label>
                  <input 
                    type='number' 
                    value={userRotation[i]} 
                    onChange={(e)=>setUserRotation(arr=>{
                      let newArr = [...arr]
                      newArr[i] = parseFloat(e.target.value)
                      return newArr as [number,number,number]
                    })} 
                    className={`w-full p-2 rounded-lg border ${cookies.user === 'light' ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-800'} text-sm focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none`} 
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className={`text-sm font-medium ${cookies.user === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Light Settings</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`text-xs ${cookies.user === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Ambient Intensity</label>
                <input 
                  type='number' 
                  value={ambientLightIntensity} 
                  onChange={(e)=>setAmbientLightIntensity(Math.max(0,parseFloat(e.target.value)))} 
                  className={`w-full p-2 rounded-lg border ${cookies.user === 'light' ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-800'} text-sm focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none`}
                />
              </div>
              <div>
                <label className={`text-xs ${cookies.user === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Dir. Intensity</label>
                <input 
                  type='number' 
                  value={directionalLightIntensity} 
                  onChange={(e)=>setDirectionalLightIntensity(Math.max(0,parseFloat(e.target.value)))} 
                  className={`w-full p-2 rounded-lg border ${cookies.user === 'light' ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-800'} text-sm focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none`}
                />
              </div>
            </div>
            <p className={`text-xs font-medium ${cookies.user === 'light' ? 'text-gray-700' : 'text-gray-300'} mt-2`}>Directional Light Position</p>
            <div className="grid grid-cols-3 gap-2">
              {(['X', 'Y', 'Z'] as const).map((axis, i) => (
                <div key={axis}>
                  <label className={`text-xs ${cookies.user === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{axis}</label>
                  <input 
                    type='number' 
                    value={directionalLightPosition[i]} 
                    onChange={(e)=>{
                      setDirectionalLightPosition(arr=>{
                        let newArr = [...arr]
                        newArr[i] = parseFloat(e.target.value)
                        return newArr as [number,number,number]
                      })
                    }} 
                    className={`w-full p-2 rounded-lg border ${cookies.user === 'light' ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-800'} text-sm focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`border-2 rounded-2xl w-full max-w-5xl h-[500px] ${cookies.user === 'light' ? 'bg-white text-black border-gray-200' : 'bg-gray-900 text-white border-gray-700'} overflow-hidden shadow-lg`}>
        <Canvas camera={{ position: [50, 50, 50], fov: 70 }}>
          <ambientLight intensity={ambientLightIntensity} />
          <directionalLight position={directionalLightPosition} intensity={directionalLightIntensity} />
          <group>
            <Model url={userFile ? fileUrl : '/placeholder.stl'} color={userColor} position={userPosition} rotation={userRotation} />
          </group>
          <OrbitControls makeDefault />
        </Canvas>
      </div>
      <Github mode={cookies.user} repoURL={"https://github.com/bruzz-bruzz/stl-viewer"} profileURL={"https://github.com/bruzz-bruzz"} />
    </div>
  )
}