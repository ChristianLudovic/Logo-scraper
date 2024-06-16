import React, { useState, useEffect } from 'react';

export function LogoScraper() {
  const [url, setUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    if (url) {
      const timer = setTimeout(() => {
        fetchLogo(url);
      }, 1000); // Délais de 1 seconde

      // Nettoyer le timeout si l'URL change avant la fin du délai
      return () => clearTimeout(timer);
    }
  }, [url]);

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const fetchLogo = async (url) => {
    const apiKey = '9f1a5617-f5a6-4771-adcc-0e83c6186e1d'; // Remplacez par votre clé API

    try {
      const response = await fetch(`https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=${apiKey}`);
      const data = await response.json();

      console.log('Data:', data);

      // Récupération de l'URL du logo depuis les données récupérées
      const retrievedLogoUrl = data.hybridGraph.favicon;
      const retrievedLogoUrl2 = data.hybridGraph.image;
      // Selon la structure des données retournées

      // Mise à jour de l'URL du logo dans l'état pour l'afficher
      if (retrievedLogoUrl) {
        setLogoUrl(retrievedLogoUrl);
      } else if (retrievedLogoUrl2) {
        setLogoUrl(retrievedLogoUrl2);
      } else {
        setLogoUrl('');
      }
    } catch (error) {
      console.error('Error fetching logo:', error);
      // Gestion des erreurs
      setLogoUrl('');
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col gap-3 max-w-[350px] w-full'>
        <label htmlFor="url-input" className='flex items-center gap-3'>
          <span className='font-semibold'>Website logo</span>
          <div className="h-[22px] w-[22px] border border-solid border-stone-200 rounded-full flex items-center justify-center">
            {logoUrl && 
              <img 
                src={logoUrl} 
                alt="Logo du site" 
                className='h-[22px] w-[22px] rounded-full object-cover'
              />
            }
          </div>
        </label>
        <input 
          id="url-input"
          type="text" 
          value={url} 
          onChange={handleInputChange} 
          placeholder="https://example.com" 
          className='w-full border border-solid border-stone-200 rounded-md px-3 py-2 focus:outline-none'
        />
      </div>
    </div>
  );
}

