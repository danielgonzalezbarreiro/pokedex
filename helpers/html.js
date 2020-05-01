function pageLayout({ title, content }) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>${title}</title>
    
    <link rel="stylesheet" href="/css/style.css" />
  </head>
  <body>
    <header>
      <h1><a href="/">Pokedex!</a></h1>
    </header>

      ${content}
  
    </body>
  </html>
  `;
}

function frontPage() {
  return `
  <section>
    <form action="/search" method="GET">
      <fieldset>
        <label for="query">Atopa o teu Pokemon</label>
        <input type="search" name="query" id="query" /> 
      </fieldset>
      <button>Atopar</button>
    </form>
  </section>
  `;
}

function searchResults({ results }) {
  const resultsHtml = results.map((result) => {
    const { english, japanese } = result.name;

    return `<li>
              <a href="/pokemon/${result.id}"> ${english} / ${japanese}
            </li>`
  })


  return `
  <section>
    <ul>
      ${resultsHtml.join('')}
    </ul>
  </section>
  `;
}

function showPokemon({ pokemon }) {
  const { id, name, type, base } = pokemon;
  return `
    <article>
      <header>
        <img src="/images/${imagePath({ id })}" />
        <h1>${name.english}</h1>
        <p>${type.join(', ')}</p>
      </header>
      
      <section>
        <h2>Calidades:</h2>
        <ul>
        <li>Vida: ${base.HP}</li>
        <li>Ataque: ${base.Attack}</li>
        <li>Defensa: ${base.Defense}</li>
        <li>Sp. Ataque: ${base['Sp. Attack']}</li>
        <li>Sp. Defensa: ${base['Sp. Defense']}</li>
        <li>Velocidade: ${base.Speed}</li>
        </ul>
      <section>
    
    </article>
  `
}

function imagePath({ id, suf = "", ext = "png" }) {
  const fixedId = String(id).padStart(3, 0);
  return `/${fixedId}${suf}.${ext}`;
}

function errorPage(message) {
  return `
    <section class="error">
      <p>${message}</p>
      <a href="/">Volver a la portada</a>
    </section>
  `;
}

module.exports = {
  pageLayout,
  frontPage,
  errorPage,
  searchResults,
  showPokemon,
};
