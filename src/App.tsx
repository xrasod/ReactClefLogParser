import { Panel } from 'primereact/panel';
import { useRef, useState } from 'react'
import './App.css'
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-dark-purple/theme.css';
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css';
import Upload from './components/Upload/Upload.tsx';
import { LogFile } from './helpers/LogSearcher.ts';

function App() {

  const [ logs, setLogs ] = useState<LogFile[]>([]);
  const [ searchTerm, setSearchTerm ] = useState<string>('');
  const panelRef = useRef<Panel>(null);
  const setLogsHandler = (logs: LogFile[]) => {
    setLogs(logs);
      setTimeout(() => {
    if(panelRef.current) 
        panelRef.current.collapse(undefined);
      }, 1000);
  }

  return (
    <PrimeReactProvider>
      <Panel header="Upload Log Files" className="p-m-2" toggleable ref={panelRef}>
        <Upload/>
      </Panel>

    </PrimeReactProvider>
  )
}

export default App;