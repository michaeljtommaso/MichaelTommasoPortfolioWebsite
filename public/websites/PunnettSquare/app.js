const textArray = Array.from(document.querySelectorAll('[data-cell]'))
const text1 = document.getElementById('text1')
const text2 = document.getElementById('text2')
const text3 = document.getElementById('text3')
const text4 = document.getElementById('text4')
const text5 = document.getElementById('text5')
const text6 = document.getElementById('text6')
const text7 = document.getElementById('text7')
const text8 = document.getElementById('text8')
const btn = document.getElementById('btn')
const btn1 = document.getElementById('btn2')
const gtype = document.getElementById('gytpe')
const ptype1 = document.getElementById('ptype1')
const ptype2 = document.getElementById('ptype2')
const ptype3 = document.getElementById('ptype3')
const ptype4 = document.getElementById('ptype4')
const pRes1 = document.getElementById('pres1')
const pRes2 = document.getElementById('pres2')
const pRes3 = document.getElementById('pres3')
const pRes4 = document.getElementById('pres4')
let refresh = false
let domNum = 0
let oneNum = 0
let twoNum = 0
let recNum = 0

btn1.addEventListener('click', () => {
  if (text1.value !== '' || text2.value !== '' || text3.value !== '' || text4.value !== '') {
    text5.setAttribute('value', text1.value)
    text6.setAttribute('value', text2.value)
    text7.setAttribute('value', text3.value)
    text8.setAttribute('value', text4.value)
  } else if (text5.value !== '' || text6.value !== '' || text7.value !== '' || text8.value !== '') {
    text1.setAttribute('value', text5.value)
    text2.setAttribute('value', text6.value)
    text3.setAttribute('value', text7.value)
    text4.setAttribute('value', text8.value)
  }
})

window.addEventListener('keydown', e => {
  if (e.key != 'Enter') return
  if (text1.value == '' || text2.value == '' || text3.value == '' || text4.value == '' || text5.value == '' || text6.value == '' || text7.value == '' || text8.value == '') return
  if (refresh === true) {
    window.location.reload()
  } else {
    refresh = !refresh
  }
  update1()
  update2()
  update3()
  update4()
  update5()
  update6()
  update7()
  update8()
  update9()
  update10()
  update11()
  update12()
  update13()
  update14()
  update15()
  update16()
  btn.addEventListener('click', () => {
    textArray.forEach(cell => {
      const child = cell.firstChild
      child.remove()
    })
    reverseUpdate()
  })
  textArray.forEach(cell => {
    const child = cell.firstChild.innerText
    if (child.charCodeAt(0) > 91 && child.charCodeAt(1) > 91 && child.charCodeAt(2) > 91 && child.charCodeAt(3) > 91) {
      cell.style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
      recNum++
      return recNum
    } else if (child.charCodeAt(0) > 91 && child.charCodeAt(1) > 91) {
      cell.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'
      oneNum++
      return oneNum
    } else if (child.charCodeAt(2) > 91 && child.charCodeAt(3) > 91) {
      cell.style.backgroundColor = 'rgba(51, 204, 51, 0.5)'
      twoNum++
      return twoNum
    } else {
      cell.style.backgroundColor = 'rgba(0, 0, 255, 0.5)'
      domNum++
      return domNum
    }
  })
  const genotype = `${'Genotype: ' + domNum + ':' + oneNum + ':' + twoNum + ':' + recNum}`
  const percent1 = Math.round(domNum / 16 * 100)
  const percent2 = Math.round(oneNum / 16 * 100)
  const percent3 = Math.round(twoNum / 16 * 100)
  const percent4 = Math.round(recNum / 16 * 100)
  const percentage = `${percent1 + '%' + ':' + percent2 + '%' + ':' + percent3 + '%' + ':' + percent4 + '%'}`
  console.log(percentage)
  gtype.innerHTML = `${genotype + ' or ' + percentage}`
  if (ptype1.value == '' || ptype2.value == '' || ptype3.value == '' || ptype4.value == '') return
  const pResult1 = `${domNum + ' ' + ptype1.value + '-' + ptype3.value}`
  const pResult2 = `${oneNum + ' ' + ptype2.value + '-' + ptype3.value}`
  const pResult3 = `${twoNum + ' ' + ptype1.value + '-' + ptype4.value}`
  const pResult4 = `${recNum + ' ' + ptype2.value + '-' + ptype4.value}`
  ptype1.remove()
  ptype2.remove()
  ptype3.remove()
  ptype4.remove()
  pRes1.classList.add('blue')
  pRes1.innerHTML = pResult1
  pRes2.classList.add('red')
  pRes2.innerHTML = pResult2
  pRes3.classList.add('green')
  pRes3.innerHTML = pResult3
  pRes4.classList.add('yellow')
  pRes4.innerHTML = pResult4
})

function caseInsensitiveSort (a, b) {
  var ret = 0
  a = a.toLowerCase(); b = b.toLowerCase()
  if (a > b) {
    ret = 1
  }
  if (a < b) {
    ret = -1
    return ret
  }
}

