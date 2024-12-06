const theme = {
    colors: {
        primary: '#1D1D1F',      // Ciemnoszary dla głównego tekstu
        secondary: '#6E6E73',    // Jasnoszary na mniej ważne elementy tekstowe
        background: '#F5F5F7',
        backgroundTransparent: '#F5F5F7C4',// Bardzo jasny szary na tło
        white: '#FFFFFF',        // Czysta biel na karty i modalne okna
        accent: '#0071E3',       // Niebieski akcent dla przycisków i linków
        border: '#D2D2D7',       // Kolor obramowań i linii rozdzielających
    },
    typography: {
        fontFamily: '"San Francisco", Arial, sans-serif',
        heading: '1.6rem',       // Większy rozmiar czcionki dla nagłówków
        subheading: '1.25rem',   // Rozmiar czcionki dla podtytułów
        text: '1rem',            // Standardowy rozmiar dla tekstu podstawowego
    },
    spacing: {
        xs: '0.25rem',            // Drobne odstępy
        sm: '0.5rem',              // Małe odstępy
        md: '1rem',            // Średnie odstępy
        lg: '1.5rem', // Duże odstępy
    },
    borderRadius: '12px',      // Zaokrąglenie dla eleganckiego wyglądu
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)', // Delikatny cień
    transitions: {
        default: '0.3s ease',    // Płynne przejścia
    },
    breakpoints: {
        mobile: '768px'
    }
};
const generateSpacingObject = () => {
    let spacing: any = {}
    Object.keys(theme.spacing).map(function (key, index) {
        const enlargedIndex = index + 1;
        const propertyValue = theme.spacing[key as keyof typeof theme.spacing];
        spacing[`t${enlargedIndex}`] = `${propertyValue} 0 0 0`;
        spacing[`r${enlargedIndex}`] = `0 ${propertyValue}  0 0`;
        spacing[`b${enlargedIndex}`] = `0 0 ${propertyValue} 0`;
        spacing[`l${enlargedIndex}`] = `0 0 0 ${propertyValue}`;
        spacing[`x${enlargedIndex}`] = `0 ${propertyValue}`;
        spacing[`y${enlargedIndex}`] = `${propertyValue} 0`;


    });
    return {...theme.spacing, ...spacing};
}
theme.spacing = generateSpacingObject();

export default theme;
