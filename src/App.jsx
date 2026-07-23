import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [guestName, setGuestName] = useState('Sz. P. Wspaniałych Gości');
  const [envelopePhase, setEnvelopePhase] = useState('closed'); // 'closed' -> 'opening' -> 'done'

  useEffect(() => {
    // Pobieranie imienia z URL
    const params = new URLSearchParams(window.location.search);
    const guestBase64 = params.get('guest');
    
    if (guestBase64) {
      try {
        const decoded = decodeURIComponent(escape(window.atob(guestBase64)));
        setGuestName(decoded);
      } catch (e) {
        console.error('Błąd dekodowania URL', e);
      }
    }
  }, []);

  const openEnvelope = () => {
    if (envelopePhase !== 'closed') return;
    setEnvelopePhase('opening');
    
    // Po 2.5 sekundy zdejmujemy kopertę i ładujemy główny widok
    setTimeout(() => {
      setEnvelopePhase('done');
    }, 2500); 
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 font-serif text-ink relative overflow-hidden bg-[#f2efe9]">
      
      <AnimatePresence>
        {envelopePhase !== 'done' && (
          <motion.div 
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f2efe9]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-[340px] h-[240px] cursor-pointer group" onClick={openEnvelope}>
               
               {/* WNĘTRZE KOPERTY (TŁO) */}
               <div className="absolute inset-0 bg-[#c8b8a5] shadow-2xl rounded-sm overflow-hidden">
                  <div className="absolute bottom-0 w-full h-[150px] bg-[#d5c5b3]" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}></div>
               </div>

               {/* KARTA WYSUWAJĄCA SIĘ Z KOPERTY */}
               <motion.div 
                 className="absolute left-1/2 top-2 w-[310px] h-[220px] bg-paper-white -translate-x-1/2 rounded-sm shadow-md flex flex-col items-center justify-center p-4 border-[8px] border-[#dcd7ce]"
                 initial={{ y: 0 }}
                 animate={{ y: envelopePhase === 'opening' ? -180 : 0, opacity: envelopePhase === 'opening' ? [1, 1, 0] : 1 }}
                 transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
               >
                 <h1 className="font-calligraphy text-4xl text-ink text-center leading-tight">Marcelina <br/> & <br/> Bartłomiej</h1>
                 <p className="mt-4 text-[9px] uppercase tracking-widest font-sans font-medium text-gray-700">Zaproszenie Ślubne</p>
               </motion.div>

               {/* DOLNE I BOCZNE SKRZYDEŁKA KOPERTY (PRZÓD) */}
               <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-0 top-0 w-[170px] h-[240px] bg-[#e1d3c3]" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
                  <div className="absolute right-0 top-0 w-[170px] h-[240px] bg-[#e1d3c3]" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}></div>
                  <div className="absolute bottom-0 left-0 w-full h-[140px] bg-[#e6d8c9]" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}></div>
               </div>

               {/* GÓRNE SKRZYDEŁKO KOPERTY (OTWIERANE Z PIECZĘCIĄ) */}
               <motion.div 
                 className="absolute top-0 left-0 w-full h-[150px] origin-top z-20"
                 initial={{ rotateX: 0 }}
                 animate={{ rotateX: envelopePhase === 'opening' ? 180 : 0, zIndex: envelopePhase === 'opening' ? 0 : 20 }}
                 transition={{ duration: 0.8, ease: "easeInOut" }}
               >
                  <div className="w-full h-full bg-[#ebdcd0]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
                  
                  {/* ZŁOTY LAK (PIECZĘĆ) */}
                  <motion.div 
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-800 border-[2px] border-yellow-900/40 shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform"
                    animate={{ opacity: envelopePhase === 'opening' ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                     <div className="absolute inset-1 rounded-full border border-yellow-700/50"></div>
                     <span className="font-calligraphy text-2xl text-yellow-50 drop-shadow-md tracking-widest pl-1">MB</span>
                  </motion.div>
               </motion.div>

               {/* INSTRUKCJA DLA GOŚCIA */}
               <motion.div 
                  className="absolute -bottom-16 w-full text-center text-[10px] md:text-xs font-sans tracking-[0.2em] text-gray-500 uppercase"
                  animate={{ opacity: envelopePhase === 'closed' ? [0.4, 1, 0.4] : 0 }}
                  transition={{ repeat: Infinity, duration: 2 }}
               >
                  Kliknij kopertę, aby otworzyć
               </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === WŁAŚCIWE ZAPROSZENIE (POJAWIA SIĘ PO ZAKOŃCZENIU ANIMACJI KOPERTY) === */}
      {envelopePhase === 'done' && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1 }}
           className="w-full flex flex-col items-center"
        >
          {/* PRZÓD ZAPROSZENIA  */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-paper-white w-full max-w-[400px] shadow-2xl p-6 md:p-10 rounded-sm relative mb-16"
            style={{ border: '16px solid #dcd7ce' }}
          >
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

          {/* TYŁ ZAPROSZENIA (KALENDARZ) */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-paper-beige w-full max-w-[400px] shadow-2xl p-6 md:p-10 rounded-sm relative"
          >
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
        </motion.div>
      )}

    </div>
  );
}

export default App;
