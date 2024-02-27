import { CosmosClient } from "@azure/cosmos"

export default defineEventHandler(async (e) => {
  const endpoint = process.env.COSMOS_ENDPOINT
  const key = process.env.COSMOS_KEY
  const client = new CosmosClient({ endpoint, key })

  const { database } = await client.databases.createIfNotExists({ id: "notes" })
  const { container } = await database.containers.createIfNotExists({ id: "items" })
  console.log(container.id)
  // get all items from cosmosDB
  const { resources } = await container.items.readAll().fetchAll()
  return resources
})
