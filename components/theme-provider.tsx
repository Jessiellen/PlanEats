'usar cliente'

importar * como React de 'react'     
importar { 
  ThemeProvider como NextThemesProvider ,  
  digite ThemeProviderProps , 
} de 'próximos-temas'  

função de exportação ThemeProvider ( { filhos , ... adereços } : ThemeProviderProps ) {    
  retornar < NextThemesProvider { ... adereços } > { filhos } </ NextThemesProvider >  
}