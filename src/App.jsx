import React, { useState, useEffect } from 'react';
// --- IMPORTACIONES DE FIREBASE ---
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// --- CONFIGURACIÓN DE FIREBASE ---
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
        <button onClick={onConnect} className="hidden md:flex items-center gap-2 bg-cyan-500 text-slate-900 font-bold py-2 px-6 rounded-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105">
          <WalletIcon className="h-5 w-5" />
          Conectar Wallet
        </button>
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </nav>
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
const Hero = ({ onConnect }) => (
  <section className="text-center py-20 md:py-32 relative overflow-hidden">
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
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <h2 className="text-3xl font-bold text-white mb-4">¿Preguntas?</h2>
        <p className="text-slate-400 mb-8">Contáctanos. Nos encantaría saber de ti.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Tu nombre" className="bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"/>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Tu email" className="bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"/>
          <textarea rows="4" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Tu mensaje" className="bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none"></textarea>
          <button type="submit" className="bg-cyan-500 text-slate-900 font-bold py-3 px-8 rounded-lg hover:bg-cyan-400 transition-all duration-300 self-center mt-4">
            Enviar Mensaje
          </button>
        </form>
        {status && <p className="mt-4 text-cyan-400">{status}</p>}
      </div>
    </section>
  );
};

// --- NUEVO COMPONENTE: Pie de Página del Sitio ---
const SiteFooter = ({ onShowPrivacy, onShowTerms }) => (
    <footer className="border-t border-slate-800 py-6">
        <div className="container mx-auto px-6 text-center text-slate-500">
            <p>&copy; {new Date().getFullYear()} XRPL Minter. Todos los derechos reservados.</p>
            <div className="mt-4 flex justify-center gap-6">
                <button onClick={onShowPrivacy} className="hover:text-cyan-400 transition-colors">Política de Privacidad</button>
                <button onClick={onShowTerms} className="hover:text-cyan-400 transition-colors">Términos de Servicio</button>
            </div>
        </div>
    </footer>
);

// --- Página de Aterrizaje (Landing) ---
const LandingPage = ({ onConnect, onShowPrivacy, onShowTerms }) => {
    return (
        <>
            <Header onConnect={onConnect} />
            <main>
                <Hero onConnect={onConnect} />
                <Features />
                <ContactForm />
            </main>
            <SiteFooter onShowPrivacy={onShowPrivacy} onShowTerms={onShowTerms} />
        </>
    );
};

// --- Panel de Control de la dApp ---
const AppDashboard = ({ wallet, onDisconnect }) => (
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
        <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">Mis NFTs</h2>
          <p className="text-slate-400">Aquí se mostrarán los NFTs que posees. (Funcionalidad futura)</p>
        </div>
        <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">Crear un NFT</h2>
          <p className="text-slate-400">El formulario para acuñar un nuevo NFT aparecerá aquí. (Funcionalidad futura)</p>
        </div>
      </div>
    </main>
  </div>
);

// --- NUEVO COMPONENTE: Página de Política de Privacidad ---
const PrivacyPolicyPage = ({ onBack }) => (
    <div className="min-h-screen text-slate-300">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <button onClick={onBack} className="text-cyan-400 hover:text-cyan-300 mb-8">&larr; Volver a la página principal</button>
            <h1 className="text-4xl font-bold text-white mb-6">Política de Privacidad</h1>
            <div className="space-y-4 prose prose-invert">
                <p><strong>Última actualización:</strong> 16 de agosto de 2025</p>
                <p>Bienvenido a XRPL Minter. Su privacidad es importante para nosotros. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos su información cuando visita nuestro sitio web.</p>
                
                <h2 className="text-2xl font-bold text-white pt-4">Recopilación de Información</h2>
                <p>Podemos recopilar información sobre usted de varias maneras. La información que podemos recopilar en el Sitio incluye:</p>
                <ul>
                    <li><strong>Datos del Formulario de Contacto:</strong> Recopilamos la información que nos proporciona voluntariamente, como su nombre, dirección de correo electrónico y el contenido de su mensaje cuando se comunica con nosotros a través de nuestro formulario de contacto.</li>
                    <li><strong>Datos de la Billetera:</strong> Al conectar su billetera de criptomonedas, la única información que recibimos y utilizamos es su dirección de billetera pública para interactuar con la blockchain. No almacenamos sus claves privadas ni tenemos acceso a sus fondos.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white pt-4">Uso de su Información</h2>
                <p>Tener información precisa sobre usted nos permite brindarle una experiencia fluida, eficiente y personalizada. Específicamente, podemos usar la información recopilada sobre usted a través del Sitio para:</p>
                <ul>
                    <li>Responder a sus comentarios y preguntas y brindar servicio al cliente.</li>
                    <li>Procesar transacciones y enviar avisos sobre sus transacciones en la blockchain.</li>
                    <li>Monitorear y analizar el uso y las tendencias para mejorar su experiencia con el Sitio.</li>
                </ul>
                <p>No compartiremos su información personal con terceros sin su consentimiento, excepto según lo exija la ley.</p>
            </div>
        </div>
    </div>
);

