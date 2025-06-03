"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, ChefHat, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useAppStore } from "@/lib/store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function ReceitasSugeridas() {
  const { recipes } = useAppStore()
  const [timeFilter, setTimeFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const router = useRouter()

  const filteredRecipes = recipes.filter((recipe) => {
    const timeMatch =
      timeFilter === "all" ||
      (timeFilter === "quick" && Number.parseInt(recipe.time) <= 30) ||
      (timeFilter === "medium" && Number.parseInt(recipe.time) > 30 && Number.parseInt(recipe.time) <= 60) ||
      (timeFilter === "long" && Number.parseInt(recipe.time) > 60)

    const difficultyMatch = difficultyFilter === "all" || recipe.difficulty === difficultyFilter

    return timeMatch && difficultyMatch
  })

  const handleRecipeClick = (recipeId: string) => {
    router.push(`/receita/${recipeId}`)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Receitas Sugeridas</h1>
          <p className="text-muted-foreground">Receitas baseadas nos ingredientes do seu frigorífico</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Dificuldade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Fácil">Fácil</SelectItem>
                <SelectItem value="Médio">Médio</SelectItem>
                <SelectItem value="Difícil">Difícil</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Tempo de preparo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tempos</SelectItem>
                <SelectItem value="quick">Rápidas (até 30min)</SelectItem>
                <SelectItem value="medium">Médias (30-60min)</SelectItem>
                <SelectItem value="long">Demoradas (+60min)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/gerar-receitas">
              <Sparkles className="mr-2 h-4 w-4" />
              Gerar Novas Receitas
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="todas" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="todas">Todas ({filteredRecipes.length})</TabsTrigger>
            <TabsTrigger value="rapidas">Rápidas</TabsTrigger>
            <TabsTrigger value="saudaveis">Saudáveis</TabsTrigger>
            <TabsTrigger value="economicas">Econômicas</TabsTrigger>
            <TabsTrigger value="favoritas">Favoritas</TabsTrigger>
          </TabsList>

          <TabsContent value="todas" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleRecipeClick(recipe.id)}
                >
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={recipe.image || "/placeholder.svg?height=192&width=384"}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-green-600 hover:bg-green-700">{recipe.difficulty}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-semibold">{recipe.title}</h3>
                      <p className="text-sm text-muted-foreground">{recipe.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{recipe.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <ChefHat className="h-4 w-4 text-muted-foreground" />
                          <span>{recipe.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRecipeClick(recipe.id)
                      }}
                    >
                      Ver Receita
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
