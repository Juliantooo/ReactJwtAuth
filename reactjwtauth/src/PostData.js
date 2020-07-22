export const login = (email, password) => {
  const baseurl = 'https://setupyourtask.herokuapp.com/api/auth/'
  const url = `${baseurl}login`
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.status === 401) reject({ msg: '401 bossque' })
        return res.json()
      })
      .then((data) => resolve(data))
      .catch((err) => reject(err))
  })
}