// --- NUEVO COMPONENTE: Página de Términos de Servicio ---
const TermsOfServicePage = ({ onBack }) => (
    <div className="min-h-screen text-slate-300">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <button onClick={onBack} className="text-cyan-400 hover:text-cyan-300 mb-8">&larr; Volver a la página principal</button>
            <h1 className="text-4xl font-bold text-white mb-6">Términos de Servicio</h1>
            <div className="space-y-4 prose prose-invert">
                <p><strong>Última actualización:</strong> 16 de agosto de 2025</p>
                <p>Por favor, lea estos Términos de Servicio ("Términos", "Términos de Servicio") cuidadosamente antes de usar el sitio web XRPL Minter (el "Servicio") operado por nosotros.</p>
                <p>Su acceso y uso del Servicio están condicionados a su aceptación y cumplimiento de estos Términos. Estos Términos se aplican a todos los visitantes, usuarios y otras personas que accedan o utilicen el Servicio.</p>

                <h2 className="text-2xl font-bold text-white pt-4">Uso del Servicio</h2>
                <p>XRPL Minter es una herramienta para interactuar con la blockchain XRP Ledger. Usted es el único responsable de sus acciones mientras utiliza nuestro servicio, incluyendo la gestión de su billetera, claves privadas y cualquier transacción que inicie. Usted reconoce y asume todos los riesgos asociados con el uso de criptomonedas y NFTs, incluyendo, entre otros, el riesgo de volatilidad del mercado y vulnerabilidades de software.</p>
                
                <h2 className="text-2xl font-bold text-white pt-4">Limitación de Responsabilidad</h2>
                <p>En ningún caso XRPL Minter, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables de daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo, sin limitación, la pérdida de ganancias, datos, uso, buena voluntad u otras pérdidas intangibles, resultantes de (i) su acceso o uso o incapacidad para acceder o usar el Servicio; (ii) cualquier conducta o contenido de terceros en el Servicio.</p>
            </div>
        </div>
    </div>
);


// --- Componente Principal de la Aplicación ---
export default function App() {
  const [wallet, setWallet] = useState(null);
  // --- NUEVO ESTADO PARA CONTROLAR LA VISTA ---
  const [view, setView] = useState('landing'); // 'landing', 'privacy', or 'terms'

  const handleConnect = () => {
    setWallet({ address: 'rP9fV9mYgjZpYJ2s4p4y1b...s3xQhP' });
  };
  const handleDisconnect = () => {
    setWallet(null);
  };
  
  // --- LÓGICA PARA RENDERIZAR LA VISTA CORRECTA ---
  const renderView = () => {
    switch (view) {
      case 'privacy':
        return <PrivacyPolicyPage onBack={() => setView('landing')} />;
      case 'terms':
        return <TermsOfServicePage onBack={() => setView('landing')} />;
      case 'landing':
      default:
        return wallet ? (
          <AppDashboard wallet={wallet} onDisconnect={handleDisconnect} />
        ) : (
          <LandingPage 
            onConnect={handleConnect} 
            onShowPrivacy={() => setView('privacy')}
            onShowTerms={() => setView('terms')}
          />
        );
    }
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
        .prose-invert { color: #d1d5db; } .prose-invert h1, .prose-invert h2, .prose-invert strong { color: #ffffff; } .prose-invert ul > li::before { background-color: #22d3ee; }
      `}</style>
      <div>
        {renderView()}
      </div>
    </>
  );
}