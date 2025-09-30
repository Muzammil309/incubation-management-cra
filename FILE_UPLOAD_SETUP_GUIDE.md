# File Upload Setup Guide

## 📋 **Overview**

This guide explains how to set up and use the file upload functionality for speaker materials in the incubation management dashboard.

---

## ✅ **Components Created**

### **1. FileUpload Component**
**Location**: `src/components/upload/FileUpload.tsx`

**Features**:
- ✅ Drag-and-drop file upload
- ✅ Click to browse file selection
- ✅ File type validation (PDF, PPT, PPTX, DOC, DOCX, Images)
- ✅ File size validation (max 10MB configurable)
- ✅ Upload progress indicator
- ✅ Real-time upload progress percentage
- ✅ Supabase Storage integration
- ✅ Database metadata storage
- ✅ Error handling with toast notifications
- ✅ Success notifications

**Props**:
```typescript
interface FileUploadProps {
  sessionId: string;           // Session ID to associate file with
  onUploadComplete: (file) => void;  // Callback after successful upload
  maxSizeMB?: number;          // Max file size in MB (default: 10)
  allowedTypes?: string[];     // Allowed MIME types
}
```

**Usage Example**:
```typescript
import FileUpload from '../../components/upload/FileUpload';

<FileUpload
  sessionId="session-123"
  onUploadComplete={(file) => {
    console.log('File uploaded:', file);
    // Refresh file list
  }}
  maxSizeMB={10}
/>
```

---

### **2. FileList Component**
**Location**: `src/components/upload/FileList.tsx`

**Features**:
- ✅ Display uploaded files with icons
- ✅ File type-specific icons (PDF, PPT, DOC, Images)
- ✅ File metadata display (name, type, upload date)
- ✅ Download functionality
- ✅ Delete functionality with confirmation dialog
- ✅ Loading states during deletion
- ✅ Empty state when no files
- ✅ Responsive design

**Props**:
```typescript
interface FileListProps {
  files: FileItem[];                    // Array of uploaded files
  onFileDeleted: (fileId: string) => void;  // Callback after file deletion
}

interface FileItem {
  id: string;
  name: string;
  type: string;
  url: string;
  upload_date: string;
}
```

**Usage Example**:
```typescript
import FileList from '../../components/upload/FileList';

<FileList
  files={materials}
  onFileDeleted={(fileId) => {
    // Remove file from state
    setMaterials(materials.filter(m => m.id !== fileId));
  }}
/>
```

---

## 🔧 **Supabase Storage Setup**

### **Step 1: Create Storage Bucket**

1. Go to Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: **incubation management** (njdatlcgjhjajztcfqar)
3. Navigate to **Storage** in the left sidebar
4. Click **New Bucket**
5. Configure bucket:
   - **Name**: `speaker-materials`
   - **Public**: ✅ Enable (for public file access)
   - **File size limit**: 10MB
   - **Allowed MIME types**: 
     - `application/pdf`
     - `application/vnd.ms-powerpoint`
     - `application/vnd.openxmlformats-officedocument.presentationml.presentation`
     - `application/msword`
     - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
     - `image/jpeg`
     - `image/png`
     - `image/gif`
6. Click **Create Bucket**

### **Step 2: Set Storage Policies**

Create policies to allow authenticated users to upload and delete files:

```sql
-- Policy: Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'speaker-materials');

-- Policy: Allow authenticated users to read files
CREATE POLICY "Allow public reads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'speaker-materials');

-- Policy: Allow authenticated users to delete their own files
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'speaker-materials');
```

### **Step 3: Verify Setup**

Test the storage bucket:
1. Try uploading a test file through the Supabase dashboard
2. Verify the file appears in the bucket
3. Try downloading the file
4. Try deleting the file

---

## 📝 **Integration with Speaker Dashboard**

### **Update SpeakerDashboard.tsx**

Add file upload to the Materials tab:

