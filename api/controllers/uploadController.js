export const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier téléchargé' });
    }
    
    // The file path is now the absolute Cloudinary URL provided by multer-storage-cloudinary
    const filePath = req.file.path;
    res.status(200).json({ 
      message: 'Téléchargement réussi', 
      filePath: filePath 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
