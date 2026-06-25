const fs = require('fs');
const path = require('path');

// Target Catalog Dataset Injection
const catalog = [
  {
    "release_no": 22,
    "title": "Rain in a Ghost Town",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "rain-in-a-ghost-town",
    "release_date": "2026-00-00",
    "spotify_link": "https://open.spotify.com/artist/78gVqbaxxYAd9aLEZJ49YG",
    "spotify_embed": null,
    "apple_link": "https://music.apple.com/us/artist/doubleu/1586705800",
    "youtube_link": "https://www.youtube.com/watch?v=8LRnUnnbjfY",
    "site_path": "/discography/rain-in-a-ghost-town.html",
    "image_path": "/assets/images/rain-in-a-ghost-town.webp",
    "audio_path": "/assets/audio/rain-in-a-ghost-town.wav",
    "about_song": "A dark, atmospheric exploration of isolation and unshared burdens. The track pairs torrential rain aesthetics with heavy sub-bass to create a claustrophobic sonic landscape, detailing what happens when a community hollows out and leaves its survivors to process their trauma in complete silence."
  },
  {
    "release_no": 21,
    "title": "Static & Scars",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "static-and-scars",
    "release_date": "2026-00-00",
    "spotify_link": "https://open.spotify.com/artist/78gVqbaxxYAd9aLEZJ49YG",
    "spotify_embed": null,
    "apple_link": "https://music.apple.com/us/artist/doubleu/1586705800",
    "youtube_link": "https://www.youtube.com/@DoubleUOTB",
    "site_path": "/discography/static-and-scars.html",
    "image_path": "/assets/images/static-and-scars.webp",
    "audio_path": "/assets/audio/static-and-scars.wav",
    "about_song": "A rhythmic, high-fret guitar and trap-hybrid arrangement tracking physical and emotional battle wounds. It handles the concepts of persistent psychological white noise, interference in modern communication, and learning to read the history of your own resilience written directly into your scars."
  },
  {
    "release_no": 20,
    "title": "Faded Away",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "faded-away",
    "release_date": "2026-00-00",
    "spotify_link": "https://open.spotify.com/artist/78gVqbaxxYAd9aLEZJ49YG",
    "spotify_embed": null,
    "apple_link": "https://music.apple.com/us/artist/doubleu/1586705800",
    "youtube_link": "https://www.youtube.com/watch?v=UkCSAHHil9M",
    "site_path": "/discography/faded-away.html",
    "image_path": "/assets/images/faded-away.webp",
    "audio_path": "/assets/audio/faded-away.wav",
    "about_song": "A melancholic, slow-burning single that deals with immediate abandonment and structural promises left unfulfilled. It builds out a stark contrast between a lost paradise and the cold reality of being left behind under a crashing moon, driven forward by an echo-laden, deliberate vocal performance."
  },
  {
    "release_no": 19,
    "title": "Nights on the Fault",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "nights-on-the-fault",
    "release_date": "2026-06-06",
    "spotify_link": "https://open.spotify.com/artist/78gVqbaxxYAd9aLEZJ49YG",
    "spotify_embed": null,
    "apple_link": "https://music.apple.com/us/artist/doubleu/1586705800",
    "youtube_link": "https://www.youtube.com/watch?v=GQ-ONGAwkgM",
    "site_path": "/discography/nights-on-the-fault.html",
    "image_path": "/assets/images/nights-on-the-fault.webp",
    "audio_path": "/assets/audio/nights-on-the-fault.wav",
    "about_song": "A cinematic, noir-heavy track chronicling modern poverty traps, persistence, and continuous internal warfare within the trenches of the city. The record processes deep physical and mental exhaustion while emphasizing a hunger for progress that only gets louder when the body tires."
  },
  {
    "release_no": 18,
    "title": "Let It Burn",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "let-it-burn",
    "release_date": "2026-00-00",
    "spotify_link": "https://open.spotify.com/artist/78gVqbaxxYAd9aLEZJ49YG",
    "spotify_embed": null,
    "apple_link": "https://music.apple.com/us/artist/doubleu/1586705800",
    "youtube_link": "https://www.youtube.com/watch?v=_DF0TGhPAVg",
    "site_path": "/discography/let-it-burn.html",
    "image_path": "/assets/images/let-it-burn.webp",
    "audio_path": "/assets/audio/let-it-burn.wav",
    "about_song": "An intense, high-stakes narrative exploring personal breaking points, late-night avoidance, and burning old bridges to ensure a clean start. It relies on aggressive percussion and haunting vocal stacks to paint a vivid picture of a horizon consumed entirely by fire."
  },
  {
    "release_no": 17,
    "title": "Sin City Prayer",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "sin-city-prayer",
    "release_date": "2026-05-24",
    "spotify_link": "https://open.spotify.com/artist/78gVqbaxxYAd9aLEZJ49YG",
    "spotify_embed": null,
    "apple_link": "https://music.apple.com/us/artist/doubleu/1586705800",
    "youtube_link": "https://www.youtube.com/watch?v=gQUUuuJBk5Y",
    "site_path": "/discography/sin-city-prayer.html",
    "image_path": "/assets/images/sin-city-prayer.webp",
    "audio_path": "/assets/audio/sin-city-prayer.wav",
    "about_song": "A vulnerable late-night confession detailing heavyhearted generational trauma, isolation, and an explicit plea for spiritual direction. Set against a dark, melodic soul-trap backdrop, it translates internal sorrow into an offering of raw, unfiltered truth."
  },
  {
    "release_no": 16,
    "title": "Language I Can't Read",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "language-i-cant-read",
    "release_date": "2026-00-00",
    "spotify_link": "https://open.spotify.com/artist/78gVqbaxxYAd9aLEZJ49YG",
    "spotify_embed": null,
    "apple_link": "https://music.apple.com/us/artist/doubleu/1586705800",
    "youtube_link": "https://www.youtube.com/@DoubleUOTB",
    "site_path": "/discography/language-i-cant-read.html",
    "image_path": "/assets/images/language-i-cant-read.webp",
    "audio_path": "/assets/audio/language-i-cant-read.wav",
    "about_song": "An evocative explore of miscommunication, emotional distance, and signs left unread. The production leverages distorted vocal chops and sparse acoustic instrumentation to mirror the confusion of trying to interpret fading connections before they collapse entirely."
  },
  {
    "release_no": 15,
    "title": "A Place to Land",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "a-place-to-land",
    "release_date": "2026-04-24",
    "spotify_link": "https://open.spotify.com/artist/78gVqbaxxYAd9aLEZJ49YG",
    "spotify_embed": null,
    "apple_link": "https://music.apple.com/us/artist/doubleu/1586705800",
    "youtube_link": "https://www.youtube.com/watch?v=i2eFpppfs8c",
    "site_path": "/discography/a-place-to-land.html",
    "image_path": "/assets/images/a-place-to-land.webp",
    "audio_path": "/assets/audio/a-place-to-land.wav",
    "about_song": "The search for authenticity, purpose, and long-term stability amidst the noise and empty promises of an urban environment. It highlights the exhausting nature of running from personal shadows while praying for a guiding light to lead the way home."
  },
  {
    "release_no": 14,
    "title": "Red Dirt Lights",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "red-dirt-lights",
    "release_date": "2026-05-05",
    "spotify_link": "https://open.spotify.com/artist/78gVqbaxxYAd9aLEZJ49YG",
    "spotify_embed": null,
    "apple_link": "https://music.apple.com/us/artist/doubleu/1586705800",
    "youtube_link": "https://www.youtube.com/@DoubleUOTB",
    "site_path": "/discography/red-dirt-lights.html",
    "image_path": "/assets/images/red-dirt-lights.webp",
    "audio_path": "/assets/audio/red-dirt-lights.wav",
    "about_song": "A haunting reflection on holding onto what's lost under the distinctive glare of southern horizons. It captures sleepless pacing through a silent city, dealing with the unique bitterness of an unfought ending and a love left behind in the cold dust."
  },
  {
    "release_no": 13,
    "title": "Dear Author",
    "type": "Album",
    "album_name": "Dear Author",
    "track_no": null,
    "featured_artist": null,
    "slug": "dear-author",
    "release_date": "2026-04-27",
    "spotify_link": "https://open.spotify.com/album/4nV9MYZCM5ym8ckHq4Gvdf?si=gJwPlh3TQUqiNIhIw3ZasA",
    "spotify_embed": "https://open.spotify.com/embed/album/4nV9MYZCM5ym8ckHq4Gvdf",
    "apple_link": null,
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_mxkGSFfMRZOuWyCXfR56aUMv46cmZfzZQ",
    "site_path": "/dear-author",
    "image_path": "/assets/images/dear-author.webp",
    "audio_path": null,
    "about_song": "A concept-driven, deeply vulnerable studio album exploring life chapters, systemic survival, and personal letters left open for interpretation."
  },
  {
    "release_no": null,
    "title": "Dear Author",
    "type": "Album Track",
    "album_name": "Dear Author",
    "track_no": 1,
    "featured_artist": null,
    "slug": "dear-author-track",
    "release_date": "2026-04-27",
    "spotify_link": "https://open.spotify.com/album/4nV9MYZCM5ym8ckHq4Gvdf?si=gJwPlh3TQUqiNIhIw3ZasA",
    "spotify_embed": "https://open.spotify.com/embed/track/4nV9MYZCM5ym8ckHq4Gvdf",
    "apple_link": null,
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_mxkGSFfMRZOuWyCXfR56aUMv46cmZfzZQ",
    "site_path": "/discography/dear-author/dear-author",
    "image_path": "/assets/images/dear-author.webp",
    "audio_path": "/assets/audio/dear-author.wav",
    "about_song": "The introductory title track establishing the theme of reclaiming control over an unwritten future, addressing life's hidden architect directly."
  },
  {
    "release_no": null,
    "title": "Motel Gateway",
    "type": "Album Track",
    "album_name": "Dear Author",
    "track_no": 2,
    "featured_artist": null,
    "slug": "motel-gateway",
    "release_date": "2026-04-27",
    "spotify_link": "https://open.spotify.com/album/4nV9MYZCM5ym8ckHq4Gvdf?si=gJwPlh3TQUqiNIhIw3ZasA",
    "spotify_embed": "https://open.spotify.com/embed/track/4nV9MYZCM5ym8ckHq4Gvdf",
    "apple_link": null,
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_mxkGSFfMRZOuWyCXfR56aUMv46cmZfzZQ",
    "site_path": "/discography/dear-author/motel-gateway",
    "image_path": "/assets/images/dear-author.webp",
    "audio_path": "/assets/audio/motel-gateway.wav",
    "about_song": "An atmospheric look at localized isolation, temporary highway shelters, and traveling through unstable, transient environments."
  },
  {
    "release_no": null,
    "title": "Wondering If We Won",
    "type": "Album Track",
    "album_name": "Dear Author",
    "track_no": 3,
    "featured_artist": null,
    "slug": "wondering-if-we-won",
    "release_date": "2026-04-27",
    "spotify_link": "https://open.spotify.com/album/4nV9MYZCM5ym8ckHq4Gvdf?si=gJwPlh3TQUqiNIhIw3ZasA",
    "spotify_embed": "https://open.spotify.com/embed/track/4nV9MYZCM5ym8ckHq4Gvdf",
    "apple_link": null,
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_mxkGSFfMRZOuWyCXfR56aUMv46cmZfzZQ",
    "site_path": "/discography/dear-author/wondering-if-we-won",
    "image_path": "/assets/images/dear-author.webp",
    "audio_path": "/assets/audio/wondering-if-we-won.wav",
    "about_song": "A retrospective narrative focusing closely on the ultimate cost of survival and the complex emotional reality of pyrrhic victories."
  },
  {
    "release_no": null,
    "title": "Foster File",
    "type": "Album Track",
    "album_name": "Dear Author",
    "track_no": 4,
    "featured_artist": null,
    "slug": "foster-file",
    "release_date": "2026-04-27",
    "spotify_link": "https://open.spotify.com/album/4nV9MYZCM5ym8ckHq4Gvdf?si=gJwPlh3TQUqiNIhIw3ZasA",
    "spotify_embed": "https://open.spotify.com/embed/track/4nV9MYZCM5ym8ckHq4Gvdf",
    "apple_link": null,
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_mxkGSFfMRZOuWyCXfR56aUMv46cmZfzZQ",
    "site_path": "/discography/dear-author/foster-file",
    "image_path": "/assets/images/dear-author.webp",
    "audio_path": "/assets/audio/foster-file.wav",
    "about_song": "A highly personal, raw exploration of youth placement, state systems, and processing true identity outside of clinical document labels."
  },
  {
    "release_no": null,
    "title": "Some Kind Of Superman",
    "type": "Album Track",
    "album_name": "Dear Author",
    "track_no": 5,
    "featured_artist": null,
    "slug": "some-kind-of-superman",
    "release_date": "2026-04-27",
    "spotify_link": "https://open.spotify.com/album/4nV9MYZCM5ym8ckHq4Gvdf?si=gJwPlh3TQUqiNIhIw3ZasA",
    "spotify_embed": "https://open.spotify.com/embed/track/4nV9MYZCM5ym8ckHq4Gvdf",
    "apple_link": null,
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_mxkGSFfMRZOuWyCXfR56aUMv46cmZfzZQ",
    "site_path": "/discography/dear-author/some-kind-of-superman",
    "image_path": "/assets/images/dear-author.webp",
    "audio_path": "/assets/audio/some-kind-of-superman.wav",
    "about_song": "An introspective cut that completely deconstructs the immense weight of hyper-independence and the societal expectation of constant resilience."
  },
  {
    "release_no": null,
    "title": "Church Avenue",
    "type": "Album Track",
    "album_name": "Dear Author",
    "track_no": 6,
    "featured_artist": null,
    "slug": "church-avenue",
    "release_date": "2026-04-27",
    "spotify_link": "https://open.spotify.com/album/4nV9MYZCM5ym8ckHq4Gvdf?si=gJwPlh3TQUqiNIhIw3ZasA",
    "spotify_embed": "https://open.spotify.com/embed/track/4nV9MYZCM5ym8ckHq4Gvdf",
    "apple_link": null,
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_mxkGSFfMRZOuWyCXfR56aUMv46cmZfzZQ",
    "site_path": "/discography/dear-author/church-avenue",
    "image_path": "/assets/images/dear-author.webp",
    "audio_path": "/assets/audio/church-avenue.wav",
    "about_song": "A profound closing track detailing disillusionment with formal institutional structures while searching for authentic grace in real spaces."
  },
  {
    "release_no": 12,
    "title": "Cold Sheets Wide Eyes",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "cold-sheets-wide-eyes",
    "release_date": "2026-03-28",
    "spotify_link": null,
    "spotify_embed": null,
    "apple_link": null,
    "youtube_link": "http://www.youtube.com/watch?v=5DQTE3P8uBY",
    "site_path": "/discography/cold-sheets-wide-eyes",
    "image_path": "/assets/images/cold-sheets-wide-eyes.webp",
    "audio_path": "/assets/audio/cold-sheets-wide-eyes.wav",
    "about_song": "A moody insomnia track dealing directly with hyper-vigilance, nocturnal panic loops, and processing unhealed memories when the world goes dark."
  },
  {
    "release_no": null,
    "title": "Fading Out",
    "type": "Album Track",
    "album_name": "Faded 405",
    "track_no": 1,
    "featured_artist": null,
    "slug": "fading-out",
    "release_date": "2026-02-27",
    "spotify_link": "https://open.spotify.com/album/0udTHknZfINCMd8ipkmaGv?si=9Qq-ZyJvQR-JeHQuN19m4g",
    "spotify_embed": "https://open.spotify.com/embed/track/43Yzw824PA1wBqSQKuffgG",
    "apple_link": "https://music.apple.com/us/album/faded-405/1874730082",
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_n3aFNgsim21cn86Zug0CJU1A4OoiZsyIM&si=dkA6ZzlmYJzt3F-Y",
    "site_path": "/discography/faded-405/fading-out",
    "image_path": "/assets/images/faded-405.webp",
    "audio_path": "/assets/audio/fading-out.wav",
    "about_song": "The opening statement to the Faded 405 project, framing geographical displacement, personal static, and urban numbness along the highway corridor."
  },
  {
    "release_no": null,
    "title": "Run From The Voices",
    "type": "Album Track",
    "album_name": "Faded 405",
    "track_no": 2,
    "featured_artist": null,
    "slug": "run-from-the-voices",
    "release_date": "2026-02-27",
    "spotify_link": "https://open.spotify.com/album/0udTHknZfINCMd8ipkmaGv?si=9Qq-ZyJvQR-JeHQuN19m4g",
    "spotify_embed": "https://open.spotify.com/embed/track/0udTHknZfINCMd8ipkmaGv",
    "apple_link": "https://music.apple.com/us/album/faded-405/1874730082",
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_n3aFNgsim21cn86Zug0CJU1A4OoiZsyIM&si=dkA6ZzlmYJzt3F-Y",
    "site_path": "/discography/faded-405/run-from-the-voices",
    "image_path": "/assets/images/faded-405.webp",
    "audio_path": "/assets/audio/run-from-the-voices.wav",
    "about_song": "An energetic yet heavy track exploring cognitive overload, intrusive self-criticism, and the desperate need for physical and mental escape."
  },
  {
    "release_no": null,
    "title": "Devil in the Rear View",
    "type": "Album Track",
    "album_name": "Faded 405",
    "track_no": 3,
    "featured_artist": null,
    "slug": "devil-in-the-rear-view",
    "release_date": "2026-02-27",
    "spotify_link": "https://open.spotify.com/album/0udTHknZfINCMd8ipkmaGv?si=9Qq-ZyJvQR-JeHQuN19m4g",
    "spotify_embed": "https://open.spotify.com/embed/track/0udTHknZfINCMd8ipkmaGv",
    "apple_link": "https://music.apple.com/us/album/faded-405/1874730082",
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_n3aFNgsim21cn86Zug0CJU1A4OoiZsyIM&si=dkA6ZzlmYJzt3F-Y",
    "site_path": "/discography/faded-405/devil-in-the-rear-view",
    "image_path": "/assets/images/faded-405.webp",
    "audio_path": "/assets/audio/devil-in-the-rear-view.wav",
    "about_song": "A southern-noir styled rap track tracking how past mistakes and heavy regrets chase you down even when moving at high speeds."
  },
  {
    "release_no": null,
    "title": "Shattered Echoes",
    "type": "Album Track",
    "album_name": "Faded 405",
    "track_no": 4,
    "featured_artist": null,
    "slug": "shattered-echoes",
    "release_date": "2026-02-27",
    "spotify_link": "https://open.spotify.com/album/0udTHknZfINCMd8ipkmaGv?si=9Qq-ZyJvQR-JeHQuN19m4g",
    "spotify_embed": "https://open.spotify.com/embed/track/0udTHknZfINCMd8ipkmaGv",
    "apple_link": "https://music.apple.com/us/album/faded-405/1874730082",
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_n3aFNgsim21cn86Zug0CJU1A4OoiZsyIM&si=dkA6ZzlmYJzt3F-Y",
    "site_path": "/discography/faded-405/shattered-echoes",
    "image_path": "/assets/images/faded-405.webp",
    "audio_path": "/assets/audio/shattered-echoes.wav",
    "about_song": "A sonic portrayal of dissociation and identity fragmentation, focusing heavily on sweeping up emotional pieces to find internal consistency."
  },
  {
    "release_no": null,
    "title": "Found You in the RainFall",
    "type": "Album Track",
    "album_name": "Faded 405",
    "track_no": 5,
    "featured_artist": null,
    "slug": "found-you-in-the-rainfall",
    "release_date": "2026-02-27",
    "spotify_link": "https://open.spotify.com/album/0udTHknZfINCMd8ipkmaGv?si=9Qq-ZyJvQR-JeHQuN19m4g",
    "spotify_embed": "https://open.spotify.com/embed/track/1AJDHaa1Vo0t1LEWm4npnc",
    "apple_link": "https://music.apple.com/us/album/faded-405/1874730082",
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_n3aFNgsim21cn86Zug0CJU1A4OoiZsyIM&si=dkA6ZzlmYJzt3F-Y",
    "site_path": "/discography/faded-405/found-you-in-the-rainfall",
    "image_path": "/assets/images/faded-405.webp",
    "audio_path": "/assets/audio/found-you-in-the-rainfall.wav",
    "about_song": "An album cut capturing serendipity, foundational support, and unexpected emotional sanctuary right at the edge of rock-bottom circumstances."
  },
  {
    "release_no": null,
    "title": "Shadow Boxer",
    "type": "Album Track",
    "album_name": "Faded 405",
    "track_no": 6,
    "featured_artist": null,
    "slug": "shadow-boxer",
    "release_date": "2026-02-27",
    "spotify_link": "https://open.spotify.com/album/0udTHknZfINCMd8ipkmaGv?si=9Qq-ZyJvQR-JeHQuN19m4g",
    "spotify_embed": "https://open.spotify.com/embed/track/0udTHknZfINCMd8ipkmaGv",
    "apple_link": "https://music.apple.com/us/album/faded-405/1874730082",
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_n3aFNgsim21cn86Zug0CJU1A4OoiZsyIM&si=dkA6ZzlmYJzt3F-Y",
    "site_path": "/discography/faded-405/shadow-boxer",
    "image_path": "/assets/images/faded-405.webp",
    "audio_path": "/assets/audio/shadow-boxer.wav",
    "about_song": "A deep metaphorical look at internal conflict, ghost-fighting old memories, and the absolute exhaustion that stems from constant self-sabotage."
  },
  {
    "release_no": null,
    "title": "Faded Frame",
    "type": "Album Track",
    "album_name": "Faded 405",
    "track_no": 7,
    "featured_artist": null,
    "slug": "faded-frame",
    "release_date": "2026-02-27",
    "spotify_link": "https://open.spotify.com/album/0udTHknZfINCMd8ipkmaGv?si=9Qq-ZyJvQR-JeHQuN19m4g",
    "spotify_embed": "https://open.spotify.com/embed/track/0udTHknZfINCMd8ipkmaGv",
    "apple_link": "https://music.apple.com/us/album/faded-405/1874730082",
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_n3aFNgsim21cn86Zug0CJU1A4OoiZsyIM&si=dkA6ZzlmYJzt3F-Y",
    "site_path": "/discography/faded-405/faded-frame",
    "image_path": "/assets/images/faded-405.webp",
    "audio_path": "/assets/audio/faded-frame.wav",
    "about_song": "Processes the physical and visual degradation of memories over time, drawing parallels to bleeding Polaroid prints and shifting childhood landscapes."
  },
  {
    "release_no": null,
    "title": "The Anniversary",
    "type": "Album Track",
    "album_name": "Faded 405",
    "track_no": 8,
    "featured_artist": null,
    "slug": "the-anniversary",
    "release_date": "2026-02-27",
    "spotify_link": "https://open.spotify.com/album/0udTHknZfINCMd8ipkmaGv?si=9Qq-ZyJvQR-JeHQuN19m4g",
    "spotify_embed": "https://open.spotify.com/embed/track/0udTHknZfINCMd8ipkmaGv",
    "apple_link": "https://music.apple.com/us/album/faded-405/1874730082",
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_n3aFNgsim21cn86Zug0CJU1A4OoiZsyIM&si=dkA6ZzlmYJzt3F-Y",
    "site_path": "/discography/faded-405/the-anniversary",
    "image_path": "/assets/images/faded-405.webp",
    "audio_path": "/assets/audio/the-anniversary.wav",
    "about_song": "A quiet, devastating milestone track reflecting directly on cyclical grief patterns, honoring missed connections, and processing trauma under big skies."
  },
  {
    "release_no": null,
    "title": "Zero Sum",
    "type": "Album Track",
    "album_name": "Faded 405",
    "track_no": 9,
    "featured_artist": null,
    "slug": "zero-sum",
    "release_date": "2026-02-27",
    "spotify_link": "https://open.spotify.com/album/0udTHknZfINCMd8ipkmaGv?si=9Qq-ZyJvQR-JeHQuN19m4g",
    "spotify_embed": "https://open.spotify.com/embed/track/0IfSNRF2HWKAovxhtEmVAR",
    "apple_link": "https://music.apple.com/us/album/faded-405/1874730082",
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_n3aFNgsim21cn86Zug0CJU1A4OoiZsyIM&si=dkA6ZzlmYJzt3F-Y",
    "site_path": "/discography/faded-405/zero-sum",
    "image_path": "/assets/images/faded-405.webp",
    "audio_path": "/assets/audio/zero-sum.wav",
    "about_song": "An intentional exploration of emotional bankruptcy, transaction-based relationships, and balancing structural life equations without losing yourself entirely."
  },
  {
    "release_no": null,
    "title": "The Carpenter's Hands",
    "type": "Album Track",
    "album_name": "Faded 405",
    "track_no": 10,
    "featured_artist": null,
    "slug": "the-carpenters-hands",
    "release_date": "2026-02-27",
    "spotify_link": "https://open.spotify.com/album/0udTHknZfINCMd8ipkmaGv?si=9Qq-ZyJvQR-JeHQuN19m4g",
    "spotify_embed": "https://open.spotify.com/embed/track/0udTHknZfINCMd8ipkmaGv",
    "apple_link": "https://music.apple.com/us/album/faded-405/1874730082",
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_n3aFNgsim21cn86Zug0CJU1A4OoiZsyIM&si=dkA6ZzlmYJzt3F-Y",
    "site_path": "/discography/faded-405/the-carpenters-hands",
    "image_path": "/assets/images/faded-405.webp",
    "audio_path": "/assets/audio/the-carpenters-hands.wav",
    "about_song": "A soulful trap-ballad paying creative tribute to manual labor, parental protective figures, blue-collar heritage, and hard-earned calluses."
  },
  {
    "release_no": null,
    "title": "Finally Free",
    "type": "Album Track",
    "album_name": "Faded 405",
    "track_no": 11,
    "featured_artist": null,
    "slug": "finally-free",
    "release_date": "2026-02-27",
    "spotify_link": "https://open.spotify.com/album/0udTHknZfINCMd8ipkmaGv?si=9Qq-ZyJvQR-JeHQuN19m4g",
    "spotify_embed": "https://open.spotify.com/embed/track/0udTHknZfINCMd8ipkmaGv",
    "apple_link": "https://music.apple.com/us/album/faded-405/1874730082",
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_n3aFNgsim21cn86Zug0CJU1A4OoiZsyIM&si=dkA6ZzlmYJzt3F-Y",
    "site_path": "/discography/faded-405/finally-free",
    "image_path": "/assets/images/faded-405.webp",
    "audio_path": "/assets/audio/finally-free.wav",
    "about_song": "An energetic, anthemic turning point in the LP detailing the heavy dropping of unrequested emotional baggage and moving wide open down new lanes."
  },
  {
    "release_no": null,
    "title": "New Foundations",
    "type": "Album Track",
    "album_name": "Faded 405",
    "track_no": 12,
    "featured_artist": null,
    "slug": "new-foundations",
    "release_date": "2026-02-27",
    "spotify_link": "https://open.spotify.com/album/0udTHknZfINCMd8ipkmaGv?si=9Qq-ZyJvQR-JeHQuN19m4g",
    "spotify_embed": "https://open.spotify.com/embed/track/0udTHknZfINCMd8ipkmaGv",
    "apple_link": "https://music.apple.com/us/album/faded-405/1874730082",
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_n3aFNgsim21cn86Zug0CJU1A4OoiZsyIM&si=dkA6ZzlmYJzt3F-Y",
    "site_path": "/discography/faded-405/new-foundations",
    "image_path": "/assets/images/faded-405.webp",
    "audio_path": "/assets/audio/new-foundations.wav",
    "about_song": "The definitive concluding track of the LP, symbolizing literal grounding, marriage milestones, and building lasting emotional security from structural ruins."
  },
  {
    "release_no": 11,
    "title": "Faded 405",
    "type": "Album",
    "album_name": "Faded 405",
    "track_no": null,
    "featured_artist": null,
    "slug": "faded-405",
    "release_date": "2026-02-27",
    "spotify_link": "https://open.spotify.com/album/0udTHknZfINCMd8ipkmaGv",
    "spotify_embed": "https://open.spotify.com/embed/album/0udTHknZfINCMd8ipkmaGv",
    "apple_link": "https://geo.music.apple.com/album/faded-405/1874730082?app=music&at=11lPP6",
    "youtube_link": "https://youtube.com/playlist?list=OLAK5uy_n3aFNgsim21cn86Zug0CJU1A4OoiZsyIM&si=dkA6ZzlmYJzt3F-Y",
    "site_path": "/discography/faded-405/",
    "image_path": "/assets/images/faded-405.webp",
    "audio_path": null,
    "about_song": "A monumental 12-track alternative hip-hop and soul LP tracking long highway runs, generational scars, and laying down structural foundations across the 405."
  },
  {
    "release_no": 10,
    "title": "Fading Out",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "fading-out",
    "release_date": "2026-02-14",
    "spotify_link": "https://open.spotify.com/track/43Yzw824PA1wBqSQKuffgG?si=f7072b1225f24709",
    "spotify_embed": "https://open.spotify.com/embed/track/43Yzw824PA1wBqSQKuffgG",
    "apple_link": "https://music.apple.com/us/song/fading-out/1874672795",
    "youtube_link": "http://www.youtube.com/watch?v=R7WLtQKZbLc",
    "site_path": "/discography/fading-out",
    "image_path": "/assets/images/fading-out.webp",
    "audio_path": "/assets/audio/fading-out.wav",
    "about_song": "The primary promotional single leading up to the major LP drop, dealing with high-anxiety patterns, fading coordinates, and navigating localized neon haze."
  },
  {
    "release_no": 9,
    "title": "Zero Sum",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "zero-sum",
    "release_date": "2026-02-06",
    "spotify_link": "https://open.spotify.com/track/0IfSNRF2HWKAovxhtEmVAR?si=b4ee7c28fbb8497b",
    "spotify_embed": "https://open.spotify.com/embed/track/0IfSNRF2HWKAovxhtEmVAR",
    "apple_link": "https://music.apple.com/us/song/zero-sum/1868614772",
    "youtube_link": "http://www.youtube.com/watch?v=x5XXDYMPXK0",
    "site_path": "/discography/zero-sum",
    "image_path": "/assets/images/zero-sum.webp",
    "audio_path": "/assets/audio/zero-sum.wav",
    "about_song": "A rhythmically dense cut introducing mathematical tracking as a coping mechanism for handling heavy personal costs and life subtraction."
  },
  {
    "release_no": 8,
    "title": "Found You in the RainFall",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "found-you-in-the-rainfall",
    "release_date": "2025-12-10",
    "spotify_link": "https://open.spotify.com/track/1AJDHaa1Vo0t1LEWm4npnc?si=4f741111234d4a4d",
    "spotify_embed": "https://open.spotify.com/embed/track/1AJDHaa1Vo0t1LEWm4npnc",
    "apple_link": "https://music.apple.com/us/song/found-you-in-the-rainfall/1860645251",
    "youtube_link": "http://www.youtube.com/watch?v=cC4WoU2tTOI",
    "site_path": "/discography/found-you-in-the-rainfall",
    "image_path": "/assets/images/found-you-in-the-rainfall.webp",
    "audio_path": "/assets/audio/found-you-in-the-rainfall.wav",
    "about_song": "A crisp, winter-set atmospheric track highlighting the distinct calmness of finding real safety right inside the heavy center of a downpour."
  },
  {
    "release_no": 7,
    "title": "Ain't New To Me",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "aint-new-to-me",
    "release_date": "2023-08-16",
    "spotify_link": "https://open.spotify.com/track/5HbGGfbk8kd1ojDl7brRej?si=9899aba660404094",
    "spotify_embed": "https://open.spotify.com/embed/track/5HbGGfbk8kd1ojDl7brRej",
    "apple_link": "https://music.apple.com/us/song/aint-new-to-me/1836520562",
    "youtube_link": "https://www.youtube.com/watch?v=muMwR_oCc3Q",
    "site_path": "/discography/aint-new-to-me",
    "image_path": "/assets/images/aint-new-to-me.webp",
    "audio_path": "/assets/audio/aint-new-to-me.wav",
    "about_song": "A signature piece of raw pain music framing immediate familiarity with sirens, empty cupboards, and institutional systems since age ten."
  },
  {
    "release_no": 6,
    "title": "Closer Than Closer",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "closer-than-closer",
    "release_date": "2023-02-10",
    "spotify_link": "https://open.spotify.com/track/3bzNzh5rzBVdKiJqGnJLqn?si=2da549143fa2416b",
    "spotify_embed": "https://open.spotify.com/embed/track/3bzNzh5rzBVdKiJqGnJLqn",
    "apple_link": "https://music.apple.com/us/song/closer-than-cloer/1666394763",
    "youtube_link": "https://www.youtube.com/watch?v=1_zo3pkaU8A&list=OLAK5uy_nvDUe65s9r0eiVLbJ4C-UwDGJbv301PNc",
    "site_path": "/discography/closer-than-closer",
    "image_path": "/assets/images/closer-than-closer.webp",
    "audio_path": "/assets/audio/closer-than-closer.wav",
    "about_song": "An experimental melodic single focusing cleanly on dropping protective walls and handling intense interpersonal vulnerability step-by-step."
  },
  {
    "release_no": 5,
    "title": "Fresh",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "fresh",
    "release_date": "2022-06-15",
    "spotify_link": "https://open.spotify.com/track/2BEBl7ruISt3BibdmlKPvd?si=57d8591e8ecf4407",
    "spotify_embed": "https://open.spotify.com/embed/track/2BEBl7ruISt3BibdmlKPvd",
    "apple_link": "https://music.apple.com/us/song/fresh/1614770806",
    "youtube_link": "https://www.youtube.com/watch?v=WVNMp1BWHX0",
    "site_path": "/discography/fresh",
    "image_path": "/assets/images/fresh.webp",
    "audio_path": "/assets/audio/fresh.wav",
    "about_song": "An upbeat transitional entry that celebrates shaking off historical dust and rolling windows down through completely unfamiliar lanes."
  },
  {
    "release_no": 4,
    "title": "Trippin",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": "PAPA METREE",
    "slug": "trippin",
    "release_date": "2022-01-12",
    "spotify_link": "https://open.spotify.com/track/3ZStzbgDQrK23SewNWJWAv?si=9b06bf96e807419f",
    "spotify_embed": "https://open.spotify.com/embed/track/3ZStzbgDQrK23SewNWJWAv",
    "apple_link": "https://music.apple.com/us/song/trippin/1603126687",
    "youtube_link": "https://youtu.be/bG6DXhnnpHk?list=OLAK5uy_m3-6un1wRYQyf42pkzDM623QFWhST0HGI",
    "site_path": "/discography/trippin",
    "image_path": "/assets/images/trippin.webp",
    "audio_path": "/assets/audio/trippin.wav",
    "about_song": "A sharp collaborative project challenging outside industry skepticism and reaffirming stylistic focus alongside Papa Metree."
  },
  {
    "release_no": 3,
    "title": "Pakkage Deal",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": "NBK BANDO, PAPA METREE",
    "slug": "pakkage-deal",
    "release_date": "2021-10-20",
    "spotify_link": "https://open.spotify.com/track/6MrxJOCka8l10U2conKbKH?si=a21cfdc47bd84388",
    "spotify_embed": "https://open.spotify.com/embed/track/6MrxJOCka8l10U2conKbKH",
    "apple_link": "https://music.apple.com/us/song/pakkage-deal/1606073057",
    "youtube_link": "https://youtu.be/bG6DXhnnpHk?si=fduQPdU-OuYtEK85",
    "site_path": "/discography/pakkage-deal",
    "image_path": "/assets/images/pakkage-deal.webp",
    "audio_path": "/assets/audio/pakkage-deal.wav",
    "about_song": "An uncompromising three-way performance showing that the triumph and the background grit must be evaluated as one inseparable package."
  },
  {
    "release_no": 2,
    "title": "Real life Trauma",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "real-life-trauma",
    "release_date": "2021-07-15",
    "spotify_link": "https://open.spotify.com/track/5aDwcEWK2a3slOnf94GoTw?si=ffafa5777c584edf",
    "spotify_embed": "https://open.spotify.com/embed/track/5aDwcEWK2a3slOnf94GoTw",
    "apple_link": "https://music.apple.com/us/album/real-life-trauma-single/1591301889",
    "youtube_link": "https://www.youtube.com/watch?v=lM-dU1vHwK8",
    "site_path": "/discography/real-life-trauma",
    "image_path": "/assets/images/real-life-trauma.webp",
    "audio_path": "/assets/audio/real-life-trauma.wav",
    "about_song": "A core developmental piece breaking away from television tropes to map out the heavy biological tolls of generational fractures."
  },
  {
    "release_no": 1,
    "title": "Two of Us",
    "type": "Single",
    "album_name": null,
    "track_no": null,
    "featured_artist": null,
    "slug": "two-of-us",
    "release_date": "2021-03-12",
    "spotify_link": "https://open.spotify.com/track/4VJ5YQKZZtPNbCxpvRPw4j?si=bd6b2c69b2a445c2&nd=1&dlsi=1e0cf24f5f924ab1",
    "spotify_embed": "https://open.spotify.com/embed/track/4VJ5YQKZZtPNbCxpvRPw4j",
    "apple_link": "https://music.apple.com/us/song/two-of-us/1587934285",
    "youtube_link": "https://www.youtube.com/watch?v=KA1bZeM5gZs",
    "site_path": "/discography/two-of-us",
    "image_path": "/assets/images/two-of-us.webp",
    "audio_path": "/assets/audio/two-of-us.wav",
    "about_song": "The fundamental debut release showcasing raw loyalty, early romances, and building solidarity directly against outside societal noise."
  }
];

