import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const locations = ["Any Location", "Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "Jumeirah", "Business Bay", "Dubai Hills Estate"];
const types = ["Any Type", "Penthouse", "Waterfront", "Modernist", "Estate", "Townhouse", "Condo"];
const priceRanges = ["Any Price", "Under $2M", "$2M – $5M", "$5M – $10M", "$10M+"];

// Default background image of Downtown Dubai
const DEFAULT_BG_IMAGE = "https://images.unsplash.com/photo-1512436979644-789af475e4ba?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fDEzfQ&auto=format&fit=crop&w=1950&q=80";

// Floating particle colors — luxury gold & pearl palette
const PARTICLE_COLORS = ["#ffffff", "#fbbf24", "#f59e0b", "#ffffff", "#fbbf24", "#ffffff", "#f59e0b"];

function SearchDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors border-b border-white/30 pb-1">
        
        <span className="font-display text-lg md:text-xl italic">{value || label}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open &&
      <div className="absolute top-full left-0 mt-2 bg-white backdrop-blur-xl border border-white/20 shadow-lg min-w-[200px] z-10 rounded">
          {options.map((opt) =>
        <button
          key={opt}
          onClick={() => {onChange(opt);setOpen(false);}}
          className="block w-full text-left px-4 py-3 font-body text-sm text-foreground hover:bg-accent/10 transition-colors">
          
              {opt}
            </button>
        )}</div>
      }
    </div>);
}

export default function HeroSection({ heroImage }) {
  const navigate = useNavigate();
  const [loc, setLoc] = useState("Any Location");
  const [type, setType] = useState("Any Type");
  const [price, setPrice] = useState("Any Price");
  const [listing, setListing] = useState("Buy");

  const backgroundImage = heroImage || DEFAULT_BG_IMAGE;

  // --- Animated gradient parallax (cursor-based) ---
  const parallaxRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!parallaxRef.current) return;
      const rect = parallaxRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y });
    };
    const el = parallaxRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    return () => {
      if (el) el.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Parallax transform: shift the gradient subtly based on cursor
  const parallaxTransform = `translate(${(mousePos.x - 0.5) * -16}px, ${(mousePos.y - 0.5) * -16}px)`;

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (loc !== "Any Location") params.set("location", loc);
    if (type !== "Any Type") params.set("type", type);
    if (price !== "Any Price") params.set("price", price);
    params.set("listing", listing);
    navigate(`/properties?${params.toString()}`);
  };

  const scrollToListings = () => {
    document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={parallaxRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Animated luxury gradient background — deep navy → gold shimmer, flowing */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            radial-gradient(1400px 800px at ${30 + mousePos.x * 20}% ${25 + mousePos.y * 15}%, #1e3a8a 0%, #1e40af 25%, transparent 65%),
            radial-gradient(1400px 800px at ${75 + mousePos.x * -10}% ${75 + mousePos.y * 15}%, #0f172a 0%, #1e3a8a 30%, transparent 65%),
            radial-gradient(circle at ${50 + mousePos.x * 10}% ${40 + mousePos.y * 10}%, #fbbf2420 0%, transparent 40%),
            #0a0a0a
          `,
          backgroundSize: "400% 400%",
          animation: "gradient-sweep 22s ease-in-out infinite",
          transform: parallaxTransform,
          transition: "transform 0.08s ease-out",
        }}
      />

      {/* Subtle animated gradient sweep overlay for flowing color motion */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: "linear-gradient(110deg, #1e3a8a00 0%, #0f172a00 50%, #1e40af00 100%)",
          backgroundSize: "400% 400%",
          animationName: "gradient-sweep",
          animationDuration: "22s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}
      />

      {/* Floating luxury particles — gold & pearl, drift upward */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLE_COLORS.map((color, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              backgroundColor: color,
              left: `${8 + (i * 11) % 84}%`,
              top: `${12 + (i * 19) % 78}%`,
              boxShadow: `0 0 ${6 + (i * 2)}px ${color === "#fbbf24" || color === "#f59e0b" ? color : "rgba(255,255,255,0.4)"}`,
              opacity: 0.35 + (i % 4) * 0.1,
              animationName: `float-${i % 3}`,
              animationDuration: `${18 + (i * 5)}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: `-${(i * 4) % 18}s`,
            }}
          />
        ))}
      </div>

      {/* Dark overlay gradient for text readability — richer gold-tinted bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      <div className="relative z-10 h-full flex flex-col justify-center md:justify-start md:pt-[35vh] px-[4%] md:px-12 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}>
          
          <h1 className="font-display text-display-xl text-white font-light mb-8 max-w-4xl leading-[0.9]">
            Welcome to Your<br />
            <span className="italic">Next <span className="not-italic font-normal">Home</span></span>
          </h1>

          <div className="flex items-center gap-1 mb-3">
            {["Buy", "Rent"].map((opt) => (
              <button
                key={opt}
                onClick={() => setListing(opt)}
                className={`px-6 py-2 font-body text-sm tracking-label uppercase rounded-full transition-colors ${listing === opt ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"}`}>
                {opt}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col md:inline-flex md:flex-row md:flex-wrap items-start md:items-center gap-2 md:gap-3 text-white font-body text-sm bg-black/20 backdrop-blur-md px-6 py-4 md:py-3 rounded-2xl md:rounded-full">
              <div className="flex items-center gap-2">
                <span className="text-white">I am looking for a</span>
                <SearchDropdown label="Type" options={types} value={type} onChange={setType} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">in</span>
                <SearchDropdown label="Location" options={locations} value={loc} onChange={setLoc} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">at the price of</span>
                <SearchDropdown label="Price" options={priceRanges} value={price} onChange={setPrice} />
              </div>
            </div>

            <button onClick={handleSearch} className="ghost-btn-light">
              Search Properties
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
