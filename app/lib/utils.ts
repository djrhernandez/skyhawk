export const sortKeyValueEntries = (obj) => {
  return Object.entries(obj).sort(([, a], [, b]) => a - b).reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
}

export const getTitle = (path) => {
    let title = 'Dashboard'
    const newPath = path.split('/')

    switch(newPath[1]) {
      case 'owner':
        title = 'Owner'
      break;
      case 'borough':
        title = 'Borough'
      break;
      default:
        return title = 'Dashboard'
    }

    return title
}

export const getData = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 200)
  })
}
