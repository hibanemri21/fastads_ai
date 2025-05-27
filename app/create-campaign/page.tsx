"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Sparkles, Target, Zap, Wand2, Eye, Heart, TrendingUp } from "lucide-react"

export default function CreateCampaign() {
  const [formData, setFormData] = useState({
    productName: "",
    offerType: "",
    description: "",
    platform: "",
    language: "",
    tone: "",
    targetAge: "",
    targetGender: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCampaigns, setGeneratedCampaigns] = useState([])
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateCampaign = async () => {
    if (!formData.productName || !formData.offerType) {
      alert("Veuillez remplir au moins le nom du produit et le type d'offre")
      return
    }

    setIsGenerating(true)

    try {
      // 🔥 VOTRE API IA RÉELLE - URL locale Colab
      const API_URL = "http://127.0.0.1:5000"

      console.log("🤖 Appel de l'IA pour générer les campagnes...")

      const response = await fetch(`${API_URL}/generate-original-campaign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: formData.productName,
          offerType: formData.offerType,
          description: formData.description,
          platform: formData.platform,
          language: formData.language,
          tone: formData.tone,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("✅ Campagnes générées par l'IA:", result)

        if (result.success && result.campaigns) {
          setGeneratedCampaigns(result.campaigns)
          alert(`🎉 ${result.campaigns.length} campagnes générées avec succès par l'IA !`)
        } else {
          throw new Error("Format de réponse invalide")
        }
      } else {
        const errorText = await response.text()
        console.error("Erreur API:", response.status, errorText)
        throw new Error(`Erreur API: ${response.status}`)
      }
    } catch (error) {
      console.error("❌ Erreur lors de la génération:", error)
      alert(`❌ Erreur: ${error.message}. Vérifiez que l'API fonctionne.`)

      // Fallback en cas d'erreur - générer des exemples avec images de test
      console.log("🔄 Utilisation du fallback...")
      const fallbackCampaigns = [
        {
          id: 1,
          caption: `🍕 ${formData.productName} - Une explosion de saveurs ! ${formData.offerType} - Commandez maintenant ! 🚀`,
          cta: "Commander maintenant",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
          likes: Math.floor(Math.random() * 500) + 100,
          views: Math.floor(Math.random() * 2000) + 500,
          roi: Math.floor(Math.random() * 200) + 150,
          engagement: Math.floor(Math.random() * 15) + 5,
        },
      ]
      setGeneratedCampaigns(fallbackCampaigns)
    }

    setIsGenerating(false)
  }

  const saveCampaign = (campaign) => {
    // Sauvegarder la campagne
    const newCampaign = {
      name: formData.productName,
      status: "Actif",
      likes: campaign.likes,
      views: campaign.views,
      roi: campaign.roi,
      caption: campaign.caption,
      cta: campaign.cta,
      createdAt: new Date().toISOString(),
      generatedByAI: true, // Marquer comme généré par IA
    }

    // Sauvegarder dans localStorage
    const existingCampaigns = JSON.parse(localStorage.getItem("user-campaigns") || "[]")
    existingCampaigns.push(newCampaign)
    localStorage.setItem("user-campaigns", JSON.stringify(existingCampaigns))

    // Mettre à jour les stats globales
    const globalStats = JSON.parse(
      localStorage.getItem("fastads-stats") ||
        '{"totalCampaigns":0,"totalClients":1,"totalLikes":0,"totalViews":0,"avgROI":0}',
    )
    globalStats.totalCampaigns += 1
    globalStats.totalLikes += campaign.likes
    globalStats.totalViews += campaign.views
    globalStats.avgROI = Math.round(
      (globalStats.avgROI * (globalStats.totalCampaigns - 1) + campaign.roi) / globalStats.totalCampaigns,
    )
    localStorage.setItem("fastads-stats", JSON.stringify(globalStats))

    alert("🎉 Campagne IA sauvegardée avec succès !")
    window.location.href = "/client-dashboard"
  }

  const goBack = () => {
    window.location.href = "/client-dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-rose-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Button onClick={goBack} variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>

            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-xl">
                <Wand2 className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                🤖 Créer une Campagne avec IA
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Target className="w-5 h-5 text-pink-500" />🎯 Paramètres de la Campagne IA
              </CardTitle>
              <p className="text-sm text-gray-600">🤖 Alimenté par 15,000 publicités tunisiennes analysées</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">🍕 Nom du Produit *</label>
                <Input
                  placeholder="Ex: Pizza Margherita, Sandwich Tunisien..."
                  value={formData.productName}
                  onChange={(e) => handleInputChange("productName", e.target.value)}
                  className="border-pink-200 focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">🎁 Type d'Offre *</label>
                <Select onValueChange={(value) => handleInputChange("offerType", value)}>
                  <SelectTrigger className="border-pink-200 focus:border-pink-400">
                    <SelectValue placeholder="Choisissez le type d'offre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reduction-20">🏷️ Réduction 20%</SelectItem>
                    <SelectItem value="livraison-gratuite">🚚 Livraison gratuite</SelectItem>
                    <SelectItem value="menu-complet">🍽️ Menu complet</SelectItem>
                    <SelectItem value="offre-speciale">⭐ Offre spéciale</SelectItem>
                    <SelectItem value="nouveau-produit">🆕 Nouveau produit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">📝 Description (optionnel)</label>
                <Textarea
                  placeholder="Décrivez votre produit ou offre..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="border-pink-200 focus:border-pink-400"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">📱 Plateforme</label>
                  <Select onValueChange={(value) => handleInputChange("platform", value)}>
                    <SelectTrigger className="border-pink-200">
                      <SelectValue placeholder="Plateforme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facebook">📘 Facebook</SelectItem>
                      <SelectItem value="instagram">📸 Instagram</SelectItem>
                      <SelectItem value="both">🔄 Les deux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">🗣️ Langue</label>
                  <Select onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger className="border-pink-200">
                      <SelectValue placeholder="Langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="francais">🇫🇷 Français</SelectItem>
                      <SelectItem value="anglais">🇬🇧 Anglais</SelectItem>
                      <SelectItem value="tunisien">🇹🇳 Tunisien-Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">🎭 Ton de Communication</label>
                <Select onValueChange={(value) => handleInputChange("tone", value)}>
                  <SelectTrigger className="border-pink-200">
                    <SelectValue placeholder="Choisissez le ton" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amusant">🎉 Amusant</SelectItem>
                    <SelectItem value="commercial">🎯 Commercial</SelectItem>
                    <SelectItem value="emotionnel">❤️ Émotionnel</SelectItem>
                    <SelectItem value="professionnel">💼 Professionnel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={generateCampaign}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />🤖 IA en cours de génération...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />🤖 Générer avec l'IA (15k pubs analysées)
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Résultats */}
          <div className="space-y-6">
            {isGenerating && (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="animate-pulse space-y-4">
                    <Sparkles className="w-16 h-16 text-pink-500 mx-auto animate-spin" />
                    <h3 className="text-xl font-semibold text-gray-800">🤖 IA en action...</h3>
                    <p className="text-gray-600">
                      🧠 Analyse de vos 15,000 publicités collectées
                      <br />✨ Génération de contenu 100% original...
                      <br />🎯 Optimisation pour votre audience...
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {generatedCampaigns.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />🤖 Campagnes Générées par IA (Tests A/B)
                </h3>

                {generatedCampaigns.map((campaign, index) => (
                  <Card
                    key={campaign.id}
                    className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-gray-800">🤖 Variante IA {index + 1}</CardTitle>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          ✨ Généré par IA
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">📝 Caption générée par IA :</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{campaign.caption}</p>
                      </div>

                      <div className="space-y-4">
                        {/* Image de la campagne - AMÉLIORÉE */}
                        <div className="w-full">
                          <div className="relative">
                            <img
                              src={campaign.image || "/placeholder.svg"}
                              alt={`Campagne ${formData.productName}`}
                              className="w-full h-48 rounded-lg object-cover border-2 border-pink-200 shadow-md"
                              onError={(e) => {
                                console.error("❌ Erreur chargement image:", campaign.image)
                                // Image de secours
                                e.target.src =
                                  "https://via.placeholder.com/400x300/f3f4f6/6b7280?text=🍕+Image+en+cours+de+chargement"
                              }}
                              onLoad={() => {
                                console.log("✅ Image chargée:", campaign.image)
                              }}
                            />
                            {/* Overlay avec info de debug */}
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                              📸 Image IA
                            </div>
                          </div>
                        </div>

                        {/* CTA Badge */}
                        <div className="flex justify-center">
                          <Badge variant="outline" className="border-pink-200 text-pink-700 px-4 py-2">
                            {campaign.cta}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Eye className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                          <div className="text-sm font-semibold text-blue-700">{campaign.views}</div>
                          <div className="text-xs text-blue-600">Vues</div>
                        </div>
                        <div className="p-2 bg-red-50 rounded-lg">
                          <Heart className="w-4 h-4 text-red-500 mx-auto mb-1" />
                          <div className="text-sm font-semibold text-red-700">{campaign.likes}</div>
                          <div className="text-xs text-red-600">Likes</div>
                        </div>
                        <div className="p-2 bg-green-50 rounded-lg">
                          <TrendingUp className="w-4 h-4 text-green-500 mx-auto mb-1" />
                          <div className="text-sm font-semibold text-green-700">{campaign.roi}%</div>
                          <div className="text-xs text-green-600">ROI</div>
                        </div>
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <Target className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                          <div className="text-sm font-semibold text-purple-700">{campaign.engagement}%</div>
                          <div className="text-xs text-purple-600">Engagement</div>
                        </div>
                      </div>

                      <Button
                        onClick={() => saveCampaign(campaign)}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        🚀 Lancer cette campagne IA
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
