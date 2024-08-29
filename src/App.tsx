import { useState } from 'react'
import './App.css'
import { PrimeReactProvider } from 'primereact/api';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-dark-purple/theme.css';
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css';
// import Navigation from './components/Navigation';
import Upload from './components/Upload/Upload.tsx';

function App() {
  const [ count, setCount ] = useState(0)

  return (
    <PrimeReactProvider>

      {/*<Navigation/>*/}
      <Upload/>
      <div className="
      ">
        <Button onClick={() => setCount((count) => count + 1)} label={'count is ' + count}/>

      </div>

    </PrimeReactProvider>
  )
}

export default App
