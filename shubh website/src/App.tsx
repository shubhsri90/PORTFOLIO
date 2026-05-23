import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const heroRef = useRef<HTMLDivElement>(null);

  // Portfolio projects data
  const portfolioProjects = [
    {
      id: 1,
      title: 'Short Film',
      category: 'film',
      type: 'Cinematic Narrative',
      description: 'An emotionally-driven short film exploring human connections through visual poetry',
      link: 'https://drive.google.com/file/d/16_d5DcYiwDhYEh3ac8CvVC581bUemE_0/view?usp=drive_link',
      color: 'from-zinc-900 via-neutral-900 to-zinc-950',
      accent: 'bg-red-500/20'
    },
    {
      id: 2,
      title: 'Script Writing Project',
      category: 'writing',
      type: 'Screenplay',
      description: 'Original screenplay crafted with narrative depth and character-driven storytelling',
      link: 'https://drive.google.com/file/d/17Q7rCcKmp8bNyd_MSsnf8BrdXNtF4PyG/view?usp=drive_link',
      color: 'from-neutral-900 via-zinc-900 to-neutral-950',
      accent: 'bg-rose-500/20'
    },
    {
      id: 3,
      title: 'Trailer Edit',
      category: 'edit',
      type: 'Motion Editorial',
      description: 'High-impact trailer edit with precise timing, sound design, and visual rhythm',
      link: 'https://drive.google.com/file/d/1K-BkkZCcnVEFVjk7lvF6TN-bi95hwevn/view?usp=drive_link',
      color: 'from-zinc-950 via-neutral-900 to-zinc-900',
      accent: 'bg-red-600/20'
    },
    {
      id: 4,
      title: 'Product Design',
      category: 'design',
      type: '3D Visualization',
      description: 'Photorealistic product visualization with meticulous attention to materials and lighting',
      link: 'https://drive.google.com/file/d/1xQrMK9uFIjZO6uYKKrVM9VsgPYCQqxHA/view?usp=drive_link',
      color: 'from-neutral-950 via-zinc-900 to-neutral-900',
      accent: 'bg-red-500/15'
    },
    {
      id: 5,
      title: 'Nike Poster',
      category: 'design',
      type: 'Brand Poster',
      description: 'Dynamic sports poster design embodying motion, energy, and brand essence',
      link: 'https://drive.google.com/file/d/10ItIvc9epu5okdcR6O0lDLaEbfLpqD1O/view?usp=drive_link',
      color: 'from-zinc-900 via-neutral-950 to-zinc-950',
      accent: 'bg-red-600/25'
    },
    {
      id: 6,
      title: 'Minimalist Poster',
      category: 'design',
      type: 'Graphic Poster',
      description: 'Elegant minimal poster using negative space and typographic hierarchy',
      link: 'https://drive.google.com/file/d/14upWMj5jsJnzOsAc_YO1WChaFKFfHTKC/view?usp=drive_link',
      color: 'from-neutral-900 via-zinc-950 to-neutral-950',
      accent: 'bg-zinc-400/20'
    },
    {
      id: 7,
      title: 'Matte Painting',
      category: 'art',
      type: 'Digital Environment',
      description: 'Cinematic matte painting creating immersive worlds through digital artistry',
      link: 'https://drive.google.com/file/d/1rUhjls8ySMBEkOfWO6KrLxmuxOoHxOEI/view?usp=drive_link',
      color: 'from-zinc-950 via-neutral-900 to-zinc-950',
      accent: 'bg-amber-600/20'
    },
    {
      id: 8,
      title: 'Logo Animation',
      category: 'motion',
      type: 'Brand Animation',
      description: 'Kinetic logo animation with purposeful motion and brand personality',
      link: 'https://drive.google.com/file/d/1hIQm8uXynu-l4TnMAnYMt-hhC7Wa7MBG/view?usp=drive_link',
      color: 'from-neutral-950 via-zinc-900 to-neutral-900',
      accent: 'bg-red-500/20'
    },
    {
      id: 9,
      title: 'Logo Design',
      category: 'design',
      type: 'Brand Identity',
      description: 'Strategic logo design system with versatile applications and strong concept',
      link: 'https://drive.google.com/file/d/13dbiA2XSKjGMifu9RZjnxgW4kmUjv8cg/view?usp=drive_link',
      color: 'from-zinc-900 via-neutral-900 to-zinc-900',
      accent: 'bg-rose-600/20'
    },
    {
      id: 10,
      title: 'Self AI Video',
      category: 'ai',
      type: 'Generative Art',
      description: 'Experimental AI-assisted video exploring the intersection of technology and creativity',
      link: 'https://drive.google.com/file/d/1irqL8dlteR_D31UX8Hjyly8UjgB2d3dk/view?usp=drive_link',
      color: 'from-neutral-900 via-zinc-950 to-neutral-950',
      accent: 'bg-red-500/30'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(p => p.category === activeFilter);

  // Skills data
  const skills = [
    { name: 'Video Editing', level: 95, category: 'Post-Production' },
    { name: 'Cinematic Editing', level: 92, category: 'Post-Production' },
    { name: 'Motion Graphics', level: 88, category: 'Animation' },
    { name: 'Logo Animation', level: 90, category: 'Animation' },
    { name: 'Graphic Designing', level: 94, category: 'Design' },
    { name: 'Poster Designing', level: 96, category: 'Design' },
    { name: 'Matte Painting', level: 85, category: 'Digital Art' },
    { name: 'Story Writing', level: 89, category: 'Narrative' },
    { name: 'AI Video Creation', level: 87, category: 'Emerging Tech' },
    { name: 'Creative Direction', level: 91, category: 'Leadership' }
  ];

  const stats = [
    { value: '25+', label: 'Projects Completed', sublabel: 'Across multiple disciplines' },
    { value: '10', label: 'Core Specializations', sublabel: 'Creative & technical mastery' },
    { value: '∞', label: 'Creative Iteration', sublabel: 'Relentless refinement' },
    { value: '100%', label: 'Dedication', sublabel: 'To every frame and pixel' }
  ];

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Parallax effect for hero
  useEffect(() => {
    if (!heroRef.current || activePage !== 'home') return;
    
    const handleParallax = () => {
      if (!heroRef.current) return;
      const scrolled = window.scrollY;
      const parallaxElements = heroRef.current.querySelectorAll('[data-parallax]');
      parallaxElements.forEach((el) => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.parallax || '0');
        element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
      });
    };

    window.addEventListener('scroll', handleParallax, { passive: true });
    return () => window.removeEventListener('scroll', handleParallax);
  }, [activePage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const filters = [
    { id: 'all', label: 'All Works' },
    { id: 'film', label: 'Film' },
    { id: 'design', label: 'Design' },
    { id: 'motion', label: 'Motion' },
    { id: 'art', label: 'Art' },
    { id: 'ai', label: 'AI' }
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030303] overflow-hidden">
        {/* Cinematic vignette */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/80" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 2px)`
          }} />
        </div>

        {/* Animated grid */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(#fff 1px, transparent 1px),
              linear-gradient(90deg, #fff 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }} />
        </div>

        {/* Loading content */}
        <div className="relative z-10 text-center">
          {/* Logo mark */}
          <div className="relative mx-auto mb-20">
            <div className="absolute -inset-[56px] opacity-30">
              <div className="h-[140px] w-[140px] mx-auto animate-[spin_12s_linear_infinite]">
                <div className="h-full w-full rounded-full border border-white/[0.08]"
                     style={{ maskImage: 'conic-gradient(from 0deg, transparent 60%, black 100%)' }} />
              </div>
            </div>
            
            <div className="relative">
              <div className="mx-auto h-[28px] w-[28px]">
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 animate-pulse">
                    <div className="h-full w-full border-[1.5px] border-white" style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 12px, 12px 12px, 12px 100%, 0 100%)'
                    }} />
                  </div>
                  <div className="absolute inset-0 translate-x-[6px] translate-y-[6px]">
                    <div className="h-full w-full border-[1.5px] border-red-500/70" style={{
                      clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 0 12px, calc(100% - 12px) 12px, calc(100% - 12px) 0)'
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Name reveal */}
          <div className="space-y-8">
            <div className="overflow-hidden">
              <h1 className="text-[11px] font-[500] tracking-[0.4em] text-white/90 uppercase animate-[slideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.2s_both]" 
                  style={{ fontFamily: 'Syne, sans-serif' }}>
                Shubh Srivastav
              </h1>
            </div>
            
            <div className="flex items-center justify-center gap-[9px]">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="relative h-[1px] w-[28px] overflow-hidden bg-white/[0.08]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-[shimmer_2s_ease-in-out_infinite]"
                       style={{ animationDelay: `${i * 300}ms` }} />
                </div>
              ))}
            </div>

            <div className="overflow-hidden">
              <p className="animate-[slideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.4s_both] text-[10px] font-[400] tracking-[0.35em] text-white/55 uppercase"
                 style={{ fontFamily: 'Outfit, sans-serif' }}>
                Initializing Studio
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-[88px] mx-auto w-[240px]">
            <div className="relative h-[1px] w-full bg-white/[0.06] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/60 to-transparent animate-[loader_2.2s_cubic-bezier(0.65,0,0.35,1)_forwards]" />
            </div>
            <div className="mt-3 flex justify-between text-[8px] font-[500] tracking-[0.25em] text-white/35 uppercase" 
                 style={{ fontFamily: 'Space Grotesk, monospace' }}>
              <span>00</span>
              <span className="tabular-nums tracking-[0.3em]">READY</span>
              <span>24</span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          @keyframes loader {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-500/20 selection:text-red-100"
         style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
      
      {/* Custom cursor (desktop only) */}
      <div className="hidden lg:block fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference">
        <div 
          className="fixed w-[20px] h-[20px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out"
          style={{ 
            left: mousePosition.x,
            top: mousePosition.y,
            transform: `translate(-50%, -50%) scale(${cursorVariant === 'hover' ? 1.5 : 1})`
          }}
        >
          <div className="w-full h-full border border-white/80 rounded-full" />
          <div className="absolute inset-[5px] bg-white rounded-full" />
        </div>
      </div>

      {/* Scroll progress */}
      <div className="fixed top-0 inset-x-0 h-[1px] z-[100] origin-left">
        <div 
          className="h-full bg-gradient-to-r from-red-500 via-red-500 to-rose-400"
          style={{ 
            transform: `scaleX(${scrollProgress / 100})`,
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(239, 68, 68, 0.3)'
          }} 
        />
      </div>

      {/* Cinematic noise texture */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-screen z-[1]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      {/* Animated ambient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[900px] h-[900px] rounded-full blur-[140px] opacity-[0.04] animate-[pulse_12s_ease-in-out_infinite]"
               style={{ background: 'radial-gradient(circle, rgb(239, 68, 68) 0%, transparent 70%)' }} />
        </div>
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.03] animate-[pulse_15s_ease-in-out_infinite_1s]"
             style={{ background: 'radial-gradient(circle, rgb(244, 63, 94) 0%, transparent 70%)' }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled 
          ? 'bg-[#050505]/90 backdrop-blur-[20px] border-b border-white/[0.04]' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[76px]">
            {/* Wordmark */}
            <button 
              onClick={() => setActivePage('home')}
              className="group relative flex items-center gap-[14px]"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="relative">
                <div className="h-[22px] w-[22px]">
                  <div className="relative h-full w-full transition-transform duration-700 group-hover:rotate-[135deg]">
                    <div className="absolute inset-0 border-[1.25px] border-white/80 group-hover:border-red-500 transition-colors"
                         style={{ clipPath: 'polygon(0 0, 100% 0, 100% 9px, 9px 9px, 9px 100%, 0 100%)' }} />
                    <div className="absolute inset-0 border-[1.25px] border-red-500/0 group-hover:border-red-500 translate-x-[4.5px] translate-y-[4.5px] transition-all duration-700"
                         style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 0 9px, calc(100% - 9px) 9px, calc(100% - 9px) 0)' }} />
                  </div>
                </div>
                <div className="absolute -inset-3 bg-red-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[11px] font-[600] tracking-[0.24em] leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>
                  SHUBH SRIVASTAV
                </span>
                <span className="text-[7px] font-[500] tracking-[0.3em] text-white/40 leading-none mt-[3px] uppercase" 
                      style={{ fontFamily: 'Space Grotesk, monospace' }}>
                  Studio
                </span>
              </div>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center gap-[2px] p-[3px] rounded-full bg-white/[0.02] border border-white/[0.06] backdrop-blur-2xl">
                {[
                  { id: 'home', label: 'Index' },
                  { id: 'about', label: 'CV / About' },
                  { id: 'portfolio', label: 'Works' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className={`relative px-[22px] h-[38px] text-[11px] font-[500] tracking-[0.04em] rounded-full transition-all duration-500 ${
                      activePage === item.id 
                        ? 'text-white' 
                        : 'text-white/60 hover:text-white/90'
                    }`}
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {activePage === item.id && (
                      <div className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/[0.08] backdrop-blur-xl" />
                    )}
                    <span className="relative z-10 tracking-[0.06em]">{item.label}</span>
                    {activePage === item.id && (
                      <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] bg-red-500 rounded-full blur-[0.5px]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="w-[1px] h-[28px] bg-white/[0.08] mx-[22px]" />

              <button 
                onClick={() => setActivePage('contact')}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="group relative flex items-center gap-[10px] pl-[5px] pr-[18px] h-[42px] rounded-full bg-[#0a0a0a] border border-white/[0.08] hover:border-red-500/30 transition-all duration-500"
              >
                <div className="relative h-[32px] w-[32px] rounded-full bg-white text-[#050505] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <svg className="relative w-[14px] h-[14px] stroke-[1.75] group-hover:stroke-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </div>
                <span className="text-[11px] font-[550] tracking-[0.03em]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Commission
                </span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-[44px] h-[44px] rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center"
            >
              <div className="relative w-[18px] h-[14px]">
                <div className={`absolute w-full h-[1.25px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'top-[6.5px] rotate-45' : 'top-0'}`} />
                <div className={`absolute w-full h-[1.25px] bg-white top-[6.5px] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <div className={`absolute w-full h-[1.25px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'top-[6.5px] -rotate-45' : 'top-[13px]'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute inset-x-0 top-[76px] bg-[#050505]/95 backdrop-blur-2xl border-y border-white/[0.04]">
            <div className="px-6 py-8 space-y-1">
              {[
                { id: 'home', label: 'Index' },
                { id: 'about', label: 'CV / About' },
                { id: 'portfolio', label: 'Works' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActivePage(item.id); setMobileMenuOpen(false); }}
                  className={`block w-full text-left px-5 py-[16px] rounded-[14px] text-[15px] font-[450] tracking-[0.02em] transition-all ${
                    activePage === item.id 
                      ? 'bg-white/[0.06] text-white border border-white/[0.08]' 
                      : 'text-white/70 hover:bg-white/[0.03] hover:text-white'
                  }`}
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="relative z-10">
        {/* HOME PAGE */}
        {activePage === 'home' && (
          <div>
            {/* Hero */}
            <section ref={heroRef} className="relative min-h-[100svh] flex items-center overflow-hidden">
              {/* Cinematic grid */}
              <div className="absolute inset-0 opacity-[0.025]">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(white 0.5px, transparent 0.5px),
                    linear-gradient(90deg, white 0.5px, transparent 0.5px)
                  `,
                  backgroundSize: '64px 64px',
                  backgroundPosition: 'center'
                }} />
              </div>

              {/* Film grain vignette */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#050505]" />
                <div className="absolute inset-0 opacity-[0.025] mix-blend-screen" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }} />
              </div>

              <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-8 pt-[88px] pb-[120px] w-full">
                <div className="max-w-[1120px]">
                  {/* Eyebrow */}
                  <div className="flex items-center gap-[18px] mb-[48px]" data-parallax="0.2">
                    <div className="flex items-center gap-[6px]">
                      <div className="w-[2px] h-[2px] bg-red-500 rounded-full animate-pulse" />
                      <div className="w-[20px] h-[1px] bg-gradient-to-r from-red-500/80 to-transparent" />
                    </div>
                    <span className="text-[10px] font-[550] tracking-[0.28em] text-white/60 uppercase" 
                          style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      Creative Studio • New Delhi
                    </span>
                    <div className="hidden md:flex items-center gap-[5px] px-[10px] h-[22px] rounded-full bg-red-500/5 border border-red-500/15">
                      <div className="w-[4px] h-[4px] rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[9px] font-[600] tracking-[0.2em] text-red-400 uppercase" 
                            style={{ fontFamily: 'Space Grotesk, monospace' }}>
                        Available
                      </span>
                    </div>
                  </div>

                  {/* Main headline */}
                  <div className="space-y-[24px] mb-[64px]">
                    <div className="overflow-hidden">
                      <h1 className="text-[clamp(48px,11vw,148px)] font-[750] leading-[0.82] tracking-[-0.04em]" 
                          style={{ fontFamily: 'Syne, sans-serif' }}>
                        <span className="block">
                          SHUBH
                        </span>
                        <span className="block relative ml-[0.08em]">
                          SRIVASTAV
                          <div className="absolute -right-[0.03em] top-[0.08em] w-[6px] h-[6px] md:w-[10px] md:h-[10px] bg-red-500 rotate-45 hidden md:block" />
                        </span>
                      </h1>
                    </div>
                    
                    <div className="max-w-[720px] pl-[3px]">
                      <div className="flex flex-wrap items-baseline gap-x-[14px] gap-y-[8px] text-[13px] md:text-[15px] font-[450] leading-[1.7] text-white/75 tracking-[-0.01em]" 
                           style={{ fontFamily: 'Outfit, sans-serif' }}>
                        <span>Filmmaker</span>
                        <span className="text-white/25">•</span>
                        <span>Video Editor</span>
                        <span className="text-white/25">•</span>
                        <span className="relative">
                          Graphic Designer
                          <span className="absolute -bottom-[2px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
                        </span>
                        <span className="text-white/25">•</span>
                        <span>Animation Student</span>
                        <span className="text-white/25">•</span>
                        <span>Creative Designer</span>
                      </div>
                    </div>
                  </div>

                  {/* Intro statement */}
                  <div className="max-w-[680px] mb-[72px] pl-[3px]" data-parallax="0.1">
                    <div className="relative">
                      <div className="absolute -left-[16px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-red-500/0 via-red-500/40 to-red-500/0 hidden md:block" />
                      <p className="text-[17px] md:text-[19px] font-[380] leading-[1.85] text-white/82 tracking-[-0.014em]"
                         style={{ fontFamily: 'Outfit, sans-serif' }}>
                        I am a passionate creative artist and animation student who loves 
                        <em className="not-italic font-[520] text-white mx-[0.18em] relative">
                          storytelling, filmmaking, editing, design
                        </em> 
                        and creating visually engaging experiences. I enjoy combining 
                        creativity with technology to build impactful visual projects.
                      </p>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-[16px]" data-parallax="0.05">
                    <button 
                      onClick={() => setActivePage('portfolio')}
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                      className="group relative h-[58px] px-[32px] bg-white text-[#050505] rounded-full font-[600] text-[14px] tracking-[-0.01em] overflow-hidden"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-rose-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      <span className="relative flex items-center justify-center gap-[12px] group-hover:text-white transition-colors duration-500">
                        View Portfolio
                        <svg className="w-[16px] h-[16px] stroke-[2] transition-transform duration-500 group-hover:translate-x-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </button>

                    <button 
                      onClick={() => setActivePage('contact')}
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                      className="group relative h-[58px] px-[32px] backdrop-blur-2xl bg-white/[0.035] border border-white/[0.12] hover:border-white/[0.22] rounded-full font-[500] text-[14px] tracking-[-0.01em] text-white/90 hover:text-white transition-all duration-300"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      <span className="flex items-center justify-center gap-[12px]">
                        Contact Me
                        <div className="w-[18px] h-[18px] rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/60 transition-colors">
                          <svg className="w-[10px] h-[10px] stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                      </span>
                    </button>
                  </div>

                  {/* Meta info */}
                  <div className="absolute bottom-[40px] right-[6%] hidden xl:flex items-center gap-[28px] text-[10px] font-[450] tracking-[0.14em] text-white/35 uppercase" 
                       style={{ fontFamily: 'Space Grotesk, monospace' }}>
                    <span>EST. 2024</span>
                    <div className="w-[1px] h-[14px] bg-white/15 rotate-[30deg]" />
                    <span>AAFT ALUMNI</span>
                  </div>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="absolute bottom-[28px] left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-[16px]">
                <div className="text-[9px] font-[500] tracking-[0.3em] text-white/35 uppercase rotate-90 origin-center whitespace-nowrap" 
                     style={{ fontFamily: 'Space Grotesk, monospace' }}>
                  SCROLL
                </div>
                <div className="w-[1px] h-[50px] relative overflow-hidden bg-white/[0.06]">
                  <div className="absolute top-0 w-full h-[30px] bg-gradient-to-b from-white/70 to-transparent animate-[scrollDown_2.4s_ease-in-out_infinite]" />
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="relative py-[80px] md:py-[100px] border-y border-white/[0.04] bg-[#040404]">
              <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/[0.04] p-[1px] rounded-[24px] overflow-hidden">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-[#060606] px-[28px] py-[36px] md:px-[36px] md:py-[44px] relative group">
                      <div className="absolute top-0 right-0 w-[64px] h-[64px] opacity-[0.015] group-hover:opacity-[0.04] transition-opacity">
                        <div className="w-full h-full" style={{
                          backgroundImage: `repeating-linear-gradient(-45deg, white, white 1px, transparent 1px, transparent 6px)`
                        }} />
                      </div>
                      <div className="relative">
                        <div className="text-[38px] md:text-[44px] font-[700] leading-[0.9] tracking-[-0.03em] mb-[14px]"
                             style={{ fontFamily: 'Syne, sans-serif' }}>
                          {stat.value}
                        </div>
                        <div className="text-[12px] font-[600] tracking-[-0.01em] text-white/90 leading-[1.3] mb-[6px]"
                             style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {stat.label}
                        </div>
                        <div className="text-[11px] font-[400] leading-[1.4] text-white/50 tracking-[-0.01em]"
                             style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {stat.sublabel}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="py-[120px] md:py-[160px] relative">
              <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-[64px] lg:gap-[112px] mb-[80px]">
                  <div className="lg:w-[420px] lg:shrink-0">
                    <div className="sticky top-[120px]">
                      <div className="flex items-center gap-[12px] mb-[26px]">
                        <div className="w-[18px] h-[1px] bg-red-500" />
                        <span className="text-[10px] font-[600] tracking-[0.22em] text-white/55 uppercase" 
                              style={{ fontFamily: 'Space Grotesk, monospace' }}>
                          Technical Arsenal
                        </span>
                      </div>
                      
                      <h2 className="text-[44px] md:text-[56px] font-[750] leading-[0.92] tracking-[-0.035em] mb-[28px]"
                          style={{ fontFamily: 'Syne, sans-serif' }}>
                        Creative
                        <br />
                        Capabilities
                      </h2>
                      
                      <p className="text-[16px] leading-[1.75] font-[380] text-white/70 tracking-[-0.015em] mb-[36px]"
                         style={{ fontFamily: 'Outfit, sans-serif' }}>
                        A comprehensive toolkit spanning post-production, design, animation, and emerging creative technologies.
                      </p>

                      <div className="hidden lg:block p-[20px] rounded-[18px] bg-white/[0.02] border border-white/[0.06]">
                        <div className="flex items-center gap-[14px]">
                          <div className="w-[44px] h-[44px] rounded-[12px] bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                            <div className="w-[7px] h-[7px] bg-red-500 rounded-full animate-pulse" />
                          </div>
                          <div>
                            <div className="text-[12px] font-[600] tracking-[-0.01em] text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                              AAFT Animation
                            </div>
                            <div className="text-[11px] font-[450] text-white/55" style={{ fontFamily: 'Outfit, sans-serif' }}>
                              B.Sc Pursuing • 2024-Present
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="space-y-[28px]">
                      {skills.map((skill, i) => (
                        <div key={skill.name} className="group">
                          <div className="flex items-baseline justify-between mb-[14px]">
                            <div className="flex items-baseline gap-[14px]">
                              <span className="text-[11px] font-[550] tracking-[0.18em] text-white/35 tabular-nums"
                                    style={{ fontFamily: 'Space Grotesk, monospace' }}>
                                {(i + 1).toString().padStart(2, '0')}
                              </span>
                              <h3 className="text-[17px] font-[550] tracking-[-0.015em] text-white"
                                  style={{ fontFamily: 'Outfit, sans-serif' }}>
                                {skill.name}
                              </h3>
                            </div>
                            <span className="text-[11px] font-[500] tracking-[0.08em] text-white/45" 
                                  style={{ fontFamily: 'Outfit, sans-serif' }}>
                              {skill.category}
                            </span>
                          </div>
                          
                          <div className="relative h-[30px] flex items-center">
                            <div className="absolute inset-x-0 h-[1px] bg-white/[0.06]" />
                            <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-white/[0.12] via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <div 
                              className="absolute h-[30px] flex items-center"
                              style={{ width: `${skill.level}%` }}
                            >
                              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-red-500 relative">
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                                  <div className="w-[7px] h-[7px] rotate-45 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]" />
                                  <div className="absolute inset-0 w-[7px] h-[7px] rotate-45 bg-red-500 animate-ping opacity-40" />
                                </div>
                              </div>
                            </div>

                            <div className="absolute right-0 -top-[2px]">
                              <span className="text-[10px] font-[600] tracking-[0.08em] text-white/90 tabular-nums px-[8px] py-[3px] rounded-full bg-[#0c0c0c] border border-white/[0.08]"
                                    style={{ fontFamily: 'Space Grotesk, monospace' }}>
                                {skill.level}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Achievements */}
            <section className="py-[120px] bg-[#060606] border-y border-white/[0.04] relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>

              <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
                <div className="max-w-[880px] mb-[84px]">
                  <div className="flex items-center gap-[14px] mb-[28px]">
                    <div className="w-[24px] h-[1px] bg-red-500" />
                    <span className="text-[10px] font-[600] tracking-[0.24em] text-white/60 uppercase" 
                          style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      Professional Recognition
                    </span>
                  </div>
                  
                  <h2 className="text-[40px] md:text-[52px] font-[750] leading-[0.95] tracking-[-0.035em] mb-[28px]"
                      style={{ fontFamily: 'Syne, sans-serif' }}>
                    Creative Achievements
                    <br className="hidden md:block" />
                    & Recognition
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-[1px] bg-white/[0.04] p-[1px] rounded-[28px] overflow-hidden">
                  {[
                    {
                      title: 'Creative Storytelling',
                      body: 'Developed compelling narrative structures for short films and visual projects, demonstrating strong command over screenwriting fundamentals and visual story language.',
                      meta: 'Narrative Design'
                    },
                    {
                      title: 'Film Direction',
                      body: 'Led creative direction for multiple student film projects, coordinating cinematography, performance, and post-production workflows with precise artistic vision.',
                      meta: 'Leadership'
                    },
                    {
                      title: 'Poster Creation',
                      body: 'Crafted award-recognized poster designs for institutional events and brand campaigns, specializing in typographic hierarchy and visual impact at scale.',
                      meta: 'Graphic Systems'
                    },
                    {
                      title: 'Visual Creativity',
                      body: 'Pioneered experimental approaches combining traditional design principles with AI-assisted workflows, establishing new creative possibilities.',
                      meta: 'Innovation'
                    },
                    {
                      title: 'Sports & Discipline',
                      body: 'Recognized for outstanding sportsmanship and athletic achievement throughout school career, maintaining excellence in both academics and athletics.',
                      meta: 'Character'
                    },
                    {
                      title: 'Team Leadership',
                      body: 'Demonstrated consistent leadership in collaborative creative environments, facilitating productive team dynamics and mentoring peers.',
                      meta: 'Collaboration'
                    }
                  ].map((item, i) => (
                    <div key={i} className="group relative bg-[#070707] p-[36px] md:p-[44px] hover:bg-[#080808] transition-colors duration-500">
                      <div className="absolute top-[28px] right-[28px] text-[10px] font-[500] tracking-[0.14em] text-white/20 tabular-nums"
                           style={{ fontFamily: 'Space Grotesk, monospace' }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      
                      <div className="mb-[20px]">
                        <div className="inline-flex items-center gap-[10px] px-[13px] h-[26px] rounded-full bg-white/[0.03] border border-white/[0.06] text-[10px] font-[550] tracking-[0.08em] text-white/70 uppercase"
                             style={{ fontFamily: 'Space Grotesk, monospace' }}>
                          <div className="w-[3px] h-[3px] rounded-full bg-red-500/70" />
                          {item.meta}
                        </div>
                      </div>

                      <h3 className="text-[22px] font-[650] leading-[1.25] tracking-[-0.02em] text-white mb-[16px] group-hover:text-red-100 transition-colors"
                          style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {item.title}
                      </h3>
                      
                      <p className="text-[15px] leading-[1.75] font-[380] text-white/65 tracking-[-0.01em]"
                         style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {item.body}
                      </p>

                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/0 group-hover:via-red-500/60 to-transparent transition-all duration-700" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Work */}
            <section className="py-[120px] md:py-[160px]">
              <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[48px] mb-[72px]">
                  <div className="max-w-[620px]">
                    <div className="flex items-center gap-[14px] mb-[24px]">
                      <div className="w-[20px] h-[1px] bg-red-500" />
                      <span className="text-[10px] font-[600] tracking-[0.22em] text-white/55 uppercase"
                            style={{ fontFamily: 'Space Grotesk, monospace' }}>
                        Selected Works
                      </span>
                    </div>
                    
                    <h2 className="text-[40px] md:text-[52px] font-[750] leading-[0.92] tracking-[-0.035em]"
                        style={{ fontFamily: 'Syne, sans-serif' }}>
                      Featured Projects
                    </h2>
                  </div>
                  
                  <button 
                    onClick={() => setActivePage('portfolio')}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="group self-start lg:self-auto inline-flex items-center gap-[14px] px-[26px] h-[52px] rounded-full border border-white/[0.10] hover:border-red-500/40 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
                  >
                    <span className="text-[13px] font-[550] tracking-[-0.01em]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Explore All Works
                    </span>
                    <div className="w-[20px] h-[20px] rounded-full border border-white/20 group-hover:border-red-500/60 flex items-center justify-center transition-colors">
                      <svg className="w-[11px] h-[11px] stroke-[1.75] group-hover:stroke-red-400 transition-all group-hover:translate-x-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-[22px]">
                  {portfolioProjects.slice(0, 3).map((project) => (
                    <div key={project.id} className="group relative">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#0a0a0a] border border-white/[0.06]">
                        {/* Project visual */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-[0.08] group-hover:opacity-[0.12] transition-opacity`} />
                        
                        {/* Noise */}
                        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                        }} />

                        {/* Abstract grid */}
                        <div className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                          <div className="absolute inset-[24px] border border-white/10 rounded-[14px]" />
                          <div className="absolute inset-[44px] border border-white/5 rounded-[10px]" />
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 p-[32px] flex flex-col">
                          <div className="flex items-start justify-between mb-auto">
                            <div className={`px-[12px] h-[26px] rounded-full ${project.accent} backdrop-blur-xl border border-white/[0.06] flex items-center gap-[8px]`}>
                              <div className="w-[4px] h-[4px] rounded-full bg-white/80 animate-pulse" />
                              <span className="text-[10px] font-[600] tracking-[0.08em] text-white/90 uppercase" 
                                    style={{ fontFamily: 'Space Grotesk, monospace' }}>
                                {project.type}
                              </span>
                            </div>
                            <div className="w-[36px] h-[36px] rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl flex items-center justify-center group-hover:bg-white/[0.06] transition-colors">
                              <svg className="w-[15px] h-[15px] stroke-[1.75] text-white/60 group-hover:text-white transition-all group-hover:rotate-[-45deg] group-hover:scale-[1.05]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                              </svg>
                            </div>
                          </div>

                          <div className="mt-auto">
                            <h3 className="text-[26px] font-[700] leading-[1.1] tracking-[-0.025em] text-white mb-[12px]"
                                style={{ fontFamily: 'Syne, sans-serif' }}>
                              {project.title}
                            </h3>
                            <p className="text-[14px] leading-[1.65] font-[400] text-white/70 line-clamp-3"
                               style={{ fontFamily: 'Outfit, sans-serif' }}>
                              {project.description}
                            </p>
                          </div>
                        </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
                        
                        {/* View button */}
                        <div className="absolute bottom-[32px] left-[32px] right-[32px] translate-y-[8px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="flex items-center justify-center gap-[10px] w-full h-[46px] rounded-[14px] bg-white text-[#050505] font-[600] text-[13px] tracking-[-0.01em] hover:bg-red-500 hover:text-white transition-colors"
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                          >
                            View Project
                            <svg className="w-[14px] h-[14px] stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          </a>
                        </div>
                      </div>

                      <div className="mt-[18px] flex items-center justify-between px-[4px]">
                        <span className="text-[11px] font-[500] tracking-[0.14em] text-white/45 uppercase" 
                              style={{ fontFamily: 'Space Grotesk, monospace' }}>
                          Work / 0{project.id}
                        </span>
                        <div className="flex items-center gap-[5px]">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className={`w-[3px] h-[3px] rounded-full ${i === 0 ? 'bg-red-500' : 'bg-white/20'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ABOUT PAGE */}
        {activePage === 'about' && (
          <div className="pt-[120px] pb-[140px]">
            <div className="max-w-[1080px] mx-auto px-6 lg:px-8">
              {/* Hero */}
              <div className="mb-[100px] md:mb-[130px]">
                <div className="flex items-center gap-[14px] mb-[32px]">
                  <div className="w-[22px] h-[1px] bg-red-500" />
                  <span className="text-[10px] font-[600] tracking-[0.22em] text-white/55 uppercase" 
                        style={{ fontFamily: 'Space Grotesk, monospace' }}>
                    Curriculum Vitae • 2024
                  </span>
                </div>

                <h1 className="text-[48px] md:text-[72px] font-[800] leading-[0.88] tracking-[-0.04em] mb-[40px]"
                    style={{ fontFamily: 'Syne, sans-serif' }}>
                  About &<br />
                  Creative CV
                </h1>

                <div className="max-w-[720px] space-y-[24px] text-[18px] leading-[1.8] font-[380] text-white/80 tracking-[-0.015em]"
                     style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <p>
                    I am <span className="font-[600] text-white">Shubh Srivastav</span>, an animation student at AAFT and multidisciplinary creative 
                    specializing in filmmaking, video editing, and visual design. My practice sits at the intersection 
                    of technical craft and artistic expression.
                  </p>
                  <p className="text-white/70">
                    Through rigorous study and hands-on creation across film, motion graphics, and digital design, 
                    I've developed a distinct visual language—one that prioritizes emotional resonance, technical precision, 
                    and meaningful storytelling in every frame.
                  </p>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid lg:grid-cols-[320px_1fr] gap-[72px] lg:gap-[100px] mb-[120px]">
                {/* Sidebar */}
                <div className="space-y-[48px]">
                  <div className="p-[28px] rounded-[24px] bg-[#0a0a0a] border border-white/[0.06]">
                    <h3 className="text-[11px] font-[650] tracking-[0.18em] text-white/50 uppercase mb-[22px]" 
                        style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      Personal
                    </h3>
                    <div className="space-y-[18px]">
                      {[
                        { label: 'Name', value: 'Shubh Srivastav' },
                        { label: 'Role', value: 'Animation Student & Creative' },
                        { label: 'Location', value: 'India • New Delhi' },
                        { label: 'Email', value: 'shubhsrivastav65@gmail.com' },
                        { label: 'Phone', value: '+91 8368083064' }
                      ].map((item) => (
                        <div key={item.label} className="group">
                          <div className="text-[10px] font-[550] tracking-[0.14em] text-white/40 uppercase mb-[5px]" 
                               style={{ fontFamily: 'Space Grotesk, monospace' }}>
                            {item.label}
                          </div>
                          <div className="text-[14px] font-[450] tracking-[-0.01em] text-white group-hover:text-red-100 transition-colors"
                               style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[11px] font-[650] tracking-[0.18em] text-white/50 uppercase mb-[22px] pl-[2px]" 
                        style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      Education
                    </h3>
                    <div className="relative pl-[22px] border-l border-white/[0.08]">
                      <div className="absolute left-[-5px] top-[6px] w-[9px] h-[9px] rounded-full bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]" />
                      <div className="text-[16px] font-[600] tracking-[-0.015em] text-white mb-[4px]" 
                           style={{ fontFamily: 'Outfit, sans-serif' }}>
                        B.Sc Animation
                      </div>
                      <div className="text-[13px] font-[450] text-white/70 mb-[3px]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        AAFT • Asian Academy of Film & Television
                      </div>
                      <div className="text-[11px] font-[500] tracking-[0.08em] text-white/45 uppercase" 
                           style={{ fontFamily: 'Space Grotesk, monospace' }}>
                        2024 — Present • Pursuing
                      </div>
                    </div>
                  </div>

                  <div className="p-[24px] rounded-[20px] bg-red-500/[0.03] border border-red-500/[0.12]">
                    <div className="flex items-start gap-[14px]">
                      <div className="w-[36px] h-[36px] rounded-[12px] bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-[1px]">
                        <svg className="w-[16px] h-[16px] stroke-[1.5] text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.354a15.056 15.056 0 01-4.5 0M9.75 10.5h.008v.008H9.75V10.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[13px] font-[600] tracking-[-0.01em] text-white mb-[4px]" 
                             style={{ fontFamily: 'Outfit, sans-serif' }}>
                          Currently Available
                        </div>
                        <div className="text-[12px] leading-[1.5] font-[400] text-white/65" 
                             style={{ fontFamily: 'Outfit, sans-serif' }}>
                          Open for freelance projects and creative collaborations.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main */}
                <div className="min-w-0">
                  {/* Skills */}
                  <div className="mb-[80px]">
                    <h2 className="text-[28px] font-[700] leading-[1.15] tracking-[-0.025em] text-white mb-[36px]"
                        style={{ fontFamily: 'Syne, sans-serif' }}>
                      Core Competencies
                    </h2>
                    
                    <div className="grid sm:grid-cols-2 gap-[14px]">
                      {[
                        'Video Editing & Cinematic Cut',
                        'Motion Graphics & Compositing',
                        'Graphic Design Systems',
                        'Script Writing & Storyboarding',
                        'Poster Design & Layout',
                        'AI Video Generation',
                        'Digital Matte Painting',
                        'Narrative Storytelling',
                        'Brand Identity & Logo Design',
                        'Creative Direction'
                      ].map((skill) => (
                        <div key={skill} className="group flex items-center gap-[14px] px-[18px] h-[48px] rounded-[14px] bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all">
                          <div className="w-[5px] h-[5px] rounded-full bg-red-500/70 group-hover:bg-red-500 transition-colors" />
                          <span className="text-[14px] font-[450] tracking-[-0.01em] text-white/85 group-hover:text-white transition-colors"
                                style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-[80px]">
                    <h2 className="text-[28px] font-[700] leading-[1.15] tracking-[-0.025em] text-white mb-[36px]"
                        style={{ fontFamily: 'Syne, sans-serif' }}>
                      Certifications & Recognition
                    </h2>
                    
                    <div className="space-y-[20px]">
                      {[
                        {
                          title: 'Excellence in Athletics',
                          body: 'Recognized for outstanding sports performance and team leadership throughout secondary education',
                          year: '2019—2023'
                        },
                        {
                          title: 'Academic Discipline Distinction',
                          body: 'Maintained exemplary academic record while pursuing intensive creative development',
                          year: 'School Years'
                        },
                        {
                          title: 'Creative Arts Participation',
                          body: 'Active contributor to school creative programs, film clubs, and design initiatives',
                          year: 'Ongoing'
                        },
                        {
                          title: 'Collaborative Leadership',
                          body: 'Consistently demonstrated ability to lead creative teams and mentor peers effectively',
                          year: 'Recognized'
                        }
                      ].map((item) => (
                        <div key={item.title} className="group relative pl-[28px] py-[22px] border-l border-white/[0.06] hover:border-red-500/30 transition-colors">
                          <div className="absolute left-[-5px] top-[28px] w-[9px] h-[9px] rounded-full border-2 border-[#080808] bg-white/40 group-hover:bg-red-500 transition-colors" />
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-[8px] mb-[8px]">
                            <h3 className="text-[17px] font-[600] tracking-[-0.015em] text-white group-hover:text-red-50 transition-colors"
                                style={{ fontFamily: 'Outfit, sans-serif' }}>
                              {item.title}
                            </h3>
                            <span className="text-[11px] font-[500] tracking-[0.08em] text-white/40 uppercase tabular-nums"
                                  style={{ fontFamily: 'Space Grotesk, monospace' }}>
                              {item.year}
                            </span>
                          </div>
                          <p className="text-[14px] leading-[1.65] font-[380] text-white/65"
                             style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {item.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Personality */}
                  <div>
                    <h2 className="text-[28px] font-[700] leading-[1.15] tracking-[-0.025em] text-white mb-[36px]"
                        style={{ fontFamily: 'Syne, sans-serif' }}>
                      Working Style
                    </h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-[12px]">
                      {[
                        'Creative Thinker',
                        'Fast Learner',
                        'Detail-Oriented',
                        'Passionate Storyteller',
                        'Team Collaborator',
                        'Visual Innovator',
                        'Disciplined',
                        'Concept-Driven',
                        'Technically Fluent'
                      ].map((trait) => (
                        <div key={trait} className="px-[16px] h-[44px] flex items-center justify-center text-center rounded-[14px] bg-[#0c0c0c] border border-white/[0.05] text-[13px] font-[500] tracking-[-0.01em] text-white/80 hover:text-white hover:border-white/[0.10] hover:bg-[#0e0e0e] transition-all"
                             style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {trait}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Full width statement */}
              <div className="relative rounded-[32px] overflow-hidden border border-white/[0.06] bg-[#080808]">
                <div className="absolute inset-0 opacity-[0.03]">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 28px)`
                  }} />
                </div>
                
                <div className="relative p-[48px] md:p-[72px]">
                  <div className="max-w-[780px]">
                    <div className="w-[48px] h-[1px] bg-red-500 mb-[28px]" />
                    <blockquote className="text-[22px] md:text-[26px] font-[380] leading-[1.65] tracking-[-0.02em] text-white/90 mb-[28px]"
                                style={{ fontFamily: 'Outfit, sans-serif' }}>
                      "Design is not just what it looks like—it's how every element serves the narrative. 
                      I believe in craft that disappears into emotional impact."
                    </blockquote>
                    <div className="flex items-center gap-[14px]">
                      <div className="w-[32px] h-[1px] bg-white/20" />
                      <span className="text-[13px] font-[500] tracking-[-0.01em] text-white/60" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Shubh Srivastav — Creative Philosophy
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PORTFOLIO PAGE */}
        {activePage === 'portfolio' && (
          <div className="pt-[120px] pb-[140px]">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
              {/* Header */}
              <div className="mb-[72px] md:mb-[96px]">
                <div className="flex flex-wrap items-center gap-[16px] mb-[36px]">
                  <div className="flex items-center gap-[10px] px-[14px] h-[30px] rounded-full bg-red-500/10 border border-red-500/20">
                    <div className="w-[5px] h-[5px] rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-[650] tracking-[0.16em] text-red-300 uppercase" 
                          style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      Archive • 2024
                    </span>
                  </div>
                  <div className="h-[18px] w-[1px] bg-white/15 rotate-[30deg] hidden md:block" />
                  <span className="text-[11px] font-[500] tracking-[0.14em] text-white/50 uppercase"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}>
                    {portfolioProjects.length} Selected Works
                  </span>
                </div>

                <h1 className="text-[52px] md:text-[76px] font-[800] leading-[0.88] tracking-[-0.04em] mb-[36px] max-w-[900px]"
                    style={{ fontFamily: 'Syne, sans-serif' }}>
                  Works & 
                  <span className="relative mx-[0.08em]">
                    Projects
                    <div className="absolute -bottom-[6px] left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 via-rose-500 to-transparent opacity-60" />
                  </span>
                </h1>

                <p className="text-[17px] md:text-[19px] leading-[1.75] font-[380] text-white/75 max-w-[680px] tracking-[-0.015em]"
                   style={{ fontFamily: 'Outfit, sans-serif' }}>
                  A curated collection of film, design, and experimental work showcasing technical craft and conceptual depth.
                </p>
              </div>

              {/* Filters */}
              <div className="mb-[64px] overflow-x-auto scrollbar-none">
                <div className="inline-flex items-center gap-[6px] p-[5px] rounded-full bg-[#0a0a0a] border border-white/[0.06] backdrop-blur-2xl">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                      className={`relative px-[22px] h-[40px] rounded-full text-[12.5px] font-[550] tracking-[-0.01em] transition-all whitespace-nowrap ${
                        activeFilter === filter.id
                          ? 'text-[#050505]'
                          : 'text-white/70 hover:text-white'
                      }`}
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {activeFilter === filter.id && (
                        <div className="absolute inset-0 bg-white rounded-full" />
                      )}
                      <span className="relative z-10">{filter.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Portfolio grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[24px] md:gap-[28px] auto-rows-[minmax(420px,auto)]">
                {filteredProjects.map((project, index) => (
                  <div 
                    key={project.id}
                    className="group relative"
                    style={{ gridRow: index % 3 === 1 ? 'span 2' : 'span 1' }}
                  >
                    <div className="absolute -inset-[1px] rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-red-500/20 via-rose-500/10 to-transparent blur-[20px]" />
                    </div>

                    <div className="relative h-full bg-[#0a0a0a] rounded-[26px] border border-white/[0.06] overflow-hidden group-hover:border-white/[0.12] transition-all duration-700">
                      {/* Visual area */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
                        
                        {/* Animated grid pattern */}
                        <div className="absolute inset-0 opacity-[0.06] group-hover:opacity-[0.10] transition-opacity">
                          <div className="absolute inset-0" style={{
                            backgroundImage: `
                              linear-gradient(white 1px, transparent 1px),
                              linear-gradient(90deg, white 1px, transparent 1px)
                            `,
                            backgroundSize: '32px 32px',
                            transform: 'scale(1.1)'
                          }} />
                        </div>

                        {/* Central composition */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <div className="w-[88px] h-[88px] rounded-full border-[1.5px] border-white/10 group-hover:border-white/20 transition-colors duration-700" />
                            <div className="absolute inset-[12px] rounded-full border border-white/[0.08] group-hover:border-white/15 transition-colors duration-700" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-[18px] h-[18px] relative">
                                <div className="absolute inset-0 border-[1.5px] border-white/60 group-hover:border-red-400 transition-colors duration-700" />
                                <div className="absolute inset-[4px] bg-white/60 group-hover:bg-red-400 transition-colors duration-700" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Project number */}
                        <div className="absolute top-[22px] left-[22px] px-[11px] h-[26px] rounded-full bg-black/70 backdrop-blur-2xl border border-white/[0.08] flex items-center gap-[7px]">
                          <span className="text-[10px] font-[600] tracking-[0.14em] text-white/85 tabular-nums" 
                                style={{ fontFamily: 'Space Grotesk, monospace' }}>
                            {String(project.id).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Category */}
                        <div className="absolute top-[22px] right-[22px]">
                          <div className={`px-[11px] h-[26px] rounded-full ${project.accent} backdrop-blur-2xl border border-white/[0.08] flex items-center`}>
                            <span className="text-[10px] font-[600] tracking-[0.08em] text-white uppercase" 
                                  style={{ fontFamily: 'Space Grotesk, monospace' }}>
                              {project.category}
                            </span>
                          </div>
                        </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                      </div>

                      {/* Content */}
                      <div className="p-[26px]">
                        <div className="flex items-start justify-between gap-[16px] mb-[16px]">
                          <div>
                            <h3 className="text-[22px] font-[700] leading-[1.15] tracking-[-0.02em] text-white group-hover:text-red-50 transition-colors mb-[6px]"
                                style={{ fontFamily: 'Syne, sans-serif' }}>
                              {project.title}
                            </h3>
                            <div className="text-[11px] font-[550] tracking-[0.08em] text-white/55 uppercase" 
                                 style={{ fontFamily: 'Space Grotesk, monospace' }}>
                              {project.type}
                            </div>
                          </div>
                          <button 
                            onClick={() => setSelectedProject(project)}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="shrink-0 w-[40px] h-[40px] rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-red-500 hover:border-red-500 flex items-center justify-center group/btn transition-all"
                          >
                            <svg className="w-[16px] h-[16px] stroke-[1.75] text-white/70 group-hover/btn:text-white transition-all group-hover/btn:rotate-[45deg]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                          </button>
                        </div>

                        <p className="text-[14px] leading-[1.65] font-[380] text-white/65 line-clamp-3 mb-[22px]"
                           style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {project.description}
                        </p>

                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => setCursorVariant('hover')}
                          onMouseLeave={() => setCursorVariant('default')}
                          className="group/link inline-flex items-center gap-[10px] text-[13px] font-[550] tracking-[-0.01em] text-white/85 hover:text-white transition-colors"
                          style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                          <span>View Project</span>
                          <div className="relative w-[18px] h-[18px] overflow-hidden">
                            <svg className="w-[18px] h-[18px] stroke-[1.75] absolute transition-all duration-300 group-hover/link:translate-x-[18px] group-hover/link:-translate-y-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                            <svg className="w-[18px] h-[18px] stroke-[1.75] absolute -translate-x-[18px] translate-y-[18px] transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:translate-y-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          </div>
                        </a>
                      </div>

                      {/* Bottom accent */}
                      <div className="absolute bottom-0 inset-x-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="h-full w-full bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="mt-[120px] pt-[72px] border-t border-white/[0.06]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[40px]">
                  <div>
                    <h3 className="text-[24px] font-[700] tracking-[-0.02em] text-white mb-[10px]" style={{ fontFamily: 'Syne, sans-serif' }}>
                      Follow the Process
                    </h3>
                    <p className="text-[15px] font-[400] text-white/60" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Behind-the-scenes and works in progress
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-[14px]">
                    <a 
                      href="https://youtube.com/@_meme.hub74?si=Xe_to-Z7jlwPBkyu"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                      className="group flex items-center gap-[14px] px-[22px] h-[56px] rounded-full bg-[#0f0f0f] border border-white/[0.08] hover:border-red-500/30 hover:bg-[#121212] transition-all"
                    >
                      <div className="w-[28px] h-[28px] rounded-full bg-red-600 flex items-center justify-center">
                        <svg className="w-[14px] h-[14px] fill-white" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="text-[13px] font-[600] tracking-[-0.01em] text-white leading-[1.1]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          YouTube
                        </div>
                        <div className="text-[11px] font-[450] text-white/55">@_meme.hub74</div>
                      </div>
                      <svg className="w-[14px] h-[14px] stroke-[1.75] text-white/30 group-hover:text-white/70 group-hover:translate-x-[2px] transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>

                    <a 
                      href="https://www.behance.net/shubhsrivastav3"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                      className="group flex items-center gap-[14px] px-[22px] h-[56px] rounded-full bg-[#0f0f0f] border border-white/[0.08] hover:border-blue-500/30 hover:bg-[#121212] transition-all"
                    >
                      <div className="w-[28px] h-[28px] rounded-full bg-[#0057FF] flex items-center justify-center">
                        <svg className="w-[14px] h-[14px] fill-white" viewBox="0 0 24 24">
                          <path d="M16.668 6.6H13.97v-.93h2.698v.93zm-6.713 6.653c-.16 1.05-1.046 1.82-2.448 1.82-1.8 0-2.79-1.3-2.79-3.033h5.238v-.955H4.717c0-1.733.99-3.033 2.79-3.033 1.402 0 2.288.77 2.448 1.82h-2.028v.955h4.028v.426zm8.046-1.21c0 1.77-1.33 2.81-3.313 2.81h-4.39V6.6h4.19c1.943 0 3.108.96 3.108 2.57 0 .99-.51 1.74-1.28 2.1.94.34 1.685 1.18 1.685 2.773z"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="text-[13px] font-[600] tracking-[-0.01em] text-white leading-[1.1]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          Behance
                        </div>
                        <div className="text-[11px] font-[450] text-white/55">shubhsrivastav3</div>
                      </div>
                      <svg className="w-[14px] h-[14px] stroke-[1.75] text-white/30 group-hover:text-white/70 group-hover:translate-x-[2px] transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT PAGE */}
        {activePage === 'contact' && (
          <div className="pt-[120px] pb-[140px] relative overflow-hidden">
            {/* Background orbs */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none">
              <div className="w-full h-full rounded-full blur-[180px] opacity-[0.035]"
                   style={{ background: 'radial-gradient(circle, rgb(239, 68, 68) 0%, transparent 60%)' }} />
            </div>

            <div className="max-w-[1120px] mx-auto px-6 lg:px-8 relative">
              {/* Header */}
              <div className="text-center max-w-[760px] mx-auto mb-[88px]">
                <div className="inline-flex items-center gap-[10px] px-[16px] h-[32px] rounded-full bg-red-500/10 border border-red-500/20 mb-[28px]">
                  <div className="w-[5px] h-[5px] rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-[650] tracking-[0.18em] text-red-300 uppercase" 
                        style={{ fontFamily: 'Space Grotesk, monospace' }}>
                    Commission Inquiry
                  </span>
                </div>

                <h1 className="text-[48px] md:text-[64px] font-[800] leading-[0.9] tracking-[-0.04em] mb-[28px]"
                    style={{ fontFamily: 'Syne, sans-serif' }}>
                  Let's Create
                  <br />
                  Together
                </h1>

                <p className="text-[18px] leading-[1.75] font-[380] text-white/75 tracking-[-0.015em]"
                   style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Currently available for freelance projects, creative collaborations, and film commissions. 
                  Share your vision—let's build something meaningful.
                </p>
              </div>

              <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-[48px] lg:gap-[64px] items-start">
                {/* Form */}
                <div className="relative">
                  <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent opacity-60 blur-[0.5px]" />
                  
                  <div className="relative backdrop-blur-2xl bg-[#0a0a0a]/80 border border-white/[0.08] rounded-[30px] p-[36px] md:p-[48px] overflow-hidden">
                    {/* Glass highlight */}
                    <div className="absolute inset-0 rounded-[30px] opacity-[0.015] pointer-events-none" style={{
                      background: 'linear-gradient(115deg, white 15%, transparent 40%)'
                    }} />

                    <div className="relative">
                      <div className="flex items-center justify-between mb-[36px]">
                        <h2 className="text-[22px] font-[700] tracking-[-0.02em] text-white" 
                            style={{ fontFamily: 'Syne, sans-serif' }}>
                          Project Inquiry
                        </h2>
                        <div className="flex items-center gap-[6px] text-[10px] font-[550] tracking-[0.14em] text-white/45 uppercase" 
                             style={{ fontFamily: 'Space Grotesk, monospace' }}>
                          <div className="w-[4px] h-[4px] rounded-full bg-emerald-400 animate-pulse" />
                          Online
                        </div>
                      </div>

                      {formSubmitted ? (
                        <div className="py-[48px] text-center">
                          <div className="w-[72px] h-[72px] mx-auto mb-[24px] relative">
                            <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping" />
                            <div className="relative w-full h-full rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                              <svg className="w-[28px] h-[28px] stroke-[2.5] text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            </div>
                          </div>
                          <h3 className="text-[20px] font-[700] tracking-[-0.02em] text-white mb-[10px]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            Message Sent
                          </h3>
                          <p className="text-[14px] font-[400] text-white/70 leading-[1.6]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            Thank you. I'll respond within 24 hours.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-[24px]">
                          <div className="grid sm:grid-cols-2 gap-[20px]">
                            <div className="group">
                              <label className="block text-[11px] font-[600] tracking-[0.14em] text-white/60 uppercase mb-[12px]" 
                                     style={{ fontFamily: 'Space Grotesk, monospace' }}>
                                Name
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full h-[54px] px-[18px] rounded-[16px] bg-[#050505] border border-white/[0.08] focus:border-red-500/50 focus:outline-none focus:ring-[3px] focus:ring-red-500/10 text-[15px] font-[450] text-white placeholder-white/30 transition-all"
                                placeholder="Your name"
                                style={{ fontFamily: 'Outfit, sans-serif' }}
                              />
                            </div>
                            <div className="group">
                              <label className="block text-[11px] font-[600] tracking-[0.14em] text-white/60 uppercase mb-[12px]" 
                                     style={{ fontFamily: 'Space Grotesk, monospace' }}>
                                Email
                              </label>
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full h-[54px] px-[18px] rounded-[16px] bg-[#050505] border border-white/[0.08] focus:border-red-500/50 focus:outline-none focus:ring-[3px] focus:ring-red-500/10 text-[15px] font-[450] text-white placeholder-white/30 transition-all"
                                placeholder="your@email.com"
                                style={{ fontFamily: 'Outfit, sans-serif' }}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-[600] tracking-[0.14em] text-white/60 uppercase mb-[12px]" 
                                   style={{ fontFamily: 'Space Grotesk, monospace' }}>
                              Subject
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.subject}
                              onChange={(e) => setFormData({...formData, subject: e.target.value})}
                              className="w-full h-[54px] px-[18px] rounded-[16px] bg-[#050505] border border-white/[0.08] focus:border-red-500/50 focus:outline-none focus:ring-[3px] focus:ring-red-500/10 text-[15px] font-[450] text-white placeholder-white/30 transition-all"
                              placeholder="Project type / collaboration"
                              style={{ fontFamily: 'Outfit, sans-serif' }}
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-[600] tracking-[0.14em] text-white/60 uppercase mb-[12px]" 
                                   style={{ fontFamily: 'Space Grotesk, monospace' }}>
                              Message
                            </label>
                            <textarea
                              required
                              rows={5}
                              value={formData.message}
                              onChange={(e) => setFormData({...formData, message: e.target.value})}
                              className="w-full px-[18px] py-[16px] rounded-[16px] bg-[#050505] border border-white/[0.08] focus:border-red-500/50 focus:outline-none focus:ring-[3px] focus:ring-red-500/10 text-[15px] font-[450] text-white placeholder-white/30 resize-none transition-all leading-[1.6]"
                              placeholder="Tell me about your project, timeline, and vision..."
                              style={{ fontFamily: 'Outfit, sans-serif' }}
                            />
                          </div>

                          <button 
                            type="submit"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="group relative w-full h-[58px] rounded-[16px] bg-white text-[#050505] font-[650] text-[15px] tracking-[-0.01em] overflow-hidden"
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-rose-600 to-red-500 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                            <span className="relative flex items-center justify-center gap-[12px] group-hover:text-white transition-colors duration-500">
                              Send Inquiry
                              <svg className="w-[18px] h-[18px] stroke-[2] group-hover:translate-x-[3px] transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                              </svg>
                            </span>
                          </button>

                          <p className="text-center text-[12px] font-[450] text-white/45 leading-[1.5]" 
                             style={{ fontFamily: 'Outfit, sans-serif' }}>
                            Typically responds within 24 hours • New Delhi, India (UTC+5:30)
                          </p>
                        </form>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact info */}
                <div className="space-y-[28px]">
                  {/* Quick contact */}
                  <div className="rounded-[28px] border border-white/[0.06] bg-[#0a0a0a] p-[32px]">
                    <h3 className="text-[13px] font-[650] tracking-[0.14em] text-white/55 uppercase mb-[28px]" 
                        style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      Direct Contact
                    </h3>
                    
                    <div className="space-y-[22px]">
                      {[
                        { 
                          label: 'Email', 
                          value: 'shubhsrivastav65@gmail.com',
                          icon: (
                            <svg className="w-[18px] h-[18px] stroke-[1.75]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                          )
                        },
                        { 
                          label: 'Phone', 
                          value: '+91 8368083064',
                          icon: (
                            <svg className="w-[18px] h-[18px] stroke-[1.75]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                            </svg>
                          )
                        },
                        { 
                          label: 'Location', 
                          value: 'New Delhi, India',
                          icon: (
                            <svg className="w-[18px] h-[18px] stroke-[1.75]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                          )
                        }
                      ].map((item) => (
                        <a 
                          key={item.label}
                          href={item.label === 'Email' ? `mailto:${item.value}` : item.label === 'Phone' ? `tel:${item.value}` : '#'}
                          onMouseEnter={() => setCursorVariant('hover')}
                          onMouseLeave={() => setCursorVariant('default')}
                          className="group flex items-center gap-[18px] p-[18px] rounded-[18px] hover:bg-white/[0.02] border border-transparent hover:border-white/[0.06] transition-all"
                        >
                          <div className="w-[44px] h-[44px] rounded-[14px] bg-white/[0.04] border border-white/[0.06] group-hover:border-red-500/30 group-hover:bg-red-500/5 flex items-center justify-center text-white/70 group-hover:text-red-400 transition-all">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-[10px] font-[600] tracking-[0.14em] text-white/45 uppercase mb-[3px]" 
                                 style={{ fontFamily: 'Space Grotesk, monospace' }}>
                              {item.label}
                            </div>
                            <div className="text-[15px] font-[500] tracking-[-0.01em] text-white group-hover:text-red-100 transition-colors" 
                                 style={{ fontFamily: 'Outfit, sans-serif' }}>
                              {item.value}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Social */}
                  <div className="rounded-[28px] border border-white/[0.06] bg-[#0a0a0a] p-[32px]">
                    <h3 className="text-[13px] font-[650] tracking-[0.14em] text-white/55 uppercase mb-[24px]" 
                        style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      Social Presence
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-[12px]">
                      {[
                        { name: 'YouTube', handle: '@_meme.hub74', href: 'https://youtube.com/@_meme.hub74?si=Xe_to-Z7jlwPBkyu' },
                        { name: 'Behance', handle: 'shubhsrivastav3', href: 'https://www.behance.net/shubhsrivastav3' },
                        { name: 'Drive', handle: 'Portfolio', href: '#' },
                        { name: 'Mail', handle: 'Direct', href: 'mailto:shubhsrivastav65@gmail.com' }
                      ].map((social) => (
                        <a 
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => setCursorVariant('hover')}
                          onMouseLeave={() => setCursorVariant('default')}
                          className="group p-[16px] rounded-[18px] bg-[#080808] border border-white/[0.04] hover:border-white/[0.10] hover:bg-[#0c0c0c] transition-all"
                        >
                          <div className="text-[13px] font-[600] tracking-[-0.01em] text-white mb-[3px] group-hover:text-red-100 transition-colors" 
                               style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {social.name}
                          </div>
                          <div className="text-[11px] font-[450] text-white/50 truncate" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {social.handle}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="relative rounded-[28px] overflow-hidden border border-red-500/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.08] via-rose-500/[0.04] to-red-600/[0.08]" />
                    <div className="relative p-[28px]">
                      <div className="flex items-start gap-[16px]">
                        <div className="w-[10px] h-[10px] rounded-full bg-red-500 animate-pulse mt-[5px] shrink-0 shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
                        <div>
                          <div className="text-[14px] font-[650] tracking-[-0.01em] text-white mb-[6px]" 
                               style={{ fontFamily: 'Outfit, sans-serif' }}>
                            Available for New Projects
                          </div>
                          <div className="text-[13px] leading-[1.6] font-[400] text-white/75" 
                               style={{ fontFamily: 'Outfit, sans-serif' }}>
                            Booking Q1 2025 commissions. Film, motion, and brand identity projects.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.04] py-[56px] mt-[80px]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-[28px]">
            <div className="flex items-center gap-[18px]">
              <div className="w-[26px] h-[26px] relative">
                <div className="absolute inset-0 border-[1.25px] border-white/70" style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 10px, 10px 10px, 10px 100%, 0 100%)'
                }} />
                <div className="absolute inset-0 border-[1.25px] border-red-500/70 translate-x-[5px] translate-y-[5px]" style={{
                  clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 0 10px, calc(100% - 10px) 10px, calc(100% - 10px) 0)'
                }} />
              </div>
              <div>
                <div className="text-[11px] font-[600] tracking-[0.22em] text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                  SHUBH SRIVASTAV
                </div>
                <div className="text-[9px] font-[500] tracking-[0.24em] text-white/45 uppercase" 
                     style={{ fontFamily: 'Space Grotesk, monospace' }}>
                  © 2024 • ALL RIGHTS RESERVED
                </div>
              </div>
            </div>

            <div className="flex items-center gap-[28px] text-[11px] font-[500] tracking-[0.08em] text-white/55">
              <span style={{ fontFamily: 'Outfit, sans-serif' }}>Filmmaker • Designer • Creative</span>
              <div className="hidden md:flex items-center gap-[18px] pl-[18px] border-l border-white/[0.08]">
                <a href="#" className="hover:text-white transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>AAFT</a>
                <a href="#" className="hover:text-white transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>India</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Project modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-[24px] bg-[#050505]/90 backdrop-blur-[20px]">
          <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />
          
          <div className="relative w-full max-w-[960px] max-h-[90vh] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a0a0a] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_40px_80px_-16px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `repeating-linear-gradient(-45deg, white, white 1px, transparent 1px, transparent 12px)`
            }} />

            <div className="relative h-full overflow-auto">
              <div className={`h-[280px] md:h-[360px] bg-gradient-to-br ${selectedProject.color} relative`}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
                
                <button 
                  onClick={() => setSelectedProject(null)}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="absolute top-[24px] right-[24px] w-[44px] h-[44px] rounded-full bg-black/60 backdrop-blur-2xl border border-white/[0.12] hover:bg-black/80 flex items-center justify-center text-white/80 hover:text-white transition-all z-10"
                >
                  <svg className="w-[20px] h-[20px] stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="absolute bottom-[32px] left-[32px] right-[32px]">
                  <div className="inline-flex items-center gap-[10px] px-[14px] h-[28px] rounded-full bg-black/70 backdrop-blur-2xl border border-white/[0.10] mb-[18px]">
                    <span className="text-[10px] font-[600] tracking-[0.14em] text-white/90 uppercase" 
                          style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      {selectedProject.type}
                    </span>
                  </div>
                  <h2 className="text-[36px] md:text-[48px] font-[800] leading-[0.9] tracking-[-0.03em] text-white mb-[12px]"
                      style={{ fontFamily: 'Syne, sans-serif' }}>
                    {selectedProject.title}
                  </h2>
                  <p className="text-[16px] leading-[1.6] font-[400] text-white/85 max-w-[640px]" 
                     style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              <div className="p-[32px] md:p-[44px]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[24px] mb-[36px]">
                  <div>
                    <h3 className="text-[13px] font-[650] tracking-[0.14em] text-white/55 uppercase mb-[8px]" 
                        style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      Project Link
                    </h3>
                    <p className="text-[15px] font-[500] text-white/80 break-all" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Google Drive • View Original
                    </p>
                  </div>
                  <a 
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="inline-flex items-center gap-[12px] px-[28px] h-[52px] rounded-full bg-white text-[#050505] font-[650] text-[14px] tracking-[-0.01em] hover:bg-red-500 hover:text-white transition-colors"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Open Project
                    <svg className="w-[16px] h-[16px] stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>

                <div className="p-[28px] rounded-[20px] bg-[#080808] border border-white/[0.04]">
                  <h4 className="text-[12px] font-[650] tracking-[0.14em] text-white/50 uppercase mb-[14px]" 
                      style={{ fontFamily: 'Space Grotesk, monospace' }}>
                    Project Notes
                  </h4>
                  <p className="text-[14px] leading-[1.7] font-[400] text-white/70" 
                     style={{ fontFamily: 'Outfit, sans-serif' }}>
                    This project represents my commitment to craft and conceptual clarity. 
                    Every frame and pixel serves the narrative intention, calibrated for maximum emotional and visual impact.
                    The work demonstrates proficiency across the full creative pipeline from conception to final delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Syne:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        * {
          font-variant-ligatures: common-ligatures;
          text-rendering: optimizeLegibility;
        }
        
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #333; }
        
        html { scrollbar-width: thin; scrollbar-color: #2a2a2a #080808; }
        
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
