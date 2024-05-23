const {Storage, Bucket} = require('@google-cloud/storage');

const storage = new Storage;

const bucketName = 'bckt-exmpl1' //nama-bucket
const fileName = 'dicoding-header-logo.png' //nama-file

async function download() {
   const options = {
      destination: './image/dicoding-download.png'

   }

   await storage.bucket(bucketName).file(fileName).download(options);
   console.log('Objek berhasil didownload');
}

download().catch(console.error)