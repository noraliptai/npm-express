console.log('loaded')
const rootElement = document.querySelector("#root")

const skeleton = () => `
  <header></header>
  <main></main>
`

const inputComponent = () => `
  <div>
    <input type="text" name="beer-id" class="form-control" id="exampleFormControlInput1" placeholder="Enter beer ID">
    <button type="button" class="btn btn-outline-info">fetch!</button>
  </div>
`

const beerComponent = ({name, id, abv}) => `
  <div class="card text-bg-success mb-3" style="max-width: 18rem;">
    <h2 class="card-header">${name}</h2>
    <div class="card-body">
      <h3 class="card-title">abv: ${abv}%</h3>
      <h4 class="card-text">id: ${id}</h4>
    </div>
  </div>
`

const errorComponent = ({error, message}) => `
<div class="card text-bg-danger mb-3" style="max-width: 18rem;">
  <div class="card-body">  
    <h2 class="card-header">${error}</h2>
    <h3 class="card-text">${message}</h3>
  </div>
</div>
`

const fetchUrl = async (url) => {
  const response = await fetch(url)
  return response.json()

  // if (data.ok) {
  //   /* ha a kapott válasz OK status kóddal rendelkezik */
  //   return data.json()
  // } else if (data.status === 400 || data.status === 404) {
  //   return data.json()
  // } else {
  //   /* ha a kapott válasz nem OK status kóddal rendelkezik */
  //   return "bad request"
  // }
}

const makeDomFromData = (element, data) => {
  element.innerHTML = skeleton()

  const headerElement = document.querySelector("header")
  const mainElement = document.querySelector("main")

  headerElement.insertAdjacentHTML("beforeend", inputComponent())

  const buttonElement = document.querySelector("button")
  
  buttonElement.addEventListener("click", async () => {
    const beerId = document.querySelector("input").value
    const newBeerData = await fetchUrl(`/beers/${beerId}`)
    makeDomFromData(rootElement, newBeerData)
  })

  if (data.id) mainElement.insertAdjacentHTML("beforeend", beerComponent(data))
  else if (data.length) data.forEach(beer => mainElement.insertAdjacentHTML("beforeend", beerComponent(beer)))
  else mainElement.insertAdjacentHTML("beforeend", errorComponent(data))
}

async function init() {
  const beerData = await fetchUrl("/beers")
  
  makeDomFromData(rootElement, beerData)
  
  /* if (beerData === "bad request") {
    rootElement.innerHTML = "BAD USER"
  } else {
    rootElement.innerHTML = JSON.stringify(beerData)
  } */
}

init()