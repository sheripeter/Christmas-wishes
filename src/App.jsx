
import { useEffect, useRef, useState } from "react";
import "./App.css";

const photos = [
  {
    image: "photo-1512389142860-9c449e58a543",
    title: "Christmas Magic",
    category: "Celebration",
  },
  {
    image: "photo-1543589077-47d81606c1bf",
    title: "Festive Decorations",
    category: "Decor",
  },
  {
    image: "photo-1513297887119-d46091b24bfa",
    title: "Christmas Tree",
    category: "Decor",
  },
  {
    image: "photo-1512909006721-3d6018887383",
    title: "Christmas Presents",
    category: "Gifts",
  },
  {
    image: "photo-1482517967863-00e15c9b44be",
    title: "Winter Wonderland",
    category: "Winter",
  },
  {
    image: "photo-1451772741724-d20990422508",
    title: "Christmas Lights",
    category: "Celebration",
  },
  
];

const imageUrl = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;

const gifts = [
  {
    emoji: "🎁",
    title: "Gift of Happiness",
    message: "May your life be filled with smiles, laughter and beautiful moments!",
  },
  {
    emoji: "❤️",
    title: "Gift of Love",
    message: "May love surround you and your family throughout the coming year!",
  },
  {
    emoji: "✨",
    title: "Gift of Hope",
    message: "May all your dreams find their way into reality. Never stop believing!",
  },
];


function ChristmasMusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Music playback failed:", error);
        alert("Please check your Christmas music file.");
      }
    }
  };

  const changeVolume = (event) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src="/christmas-music.mp3"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        className="music-toggle"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? "Ⅱ" : "▶"}
      </button>

      <div className="music-info">
        <span className="music-title">Christmas Melody</span>
        <span className="music-status">
          {isPlaying ? "Now Playing ♪" : "Play festive music"}
        </span>
      </div>

      <span className="music-note">♫</span>

      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={changeVolume}
        aria-label="Music volume"
      />
    </div>
  );
}

