import { onMount } from 'solid-js'
import { marked } from 'marked'
import './App.scss'

async function loadMd(name: string) {

  // 1. Próba wczytania pliku
  const file = await fetch("/content/" + name + ".md")
  if (file.ok) {
    console.log("[loadMd] Wczytano plik:", name)

    return file.text()
  }

  // 2. Próba wczytania folder/index.md


  // 3. Próba wczytania globalnego index.md
  const globalIndex = await fetch("/content/index.md")
  if (globalIndex.ok) {
    console.log("[loadMd] Wczytano global index.md")
    return globalIndex.text()
  }

  console.log("[loadMd] Nie znaleziono:", name)
  return null
}

function App() {
  onMount(async () => {
    console.log("[App] Start")

    const params = new URLSearchParams(window.location.search)
    const documentName = params.get("document") || "index"

    console.log("[App] document =", documentName)

    const md = await loadMd(documentName)

    if (!md) {
      console.log("[App] md == null → error")
      document.getElementById("preview")!.innerHTML =
        "<h2>Nie znaleziono dokumentu</h2>"
      return
    }

    console.log("[App] Markdown długość:", md.length)

    const html = marked.parse(md)
    console.log("[App] HTML wygenerowany")

    document.getElementById("preview")!.innerHTML = html
    console.log("[App] HTML wyrenderowany")
document.querySelector("h1").innerHTML = document.querySelector("h1")?.innerHTML + `<svg class="sun hide" width="24" height="18" viewBox="0 0 24 24" fill="none" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
<svg class="moon" width="24" height="18" viewBox="0 0 24 24" fill="none" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>
`
document.querySelectorAll(".moon, .sun").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".moon, .sun").forEach((item) => {item.classList.toggle("hide")})
    document.querySelector("body")?.classList.toggle("light")
  })
})
    document.querySelectorAll("#preview a").forEach(item => {
      if (!item.href.startsWith("https://"))
        
      item.href = "/index.html?document=" + item.href.replace("//", "").split("/")[1]
    })
        document.querySelectorAll("img").forEach(item => {
      item.src = "/assets/" + item.src.replace("//", "").split("/")[1]
    })
  })
document.querySelectorAll("iframe .player").forEach(item => {
  item.style = ""
})


  return (
    <>
<header>
  Autorem dokumentacji jest serwis mikr.us oraz jego społeczność.
  Chcesz dołożyć swoją cegiełkę — dodać coś własnego lub poprawić istniejące treści?
  Odwiedź repozytorium: <a href="https://github.com/Mrugalski-pl/mikrus-dokumentacja/">mikrus-dokumentacja</a> i zrób PR.
  Po więcej informacji <a href="?document=instrukcja_poprawki">kliknij tutaj</a>
  
</header>

      <div id="preview"></div>
    </>
  )
}

export default App