function update1 () {
  const celldiv = document.createElement('div')
  const text = `${text1.value + text5.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[0].appendChild(celldiv)
}

function update2 () {
  const celldiv = document.createElement('div')
  const text = `${text2.value + text5.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[1].appendChild(celldiv)
}

function update3 () {
  const celldiv = document.createElement('div')
  const text = `${text3.value + text5.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[2].appendChild(celldiv)
}

function update4 () {
  const celldiv = document.createElement('div')
  const text = `${text4.value + text5.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[3].appendChild(celldiv)
}

function update5 () {
  const celldiv = document.createElement('div')
  const text = `${text1.value + text6.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[4].appendChild(celldiv)
}

function update6 () {
  const celldiv = document.createElement('div')
  const text = `${text2.value + text6.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[5].appendChild(celldiv)
}

function update7 () {
  const celldiv = document.createElement('div')
  const text = `${text3.value + text6.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[6].appendChild(celldiv)
}

function update8 () {
  const celldiv = document.createElement('div')
  const text = `${text4.value + text6.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[7].appendChild(celldiv)
}

function update9 () {
  const celldiv = document.createElement('div')
  const text = `${text1.value + text7.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[8].appendChild(celldiv)
}

function update10 () {
  const celldiv = document.createElement('div')
  const text = `${text2.value + text7.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[9].appendChild(celldiv)
}

function update11 () {
  const celldiv = document.createElement('div')
  const text = `${text3.value + text7.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[10].appendChild(celldiv)
}

function update12 () {
  const celldiv = document.createElement('div')
  const text = `${text4.value + text7.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[11].appendChild(celldiv)
}

function update13 () {
  const celldiv = document.createElement('div')
  const text = `${text1.value + text8.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[12].appendChild(celldiv)
}

function update14 () {
  const celldiv = document.createElement('div')
  const text = `${text2.value + text8.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[13].appendChild(celldiv)
}

function update15 () {
  const celldiv = document.createElement('div')
  const text = `${text3.value + text8.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[14].appendChild(celldiv)
}

function update16 () {
  const celldiv = document.createElement('div')
  const text = `${text4.value + text8.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[15].appendChild(celldiv)
}

function reverseUpdate () {
  rupdate1()
  rupdate2()
  rupdate3()
  rupdate4()
  rupdate5()
  rupdate6()
  rupdate7()
  rupdate8()
  rupdate9()
  rupdate10()
  rupdate11()
  rupdate12()
  rupdate13()
  rupdate14()
  rupdate15()
  rupdate16()
}

function rupdate1 () {
  const celldiv = document.createElement('div')
  const text = `${text1.value + text5.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).reverse().join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[0].appendChild(celldiv)
}

function rupdate2 () {
  const celldiv = document.createElement('div')
  const text = `${text2.value + text5.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).reverse().join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[1].appendChild(celldiv)
}

function rupdate3 () {
  const celldiv = document.createElement('div')
  const text = `${text3.value + text5.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).reverse().join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[2].appendChild(celldiv)
}

function rupdate4 () {
  const celldiv = document.createElement('div')
  const text = `${text4.value + text5.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).reverse().join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[3].appendChild(celldiv)
}

function rupdate5 () {
  const celldiv = document.createElement('div')
  const text = `${text1.value + text6.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).reverse().join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[4].appendChild(celldiv)
}

function rupdate6 () {
  const celldiv = document.createElement('div')
  const text = `${text2.value + text6.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).reverse().join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[5].appendChild(celldiv)
}

function rupdate7 () {
  const celldiv = document.createElement('div')
  const text = `${text3.value + text6.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).reverse().join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[6].appendChild(celldiv)
}

function rupdate8 () {
  const celldiv = document.createElement('div')
  const text = `${text4.value + text6.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).reverse().join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[7].appendChild(celldiv)
}

function rupdate9 () {
  const celldiv = document.createElement('div')
  const text = `${text1.value + text7.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).reverse().join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[8].appendChild(celldiv)
}

function rupdate10 () {
  const celldiv = document.createElement('div')
  const text = `${text2.value + text7.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).reverse().join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[9].appendChild(celldiv)
}

function rupdate11 () {
  const celldiv = document.createElement('div')
  const text = `${text3.value + text7.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).reverse().join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[10].appendChild(celldiv)
}

function rupdate12 () {
  const celldiv = document.createElement('div')
  const text = `${text4.value + text7.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).reverse().join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[11].appendChild(celldiv)
}

function rupdate13 () {
  const celldiv = document.createElement('div')
  const text = `${text1.value + text8.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).reverse().join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[12].appendChild(celldiv)
}

function rupdate14 () {
  const celldiv = document.createElement('div')
  const text = `${text2.value + text8.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).reverse().join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[13].appendChild(celldiv)
}

function rupdate15 () {
  const celldiv = document.createElement('div')
  const text = `${text3.value + text8.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).reverse().join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[14].appendChild(celldiv)
}

function rupdate16 () {
  const celldiv = document.createElement('div')
  const text = `${text4.value + text8.value}`
  const textNode = document.createTextNode([...text].sort(caseInsensitiveSort).reverse().join(''))
  celldiv.classList.add('text-style')
  celldiv.appendChild(textNode)
  textArray[15].appendChild(celldiv)
}
