import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CRUDServices } from './CRUDServices'

type Identifiable = { id: number }

export function createGenericStore<T extends Identifiable>(
  storeId: string,
  service: CRUDServices<T>,
) {
  return defineStore(storeId, () => {
    const items = ref<T[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchAll = async () => {
      loading.value = true
      error.value = null
      try {
        items.value = await service.getAll()
      } catch (err) {
        error.value = 'Failed to fetch items'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    const fetchById = async (id: number) => {
      loading.value = true
      error.value = null
      try {
        return await service.getById(id)
      } catch (err) {
        error.value = `Failed to fetch item with ID ${id}`
        console.error(err)
        throw err
      } finally {
        loading.value = false
      }
    }
    /*
    const addItem = async (item: T) => {
      loading.value = true
      error.value = null
      try {
        const newItem = await service.create(item)
        items.value = [...items.value, newItem]
      } catch (err) {
        error.value = 'Failed to add item'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    const updateItem = async (item: T, id: number) => {
      loading.value = true
      error.value = null
      try {
        const updatedItem = await service.update(item, id)
        const index = items.value.findIndex((i) => i.id === id)
        if (index !== -1) {
          items.value.splice(index, 1, updatedItem)
        }
      } catch (err) {
        error.value = `Failed to update item with ID ${id}`
        console.error(err)
      } finally {
        loading.value = false
      }
    }
*/
    const deleteItem = async (id: number) => {
      loading.value = true
      error.value = null
      try {
        await service.delete(id)
        const index = items.value.findIndex((i) => i.id === id)
        if (index !== -1) {
          items.value.splice(index, 1)
        }
      } catch (err) {
        error.value = `Failed to delete item with ID ${id}`
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    return { items, loading, error, fetchAll, fetchById, deleteItem }
  })
}
