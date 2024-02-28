import { BlobServiceClient, BlockBlobClient, ContainerClient } from "@azure/storage-blob"

export default defineEventHandler(async (e) => {
  // 接続文字列を取得
  const connStr = process.env.AZURE_STORAGE_CONNECTION_STRING ?? ""
  // blobサービスクライアントを作成
  const blobServiceClient = BlobServiceClient.fromConnectionString(connStr)
  // マルチパートフォームデータを読み込む
  const files = await readMultipartFormData(e) ?? []
  const file = files[0]
  const filename = file?.filename ?? ""
  const data = file?.data ?? ""
  // コンテナクライアントを取得
  const containerClient = blobServiceClient.getContainerClient('images')
  // ブロックブロブクライアントを設定
  const blockBlobClient = containerClient.getBlockBlobClient(filename)
  // ブロックブロブにアップロード
  await blockBlobClient.upload(data, data.length)
  console.log(blockBlobClient.url)
})