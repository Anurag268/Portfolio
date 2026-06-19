"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { uploadResume, checkResumeExists } from "../../actions/resume";

export default function ResumeForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [existingResume, setExistingResume] = useState<{exists: boolean, fileName?: string, updatedAt?: Date}>({ exists: false });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkResumeExists().then(setExistingResume);
  }, [status]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setStatus("error");
        setMessage("Please select a PDF file.");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setStatus("error");
        setMessage("File is too large. Maximum size is 5MB.");
        return;
      }
      setFile(selectedFile);
      setStatus("idle");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setStatus("idle");
    
    const formData = new FormData();
    formData.append("resume", file);

    const result = await uploadResume(formData);

    if (result.error) {
      setStatus("error");
      setMessage(result.error);
    } else {
      setStatus("success");
      setMessage("Resume uploaded successfully!");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
    
    setIsUploading(false);
  };

  return (
    <div className="glass p-6 md:p-8 rounded-2xl space-y-6 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="text-primary" />
          Resume PDF Upload
        </h2>
      </div>

      <div className="space-y-4">
        {existingResume.exists ? (
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-zinc-300">
              <CheckCircle2 className="text-primary" size={20} />
              <div>
                <p className="font-medium text-white">Current resume active</p>
                <p className="text-zinc-400 text-xs mt-0.5">
                  {existingResume.fileName} (Updated {new Date(existingResume.updatedAt!).toLocaleDateString()})
                </p>
              </div>
            </div>
            <a 
              href="/api/resume" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-medium text-primary hover:text-white transition-colors"
            >
              View PDF
            </a>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex items-center gap-3 text-sm text-zinc-400">
            <AlertCircle size={20} />
            <p>No resume uploaded yet. Visitors will get a 404 error.</p>
          </div>
        )}

        <div className="border-2 border-dashed border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors">
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange} 
            accept="application/pdf"
            className="hidden" 
            id="resume-upload"
          />
          
          <label 
            htmlFor="resume-upload" 
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Upload size={24} className="text-zinc-400" />
            </div>
            <span className="text-white font-medium mb-1">
              {file ? file.name : "Click to select a PDF file"}
            </span>
            <span className="text-zinc-500 text-xs">
              {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF only, max 5MB"}
            </span>
          </label>
        </div>

        {status === "error" && (
          <div className="text-red-400 text-sm flex items-center gap-2 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
            <AlertCircle size={16} />
            {message}
          </div>
        )}
        
        {status === "success" && (
          <div className="text-green-400 text-sm flex items-center gap-2 bg-green-400/10 p-3 rounded-lg border border-green-400/20">
            <CheckCircle2 size={16} />
            {message}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="w-full py-3 bg-primary text-black font-semibold rounded-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              Uploading...
            </>
          ) : (
            <>
              <Upload size={18} />
              Upload & Replace Resume
            </>
          )}
        </button>
      </div>
    </div>
  );
}
