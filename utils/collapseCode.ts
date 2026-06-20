const EXPANDED_CLASS = 'code-block-expanded'
const FOLDABLE_CLASS = 'code-foldable'

let codeHeightLimit = 0

function getLimitClass(limit: number) {
  return `max-h-${limit}px`
}

function getHeightViaClone(el: HTMLElement) {
  const clone = el.cloneNode(true) as HTMLElement
  clone.style.cssText = `
    position: absolute;
    visibility: hidden;
    display: block;
    left: -9999px;
  `
  document.body.appendChild(clone)
  const height = clone.scrollHeight
  document.body.removeChild(clone)
  return height
}

function getToggleButton(el: HTMLElement) {
  return el.querySelector<HTMLButtonElement>('button.code-block-unfold-btn')
}

function setButtonState(btn: HTMLButtonElement, expanded: boolean) {
  btn.textContent = ''
  btn.classList.toggle('is-expanded', expanded)
  btn.setAttribute('aria-label', expanded ? '收起代码' : '展开代码')
  btn.setAttribute('aria-expanded', String(expanded))
  btn.type = 'button'
}

function foldBlock(el: HTMLElement, limit: number) {
  const limitClass = getLimitClass(limit)
  el.classList.add('folded')
  el.classList.remove(EXPANDED_CLASS)
  el.classList.add(limitClass)

  const btn = getToggleButton(el)
  if (btn)
    setButtonState(btn, false)
}

function unfoldBlock(el: HTMLElement, limit: number) {
  const limitClass = getLimitClass(limit)
  el.classList.remove('folded')
  el.classList.add(EXPANDED_CLASS)
  el.classList.remove(limitClass)

  const btn = getToggleButton(el)
  if (btn)
    setButtonState(btn, true)
}

function prepareBlock(el: HTMLElement, limit: number) {
  const btn = getToggleButton(el)
  if (!btn)
    return

  const height = getHeightViaClone(el)
  if (height <= limit) {
    el.classList.remove(FOLDABLE_CLASS, 'folded', EXPANDED_CLASS)
    btn.hidden = true
    return
  }

  btn.hidden = false
  el.classList.add(FOLDABLE_CLASS)

  if (el.classList.contains(EXPANDED_CLASS)) {
    setButtonState(btn, true)
    return
  }

  foldBlock(el, limit)
}

export function applyCodeBlockFold() {
  const limit = codeHeightLimit
  if (typeof document === 'undefined' || limit <= 0)
    return

  document.querySelectorAll<HTMLElement>('div[class*="language-"]').forEach((el) => {
    prepareBlock(el, limit)
  })
}

let initialized = false

export function initCodeBlockFold(limit: number) {
  if (typeof document === 'undefined' || limit <= 0)
    return

  codeHeightLimit = limit

  if (!initialized) {
    initialized = true
    document.addEventListener('click', (event) => {
      const target = event.target
      if (!(target instanceof Element))
        return

      const btn = target.closest('button.code-block-unfold-btn')
      if (!(btn instanceof HTMLButtonElement))
        return

      const parent = btn.parentElement
      if (!(parent instanceof HTMLElement) || !parent.classList.contains(FOLDABLE_CLASS))
        return

      event.preventDefault()
      event.stopImmediatePropagation()

      if (parent.classList.contains(EXPANDED_CLASS))
        foldBlock(parent, codeHeightLimit)
      else
        unfoldBlock(parent, codeHeightLimit)
    }, true)
  }

  applyCodeBlockFold()
  requestAnimationFrame(() => applyCodeBlockFold())
}
