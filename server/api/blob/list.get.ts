import { BlobServiceClient } from "@azure/storage-blob"

export default defineEventHandler(async (e) => {
  const { c } = getQuery(e)
  const connStr = process.env.AZURE_STORAGE_CONNECTION_STRING
  const blobServiceClient = BlobServiceClient.fromConnectionString(connStr)

  //コンテナー内のblobを全て取得する
  const containerClient = blobServiceClient.getContainerClient(c || 'images')
  const blobs = []
  for await (const blob of containerClient.listBlobsFlat()) {
    blobs.push(blob)
  }
  return blobs

})