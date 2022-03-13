export function setLocalStorage(key, value) {
  return new Promise((resolve, reject) => {
    if (!key) reject()

    const instance = localStorage.setItem(key, value)
    resolve(instance)
  })
}

export function getLocalStorage(key) {
  return localStorage.getItem(key)
}