// Read master structural template node
const templatePath = path.join(__dirname, 'template.html');
if (!fs.existsSync(templatePath)) {
    console.error("ERROR: template.html not detected inside workspace.");
    process.exit(1);
}
const templateSource = fs.readFileSync(templatePath, 'utf8');

// Helper to sanitize folder structure naming conventions
const getFolderSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Process vector maps to isolate track lists for individual albums
const albumsMap = {};
catalog.forEach(item => {
    if (item.type === "Album Track" && item.album_name) {
        if (!albumsMap[item.album_name]) albumsMap[item.album_name] = [];
        albumsMap[item.album_name].push(item);
    }
});
// Order individual track maps sequentially
Object.keys(albumsMap).forEach(key => {
    albumsMap[key].sort((a, b) => (a.track_no || 0) - (b.track_no || 0));
});

// Main compilation process execution
catalog.forEach(item => {
    let htmlOutput = templateSource;
    let finalDir = "";
    let finalFileName = "";
    let canonicalPath = "";

    // Parse specific variables based on deployment classification paths
    const cleanTitle = item.title;
    const cleanAbout = item.about_song;
    const cleanType = item.type;
    const cleanImage = item.image_path;

    let subHeading = "";
    let metaLeft = "";
    let metaRight = "";
    let tracklistSection = "";

    if (item.type === "Single") {
        finalDir = path.join(__dirname, 'discography');
        finalFileName = `${item.slug}.html`;
        canonicalPath = `/discography/${item.slug}.html`;
        
        metaLeft = item.release_date !== "2026-00-00" ? `REL: ${item.release_date}` : "RELEASE LOG";
        metaRight = item.release_no ? `RUN NO: ${item.release_no}` : "SINGLE VEC";

        if(item.featured_artist) {
            subHeading = `<p class="font-mono text-xs text-[#00F0FF] uppercase">FEATURING: ${item.featured_artist}</p>`;
        }
    } 
    else if (item.type === "Album") {
        const albumSlug = getFolderSlug(item.title);
        finalDir = path.join(__dirname, 'discography', albumSlug);
        finalFileName = `index.html`;
        canonicalPath = `/discography/${albumSlug}/`;

        metaLeft = `RELEASED: ${item.release_date}`;
        metaRight = `LP CATALOG`;

        // Render project tracking list modules onto the project home layout
        const tracks = albumsMap[item.title] || [];
        if (tracks.length > 0) {
            let trackItemsHtml = tracks.map(t => `
                <a href="/discography/${albumSlug}/${t.slug}.html" class="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-900 rounded-lg hover:border-slate-800 transition duration-300 group">
                    <div class="flex items-center space-x-4">
                        <span class="font-mono text-xs text-slate-600 group-hover:text-[#FF5F00] transition">${String(t.track_no).padStart(2, '0')}</span>
                        <span class="heading-font text-sm font-bold text-slate-300 group-hover:text-white transition uppercase">${t.title}</span>
                    </div>
                    <i class="fa-solid fa-chevron-right text-slate-700 text-xs group-hover:text-[#00F0FF] transition"></i>
                </a>
            `).join('');

            tracklistSection = `
                <section class="space-y-4 pt-8 border-t border-slate-900/60">
                    <h2 class="heading-font text-lg font-bold text-white uppercase tracking-wider">Project Track Architecture</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${trackItemsHtml}</div>
                </section>
            `;
        }
    } 
    else if (item.type === "Album Track") {
        const albumSlug = getFolderSlug(item.album_name);
        finalDir = path.join(__dirname, 'discography', albumSlug);
        finalFileName = `${item.slug}.html`;
        canonicalPath = `/discography/${albumSlug}/${item.slug}.html`;

        metaLeft = `TRACK ${item.track_no}`;
        metaRight = `LP ITEM`;

        subHeading = `<p class="font-mono text-xs text-slate-500 uppercase">From the studio masterpiece: <a href="/discography/${albumSlug}/" class="text-[#00F0FF] hover:underline">${item.album_name}</a></p>`;

        // Render project structural index mapping context
        const tracks = albumsMap[item.album_name] || [];
        if (tracks.length > 0) {
            let trackItemsHtml = tracks.map(t => {
                const isCurrent = t.slug === item.slug;
                return `
                    <a href="/discography/${albumSlug}/${t.slug}.html" class="flex items-center justify-between p-3 rounded-lg border text-xs font-mono transition duration-300 ${isCurrent ? 'bg-[#FF5F00]/5 border-[#FF5F00]/30 text-white' : 'bg-slate-950/20 border-slate-900 text-slate-500 hover:border-slate-800 hover:text-slate-300'}" >
                        <span>${String(t.track_no).padStart(2, '0')}. ${t.title.toUpperCase()}</span>
                        ${isCurrent ? '<span class="text-[9px] text-[#FF5F00] uppercase tracking-widest font-bold">Playing</span>' : ''}
                    </a>
                `;
            }).join('');

            tracklistSection = `
                <section class="space-y-4 pt-8 border-t border-slate-900/60">
                    <h2 class="heading-font text-xs font-bold text-slate-400 uppercase tracking-widest">Album Index Map</h2>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">${trackItemsHtml}</div>
                </section>
            `;
        }
    }

    // Generate dynamic layout interaction buttons for vector configurations
    let buttonsHtml = "";
    if (item.spotify_link) {
        buttonsHtml += `
            <a href="${item.spotify_link}" target="_blank" rel="noopener noreferrer" class="custom-glow-cyan inline-flex items-center space-x-3 bg-slate-950 border border-slate-900 px-6 py-3.5 rounded-lg text-xs font-mono tracking-wider text-slate-300 transition duration-300 transform hover:-translate-y-0.5">
                <i class="fab fa-spotify text-emerald-500 text-sm"></i>
                <span>SPOTIFY PLATFORM</span>
            </a>
        `;
    }
    if (item.apple_link) {
        buttonsHtml += `
            <a href="${item.apple_link}" target="_blank" rel="noopener noreferrer" class="custom-glow-orange inline-flex items-center space-x-3 bg-slate-950 border border-slate-900 px-6 py-3.5 rounded-lg text-xs font-mono tracking-wider text-slate-300 transition duration-300 transform hover:-translate-y-0.5">
                <i class="fab fa-apple text-rose-500 text-sm"></i>
                <span>APPLE VEC</span>
            </a>
        `;
    }
    if (item.youtube_link) {
        buttonsHtml += `
            <a href="${item.youtube_link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center space-x-3 bg-slate-950 border border-slate-900 hover:border-red-600/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] px-6 py-3.5 rounded-lg text-xs font-mono tracking-wider text-slate-300 transition duration-300 transform hover:-translate-y-0.5">
                <i class="fab fa-youtube text-red-500 text-sm"></i>
                <span>YOUTUBE ARCHIVE</span>
            </a>
        `;
    }

    // Substitute exact asset markers into layout block configurations
    htmlOutput = htmlOutput
        .replace(/{{title}}/g, cleanTitle)
        .replace(/{{about_song}}/g, cleanAbout)
        .replace(/{{type}}/g, cleanType)
        .replace(/{{image_path}}/g, cleanImage)
        .replace(/{{canonical_path}}/g, canonicalPath)
        .replace(/{{sub_heading}}/g, subHeading)
        .replace(/{{meta_left}}/g, metaLeft)
        .replace(/{{meta_right}}/g, metaRight)
        .replace(/{{streaming_buttons}}/g, buttonsHtml)
        .replace(/{{tracklist_section}}/g, tracklistSection);

    // Write structure tree out to production files
    if (!fs.existsSync(finalDir)) {
        fs.mkdirSync(finalDir, { recursive: true });
    }

    const outputFilePath = path.join(finalDir, finalFileName);
    fs.writeFileSync(outputFilePath, htmlOutput, 'utf8');
    console.log(`✓ DEPLOYED NODE: ${path.relative(__dirname, outputFilePath)}`);
});

console.log("\n>>> METADATA COMPILATION COMPLETE: Discography hierarchy safely built.");
