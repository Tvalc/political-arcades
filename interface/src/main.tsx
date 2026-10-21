import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "./components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./components/ui/sheet";
import { Slider } from "./components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import {
  Menu,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ListMusic,
  ArrowUpRight,
  Search,
  Headphones,
} from "lucide-react";
import "./style.css";
const primary = [
  ["Play", "/#library"],
  ["Watch", "/watch/"],
  ["Listen", "/#listen"],
  ["Greatest Hits", "/greatest-hits/"],
];
const secondary = [
  ["My city", "/city/"],
  ["How giving works", "/#how"],
  ["Read the comic", "/comics/"],
  ["About Tony", "/about/"],
  ["Community Pot", "/community-pot/"],
  ["Newsletter", "/#dispatch"],
  ["Support on Patreon", "https://www.patreon.com/c/PoliticalArcade"],
];
function Navigation() {
  return (
    <div className="pa-ui pa-navigation">
      <nav className="pa-primary" aria-label="Main navigation">
        {primary.map(([label, url]) => (
          <a
            key={url}
            href={url}
            aria-current={
              url === "/watch/" && location.pathname.startsWith("/watch/")
                ? "page"
                : undefined
            }
          >
            {label}
          </a>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="pa-menu">
            <Menu aria-hidden="true" />
            <span>Explore</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="pa-ui pa-sheet">
          <SheetHeader>
            <SheetTitle>Welcome to the arcade.</SheetTitle>
            <SheetDescription>
              Play a little. Find your next favorite.
            </SheetDescription>
          </SheetHeader>
          <nav aria-label="Explore Political Arcades">
            {[...primary, ...secondary].map(([label, url]) => (
              <SheetClose asChild key={url}>
                <a href={url}>
                  {label}
                  <ArrowUpRight aria-hidden="true" size={16} />
                </a>
              </SheetClose>
            ))}
          </nav>
          <p className="pa-note">
            Free games. Original music. A little good trouble.
          </p>
        </SheetContent>
      </Sheet>
    </div>
  );
}
type Film = {
  title: string;
  description: string;
  poster: string;
  url: string;
  src: string;
  person: string;
};
function Watch({ films }: { films: Film[] }) {
  const [selected, setSelected] = useState(films[0]);
  const [query, setQuery] = useState("");
  const [person, setPerson] = useState("All");
  const [failed, setFailed] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const filtered = films.filter(
    (f) =>
      (person === "All" || person === f.person) &&
      `${f.title} ${f.person} ${f.description}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="pa-ui pa-watch">
      <section className="pa-feature">
        <div className="pa-screen">
          <video
            ref={video}
            key={selected.src}
            controls
            playsInline
            preload="none"
            poster={selected.poster}
            src={selected.src}
            aria-label={`${selected.title} music video`}
            onError={() => setFailed(true)}
          />
        </div>
        <div className="pa-feature-copy">
          <Badge>THE SCREENING ROOM</Badge>
          <h2>{selected.title}</h2>
          <p>{selected.description}</p>
          <div className="pa-actions">
            <Button
              onClick={() => {
                setFailed(false);
                video.current?.play().catch(() => setFailed(true));
              }}
            >
              <Play aria-hidden="true" />
              Watch now
            </Button>
            <Button asChild variant="outline">
              <a href={selected.url}>
                Story & credits <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
          {failed && (
            <p role="alert">
              The video couldn’t start.{" "}
              <a href={selected.src}>Open the video directly</a> or try again.
            </p>
          )}
        </div>
      </section>
      <div className="pa-library-heading">
        <div>
          <p className="pa-eyebrow">THE COLLECTION</p>
          <h2>Find your next favorite.</h2>
        </div>
        <label className="pa-search">
          <Search aria-hidden="true" size={18} />
          <Input
            aria-label="Search music videos"
            placeholder="Search videos…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <Tabs value={person} onValueChange={setPerson}>
        <TabsList aria-label="Filter videos by featured candidate">
          {["All", ...new Set(films.map((f) => f.person))].map((p) => (
            <TabsTrigger key={p} value={p}>
              {p}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={person}>
          <p className="pa-note" role="status">
            {filtered.length} {filtered.length === 1 ? "video" : "videos"}
          </p>
          <div className="pa-film-grid">
            {filtered.map((f) => (
              <article className="pa-film" key={f.url}>
                <button
                  className="pa-film-image"
                  aria-label={`Select ${f.title}`}
                  onClick={() => {
                    setSelected(f);
                    setFailed(false);
                    document.querySelector(".pa-feature")?.scrollIntoView({
                      behavior: matchMedia("(prefers-reduced-motion: reduce)")
                        .matches
                        ? "instant"
                        : "smooth",
                      block: "center",
                    });
                  }}
                >
                  <img src={f.poster} alt="" loading="lazy" />
                  <span>
                    <Play aria-hidden="true" size={20} />
                  </span>
                </button>
                <div className="pa-film-copy">
                  <Badge variant="secondary">{f.person}</Badge>
                  <h3>
                    <a href={f.url}>{f.title}</a>
                  </h3>
                  <p>{f.description}</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelected(f);
                      setFailed(false);
                      document
                        .querySelector(".pa-feature")
                        ?.scrollIntoView({ block: "center" });
                    }}
                  >
                    Choose video
                  </Button>
                </div>
              </article>
            ))}
          </div>
          {!filtered.length && (
            <div className="pa-empty">
              <h3>No videos found.</h3>
              <p>Try another title or candidate.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setPerson("All");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
type Track = [string, string, string, string];
const time = (n: number) =>
  `${Math.floor((n || 0) / 60)}:${String(Math.floor((n || 0) % 60)).padStart(2, "0")}`;
function Jukebox({ tracks }: { tracks: Track[] }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [error, setError] = useState("");
  const [queue, setQueue] = useState(false);
  const wanted = useRef(false);
  const [loading, setLoading] = useState(false);
  async function play() {
    setError("");
    setLoading(true);
    try {
      if (audio.current?.error) audio.current.load();
      await audio.current?.play();
    } catch (e) {
      if ((e as Error).name !== "AbortError")
        setError(
          "This track couldn’t start. Try Play again or choose another track.",
        );
    } finally {
      setLoading(false);
    }
  }
  function choose(i: number) {
    wanted.current = true;
    setError("");
    const next = (i + tracks.length) % tracks.length;
    if (next === index) {
      void play();
      return;
    }
    setPosition(0);
    setDuration(0);
    setIndex(next);
  }
  useEffect(() => {
    if (wanted.current) void play();
  }, [index]);
  const list = (
    <ol className="pa-tracks">
      {tracks.map((t, i) => (
        <li key={t[0]}>
          <button
            onClick={() => choose(i)}
            aria-label={`Play ${t[1]}`}
            aria-current={i === index ? "true" : undefined}
          >
            <span className="pa-track-number">
              {i === index && playing ? (
                <span aria-label="Playing">♫</span>
              ) : (
                String(i + 1).padStart(2, "0")
              )}
            </span>
            <span>
              <strong>{t[1]}</strong>
              <small>{t[2]}</small>
            </span>
            <span>{t[3]}</span>
          </button>
        </li>
      ))}
    </ol>
  );
  return (
    <div className="pa-ui pa-jukebox">
      <audio
        ref={audio}
        preload="none"
        src={`/horse/assets/music/${tracks[index][0]}.mp3`}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => choose(index + 1)}
        onError={() => {
          setPlaying(false);
          setLoading(false);
          setError(
            "This track is unavailable. Try again or choose another track.",
          );
        }}
        onLoadedMetadata={() => {
          setDuration(audio.current?.duration || 0);
          if (audio.current) audio.current.volume = volume;
        }}
        onTimeUpdate={() => setPosition(audio.current?.currentTime || 0)}
      />
      <div className="pa-player">
        <div className="pa-record" aria-hidden="true">
          <Headphones size={42} />
        </div>
        <div className="pa-now">
          <p className="pa-eyebrow" role="status">
            {loading
              ? "Loading…"
              : playing
                ? "NOW PLAYING"
                : "READY WHEN YOU ARE"}
          </p>
          <h3>{tracks[index][1]}</h3>
          <p>{tracks[index][2]} · Political Arcades</p>
        </div>
        <div className="pa-transport">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous track"
            onClick={() => choose(index - 1)}
          >
            <SkipBack />
          </Button>
          <Button
            aria-label={playing ? "Pause music" : "Play music"}
            onClick={() => (playing ? audio.current?.pause() : void play())}
          >
            {playing ? <Pause /> : <Play />}
            {playing ? "Pause" : "Play"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next track"
            onClick={() => choose(index + 1)}
          >
            <SkipForward />
          </Button>
        </div>
        <div className="pa-progress">
          <span>{time(position)}</span>
          <Slider
            aria-label="Seek within track"
            min={0}
            max={duration || 1}
            step={1}
            value={[position]}
            disabled={!duration}
            onValueChange={([v]) => {
              if (audio.current) audio.current.currentTime = v;
              setPosition(v);
            }}
          />
          <span>{time(duration)}</span>
        </div>
        <div className="pa-player-bottom">
          <label className="pa-volume">
            Volume
            <Slider
              aria-label="Volume"
              min={0}
              max={1}
              step={0.05}
              value={[volume]}
              onValueChange={([v]) => {
                setVolume(v);
                if (audio.current) audio.current.volume = v;
              }}
            />
          </label>
          <Sheet open={queue} onOpenChange={setQueue}>
            <SheetTrigger asChild>
              <Button variant="outline">
                <ListMusic />
                Queue · {tracks.length}
              </Button>
            </SheetTrigger>
            <SheetContent className="pa-ui pa-sheet pa-queue">
              <SheetHeader>
                <SheetTitle>The soundtrack</SheetTitle>
                <SheetDescription>
                  Choose a track. Music starts only when you press play.
                </SheetDescription>
              </SheetHeader>
              {list}
            </SheetContent>
          </Sheet>
        </div>
        {error && (
          <p role="alert" className="pa-error">
            {error}
          </p>
        )}
      </div>
      <div className="pa-desktop-tracks">
        <h3>
          On the jukebox{" "}
          <Badge variant="secondary">{tracks.length} tracks</Badge>
        </h3>
        {list}
      </div>
    </div>
  );
}
function mount(target: Element, node: React.ReactNode) {
  const root = document.createElement("div");
  target.after(root);
  createRoot(root).render(node);
  target.classList.add("pa-replaced");
}
const nav = document.querySelector("#site-nav");
if (nav) {
  const host = document.createElement("div");
  host.className = "pa-nav-host";
  nav.after(host);
  createRoot(host).render(<Navigation />);
  nav.classList.add("pa-replaced");
  document.querySelector("#menu-toggle")?.classList.add("pa-replaced");
}
const library = document.querySelector("[data-pa-watch]");
if (library)
  mount(
    library,
    <Watch
      films={JSON.parse(document.getElementById("pa-films")!.textContent!)}
    />,
  );
const jukebox = document.querySelector("[data-pa-jukebox]");
if (jukebox)
  mount(
    jukebox,
    <Jukebox
      tracks={JSON.parse(document.getElementById("pa-tracks")!.textContent!)}
    />,
  );
document.addEventListener(
  "play",
  (e) => {
    const active = e.target;
    if (active instanceof HTMLMediaElement && !active.muted)
      document.querySelectorAll("audio,video").forEach((m) => {
        if (m !== active && m instanceof HTMLMediaElement && !m.muted)
          m.pause();
      });
  },
  true,
);
