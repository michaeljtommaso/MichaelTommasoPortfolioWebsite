const textArray = Array.from(document.querySelectorAll('[data-cell]'))
const num1 = document.getElementById('num1')
const num2 = document.getElementById('num2')
const ratio = document.getElementById('ratio')

window.addEventListener('keydown', e => {
  if (e.key != 'Enter') return
  if (num1.value == '' || num2.value == '' || ratio.value == '') return
  const int1 = parseInt(num1.value)
  const int2 = parseInt(num2.value)
  const ratio1 = parseInt(ratio.value[0])
  const ratio2 = parseInt(ratio.value[2])
  const expected = (int1 + int2) / 4
  const expected1 = Math.ceil(expected * ratio1)
  const expected2 = Math.floor(expected * ratio2)
  const max1 = Math.max(int1, expected1)
  const max2 = Math.max(int2, expected2)
  const min1 = Math.min(int1, expected1)
  const min2 = Math.min(int2, expected2)
  const deviation1 = max1 - min1
  const deviation2 = max2 - min2
  const d2_1 = deviation1 * deviation1
  const d2_2 = deviation2 * deviation2
  const d2_e_a = `${d2_1 / expected1}`
  const d2_e_b = `${d2_2 / expected2}`
  update1(expected1)
  update2(expected2)
  update3(deviation1)
  update4(deviation2)
  update5(d2_1)
  update6(d2_2)
  if (d2_e_a[0] != '0' || d2_e_b[0] != '0') {
    const d2_e_1 = parseInt(d2_e_a[0] + d2_e_a[1] + d2_e_a[2])
    const d2_e_2 = parseInt(d2_e_b[0] + d2_e_b[1] + d2_e_b[2])
    const chiSquare = d2_e_1 + d2_e_2
    update7(d2_e_1)
    update8(d2_e_2)
    update9(chiSquare)
    update10()
  } else {
    const d2_e_1 = parseInt(d2_e_a[2] + d2_e_a[3])
    const d2_e_2 = parseInt(d2_e_b[2] + d2_e_b[3])
    const chiSquare = d2_e_1 + d2_e_2
    update7(`${'.' + d2_e_1}`)
    update8(`${'.' + d2_e_2}`)
    update9(`${'.' + chiSquare}`)
  }
})

function update1 (num) {
  const p = document.createElement('p')
  const textNode = document.createTextNode(num)
  p.classList.add('txt')
  p.appendChild(textNode)
  textArray[9].appendChild(p)
}

function update2 (num) {
  const p = document.createElement('p')
  const textNode = document.createTextNode(num)
  p.classList.add('txt')
  p.appendChild(textNode)
  textArray[2].appendChild(p)
}

function update3 (num) {
  const p = document.createElement('p')
  const textNode = document.createTextNode(num)
  p.classList.add('txt')
  p.appendChild(textNode)
  textArray[10].appendChild(p)
}

function update4 (num) {
  const p = document.createElement('p')
  const textNode = document.createTextNode(num)
  p.classList.add('txt')
  p.appendChild(textNode)
  textArray[3].appendChild(p)
}

function update5 (num) {
  const p = document.createElement('p')
  const textNode = document.createTextNode(num)
  p.classList.add('txt')
  p.appendChild(textNode)
  textArray[11].appendChild(p)
}

function update6 (num) {
  const p = document.createElement('p')
  const textNode = document.createTextNode(num)
  p.classList.add('txt')
  p.appendChild(textNode)
  textArray[4].appendChild(p)
}

function update7 (num) {
  const p = document.createElement('p')
  const textNode = document.createTextNode(num)
  p.classList.add('txt')
  p.appendChild(textNode)
  textArray[12].appendChild(p)
}

function update8 (num) {
  const p = document.createElement('p')
  const textNode = document.createTextNode(num)
  p.classList.add('txt')
  p.appendChild(textNode)
  textArray[5].appendChild(p)
}

function update9 (num) {
  const p = document.createElement('p')
  const textNode = document.createTextNode(num)
  p.classList.add('txt')
  p.appendChild(textNode)
  textArray[13].appendChild(p)
}

function update10 (num) {
  const p = document.createElement('p')
  let textNode
  if (num > 2.7) {
    textNode = document.createTextNode('Yes')
  } else {
    textNode = document.createTextNode('Yes')
  }
  p.classList.add('txt')
  p.appendChild(textNode)
  textArray[6].appendChild(p)
}
