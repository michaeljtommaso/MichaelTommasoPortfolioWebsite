const wrapper = document.getElementById('wrapper')
const reveals = document.querySelectorAll('.reveal')

wrapper.addEventListener('scroll', () => {
    for(let i = 0; i < reveals.length; i++) {
        let windowheight = window.innerHeight
        let revealtop = reveals[i].getBoundingClientRect().top
        let revealpoint = 150

        if (revealtop < windowheight - revealpoint) { 
            reveals[i].classList.add('active')
        } else { 
            reveals[i].classList.remove('active')
        }
    }
})