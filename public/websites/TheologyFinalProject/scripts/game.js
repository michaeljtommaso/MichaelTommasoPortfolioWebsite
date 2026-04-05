const body = document.getElementById('body');
const title = document.getElementById('title');
const first_selection = document.getElementById('first-selection');
const second_selection = document.getElementById('second-selection');
const third_selection = document.getElementById('third-selection');
const one = document.getElementById('1');
const two = document.getElementById('2');
const oneOne = document.getElementById('1-1');
const oneTwo= document.getElementById('1-2');
const twoOne = document.getElementById('2-1');

one.addEventListener('click', () => {
    title.innerHTML = "Congrats on the job search!";
    first_selection.classList.remove('game-choices');
    first_selection.classList.add('hidden');
    second_selection.classList.add('game-choices');
    second_selection.classList.remove('hidden');
})

two.addEventListener('click', () => {
    title.innerHTML = "Congrats, you are now homeless, or even better, back in jail!";
    first_selection.classList.remove('game-choices');
    first_selection.classList.add('hidden');
})

oneOne.addEventListener('click', () => {
    title.innerHTML = "You have a 33% chance of getting a job. With those odds and that financial instability, you most likely will not be truly financially secure for a while, if at all.";
    second_selection.classList.remove('game-choices');
    second_selection.classList.add('hidden');
})

oneTwo.addEventListener('click', () => {
    title.innerHTML = "By choosing this route, not only have your chances of getting a job increased exponentially, but your chances of becoming financially stable sooner rather than later have also increased drastically.";
    second_selection.classList.remove('game-choices');
    second_selection.classList.add('hidden');
    third_selection.classList.remove('hidden');
    third_selection.classList.add('game-choices');
})



