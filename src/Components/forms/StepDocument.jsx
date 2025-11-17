import FileUploader from '../FileUploader';
import Icon from '../Icon';
const StepDocument = ({ data , onChange }) => {
    const handleFileSelect = (file) => {
        onChange({ files: file });
      }
    const employmentInfo= <div className="border flex-1 p-2 rounded-lg border-gray-200">
                        <div className="flex mx-4 py-4 border-b border-gray-200">
                            <p className="flex-1 text-xl font-semibold text-gray-700">Personal Documents</p>
                            <Icon name={"FileUp"}/>
                        </div>
                    
                        <FileUploader data={data} onFileSelect={handleFileSelect} className="flex flex-col gap-2 p-4 justify-center  items-center  ">
                    
                            <img className="object-center" src="\pic\F2.png" alt="" />
                            <p className="flex-1 text-xl font-semibold text-gray-700">Drag & Drop here to upload</p>
                            <p className="flex-1 text-normal font-normal text-gray-500">Or select file from your computer</p>

                        
                        </FileUploader>
                    </div>

       return employmentInfo

    }
    export default StepDocument

                        