// Marca <html class="js"> para que los .reveal se oculten solo cuando hay JavaScript,
// muestra cada sección al entrar en pantalla y enciende su punto en la barra lateral.
const root = document.documentElement;

if ('IntersectionObserver' in window) {
  root.classList.add('js');
  const dots = [...document.querySelectorAll<HTMLAnchorElement>('.rail a')];

  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const section = e.target as HTMLElement;
      section.classList.add('in');
      for (const d of dots) {
        const on = d.getAttribute('href') === `#${section.id}`;
        d.classList.toggle('on', on);
        if (on) d.style.setProperty('--accent', d.dataset.color ?? '#fff');
      }
    }
  }, { threshold: 0.45 });

  document.querySelectorAll('section[id]').forEach(s => io.observe(s));

  // Una sección más alta que la pantalla nunca llega al 45 % visible: se muestra al asomarse.
  const tall = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) e.target.classList.add('in');
  }, { threshold: 0.1 });
  document.querySelectorAll('section[id]').forEach(s => tall.observe(s));
}
