const {Firestore} = require("@google-cloud/firestore");
const db = new Firestore;

async function store_data() {
   const doctorsCollections = db.collection('dokter');
   console.log("Collections 'dokter berhasil dibuat");

   const fannyDoc = await doctorsCollections.doc("Dokter Fanny");
   console.log("Dokumen atas nama Dokter Fanny berhasil dibuat");

   const profileFanny = {
      nama: "dr.Fanny",
      keahlian: "Dokter Syaraf",
      almameter: "Universitas Gadjah Mada"
   }
   await fannyDoc.set(profileFanny);
   console.log("Data berhasil ditambahkan ke dokumen Fanny");

   const fannySubcollections = fannyDoc.collection("Konsultasi");
   console.log("Subcollection Konsultasi berhasil dibuat");

   const historyConsultations = {
      nama_pasien: {
         depan: "Ivan",
         belakang: "Gunawan"
      },
      waktu_konsultasi: Date.now().toString()
   }
   await fannySubcollections.doc("Antony").set(historyConsultations);
   console.log("Data berhasil ditambahkan");
}

store_data().catch(console.error);