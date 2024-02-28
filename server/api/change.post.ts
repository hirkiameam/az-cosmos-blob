import { CosmosClient } from "@azure/cosmos"

export default defineEventHandler(async (e) => {
  const { id } = getQuery(e)
  const endpoint = process.env.COSMOS_ENDPOINT
  const key = process.env.COSMOS_KEY
  const client = new CosmosClient({ endpoint, key })

  const { database } = await client.databases.createIfNotExists({ id: "notes" })
  const { container } = await database.containers.createIfNotExists({ id: "items" })
  const { resource } = await container.item(id).read()
  resource.changed = "changed"
  const { resource: result } = await container.items.upsert(resource)
  return result
})
