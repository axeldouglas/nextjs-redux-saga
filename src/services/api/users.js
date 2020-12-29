// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export function getUsers(req, res) {
  // res.statusCode = 200
  // res.setHeader('Content-Type', 'application/json')
  return ({
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496"
      }
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets"
    }
  });

  // try {
  //   const res = yield fetch('https://jsonplaceholder.typicode.com/users')
  //   const data = yield res.json()
  //   yield put(loadDataSuccess(data))
  // } catch (err) {
  //   yield put(failure(err))
  // }
}
