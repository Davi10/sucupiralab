import puppeteer from 'puppeteer'

const BASE = 'http://localhost:5173/#'
const OUT  = 'screenshots/'

const pages = [
  { file: '01-login.jpg',               hash: '/login' },
  { file: '02-prestacoes.jpg',          hash: '/prestacoes' },
  { file: '03-discursos.jpg',           hash: '/discursos' },
  { file: '04-projetos.jpg',            hash: '/projetos' },
  { file: '05-orientacoes.jpg',         hash: '/orientacoes' },
  { file: '06-nucleacao.jpg',           hash: '/nucleacao' },
  { file: '07-producao.jpg',            hash: '/producao' },
  { file: '08-internacionalizacao.jpg', hash: '/internacionalizacao' },
  { file: '09-submissoes.jpg',          hash: '/submissoes' },
]

const browser = await puppeteer.launch({ headless: true })
const page    = await browser.newPage()
await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 })

// Enter demo mode once (sets localStorage flag)
await page.goto(`${BASE}/login`, { waitUntil: 'networkidle0' })
await page.waitForSelector('button')

// Click "Modo demonstração"
const btns = await page.$$('button')
for (const btn of btns) {
  const txt = await btn.evaluate(el => el.textContent)
  if (txt.includes('demonstra')) { await btn.click(); break }
}
await page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {})
await new Promise(r => setTimeout(r, 800))

// Screenshot each page
for (const { file, hash } of pages) {
  if (hash === '/login') {
    // Login page — reload without demo flag
    await page.evaluate(() => localStorage.removeItem('sucupira_demo_logged_in'))
    await page.goto(`${BASE}/login`, { waitUntil: 'networkidle0' })
    await new Promise(r => setTimeout(r, 600))
    await page.screenshot({ path: `${OUT}${file}`, type: 'jpeg', quality: 92, fullPage: false })
    // Re-enter demo mode
    await page.evaluate(() => localStorage.setItem('sucupira_demo_logged_in', 'true'))
    await page.goto(`${BASE}/prestacoes`, { waitUntil: 'networkidle0' })
    await new Promise(r => setTimeout(r, 600))
    continue
  }
  await page.evaluate(h => { window.location.hash = h }, hash)
  await new Promise(r => setTimeout(r, 900))
  await page.screenshot({ path: `${OUT}${file}`, type: 'jpeg', quality: 92, fullPage: false })
  console.log('✓', file)
}

await browser.close()
console.log('\nDone — screenshots saved.')
