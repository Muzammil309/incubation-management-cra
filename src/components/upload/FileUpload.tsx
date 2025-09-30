import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { supabase } from '../../lib/supabaseClient';
import { useToast } from '../../hooks/useToast';

interface FileUploadProps {
  sessionId: string;
  onUploadComplete: (file: any) => void;
  maxSizeMB?: number;
  allowedTypes?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  sessionId,
  onUploadComplete,
  maxSizeMB = 10,
  allowedTypes = [
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/gif'
  ]
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showSuccess, showError } = useToast();

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return 'mdi:file-pdf-box';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return 'mdi:file-powerpoint-box';
    if (fileType.includes('word') || fileType.includes('document')) return 'mdi:file-word-box';
    if (fileType.includes('image')) return 'mdi:file-image';
    return 'mdi:file-document';
  };

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toUpperCase() || '';
  };

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return `File type not allowed. Allowed types: PDF, PPT, PPTX, DOC, DOCX, Images`;
    }

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size exceeds ${maxSizeMB}MB limit`;
    }

    return null;
  };

  const uploadFile = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      showError(validationError);
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      // Generate unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name}`;
      const filePath = `materials/${sessionId}/${filename}`;

      // Upload to Supabase Storage
      // Simulate progress for better UX
      setUploadProgress(50);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('speaker-materials')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      setUploadProgress(100);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('speaker-materials')
        .getPublicUrl(filePath);

      // Save metadata to database
      const { data: materialData, error: dbError } = await supabase
        .from('materials')
        .insert([
          {
            session_id: sessionId,
            name: file.name,
            type: getFileExtension(file.name),
            url: urlData.publicUrl
          }
        ])
        .select()
        .single();

      if (dbError) throw dbError;

      showSuccess('File uploaded successfully!');
      onUploadComplete(materialData);
      setUploadProgress(0);
    } catch (error: any) {
      console.error('Upload error:', error);
      showError(error.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
          ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-neutral-300 hover:border-primary-400'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={!uploading ? handleClick : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          accept={allowedTypes.join(',')}
          disabled={uploading}
        />

        {uploading ? (
          <div className="space-y-4">
            <Icon icon="mdi:cloud-upload" className="text-6xl text-primary-500 mx-auto" />
            <div>
              <p className="text-sm font-medium text-neutral-700 mb-2">Uploading...</p>
              <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary-500 h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-neutral-500 mt-1">{uploadProgress}%</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Icon icon="mdi:cloud-upload-outline" className="text-6xl text-neutral-400 mx-auto" />
            <div>
              <p className="text-sm font-medium text-neutral-700">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Supported: PDF, PPT, PPTX, DOC, DOCX, Images (Max {maxSizeMB}MB)
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start gap-2 text-xs text-neutral-600">
        <Icon icon="mdi:information-outline" className="text-base flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium mb-1">File Upload Guidelines:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Maximum file size: {maxSizeMB}MB</li>
            <li>Allowed formats: PDF, PowerPoint, Word, Images</li>
            <li>Files are stored securely in Supabase Storage</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;

