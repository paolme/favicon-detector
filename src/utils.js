'use strict'

export function computeArea(size) {
  const sizeRegexp = /^\d+x\d+$/ // example: 16x16
  if (sizeRegexp.test(size)) {
    return size.split('x').map(Number).reduce((m, n) => m * n, 1)
  } else {
    return 0
  }
}

export async function getPageInfo() {
  const result = await browser.tabs.executeScript({
    code: `({
      url: document.URL
    , html: document.querySelector('html').outerHTML
    })`
  })
  return result[0]
}

export function setClipboard(text) {
  const textarea = document.createElement('textarea')
  textarea.textContent = text
  const body = document.querySelector('body')
  body.appendChild(textarea)
  textarea.select()
  document.execCommand('Copy', false, null)
  body.removeChild(textarea)
}

export function getRemoteImageSize(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => {
      resolve(`${ img.width }x${ img.height }`)
    })
    img.addEventListener('error', reject)
    img.src = url
  })
}
