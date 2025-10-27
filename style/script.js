const book = document.getElementById('book');
const pages = [];
const sound = document.getElementById("sound");

document.addEventListener("click", () => {
  if (sound.paused) {
    sound.currentTime = 11;
    sound.play().catch(err => console.log("Không phát được nhạc:", err));
  }
}, { once: true });

const introPage = document.createElement('div');
introPage.className = 'page';
introPage.dataset.originalZ = 100;
introPage.style.zIndex = 100;

const introFront = document.createElement('div');
introFront.className = 'front';
introFront.innerHTML = `
  <div class="intro-content">
    <h1>Memory Album</h1>
    <div><em>Reiyo Matsumoto</em></div>
    <div>🎁❤️🎁</div>
  </div>
`;
const introBack = document.createElement('div');
introBack.className = 'back';

introPage.appendChild(introFront);
introPage.appendChild(introBack);
book.appendChild(introPage);
pages.push(introPage);

const images = [];
for (let i = 1; i <= 20; i++) { 130
  images.push(`./style/image/Anh (${i}).jpg`);
}

for (let i = 0; i < images.length; i += 2) {
  const page = document.createElement('div');
  page.className = 'page';
  const z = 99 - i;
  page.dataset.originalZ = z;
  page.style.zIndex = z;

  const front = document.createElement('div');
  front.className = 'front';
  const frontImg = document.createElement('img');
  frontImg.src = images[i];
  front.appendChild(frontImg);

  const back = document.createElement('div');
  back.className = 'back';
  if (images[i + 1]) {
    const backImg = document.createElement('img');
    backImg.src = images[i + 1];
    back.appendChild(backImg);
  }

  page.appendChild(front);
  page.appendChild(back);
  book.appendChild(page);
  pages.push(page);
}

const endPage = document.createElement('div');
endPage.className = 'page';
endPage.dataset.originalZ = 0;
endPage.style.zIndex = 0;

const endFront = document.createElement('div');
endFront.className = 'front';
endFront.innerHTML = `
  <div class="end-content">
    <h2>❤️ I Love You ❤️</h2>
    <span id="ending-text"></span>
  </div>
`;

const endBack = document.createElement('div');
endBack.className = 'back';
endBack.style.background = '#fff';

endPage.appendChild(endFront);
endPage.appendChild(endBack);
book.appendChild(endPage);
pages.push(endPage);

function typewriterEffect(text, element, speed = 40) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text[i] === '\n' ? '<br>' : text[i];
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

let currentTopZ = 200;
let typed = false;

pages.forEach((page) => {
  let startX = 0;
  const front = page.querySelector('.front');
  const back = page.querySelector('.back');

  const flipForward = () => {
    if (!page.classList.contains('flipped')) {
      page.classList.add('flipped');

      if (page === pages[pages.length - 2] && !typed) {
        const endText = document.getElementById('ending-text');
        const content = `I love three things in this world: The sun ☀️, the moon 🌕 and you ❤️.\nThe sun for the morning, the moon for the night and you, forever ❤️❤️❤️`;
        setTimeout(() => typewriterEffect(content, endText), 800);
        typed = true;
      }

      setTimeout(() => {
        page.style.zIndex = 0;
      }, 1000);
    }
  };

  const flipBackward = () => {
    if (page.classList.contains('flipped')) {
      page.classList.remove('flipped');
      currentTopZ++;
      page.style.zIndex = currentTopZ;
    }
  };

  front.addEventListener('click', flipForward);
  back.addEventListener('click', flipBackward);

  page.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  page.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff < -30) flipForward();
    else if (diff > 30) flipBackward();
  });

});
