                  < Nome da classe Avatar = " h-8 w-8 " > 
                    < AvatarImage src = " /placeholder.svg?height=32&width=32 " alt = " Foto de perfil " />   
                    < AvatarFallback > EUA </ AvatarFallback >
                  </ Avatar >
                </ Botão >
              </ DropdownMenuTrigger >
              < DropdownMenuContent align = " fim " > 
                < DropdownMenuItem como Filho > 
                  < Link href = " /perfil " className = " cursor-pointer flex itens-center " >  
                    < Nome da classe de usuário = " mr-2 h-4 w-4 " />  
                    < span > Perfil </ span >
                  </ Link >
                </ DropdownMenuItem >
                < DropdownMenuItem como Filho > 
                  < Link href = " /configuracoes " className = " cursor-pointer flex items-center " >  
                    < Configurações className = " mr-2 h-4 w-4 " />  
                    < span > Configurações </ span >
                  </ Link >
                </ DropdownMenuItem >
                < DropdownMenuSeparator /> 
                < DropdownMenuItem onClick = { ( ) => setIsLoggedIn ( false ) } className = " cursor-pointer " >    
                  < LogOut className = " mr-2 h-4 w-4 " />  
                  < span > Sair </ span >
                </ DropdownMenuItem >
              </ DropdownMenuContent >
            </ Menu suspenso >
          ) : (  
            < div className = " flex itens-centro lacuna-2 " > 
              < Variante do botão = " fantasma " asChild >  
                < Link href = " /login " > Entrar </ Link > 
              </ Botão >
              < Botão como classeFilho Nome = " bg-green-600 hover:bg-green-700 " >  
                < Link href = " /cadastro " > Cadastrar </ Link > 
              </ Botão >
            </div>​​
          ) }
        </div>​​
      </div>​​
    </ cabeçalho >
  )
}