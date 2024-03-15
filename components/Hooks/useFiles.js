const files = require('@/services/files');

export default function useFiles() {
    const uploadFile = async (name, description, user_id, file) => {
        const file_ = await files.uploadFile(name, description, user_id, file);
        return file_;
    }

    const findAll = async () => {
        const files_ = await files.findAll();
        return files_;
    }

    const checkFileExists = async (filename) => {
        const file_ = await files.checkFileExists(filename);
        return file_;
    }

    const deleteFile = async (filename) => {
        const file_ = await files.deleteFile(filename);
        return file_;
    }

    const destroy = async (id) => {
        const file_ = await files.destroy(id);
        return file_;
    }

  return {
    uploadFile,
    findAll,
    checkFileExists,
    deleteFile,
    destroy,
  }
}
