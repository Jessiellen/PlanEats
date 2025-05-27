  Reagir . ComponentPropsWithoutRef < typeof AvatarPrimitive . Root > 
> ( ( { className , ... props } , ref ) => (   
  < AvatarPrimitive.Root
    ref = { ref }
    className = { cn (
      "flexibilidade relativa h-10 w-10 encolhimento-0 transbordamento-oculto arredondado-cheio" ,
      nomedaclasse
    ) }
    { ... adereços }
  />
) )
Avatar . displayName = AvatarPrimitivo . Raiz . displayName 

const AvatarImage = React . forwardRef <   
  Reagir . ElementRef < typeof AvatarPrimitive . Imagem > , 
  Reagir . ComponentPropsWithoutRef < typeof AvatarPrimitive . Imagem > 
> ( ( { className , ... props } , ref ) => (   
  < AvatarPrimitive.Image
    ref = { ref }
    className = { cn ( "aspecto-quadrado h-cheio w-cheio" , className ) }
    { ... adereços }
  />
) )
AvatarImagem . displayName = AvatarPrimitivo . Imagem . nome de exibição 

const AvatarFallback = React . forwardRef <   
  Reagir . ElementRef < typeof AvatarPrimitive . Fallback > , 
  Reagir . ComponentPropsWithoutRef < typeof AvatarPrimitive . Fallback > 
> ( ( { className , ... props } , ref ) => (   
  < AvatarPrimitive.Fallback
    ref = { ref }
    className = { cn (
      "flex h-full w-full itens-centro justificar-centro arredondado-cheio bg-silenciado" ,
      nomedaclasse
    ) }
    { ... adereços }
  />
) )
AvatarFallback . displayName = AvatarPrimitive . Fallback . displayName 

exportar { Avatar , AvatarImage , AvatarFallback } 