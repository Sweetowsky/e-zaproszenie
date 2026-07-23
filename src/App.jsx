import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [guestName, setGuestName] = useState('Sz. P. Wspaniałych Gości');

  useEffect(() => {
    // Pobieranie imienia z URL (np. ?guest=UGF1bGluYSBpIEJhcnTFgm9taWVq)
    const params = new URLSearchParams(window.location.search);
    const guestBase64 = params.get('guest');
    
    if (guestBase64) {
      try {
        // Dekodowanie z Base64 (obsługa polskich znaków)
        const decoded = decodeURIComponent(escape(window.atob(guestBase64)));
        setGuestName(decoded);
      } catch (e) {
        console.error('Błąd dekodowania URL', e);
      }
    }
  }, []);

  // Warianty animacji dla Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 font-serif text-ink">
      
      {/* --- PRZÓD ZAPROSZENIA --- */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-paper-white w-full max-w-[400px] shadow-2xl p-6 md:p-10 rounded-sm relative mb-16"
        style={{ border: '16px solid #dcd7ce' }} // Ramka w kolorze beżowym
      >
        {/* Złoty pin na górze */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 shadow-sm border border-yellow-800 z-10">
          <div className="absolute inset-0 rounded-full bg-white opacity-30 w-1 h-1 m-1"></div>
        </div>

        <div className="text-center mt-6">
          <h1 className="font-calligraphy text-6xl md:text-7xl leading-[0.7] tracking-tight">
            Marcelina <br/> 
            <span className="text-xl md:text-2xl font-serif uppercase tracking-[0.2em] relative -top-2">Hajduk</span> <br/>
            <span className="text-5xl">&</span> <br/>
            Bartłomiej <br/> 
            <span className="text-xl md:text-2xl font-serif uppercase tracking-[0.2em] relative -top-2">Słodkowski</span>
          </h1>
          
          <p className="mt-8 text-[10px] md:text-xs uppercase tracking-[0.25em] font-sans font-medium text-gray-700">
            • Zapraszamy na nasz ślub •
          </p>
          
          <div className="mt-6 mb-8 flex justify-center">
            <p className="text-lg md:text-xl font-serif text-ink border-b border-gray-400 pb-2 px-4 inline-block w-full max-w-[90%]">
              {guestName}
            </p>
          </div>
          
          <h2 className="font-calligraphy text-4xl md:text-5xl text-ink">28 sierpnia 2026</h2>

          <div className="mt-6 flex items-start justify-center text-left text-[11px] md:text-sm font-serif">
            <div className="mr-3 text-3xl opacity-80 pt-1">⛪</div>
            <div className="border-l border-gray-400 pl-3">
              <p className="uppercase tracking-[0.15em] font-semibold mb-1">Ślub</p>
              <p>godzina 15:00</p>
              <p>Sanktuarium</p>
              <p>św. Antoniego Padewskiego</p>
              <p>przy ul. Okólnej 185</p>
              <p>w Łodzi</p>
            </div>
          </div>
        </div>
      </motion.div>


      {/* --- TYŁ ZAPROSZENIA (KALENDARZ) --- */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-paper-beige w-full max-w-[400px] shadow-2xl p-6 md:p-10 rounded-sm relative"
      >
        {/* Złoty pin na górze */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 shadow-sm border border-yellow-800 z-10">
          <div className="absolute inset-0 rounded-full bg-white opacity-30 w-1 h-1 m-1"></div>
        </div>

        <div className="text-center mt-8">
          <h3 className="uppercase tracking-[0.25em] text-ink mb-6 text-sm md:text-base font-serif">Sierpień 2026</h3>
          
          <div className="w-full h-px bg-gray-400 mb-6 mx-auto max-w-[280px]"></div>

          <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-[11px] md:text-xs text-ink font-sans max-w-[280px] mx-auto mb-8">
            <div className="text-gray-600">pn</div><div className="text-gray-600">wt</div><div className="text-gray-600">śr</div>
            <div className="text-gray-600">czw</div><div className="text-gray-600">pt</div><div className="text-gray-600">sob</div>
            <div className="text-gray-600">nd</div>
            
            <div></div><div></div><div></div><div></div><div></div><div>1</div><div>2</div>
            <div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div>
            <div>10</div><div>11</div><div>12</div><div>13</div><div>14</div><div>15</div><div>16</div>
            <div>17</div><div>18</div><div>19</div><div>20</div><div>21</div><div>22</div><div>23</div>
            <div>24</div><div>25</div><div>26</div><div>27</div>
            
            <div className="relative flex items-center justify-center -mt-2">
               {/* Kształt ciemnego serduszka */}
               <svg className="absolute w-8 h-8 text-[#3d3d3d] -z-0" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
               </svg>
               <span className="relative text-paper-beige font-medium z-10 text-[10px] md:text-xs pt-[2px]">28</span>
            </div>
            
            <div>29</div><div>30</div>
            <div>31</div>
          </div>

          <div className="w-full h-px bg-gray-400 mb-6 mx-auto max-w-[280px]"></div>
          
          <h2 className="font-calligraphy text-4xl md:text-5xl text-ink mt-6">Bądźcie z nami</h2>
          <p className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-ink font-serif mt-3">W tym wyjątkowym dniu!</p>
        </div>
      </motion.div>

    </div>
  );
}

export default App;
