import React, { useState, useEffect } from 'react';
// --- IMPORTACIONES DE FIREBASE ---
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// --- CONFIGURACIÓN DE FIREBASE ---
// Las credenciales ahora se leen de forma segura desde las variables de entorno.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// --- Iconos SVG para la dApp ---
const WalletIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z"/></svg>
);
const XrplIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 15.6L6 12.75l1.2-1.2 3.6 3.6 4.8-4.8 1.2 1.2-6 6z"/></svg>
);
const EvmIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.75l-6.25 10.5L12 16l6.25-3.75L12 1.75zM5.75 13.25L12 22.25l6.25-9-6.25 3.75-6.25-3.75z"/></svg>
);
const MintIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
);


// --- Componente de Encabezado ---
const Header = ({ onConnect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/50 backdrop-blur-lg border-b border-slate-800">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white tracking-wider">
          <span className="text-cyan-400">XRPL</span><span className="font-light">Minter</span>
        </div>
        {/* Botón para Desktop */}
        <button onClick={onConnect} className="hidden md:flex items-center gap-2 bg-cyan-500 text-slate-900 font-bold py-2 px-6 rounded-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105">
          <WalletIcon className="h-5 w-5" />
          Conectar Wallet
        </button>
        {/* Botón Hamburger para Móvil */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </nav>
      {/* Menú desplegable para Móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/80 pb-4 px-6">
          <button onClick={() => { onConnect(); setIsMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 bg-cyan-500 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-all duration-300">
            <WalletIcon className="h-5 w-5" />
            Conectar Wallet
          </button>
        </div>
      )}
    </header>
  );
};

// --- Sección Principal (Hero) ---
const Hero = ({ onConnect }) => {
  return (
    <section className="text-center py-20 md:py-32 relative overflow-hidden">
       {/* Efecto de fondo */}
      <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 animate-fade-in-down">
          Crea NFTs en la <span className="text-cyan-400">XRPL</span> con Facilidad
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-8 animate-fade-in-up">
          Tu puerta de entrada para acuñar, gestionar y coleccionar activos digitales en el XRP Ledger y su sidechain EVM.
        </p>
        <button onClick={onConnect} className="bg-cyan-500 text-slate-900 font-bold py-3 px-8 rounded-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 animate-bounce">
          Empezar a Crear
        </button>
      </div>
    </section>
  );
};

// --- Sección de Características ---
const Features = () => {
    const featureList = [
        { icon: <XrplIcon className="h-10 w-10 text-cyan-400 mb-4"/>, title: "Nativo de XRPL", description: "Aprovecha la velocidad, bajas comisiones y eficiencia energética del XRP Ledger para tus NFTs." },
        { icon: <EvmIcon className="h-10 w-10 text-cyan-400 mb-4"/>, title: "Soporte EVM", description: "Interactúa con la sidechain compatible con Ethereum para mayor flexibilidad y acceso a su ecosistema." },
        { icon: <MintIcon className="h-10 w-10 text-cyan-400 mb-4"/>, title: "Creación Sencilla", description: "Un proceso intuitivo para convertir tus archivos digitales en NFTs en solo unos pocos clics." },
    ];

  return (
    <section id="features" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-12">Potencia y Simplicidad</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featureList.map((feature, index) => (
            <div key={index} className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 transform hover:-translate-y-2">
              {feature.icon}
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Componente de Formulario de Contacto ---
const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');
    try {
      await addDoc(collection(db, "messages"), {
        name, email, message, timestamp: new Date()
      });
      setStatus('¡Mensaje enviado con éxito!');
      setName(''); setEmail(''); setMessage('');
    } catch (error) {
      console.error("Error al agregar el documento: ", error);
      setStatus('Error al enviar el mensaje.');
    }
  };

  return (
    <footer id="contact" className="py-20">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <h2 className="text-3xl font-bold text-white mb-4">¿Preguntas?</h2>
        <p className="text-slate-400 mb-8">Contáctanos. Nos encantaría saber de ti.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          {/* Inputs del formulario con estilos actualizados */}
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Tu nombre" className="bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"/>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Tu email" className="bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"/>
          <textarea rows="4" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Tu mensaje" className="bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"></textarea>
          <button type="submit" className="bg-cyan-500 text-slate-900 font-bold py-3 px-8 rounded-lg hover:bg-cyan-400 transition-all duration-300 self-center mt-4">
            Enviar Mensaje
          </button>
        </form>
        {status && <p className="mt-4 text-cyan-400">{status}</p>}
      </div>
    </footer>
  );
};

// --- Página de Aterrizaje (Landing) ---
const LandingPage = ({ onConnect }) => {
    return (
        <>
            <Header onConnect={onConnect} />
            <main>
                <Hero onConnect={onConnect} />
                <Features />
                <ContactForm />
            </main>
        </>
    );
};

// --- Panel de Control de la dApp ---
const AppDashboard = ({ wallet, onDisconnect }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-800">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-white tracking-wider"><span className="text-cyan-400">XRPL</span><span className="font-light">Minter</span></div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-slate-400 bg-slate-800 px-4 py-2 rounded-lg hidden sm:block">
                            <span className="text-cyan-400">Wallet:</span> {`${wallet.address.substring(0, 6)}...${wallet.address.substring(wallet.address.length - 4)}`}
                        </div>
                        <button onClick={onDisconnect} className="bg-slate-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors">Desconectar</button>
                    </div>
                </nav>
            </header>
            <main className="flex-grow container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-white mb-8">Tu Panel de Control</h1>
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Placeholder para la galería de NFTs */}
                    <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
                        <h2 className="text-2xl font-bold text-white mb-4">Mis NFTs</h2>
                        <p className="text-slate-400">Aquí se mostrarán los NFTs que posees. (Funcionalidad futura)</p>
                    </div>
                    {/* Placeholder para el creador de NFTs */}
                    <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
                        <h2 className="text-2xl font-bold text-white mb-4">Crear un NFT</h2>
                        <p className="text-slate-400">El formulario para acuñar un nuevo NFT aparecerá aquí. (Funcionalidad futura)</p>
                    </div>
                </div>
            </main>
        </div>
    );
};


// --- Componente Principal de la Aplicación ---
export default function App() {
  const [wallet, setWallet] = useState(null);

  // Simula la conexión de una billetera
  const handleConnect = () => {
    // En una aplicación real, aquí iría la lógica para conectar con Xumm, GemWallet, etc.
    setWallet({ address: 'rP9fV9mYgjZpYJ2s4p4y1b...s3xQhP' });
  };

  // Simula la desconexión
  const handleDisconnect = () => {
    setWallet(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #0f172a; }
        .bg-grid-slate-800 { background-image: linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px); background-size: 4rem 4rem; background-position: top center; opacity: 0.1; }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out both; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out 0.2s both; }
        @keyframes fade-in-down { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div>
        {wallet ? (
          <AppDashboard wallet={wallet} onDisconnect={handleDisconnect} />
        ) : (
          <LandingPage onConnect={handleConnect} />
        )}
      </div>
    </>
  );
}

