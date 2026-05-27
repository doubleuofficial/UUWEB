const fs = require('fs');
const path = require('path');

/**
 * DOUBLEU OFFICIAL SITE GENERATOR - VERSION 2.2
 * Mapped to music.json schema: release_no, spotify_link, apple_link, etc.
 */

// 1. DATA SOURCES
const musicData = JSON.parse(fs.readFileSync('./music.json', 'utf8'));
// Update this line at the top of your generate_site.js
const BASE_URL = 'https://www.doubleuofficial.online';
// 2. SEO & HTML TEMPLATE ENGINE
const getBaseTemplate = (content, title, description, path) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>${title} | DoubleU Official</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${BASE_URL}${path}">

    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#ff6b00">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "MusicGroup",
      "name": "DoubleU",
      "url": "${BASE_URL}",
      "genre": "Cinematic Pain Music",
      "sameAs": [
        "https://open.spotify.com/artist/78gVqbaxxYAd9aLEZJ49YG",
        "https://music.apple.com/us/artist/doubleu/1586705800",
        "https://www.youtube.com/@DoubleUOTB"
      ]
    }
    </script>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&family=Inter:wght@400;700;900&display=swap');
        :root { --neon-orange: #ff6b00; --charcoal: #0a0a0a; }
        body { background: var(--charcoal); color: #f4f4f5; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        .brand-font { font-family: 'Syncopate', sans-serif; }
        .neon-text { color: var(--neon-orange); text-shadow: 0 0 15px rgba(255,107,0,0.4); }
        .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05); }
        
        .spotify-btn:hover { border-color: #1DB954; color: #1DB954; transform: scale(1.02); }
        .apple-btn:hover { border-color: #FA243C; color: #FA243C; transform: scale(1.02); }
        .youtube-btn:hover { border-color: #FF0000; color: #FF0000; transform: scale(1.02); }
    </style>
</head>
<body class="antialiased">
    <div id="nav-placeholder"></div>
    <main>${content}</main>
    <div id="footer-placeholder"></div>

    <script>
        async function init() {
            try {
                const [nav, foot] = await Promise.all([
                    fetch('/navbar').then(res => res.text()),
                    fetch('/footer').then(res => res.text())
                ]);
                document.getElementById('nav-placeholder').innerHTML = nav;
                document.getElementById('footer-placeholder').innerHTML = foot;
                
                const menu = document.getElementById('mobile-menu');
                const openBtn = document.getElementById('menu-open');
                const closeBtn = document.getElementById('menu-close');
                if(openBtn && closeBtn) {
                    openBtn.onclick = () => menu.classList.remove('translate-x-full');
                    closeBtn.onclick = () => menu.classList.add('translate-x-full');
                }
            } catch(e) { console.error("Component load error", e); }
        }
        init();
    </script>
</body>
</html>
`;

// 3. GENERATION LOGIC
function buildSite() {
    console.log("🚀 Starting build from music.json...");

    const dirs = ['./single', './album'];
    dirs.forEach(dir => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); });

    musicData.forEach(release => {
        const content = `
            <section class="pt-40 pb-20 px-6 max-w-7xl mx-auto flex items-center justify-center min-h-[90vh]">
                <div class="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div class="relative group">
                        <div class="absolute -inset-2 bg-orange-500/10 rounded-[4rem] blur-xl group-hover:bg-orange-500/20 transition duration-1000"></div>
                        <img src="${release.image_path}" alt="DoubleU - ${release.title}" class="relative rounded-[3.5rem] w-full aspect-square object-cover shadow-2xl border border-white/10">
                    </div>

                    <div class="flex flex-col">
                        <span class="neon-text text-[10px] font-black tracking-[0.8em] uppercase mb-6 block">${release.type}</span>
                        <h1 class="brand-font text-5xl md:text-7xl italic uppercase mb-4 tracking-tighter leading-none">${release.title}</h1>
                        <p class="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mb-8">Released: ${release.release_date}</p>
                        
                        ${release.audio_path ? `
                        <div class="glass p-6 rounded-3xl mb-8 flex flex-col gap-2 border border-white/5 shadow-inner">
                            <audio id="audio-${release.slug}" src="${release.audio_path}" preload="metadata"></audio>
                            <div class="flex items-center gap-5">
                                <button id="play-btn-${release.slug}" class="w-12 h-12 min-w-[3rem] rounded-2xl bg-[#ff6b00] text-black flex items-center justify-center transition duration-300 hover:bg-orange-500 active:scale-95 shadow-lg shadow-orange-500/20">
                                    <i id="play-icon-${release.slug}" class="fa-solid fa-play translate-x-[1px] text-lg"></i>
                                </button>
                                <div class="flex-1 flex flex-col justify-center">
                                    <div class="flex items-center justify-between text-[10px] uppercase font-black tracking-widest text-zinc-500 mb-1.5">
                                        <span id="time-current-${release.slug}">0:00</span>
                                        <span id="time-total-${release.slug}">0:00</span>
                                    </div>
                                    <div class="relative w-full flex items-center">
                                        <input id="progress-bar-${release.slug}" type="range" min="0" max="100" value="0" class="w-full h-1 bg-zinc-800 accent-[#ff6b00] rounded-lg appearance-none cursor-pointer outline-none">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <script>
                            (function() {
                                const audio = document.getElementById('audio-${release.slug}');
                                const playBtn = document.getElementById('play-btn-${release.slug}');
                                const playIcon = document.getElementById('play-icon-${release.slug}');
                                const progressBar = document.getElementById('progress-bar-${release.slug}');
                                const timeCurrent = document.getElementById('time-current-${release.slug}');
                                const timeTotal = document.getElementById('time-total-${release.slug}');

                                function formatTime(secs) {
                                    if (isNaN(secs)) return "0:00";
                                    const mins = Math.floor(secs / 60);
                                    const remainingSecs = Math.floor(secs % 60);
                                    return \`\${mins}:\${remainingSecs < 10 ? '0' : ''}\${remainingSecs}\`;
                                }

                                playBtn.onclick = () => {
                                    if (audio.paused) {
                                        audio.play();
                                        playIcon.className = "fa-solid fa-pause text-lg";
                                    } else {
                                        audio.pause();
                                        playIcon.className = "fa-solid fa-play translate-x-[1px] text-lg";
                                    }
                                };

                                audio.onloadedmetadata = () => {
                                    timeTotal.textContent = formatTime(audio.duration);
                                    progressBar.max = Math.floor(audio.duration);
                                };

                                audio.ontimeupdate = () => {
                                    if (!progressBar.classList.contains('seeking')) {
                                        progressBar.value = Math.floor(audio.currentTime);
                                    }
                                    timeCurrent.textContent = formatTime(audio.currentTime);
                                };

                                progressBar.oninput = () => {
                                    progressBar.classList.add('seeking');
                                    timeCurrent.textContent = formatTime(progressBar.value);
                                };

                                progressBar.onchange = () => {
                                    audio.currentTime = progressBar.value;
                                    progressBar.classList.remove('seeking');
                                };

                                audio.onended = () => {
                                    playIcon.className = "fa-solid fa-play translate-x-[1px] text-lg";
                                    progressBar.value = 0;
                                    timeCurrent.textContent = "0:00";
                                };
                                
                                // Fallback if metadata loads before listener attaches
                                if (audio.readyState >= 1) {
                                    timeTotal.textContent = formatTime(audio.duration);
                                    progressBar.max = Math.floor(audio.duration);
                                }
                            })();
                        </script>
                        ` : ''}

                        <div class="space-y-4">
                            ${release.spotify_link ? `
                            <a href="${release.spotify_link}" target="_blank" class="glass spotify-btn p-6 rounded-3xl flex items-center justify-between group transition duration-300">
                                <span class="flex items-center gap-5">
                                    <i class="fa-brands fa-spotify text-2xl"></i>
                                    <span class="text-[10px] font-black uppercase tracking-widest">Listen on Spotify</span>
                                </span>
                                <i class="fa-solid fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 transition"></i>
                            </a>` : ''}

                            ${release.apple_link ? `
                            <a href="${release.apple_link}" target="_blank" class="glass apple-btn p-6 rounded-3xl flex items-center justify-between group transition duration-300">
                                <span class="flex items-center gap-5">
                                    <i class="fa-brands fa-apple text-2xl"></i>
                                    <span class="text-[10px] font-black uppercase tracking-widest">Listen on Apple Music</span>
                                </span>
                                <i class="fa-solid fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 transition"></i>
                            </a>` : ''}

                            ${release.youtube_link ? `
                            <a href="${release.youtube_link}" target="_blank" class="glass youtube-btn p-6 rounded-3xl flex items-center justify-between group transition duration-300">
                                <span class="flex items-center gap-5">
                                    <i class="fa-brands fa-youtube text-2xl"></i>
                                    <span class="text-[10px] font-black uppercase tracking-widest">Watch on YouTube</span>
                                </span>
                                <i class="fa-solid fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 transition"></i>
                            </a>` : ''}
                        </div>

                        <div class="mt-16">
                            <a href="/music" class="text-zinc-500 text-[9px] font-black uppercase tracking-[0.3em] hover:text-white transition flex items-center gap-3">
                                <i class="fa-solid fa-chevron-left"></i> The Vault
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;

        const html = getBaseTemplate(content, release.title, `Stream ${release.title} by DoubleU. Official cinematic pain music release.`, release.site_path);
        
        // Ensure the path is handled correctly (site_path is "/single/slug")
        fs.writeFileSync(`.${release.site_path}.html`, html);
        console.log(`✅ Generated: ${release.title} (Release #${release.release_no})`);
    });

    generateSitemap();
    console.log("✨ Build Complete.");
}

function generateSitemap() {
    const pages = ['', '/music', '/shop', '/about', '/contact', ...musicData.map(m => m.site_path)];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(p => `<url><loc>${BASE_URL}${p}</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><priority>${p === '' ? '1.0' : '0.8'}</priority></url>`).join('')}
</urlset>`;
    fs.writeFileSync('./sitemap.xml', sitemap);
}

buildSite();
