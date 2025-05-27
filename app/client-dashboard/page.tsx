"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Heart, TrendingUp, LogOut, Zap, Target, Sparkles, Globe } from "lucide-react"

export default function ClientDashboard() {
  const [stats, setStats] = useState({
    myCampaigns: 0,
    totalLikes: 0,
    totalViews: 0,
    avgROI: 0,
  })

  const [campaigns, setCampaigns] = useState([])
  const [language, setLanguage] = useState("fr")

  useEffect(() => {
    // Charger les stats et campagnes depuis localStorage
    const savedCampaigns = localStorage.getItem("user-campaigns")
    if (savedCampaigns) {
      const userCampaigns = JSON.parse(savedCampaigns)
      setCampaigns(userCampaigns)

      // Calculer les stats
      const totalLikes = userCampaigns.reduce((sum, camp) => sum + camp.likes, 0)
      const totalViews = userCampaigns.reduce((sum, camp) => sum + camp.views, 0)
      const avgROI =
        userCampaigns.length > 0
          ? Math.round(userCampaigns.reduce((sum, camp) => sum + camp.roi, 0) / userCampaigns.length)
          : 0

      setStats({
        myCampaigns: userCampaigns.length,
        totalLikes,
        totalViews,
        avgROI,
      })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    window.location.href = "/"
  }

  const goToCreateCampaign = () => {
    window.location.href = "/create-campaign"
  }

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr")
  }

  const content = {
    fr: {
      title: "FastAds AI",
      client: "👤 Client",
      logout: "Déconnexion",
      welcome: "🚀 Bienvenue dans votre espace FastAds AI",
      subtitle: "Créez des campagnes publicitaires révolutionnaires avec l'IA",
      createNew: "✨ Créer une nouvelle campagne",
      createDescription: "Générez du contenu publicitaire avec l'IA en quelques clics",
      createNow: "Créer maintenant",
      myCampaigns: "Mes Campagnes",
      totalLikes: "Total Likes",
      totalViews: "Total Vues",
      avgROI: "ROI Moyen",
      campaignsCreated: "🎯 Campagnes créées",
      engagements: "❤️ Engagements",
      impressions: "👁️ Impressions",
      returnInvestment: "💰 Retour investissement",
      myCampaignsTitle: "📊 Mes Campagnes",
      noCampaigns: "Aucune campagne créée",
      noCampaignsDesc: "Commencez par créer votre première campagne avec l'IA",
      createFirst: "Créer ma première campagne",
      likes: "❤️ Likes:",
      views: "👁️ Vues:",
      roi: "💰 ROI:",
      viewDetails: "📈 Voir détails",
      active: "Actif",
      inProgress: "En cours",
      completed: "Terminé",
    },
    en: {
      title: "FastAds AI",
      client: "👤 Client",
      logout: "Logout",
      welcome: "🚀 Welcome to your FastAds AI space",
      subtitle: "Create revolutionary advertising campaigns with AI",
      createNew: "✨ Create a new campaign",
      createDescription: "Generate advertising content with AI in just a few clicks",
      createNow: "Create now",
      myCampaigns: "My Campaigns",
      totalLikes: "Total Likes",
      totalViews: "Total Views",
      avgROI: "Average ROI",
      campaignsCreated: "🎯 Campaigns created",
      engagements: "❤️ Engagements",
      impressions: "👁️ Impressions",
      returnInvestment: "💰 Return on investment",
      myCampaignsTitle: "📊 My Campaigns",
      noCampaigns: "No campaigns created",
      noCampaignsDesc: "Start by creating your first campaign with AI",
      createFirst: "Create my first campaign",
      likes: "❤️ Likes:",
      views: "👁️ Views:",
      roi: "💰 ROI:",
      viewDetails: "📈 View details",
      active: "Active",
      inProgress: "In Progress",
      completed: "Completed",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-rose-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-xl">
                <Zap className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                {content[language].title}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={toggleLanguage}
                variant="outline"
                className="border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === "fr" ? "EN" : "FR"}
              </Button>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {content[language].client}
              </Badge>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {content[language].logout}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{content[language].welcome}</h2>
          <p className="text-gray-600">{content[language].subtitle}</p>
        </div>

        {/* Quick Action */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{content[language].createNew}</h3>
                  <p className="opacity-90">{content[language].createDescription}</p>
                </div>
                <Button
                  onClick={goToCreateCampaign}
                  className="bg-white text-pink-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {content[language].createNow}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">{content[language].myCampaigns}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{stats.myCampaigns}</div>
                <Target className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-xs opacity-80 mt-1">{content[language].campaignsCreated}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">{content[language].totalLikes}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{stats.totalLikes}</div>
                <Heart className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-xs opacity-80 mt-1">{content[language].engagements}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-violet-500 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">{content[language].totalViews}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{stats.totalViews}</div>
                <Eye className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-xs opacity-80 mt-1">{content[language].impressions}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">{content[language].avgROI}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{stats.avgROI}%</div>
                <TrendingUp className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-xs opacity-80 mt-1">{content[language].returnInvestment}</p>
            </CardContent>
          </Card>
        </div>

        {/* Mes Campagnes */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Sparkles className="w-5 h-5 text-pink-500" />
              {content[language].myCampaignsTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {campaigns.length === 0 ? (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">{content[language].noCampaigns}</h3>
                <p className="text-gray-500 mb-6">{content[language].noCampaignsDesc}</p>
                <Button
                  onClick={goToCreateCampaign}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {content[language].createFirst}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign, index) => (
                  <Card key={index} className="border border-pink-200 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-gray-800">{campaign.name}</CardTitle>
                        <Badge
                          variant="secondary"
                          className={`${
                            campaign.status === "Actif" || campaign.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : campaign.status === "En cours" || campaign.status === "In Progress"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {campaign.status === "Actif"
                            ? content[language].active
                            : campaign.status === "En cours"
                              ? content[language].inProgress
                              : content[language].completed}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{content[language].likes}</span>
                          <span className="font-semibold">{campaign.likes}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{content[language].views}</span>
                          <span className="font-semibold">{campaign.views}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{content[language].roi}</span>
                          <span className="font-semibold text-green-600">{campaign.roi}%</span>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full mt-4 border-pink-200 text-pink-600 hover:bg-pink-50"
                        >
                          {content[language].viewDetails}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
