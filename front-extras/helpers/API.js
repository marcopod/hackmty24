const API = {
    call: async function (
        route,
        method,
        data = {},
    ) {
        return fetch(route , {
            method: method,
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })    
          .then((response) => response.json())  
    }
}

export async function analyzeBitacora( Bitacora, User) {
    console.log(User)
    return API.call("/api/apiGpt", "POST", {
        content: Bitacora.content, 
        date: Bitacora.date,
        user: User.sid
    })
}

export async function saveBitacora(Bitacora, User) {
    return API.call("/api/createLog", "POST",
        {
          title: Bitacora.title,
          date: Bitacora.date,
          content: Bitacora.content,
          user: User.sid
        }
      )

}

export async function getBitacora( User,date) {
    return API.call("/api/getLog", "POST",
        {
          date: date,
          user: User.sid
        }
      )

}
