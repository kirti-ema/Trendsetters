import { getMetadata } from '../../scripts/aem.js';

// Source desktop breakpoint: >=992px shows the full nav, <992px shows the hamburger drawer.
const isDesktop = window.matchMedia('(min-width: 992px)');

/**
 * Closes any open desktop dropdown/megamenu panels.
 * @param {Element} nav
 */
function closeAllDropdowns(nav) {
  nav.querySelectorAll('.nav-drop[aria-expanded="true"]').forEach((drop) => {
    drop.setAttribute('aria-expanded', 'false');
  });
}

/**
 * Opens/closes the mobile off-canvas drawer.
 * @param {Element} nav
 * @param {boolean} [force] force a specific state
 */
function toggleDrawer(nav, force) {
  const button = nav.querySelector('.nav-hamburger button');
  const open = force !== undefined ? force : !nav.classList.contains('drawer-open');
  nav.classList.toggle('drawer-open', open);
  document.body.classList.toggle('nav-drawer-open', open);
  if (button) {
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }
}

/**
 * Wires desktop hover + click and mobile tap behavior for a dropdown trigger.
 * @param {HTMLLIElement} li a nav item that contains a nested <ul> panel
 * @param {Element} nav
 */
function decorateDropdown(li, nav) {
  li.classList.add('nav-drop');
  li.setAttribute('aria-expanded', 'false');

  // The trigger label is the leading <p> (or first child) of the item.
  const label = li.querySelector(':scope > p') || li.firstElementChild;
  if (label) label.classList.add('nav-drop-trigger');

  // Desktop: open on hover, close on mouse leave.
  li.addEventListener('mouseenter', () => {
    if (isDesktop.matches) li.setAttribute('aria-expanded', 'true');
  });
  li.addEventListener('mouseleave', () => {
    if (isDesktop.matches) li.setAttribute('aria-expanded', 'false');
  });

  // Keyboard + mobile: toggle on click of the trigger label.
  if (label) {
    label.setAttribute('tabindex', '0');
    label.setAttribute('role', 'button');
    const toggle = (e) => {
      e.preventDefault();
      const expanded = li.getAttribute('aria-expanded') === 'true';
      if (isDesktop.matches) closeAllDropdowns(nav);
      li.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    };
    label.addEventListener('click', toggle);
    label.addEventListener('keydown', (e) => {
      if (e.code === 'Enter' || e.code === 'Space') toggle(e);
    });
  }
}

/**
 * Tags panel types so CSS can style the wide megamenu vs. the small dropdown,
 * and flags the featured (image-less promo) card. Purely structural — no copy here.
 * @param {HTMLLIElement} li
 */
function classifyPanel(li) {
  const panel = li.querySelector(':scope > ul');
  if (!panel) return;
  // A megamenu groups its links under sub-headings (nested <p> + <ul>); a small
  // dropdown is a flat list of links.
  const isMega = !!panel.querySelector(':scope > li > ul');
  panel.classList.add(isMega ? 'nav-megamenu' : 'nav-dropdown');
  if (isMega) {
    panel.querySelectorAll(':scope > li').forEach((col) => {
      // A column with a heading + links is a category; a lone link is the feature card.
      if (col.querySelector(':scope > ul')) col.classList.add('nav-mega-col');
      else col.classList.add('nav-mega-feature');
    });
  }
}

/**
 * Loads and decorates the header nav.
 * Builds brand / sections / tools, dropdown behavior, hamburger, and sticky-on-scroll
 * from the fetched fragment. All copy/links live in the fragment; JS only reads + wires.
 * @param {Element} block
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';

  let resp = await fetch('/content/nav.plain.html');
  if (!resp.ok) resp = await fetch(`${navPath}.plain.html`);
  const html = resp.ok ? await resp.text() : '';

  const fragment = document.createElement('div');
  fragment.innerHTML = html;

  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-label', 'Main navigation');

  const sectionNames = ['brand', 'sections', 'tools'];
  [...fragment.children].forEach((section, i) => {
    const name = sectionNames[i] || `extra-${i}`;
    section.classList.add(`nav-${name}`);
    nav.append(section);
  });

  // Brand → link to home.
  const brand = nav.querySelector('.nav-brand a');
  if (brand) brand.classList.add('nav-brand-link');

  // Decorate the primary nav list: mark dropdowns, classify panels.
  const sections = nav.querySelector('.nav-sections');
  if (sections) {
    sections.querySelectorAll(':scope > ul > li').forEach((li) => {
      if (li.querySelector(':scope > ul')) {
        classifyPanel(li);
        decorateDropdown(li, nav);
      }
    });
  }

  // Tools → mark the CTA.
  const cta = nav.querySelector('.nav-tools a');
  if (cta) cta.classList.add('nav-cta');

  // Hamburger (mobile) — built here, not in the fragment.
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-expanded="false" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.querySelector('button').addEventListener('click', () => toggleDrawer(nav));
  nav.prepend(hamburger);

  // Scrim overlay for the mobile drawer — click closes.
  const scrim = document.createElement('div');
  scrim.classList.add('nav-scrim');
  scrim.addEventListener('click', () => toggleDrawer(nav, false));

  // Close drawer / dropdowns on Escape.
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      toggleDrawer(nav, false);
      closeAllDropdowns(nav);
    }
  });

  // Reset state cleanly when crossing the desktop/mobile breakpoint.
  isDesktop.addEventListener('change', () => {
    toggleDrawer(nav, false);
    closeAllDropdowns(nav);
  });

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  // Scrim lives on <body> so no sticky/transformed ancestor can clip its fixed
  // positioning; visibility is driven by the body.nav-drawer-open class.
  document.body.append(scrim);
}
