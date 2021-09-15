const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const tempDyr = path.resolve(__dirname, '..', '..', 'imagens');

module.exports = {
    directory: tempDyr,
    storage: multer.diskStorage({
        destination: tempDyr,
        filename(request, file, callback) {
            const nomeHash = crypto.randomBytes(10).toString('HEX');
            const nomeArquivo = `${nomeHash}-${file.originalname}`;

            return callback(null, nomeArquivo);
        }
    })
}