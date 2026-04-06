export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Główny kolor Twojej marki (niebieski)
        brand: {
          light: '#e0f2fe',   // Bardzo jasny niebieski (np. tła sekcji, hover dla delikatnych elementów)
          DEFAULT: '#0ea5e9', // Twój główny niebieski (przyciski, linki, ikony)
          dark: '#0369a1',    // Ciemny niebieski (hover dla przycisków, ważne nagłówki)
        },
        // Kolory powierzchni (biel i jej odcienie)
        surface: {
          white: '#ffffff',   // Czysta biel (karty, główne tło)
          50: '#f8fafc',      // Delikatnie złamana biel/szarość (aby oddzielić sekcje od białego tła)
        }
      }
    }
  },
  plugins: [],
}