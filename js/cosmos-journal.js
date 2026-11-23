(() => {
  'use strict';
  const form = document.querySelector('.search-collapsible');
  if (!form) return;
  const input = form.querySelector('input');
  const toggle = document.querySelector('.journal-search');
  function setOpen(open, focus = false) {
    form.hidden = !open;
    toggle?.setAttribute('aria-expanded', String(open));
    if (focus) (open ? input : toggle)?.focus({ preventScroll: true });
  }
  toggle?.addEventListener('click', event => {
    event.preventDefault();
    if (!form.hidden) form.querySelector('.clear-search').click();
    setOpen(form.hidden, true);
  });
  document.addEventListener('keydown', event => {
    const typing = event.target.closest('input, textarea, select, [contenteditable="true"]');
    if ((event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey)) || (event.key === '/' && !typing && !event.ctrlKey && !event.metaKey && !event.altKey)) setOpen(true);
    if (event.key === 'Escape' && !form.hidden) {
      form.querySelector('.clear-search').click();
      setOpen(false, true);
      if (location.hash === '#search') history.replaceState(null, '', location.pathname + location.search);
    }
  }, true);
  const openFromURL = () => { if (location.hash === '#search' || new URL(location.href).searchParams.get('q')) setOpen(true, true); };
  window.addEventListener('hashchange', openFromURL);
  openFromURL();
})();
