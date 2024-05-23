const {Storage} = require("@google-cloud/storage");
const storage = new Storage;
const bucketName = 'bckt-exmpl1' //nama-bucket
const filePath = './image/dicoding-header-logo.png' //lokasi path gambar

async function getOrCreateBucket(bucketName) {
   const bucket = storage.bucket(bucketName);
   try {
      const [metadata] = await bucket.getMetadata();
      console.log(`Bucket ${metadata.name} sudah tersedia!`);
      return bucket;
   } catch (error) {
      const optionsCreateBucket = {
         location: 'ASIA-SOUTHEAST2' //region untuk bucket
      }

      await storage.createBucket(bucketName, optionsCreateBucket);
      console.log(`${bucketName} bucket created successfully`);
      return bucket;
   }
}

async function upload(bucket) {
   try {
      const customMetadata = {
         contentType: 'image/jpeg',
         metadata: {
            type: "header-logo"
         }
      };

      const optionsUploadObject = {
         destination: 'dicoding-header-logo.png',
         preconditionopts: {ifGenerationMatch: 0},
         metadata: customMetadata
      };
      await storage.bucket(bucketName).upload(filePath, optionsUploadObject);
      console.log(`${filePath} uploaded to ${bucketName}`);
   } catch (uploadError) {
      console.log(`Gagal mengupload ${filePath}:`, uploadError.message);
   }
}

getOrCreateBucket(bucketName).then((bucket) => upload(bucket)).catch(console.error);