import { CosmosClient } from "@azure/cosmos"

export default defineEventHandler(async (e) => {
  const { id: targetid } = await readBody(e)
  const endpoint = process.env.COSMOS_ENDPOINT
  const key = process.env.COSMOS_KEY
  const client = new CosmosClient({ endpoint, key })
  //delete cosmosDB item by id is targetid
  const container = client.database("notes").container("items")
  await container.item(targetid).delete();
})