// images/20220227_223524.png
const storage = require("./init-firebase");
const { ref, uploadBytes, getDownloadURL, deleteObject } = require("firebase/storage");

// UPLOAD IMAGE TO BUCKET
const uploadFile = async (files) => {
  const outputFiles = [];
  for (let i = 0; i < files.length; i++) {
    console.log("iteration", i);
    const storageRef = ref(storage, "images/" + files[i].originalname);
    const metadata = {
      contentType: files[i].mimetype
    };
    try {
      const uploadedFileData = await uploadBytes(storageRef, files[i].buffer, metadata);
      const downloadURL = await getDownloadURL(storageRef);
      outputFiles.push({ imageUrl: downloadURL, reference: uploadedFileData.metadata.fullPath });
    } catch (error) {
      console.log(error);
    }
  }
  return outputFiles;
};

// DELETE IMAGE ON BUCKET
const deleteFile = async (fileReference) => {
  const storageRef = ref(storage, fileReference);

  // Delete the file
  deleteObject(storageRef)
    .then((res) => {
      console.log(res);
      // File deleted successfully
      console.log("file deleted");
      return;
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error);
    });
};

module.exports = { deleteFile, uploadFile };
