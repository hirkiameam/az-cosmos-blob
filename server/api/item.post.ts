import { CosmosClient } from "@azure/cosmos"

export default defineEventHandler(async (e) => {
  //get post body
  const { content } = await readBody(e)

  const endpoint = process.env.COSMOS_ENDPOINT
  const key = process.env.COSMOS_KEY
  const client = new CosmosClient({ endpoint, key })
  //add sample data to cosmosDB
  const { database } = await client.databases.createIfNotExists({ id: "notes" })
  const { container } = await database.containers.createIfNotExists({ id: "items" })
  const item = {
    name: content
  }
  const { resource } = await container.items.create(item)
  return resource.id
})