import { MapPin, Navigation } from 'lucide-react';

const LocationMap = () => {
  const wazeLink = "https://waze.com/ul?ll=-23.9891995,-46.3067103&navigate=yes";
  const googleMapsLink = "https://www.google.com/maps/dir/?api=1&destination=Canoa+Brasil+Caiaque+e+Canoa+Havaiana+Santos";

  return (
    <div className="space-y-4">
      {/* Título */}
      <div className="flex items-start gap-3">
        <span className="w-3 h-3 bg-orange rounded-full mt-1.5 flex-shrink-0" />
        <h4 className="text-base font-semibold text-neutral-900">Localização</h4>
      </div>

      {/* Mapa */}
      <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden border border-neutral-200 relative group shadow-sm">
        {/* Overlay para estilo Dark (remove no hover) */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none" />
        
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.753368291466!2d-46.3067103!3d-23.9891995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce025b3677e5ab%3A0xad3c495c4a637319!2sCanoa%20Brasil%20-%20Caiaque%20e%20Canoa%20Havaiana%20em%20Santos!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(80%) contrast(90%)' }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
          title="Localização Opium - Canoa Brasil"
        />
      </div>

      {/* Endereço e Links de Rota */}
      <div className="space-y-3">
        <p className="text-sm text-neutral-600 flex items-start gap-2">
          <MapPin className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />
          <span>
            Rua Afonso Celso de Paula Lima, 16<br />
            Ponta da Praia, Santos | SP
          </span>
        </p>

        {/* Botões de Rota */}
        <div className="flex gap-3">
          <a 
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <Navigation className="w-4 h-4" />
            Google Maps
          </a>
          <a 
            href={wazeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border-2 border-neutral-900 text-neutral-900 text-sm font-medium rounded-lg hover:bg-neutral-900 hover:text-white transition-colors"
          >
            <Navigation className="w-4 h-4" />
            Waze
          </a>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