function App() {
  const [snow, setSnow] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedGift, setSelectedGift] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useState(() => {
    setSnow(
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 6 + Math.random() * 10,
        size: 3 + Math.random() * 5,
      }))
    );
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date("2026-12-25T00:00:00");
      const diff = Math.max(0, target - now);

      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") {
        setSelectedPhoto(null);
        setSelectedGift(null);
      }
    };

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const filteredPhotos =
    filter === "All"
      ? photos
      : photos.filter((photo) => photo.category === filter);

  return (
    <main className="wonderland">
      {/* Snow animation */}
      <div className="snow-layer">
        {snow.map((flake) => (
          <span
            key={flake.id}
            className="snowflake"
            style={{
              left: `${flake.left}%`,
              animationDelay: `${flake.delay}s`,
              animationDuration: `${flake.duration}s`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <header className="header">
        <a href="#home" className="brand">
          <span>✦</span> CHRISTMAS 
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#celebration" onClick={() => setMenuOpen(false)}>Celebrate</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#wishes" onClick={() => setMenuOpen(false)}>Wishes</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="eyebrow">✧ THE MOST WONDERFUL TIME OF THE YEAR ✧</span>

          <h1>
            Let the Magic
            <br />
            of <span>Christmas</span>
            <br />
            Begin!
          </h1>

          <p>
            A season of love, laughter, beautiful memories
            and magical moments. Let's celebrate together!
          </p>

          <div className="hero-actions">
            <ChristmasMusicPlayer /> <br></br>
            <a href="#gallery" className="gold-button">
              Explore Christmas <span>→</span>
            </a>
            <a
        className="outline-button"
        href={`https://wa.me/?text=${encodeURIComponent(
          "Merry Christmas! May your life be filled with love, happiness and beautiful memories. Wishing you a wonderful Christmas and Happy New Year 2027!"
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >Send a Wish ♡
            </a>
            
          </div>

          <div className="hero-note">
            <span>❄</span> Making memories that last forever
          </div>
        </div>

        <div className="hero-decoration">
        <div className="santa-flight">
          <img
            src="/santa-sleigh.png"
            alt="Santa Claus flying with reindeer in a Christmas sleigh"
          />
        </div>
          <div className="hero-glow" />
          <div className="hero-tree">
            <div className="tree-star">★</div>
            <div className="tree-top" />
            <div className="tree-middle" />
            <div className="tree-bottom" />
            <div className="tree-trunk" />
            <i className="bauble b1" />
            <i className="bauble b2" />
            <i className="bauble b3" />
            <i className="bauble b4" />
            <i className="bauble b5" />
            <i className="bauble b6" />
            <i className="bauble b7" />
          </div>
          <div className="tree-floor" />
          <span className="floating-star fs1">✦</span>
          <span className="floating-star fs2">✧</span>
          <span className="floating-star fs3">✦</span>
        </div>
        
        <div className="hero-bottom">
          <span>SCROLL TO DISCOVER</span>
          <span className="scroll-line" />
        </div>
      </section>

      {/* Celebration */}
      <section className="celebration section" id="celebration">
        <div className="section-heading">
          <span className="eyebrow">A SEASON FULL OF WONDER</span>
          <h2>Celebrate the <span>Magic</span></h2>
          <p>
            Christmas is not just a day. It's a feeling,
            a beautiful collection of memories and moments.
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <span>🎄</span>
            <h3>Beautiful Traditions</h3>
            <p>Celebrate the little traditions that make Christmas special.</p>
          </article>

          <article className="feature-card">
            <span>🎁</span>
            <h3>Joy of Giving</h3>
            <p>Share kindness, thoughtful gifts and happiness with everyone.</p>
          </article>

          <article className="feature-card">
            <span>🕯️</span>
            <h3>Moments Together</h3>
            <p>Make time for family, friends and the people you love.</p>
          </article>
        </div>
      </section>

      {/* Countdown */}
      <section className="countdown-section">
        <span className="eyebrow">THE MAGIC IS GETTING CLOSER</span>
        <h2>Countdown to Christmas</h2>

        <div className="countdown-grid">
          {Object.entries(countdown).map(([unit, value]) => (
            <div className="count-box" key={unit}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{unit}</span>
            </div>
          ))}
        </div>

        <p>December 25, 2026 · Let the celebration begin!</p>
      </section>

      {/* Photo Gallery */}
      <section className="gallery-section section" id="gallery">
        <div className="section-heading">
          <span className="eyebrow">CAPTURE THE BEAUTY</span>
          <h2>Christmas <span>Gallery</span></h2>
          <p>
            A little collection of festive magic,
            beautiful decorations and winter memories.
          </p>
        </div>

        <div className="gallery-filters">
          {["All", "Celebration", "Decor", "Gifts", "Winter"].map(
            (category) => (
              <button
                key={category}
                className={filter === category ? "filter active" : "filter"}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            )
          )}
        </div>

        <div className="gallery-grid">
          {filteredPhotos.map((photo, index) => (
            <button
              className={`gallery-item gallery-item-${index % 3}`}
              key={photo.image}
              onClick={() => setSelectedPhoto(photo)}
              aria-label={`View ${photo.title}`}
            >
              <img
                src={imageUrl(photo.image)}
                alt={photo.title}
                loading="lazy"
              />
              <div className="gallery-overlay">
                <span>VIEW PHOTO ↗</span>
                <h3>{photo.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Image lightbox */}
      {selectedPhoto && (
        <div
          className="lightbox"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close photo"
          >
            ✕
          </button>
          <img
            src={imageUrl(selectedPhoto.image)}
            alt={selectedPhoto.title}
            onClick={(e) => e.stopPropagation()}
          />
          <h3>{selectedPhoto.title}</h3>
        </div>
      )}

      {/* Wishes */}
      <section className="wishes-section section" id="wishes">
        <div className="section-heading">
          <span className="eyebrow">A LITTLE SURPRISE FOR YOU</span>
          <h2>Unwrap Some <span>Happiness</span></h2>
          <p>Choose a gift box and discover your special Christmas wish.</p>
        </div>

        <div className="gift-grid">
          {gifts.map((gift) => (
            <button
              className="gift-card"
              key={gift.title}
              onClick={() => setSelectedGift(gift)}
            >
              <span className="gift-emoji">{gift.emoji}</span>
              <h3>{gift.title}</h3>
              <span className="gift-hint">TAP TO UNWRAP ✨</span>
            </button>
          ))}
        </div>

        {selectedGift && (
          <div className="gift-message">
            <button
              className="gift-close"
              onClick={() => setSelectedGift(null)}
            >
              ✕
            </button>
            <span>{selectedGift.emoji}</span>
            <h3>{selectedGift.title}</h3>
            <p>{selectedGift.message}</p>
            <strong>Merry Christmas! ❤️</strong>
          </div>
        )}
      </section>

      {/* Final greeting */}
      <section className="final-greeting">
      <div className="fireworks" aria-hidden="true">
        <span className="burst burst-one" />
        <span className="burst burst-two" />
        <span className="burst burst-three" />
        <span className="burst burst-four" />
      </div>
        <div className="final-stars">✦ ✧ ✦ ✧ ✦</div>
        <span className="eyebrow">FROM OUR HEARTS TO YOURS</span>
        <h2>
          Merry Christmas
          <br />
          & <span>Happy New Year!</span>
        </h2>
        <p>
          May your home be filled with peace,
          your heart with love and your days with endless joy.
        </p>
        <div className="final-decoration">❄🎄❄</div>

        <span className="final-year">SEASON'S GREETINGS · 2026–2027</span><br></br>
                      <a
        className="gold-button share-button"
        href={`https://wa.me/?text=${encodeURIComponent(
          "🎄 Merry Christmas! ❤️ May your life be filled with love, happiness and beautiful memories. Wishing you a wonderful Christmas and Happy New Year 2027! ✨"
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Share Christmas Wishes ♡
      </a>
      </section>
        
      <footer className="footer">
        <a href="#home" className="brand">✦ CHRISTMAS </a>
        <p>Made with love, warmth and a little Christmas magic.</p>
        <span>© 2026 CHRISTMAS  · ALL RIGHTS RESERVED</span>
      </footer>
     
     
    </main>
  );
}

export default App;
