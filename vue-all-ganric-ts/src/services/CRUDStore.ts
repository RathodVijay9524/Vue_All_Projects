import { ref, type Ref } from 'vue'
import type { CRUDServices } from './CRUDServices'

export function useCRUDStore<T>(service: CRUDServices<T>) {
  const items: Ref<T[]> = ref([])
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

  const fetchById = async (id: number): Promise<T | null> => {
    loading.value = true
    error.value = null
    try {
      return await service.getById(id)
    } catch (err) {
      error.value = `Failed to fetch item with ID ${id}`
      console.error(err)
      return null
    } finally {
      loading.value = false
    }
  }

  const addItem = async (item: Omit<T, 'id'>) => {
    loading.value = true
    error.value = null
    try {
      const newItem = await service.create(item as T) // Cast to T for the service call
      items.value = [...items.value, newItem]
    } catch (err) {
      error.value = 'Failed to add item'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const updateItem = async (item: T & { id: number }, id: number) => {
    loading.value = true
    error.value = null
    try {
      const updatedItem = await service.update(item, id)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const index = items.value.findIndex((i: any) => i.id === id)
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

  const deleteItem = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await service.delete(id)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items.value = items.value.filter((i: any) => i.id !== id)
    } catch (err) {
      error.value = `Failed to delete item with ID ${id}`
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    loading,
    error,
    fetchAll,
    fetchById,
    addItem,
    updateItem,
    deleteItem,
  }
}
