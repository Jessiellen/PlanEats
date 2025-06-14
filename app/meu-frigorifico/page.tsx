"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import { useAppStore } from "@/lib/store"
import { useState } from "react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MeuFrigorifico() {
  const { ingredients, deleteIngredient, updateIngredient, getIngredientsByCategory } = useAppStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("todos")
  const [editingIngredient, setEditingIngredient] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [ingredientToDelete, setIngredientToDelete] = useState<{ id: string; name: string } | null>(null)

  // Filtrar ingredientes por categoria e busca
  const filteredIngredients = getIngredientsByCategory(activeTab).filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = (id: string, name: string) => {
    deleteIngredient(id)
    toast.success(`${name} removido do frigorífico`)
    setIngredientToDelete(null)
  }

  const handleEdit = (ingredient: any) => {
    setEditingIngredient({ ...ingredient })
    setIsEditDialogOpen(true)
  }

  const handleUpdateIngredient = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingIngredient) {
      updateIngredient(editingIngredient.id, {
        name: editingIngredient.name,
        quantity: editingIngredient.quantity,
        category: editingIngredient.category,
        expiryDate: editingIngredient.expiryDate,
      })
      toast.success("Ingrediente atualizado com sucesso!")
      setIsEditDialogOpen(false)
      setEditingIngredient(null)
    }
  }

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      vegetais: "Vegetal",
      frutas: "Fruta",
      proteinas: "Proteína",
      graos: "Grãos",
      laticinios: "Laticínio",
      temperos: "Tempero",
      outros: "Outros",
    }
    return labels[category] || category
  }

  const getCategoryCount = (category: string) => {
    return getIngredientsByCategory(category).length
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Meu Frigorífico</h1>
          <p className="text-muted-foreground">Gerencie os ingredientes disponíveis em sua casa</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar ingredientes..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/adicionar-itens">
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Ingredientes
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/receitas-sugeridas">Ver Receitas</Link>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="todos">Todos ({ingredients.length})</TabsTrigger>
            <TabsTrigger value="vegetais">Vegetais ({getCategoryCount("vegetais")})</TabsTrigger>
            <TabsTrigger value="proteinas">Proteínas ({getCategoryCount("proteinas")})</TabsTrigger>
            <TabsTrigger value="graos">Grãos ({getCategoryCount("graos")})</TabsTrigger>
            <TabsTrigger value="laticinios">Laticínios ({getCategoryCount("laticinios")})</TabsTrigger>
            <TabsTrigger value="temperos">Temperos ({getCategoryCount("temperos")})</TabsTrigger>
            <TabsTrigger value="frutas">Frutas ({getCategoryCount("frutas")})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredIngredients.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">
                    {searchQuery
                      ? `Nenhum ingrediente encontrado com "${searchQuery}"`
                      : "Nenhum ingrediente cadastrado nesta categoria"}
                  </p>
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link href="/adicionar-itens">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Adicionar Primeiro Ingrediente
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIngredients.map((ingredient) => (
                  <Card key={ingredient.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center">
                        <div className="relative h-24 w-24 shrink-0">
                          <Image
                            src={`/images/ingredients/${ingredient.name.toLowerCase()}.jpg`}
                            alt={ingredient.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=96&width=96"
                            }}
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{ingredient.name}</h3>
                              <p className="text-sm text-muted-foreground">{ingredient.quantity}</p>
                              <Badge variant="outline" className="mt-1">
                                {getCategoryLabel(ingredient.category)}
                              </Badge>
                              {ingredient.expiryDate && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Vence: {new Date(ingredient.expiryDate).toLocaleDateString("pt-BR")}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" onClick={() => handleEdit(ingredient)}>
                                <Edit className="h-4 w-4" />
                              </Button>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Remover ingrediente</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja remover "{ingredient.name}" do seu frigorífico? Esta ação
                                      não pode ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(ingredient.id, ingredient.name)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Remover
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Dialog de Edição */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Ingrediente</DialogTitle>
              <DialogDescription>Faça alterações no seu ingrediente aqui.</DialogDescription>
            </DialogHeader>
            {editingIngredient && (
              <form onSubmit={handleUpdateIngredient}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Nome</Label>
                    <Input
                      id="edit-name"
                      value={editingIngredient.name}
                      onChange={(e) =>
                        setEditingIngredient({
                          ...editingIngredient,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-quantity">Quantidade</Label>
                    <Input
                      id="edit-quantity"
                      value={editingIngredient.quantity}
                      onChange={(e) =>
                        setEditingIngredient({
                          ...editingIngredient,
                          quantity: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-category">Categoria</Label>
                    <Select
                      value={editingIngredient.category}
                      onValueChange={(value) =>
                        setEditingIngredient({
                          ...editingIngredient,
                          category: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetais">Vegetais</SelectItem>
                        <SelectItem value="frutas">Frutas</SelectItem>
                        <SelectItem value="proteinas">Proteínas</SelectItem>
                        <SelectItem value="graos">Grãos</SelectItem>
                        <SelectItem value="laticinios">Laticínios</SelectItem>
                        <SelectItem value="temperos">Temperos</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-expiry">Data de Validade</Label>
                    <Input
                      id="edit-expiry"
                      type="date"
                      value={editingIngredient.expiryDate ? editingIngredient.expiryDate.split("T")[0] : ""}
                      onChange={(e) =>
                        setEditingIngredient({
                          ...editingIngredient,
                          expiryDate: e.target.value ? new Date(e.target.value).toISOString() : undefined,
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Salvar alterações
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
