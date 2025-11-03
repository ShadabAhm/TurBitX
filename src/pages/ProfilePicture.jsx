import React, { useState, useRef, useEffect } from "react";

const ProfilePicture = ({ image, onChange, userInitial }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }

      const previewURL = URL.createObjectURL(file);
      setPreviewSrc(previewURL);
      setSelectedFile(file);
      setShowPreview(true);
      setShowMenu(false);
    }
    
    // Reset file input
    event.target.value = '';
  };

  const handleConfirmUpload = () => {
    if (selectedFile) {
      // Convert file to base64 for permanent storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        onChange(base64Image); // Pass base64 string to parent
        setShowPreview(false);
        
        // Clean up object URL
        URL.revokeObjectURL(previewSrc);
        setSelectedFile(null);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemovePicture = () => {
    onChange(null);
    setShowMenu(false);
  };

  const handleViewPicture = () => {
    if (image) {
      setPreviewSrc(image);
      setShowPreview(true);
      setShowMenu(false);
    }
  };

  const handleUploadPicture = () => {
    fileInputRef.current?.click();
    setShowMenu(false);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    
    // Clean up object URL if it's a new upload that wasn't confirmed
    if (previewSrc !== image && selectedFile) {
      URL.revokeObjectURL(previewSrc);
      setSelectedFile(null);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Avatar */}
      <div className="relative">
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setShowMenu(!showMenu)}
          />
        ) : (
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 text-4xl font-bold shadow-xl cursor-pointer hover:from-gray-300 hover:to-gray-400 transition-all"
          >
            {userInitial}
          </div>
        )}

        {/* Camera Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
          title="Change profile picture"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7h2l1-2h12l1 2h2a2 2 0 012 2v11a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11a3 3 0 100 6 3 3 0 000-6z"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <div 
          ref={menuRef}
          className="absolute top-36 bg-white shadow-lg rounded-lg w-48 border border-gray-200 z-10 animate-in fade-in-0 zoom-in-95"
        >
          <button
            onClick={handleViewPicture}
            disabled={!image}
            className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
              image 
                ? "hover:bg-gray-50 text-gray-700" 
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Picture
          </button>
          
          <button
            onClick={handleUploadPicture}
            className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-gray-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload Picture
          </button>
          
          {image && (
            <button
              onClick={handleRemovePicture}
              className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors text-red-600 border-t border-gray-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove Picture
            </button>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Image Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 animate-in fade-in-0">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full mx-4 animate-in fade-in-0 zoom-in-95">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              {previewSrc === image ? "Profile Picture" : "Confirm Upload"}
            </h3>
            
            <div className="flex justify-center mb-6">
              <img
                src={previewSrc}
                alt="Preview"
                className="w-48 h-48 rounded-full object-cover border-4 border-gray-100 shadow-lg"
              />
            </div>
            
            <div className="flex justify-center gap-3">
              {previewSrc !== image ? (
                <button
                  onClick={handleConfirmUpload}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Confirm Upload
                </button>
              ) : null}
              
              <button
                onClick={handleClosePreview}
                className="bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-400 transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;