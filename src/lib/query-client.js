// Simple query client placeholder
// Replace with @tanstack/react-query or your preferred query library
const cache = new Map()

class SimpleQueryClient {
  get(key) {
    return cache.get(key)
  }
  
  set(key, value) {
    cache.set(key, value)
  }
  
  remove(key) {
    cache.delete(key)
  }
  
  clear() {
    cache.clear()
  }
}

export const queryClient = new SimpleQueryClient()
