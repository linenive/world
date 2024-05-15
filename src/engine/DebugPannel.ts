let pannel: HTMLDivElement

export class DebugPannel {
  init() {
    pannel = document.createElement('div')
    pannel.style.position = 'fixed'
    pannel.style.top = '0'
    pannel.style.right = '0'
    pannel.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    pannel.style.color = 'white'
    pannel.style.width = '200px'
    pannel.style.height = '400px'
    pannel.style.zIndex = '1000'
    document.body.appendChild(pannel)
  }

  update() {
    pannel.innerText = 'Hello, World!'
  }
}
