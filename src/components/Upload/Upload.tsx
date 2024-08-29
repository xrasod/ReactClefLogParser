import * as React from 'react';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { LogParser } from '../../helpers/LogSearcher.ts';

const Upload: React.FC = () => {
  const parser = new LogParser();
  const ref = React.useRef<FileUpload>(null);

  const uploadHandler = (e: FileUploadHandlerEvent) => {
    if(ref.current == null) return;
    const uploadedFiles: File[] = [];
    ref.current.getFiles().forEach((file) => {
      ref.current!.clear();
      const reader = new FileReader();
      reader.onload = () => {
        parser.parseLogFileContent(reader.result as string);
      };
      reader.readAsText(file);
      uploadedFiles.push(file);
      if(ref.current == null) return;
      ref.current!.setUploadedFiles(uploadedFiles);
    });
    console.log(parser.getLogLevelCounts());
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