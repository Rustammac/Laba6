const form = document.getElementById('convert-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(new FormData(form));
    const out = document.getElementById('result');

      try {
        const res = await fetch(`/api/convert?${params}`);
        const data = await res.json();

        if (res.ok) {
            out.className = 'result ok';
            out.textContent = `${data.amount} ${data.from} = ${data.result} ${data.to} (rate ${data.rate})`;
        } else {
            out.className = 'result error';
            out.textContent = `Error: ${data.error}`;
        }
  } catch {
        out.className = 'result error';
        out.textContent = 'You appear to be offline. Conversion needs the server.';
    }
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('SW registered, scope:', reg.scope))
      .catch((err) => console.error('SW registration failed:', err));
  });
}