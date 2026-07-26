const navigationList = document.querySelector('#navbar__list');
const sections = [...document.querySelectorAll('section[data-nav]')];
const pageHeader = document.querySelector('.page__header');
const topButton = document.querySelector('#top__button');
let hideNavigationTimer;

function buildNavigation() {
  const fragment = document.createDocumentFragment();

  sections.forEach((section) => {
    const item = document.createElement('li');
    const link = document.createElement('a');

    link.className = 'menu__link';
    link.href = `#${section.id}`;
    link.textContent = section.dataset.nav;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    item.appendChild(link);
    fragment.appendChild(item);
  });

  navigationList.appendChild(fragment);
}

function setActiveSection(activeSection) {
  sections.forEach((section) => {
    section.classList.toggle('your-active-class', section === activeSection);
  });

  document.querySelectorAll('.menu__link').forEach((link) => {
    link.classList.toggle(
      'menu__link--active',
      link.getAttribute('href') === `#${activeSection.id}`
    );
  });
}

function configureSectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setActiveSection(visible.target);
      }
    },
    { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.15, 0.4] }
  );

  sections.forEach((section) => observer.observe(section));
}

function revealNavigation() {
  pageHeader.classList.remove('page__header--hidden');
  window.clearTimeout(hideNavigationTimer);
  hideNavigationTimer = window.setTimeout(() => {
    if (window.scrollY > 100) {
      pageHeader.classList.add('page__header--hidden');
    }
  }, 2000);
}

function updateTopButton() {
  topButton.classList.toggle('top__button--visible', window.scrollY > window.innerHeight);
}

buildNavigation();
configureSectionObserver();
revealNavigation();
updateTopButton();

window.addEventListener('scroll', () => {
  revealNavigation();
  updateTopButton();
}, { passive: true });

window.addEventListener('mousemove', revealNavigation, { passive: true });
window.addEventListener('keydown', revealNavigation);

topButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