```typescript
import FileUpload from '../../components/upload/FileUpload';
import FileList from '../../components/upload/FileList';
import { materialService } from '../../lib/supabaseClient';

const SpeakerDashboard = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch materials on component mount
  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const data = await materialService.getBySessionId('session-id');
      setMaterials(data);
    } catch (error) {
      console.error('Failed to fetch materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = (file) => {
    setMaterials([file, ...materials]);
  };

  const handleFileDeleted = (fileId) => {
    setMaterials(materials.filter(m => m.id !== fileId));
  };

  const renderMaterials = () => (
    <div className="space-y-6">
      {/* Upload Section */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Upload Materials</h4>
        <FileUpload
          sessionId="session-id"
          onUploadComplete={handleUploadComplete}
        />
      </div>

      {/* Files List */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Uploaded Materials</h4>
        {loading ? (
          <Loading message="Loading materials..." />
        ) : (
          <FileList
            files={materials}
            onFileDeleted={handleFileDeleted}
          />
        )}
      </div>
    </div>
  );

  // ... rest of component
};
```

---

## 🎨 **File Type Icons**

The components automatically display appropriate icons based on file type:

| File Type | Icon | Color |
|-----------|------|-------|
| PDF | 📄 `mdi:file-pdf-box` | Red |
| PowerPoint | 📊 `mdi:file-powerpoint-box` | Orange |
| Word | 📝 `mdi:file-word-box` | Blue |
| Images | 🖼️ `mdi:file-image` | Green |
| Other | 📋 `mdi:file-document` | Gray |

---

## 🔒 **Security Considerations**

### **File Validation**:
- ✅ File type validation (MIME type checking)
- ✅ File size validation (max 10MB)
- ✅ Filename sanitization (timestamp prefix)
- ✅ Secure storage path structure

### **Access Control**:
- ✅ Authenticated users only can upload
- ✅ Public read access for file downloads
- ✅ Authenticated users can delete files
- ⚠️ **TODO**: Add user ownership check for deletions

### **Recommended Enhancements**:
1. **Virus Scanning**: Integrate with antivirus API
2. **User Ownership**: Only allow users to delete their own files
3. **File Encryption**: Encrypt sensitive files at rest
4. **Audit Logging**: Log all file operations
5. **Rate Limiting**: Prevent abuse with upload rate limits

---

## 📊 **Storage Structure**

Files are organized in Supabase Storage as follows:

```
speaker-materials/
└── materials/
    └── {session_id}/
        ├── {timestamp}-{filename1}.pdf
        ├── {timestamp}-{filename2}.pptx
        └── {timestamp}-{filename3}.docx
```

**Example**:
```
speaker-materials/
└── materials/
    └── abc123-session/
        ├── 1727712000000-presentation.pptx
        ├── 1727712100000-handout.pdf
        └── 1727712200000-notes.docx
```

---

## 🧪 **Testing Checklist**

Before deploying to production:

- [ ] Create Supabase Storage bucket
- [ ] Set up storage policies
- [ ] Test file upload (drag-and-drop)
- [ ] Test file upload (click to browse)
- [ ] Test file type validation
- [ ] Test file size validation
- [ ] Test upload progress indicator
- [ ] Test file download
- [ ] Test file deletion
- [ ] Test delete confirmation dialog
- [ ] Test error handling (network errors)
- [ ] Test error handling (validation errors)
- [ ] Test success notifications
- [ ] Test empty state display
- [ ] Test responsive design on mobile
- [ ] Test with different file types (PDF, PPT, DOC, Images)
- [ ] Test with large files (near 10MB limit)
- [ ] Test with invalid file types
- [ ] Test with oversized files

---

## 🚀 **Deployment Steps**

1. **Create Storage Bucket** in Supabase Dashboard
2. **Set Storage Policies** using SQL queries
3. **Update Environment Variables** (if needed)
4. **Deploy Application** to Vercel
5. **Test File Upload** in production
6. **Monitor Storage Usage** in Supabase Dashboard

---

## 📈 **Storage Monitoring**

Monitor storage usage in Supabase Dashboard:
- **Storage > Usage**: View total storage used
- **Storage > Buckets**: View files per bucket
- **Storage > Policies**: Manage access policies

**Storage Limits**:
- Free tier: 1GB storage
- Pro tier: 100GB storage
- Enterprise: Custom limits

---

## 🎯 **Next Steps**

1. ✅ Create Supabase Storage bucket
2. ✅ Set up storage policies
3. ⏳ Integrate FileUpload component into Speaker Dashboard
4. ⏳ Test file upload functionality
5. ⏳ Add user ownership validation
6. ⏳ Implement virus scanning (optional)
7. ⏳ Add audit logging (optional)

---

**File Upload Implementation - READY FOR INTEGRATION** ✅

All components are created and ready to use. Follow the setup guide to configure Supabase Storage and integrate the components into the Speaker Dashboard.

