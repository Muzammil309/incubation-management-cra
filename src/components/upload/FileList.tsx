import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { supabase } from '../../lib/supabaseClient';
import { useToast } from '../../hooks/useToast';

interface FileItem {
  id: string;
  name: string;
  type: string;
  url: string;
  upload_date: string;
}

interface FileListProps {
  files: FileItem[];
  onFileDeleted: (fileId: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onFileDeleted }) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const { showSuccess, showError } = useToast();

  const getFileIcon = (fileType: string) => {
    const type = fileType.toLowerCase();
    if (type === 'pdf') return { icon: 'mdi:file-pdf-box', color: 'text-red-500' };
    if (type === 'ppt' || type === 'pptx') return { icon: 'mdi:file-powerpoint-box', color: 'text-orange-500' };
    if (type === 'doc' || type === 'docx') return { icon: 'mdi:file-word-box', color: 'text-blue-500' };
    if (['jpg', 'jpeg', 'png', 'gif'].includes(type)) return { icon: 'mdi:file-image', color: 'text-green-500' };
    return { icon: 'mdi:file-document', color: 'text-neutral-500' };
  };

  // Removed unused formatFileSize function

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownload = (file: FileItem) => {
    window.open(file.url, '_blank');
  };

  const handleDeleteClick = (fileId: string) => {
    setShowDeleteConfirm(fileId);
  };

  const handleDeleteConfirm = async (file: FileItem) => {
    try {
      setDeletingId(file.id);

      // Extract file path from URL
      const urlParts = file.url.split('/');
      const filePath = urlParts.slice(urlParts.indexOf('materials')).join('/');

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('speaker-materials')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('materials')
        .delete()
        .eq('id', file.id);

      if (dbError) throw dbError;

      showSuccess('File deleted successfully!');
      onFileDeleted(file.id);
      setShowDeleteConfirm(null);
    } catch (error: any) {
      console.error('Delete error:', error);
      showError(error.message || 'Failed to delete file');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(null);
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-500">
        <Icon icon="mdi:file-outline" className="text-6xl mx-auto mb-3 opacity-50" />
        <p className="text-sm">No files uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {files.map((file) => {
        const { icon, color } = getFileIcon(file.type);
        const isDeleting = deletingId === file.id;
        const showConfirm = showDeleteConfirm === file.id;

        return (
          <div
            key={file.id}
            className="flex items-center gap-4 p-4 bg-white border border-neutral-200 rounded-lg hover:shadow-md transition-shadow"
          >
            {/* File Icon */}
            <div className={`text-4xl ${color} flex-shrink-0`}>
              <Icon icon={icon} />
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-800 truncate">
                {file.name}
              </p>
              <p className="text-xs text-neutral-500">
                {file.type.toUpperCase()} • Uploaded {formatDate(file.upload_date)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {showConfirm ? (
                <>
                  <button
                    onClick={() => handleDeleteConfirm(file)}
                    disabled={isDeleting}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600 disabled:opacity-50"
                  >
                    {isDeleting ? 'Deleting...' : 'Confirm'}
                  </button>
                  <button
                    onClick={handleDeleteCancel}
                    disabled={isDeleting}
                    className="px-3 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-200 rounded hover:bg-neutral-300 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleDownload(file)}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded transition-colors"
                    title="Download"
                  >
                    <Icon icon="mdi:download" className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(file.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Icon icon="mdi:delete" className="text-xl" />
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FileList;

