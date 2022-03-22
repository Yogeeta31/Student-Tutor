const {BlobServiceClient}=require("@azure/storage-blob");
let multipart=require("parse-multipart");
const AZURE_STORAGE_CONNECTION_STRING=process.env["AZURE_STORAGE_CONNECTION_STRING"];
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let bodyBuffer=Buffer.from(req.body);
    let boundary=multipart.getBoundary(req.headers['content-type']);
    var parts=multipart.Parse(bodyBuffer,boundary);
    const blobServiceClient=await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const blobName=parts[0].filename;
    let container="resume";
    const containerClient=await blobServiceClient.getContainerClient(container);
    
    const blockBlobClient=containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse=await blockBlobClient.upload(parts[0].data,parts[0].data.length);
    context.res={body:{name:parts[0].filename,type:parts[0].type,data:parts[0].data.length,title:parts[0].filename.replace(/\.[^/.]+$/, "")+Math.random().toString(36).slice(2),extension:blobName.substring(blobName.lastIndexOf('.')+1, blobName.length) || blobName}};
    context.done();
}
