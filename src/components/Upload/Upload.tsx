import * as React from 'react';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { LogFile, LogParser } from '../../helpers/LogSearcher.ts';

interface UploadProps {
  uploadComplete: (logs: LogFile[]) => void;
}

const Upload: React.FC<UploadProps> = ({ uploadComplete }) => {
  const parser = new LogParser();
  const ref = React.useRef<FileUpload>(null);
  const [files, setFiles] = React.useState<LogFile[]>([]);
  
  const uploadHandler = (_: FileUploadHandlerEvent) => {
    if (ref.current == null) return;
    const uploadedFiles: File[] = [];
    ref.current!.clear();
    ref.current.getFiles().forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setFiles([...files, parser.parseLogFileContent(reader.result as string)]);
      };
      reader.readAsText(file);
      uploadedFiles.push(file);
      if (ref.current == null) return;
      ref.current!.setUploadedFiles(uploadedFiles);
    });
    uploadComplete(files);
  }


  return (
    <>
      <div className="card">
        <FileUpload
          name="demo[]"
          multiple
          emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
          customUpload
          uploadHandler={uploadHandler}
          ref={ref}
        />
      </div>
    </>
  )
}

export default Upload;