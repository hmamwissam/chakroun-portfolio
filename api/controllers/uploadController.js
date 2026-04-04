export const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier téléchargé' });
    }
    
    // Return the relative path to be stored in the database
    // The frontend should prepend the backend URL if needed, 
    // but usually it's better to store it relative to the uploads folder or root.
    const filePath = `/uploads/${req.file.filename}`;
    res.status(200).json({ 
      message: 'Téléchargement réussi', 
      filePath: filePath 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
