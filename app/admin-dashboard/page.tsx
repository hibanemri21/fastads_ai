"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Users,
  TrendingUp,
  Eye,
  Heart,
  LogOut,
  Zap,
  Target,
  BarChart3,
  Globe,
  Plus,
  UserPlus,
  X,
  Trash2,
  Edit,
} from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalClients: 0,
    totalLikes: 0,
    totalViews: 0,
    avgROI: 0,
  })

  const [language, setLanguage] = useState("fr")
  const [activeSection, setActiveSection] = useState("overview")
  const [clients, setClients] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [showAddClientModal, setShowAddClientModal] = useState(false)
  const [newClient, setNewClient] = useState({ name: "", email: "", status: "Standard" })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    // Charger les clients
    const savedClients = localStorage.getItem("fastads-clients")
    if (savedClients) {
      const clientsData = JSON.parse(savedClients)
      setClients(clientsData)
    }

    // Charger les campagnes de tous les clients
    const allCampaigns = []
    const savedCampaigns = localStorage.getItem("user-campaigns")
    if (savedCampaigns) {
      allCampaigns.push(...JSON.parse(savedCampaigns))
    }
    setCampaigns(allCampaigns)

    // Calculer les stats globales
    const savedStats = localStorage.getItem("fastads-stats")
    if (savedStats) {
      const globalStats = JSON.parse(savedStats)
      setStats({
        totalCampaigns: allCampaigns.length,
        totalClients: clients.length,
        totalLikes: globalStats.totalLikes || 0,
        totalViews: globalStats.totalViews || 0,
        avgROI: globalStats.avgROI || 0,
      })
    } else {
      // Calculer depuis les campagnes
      const totalLikes = allCampaigns.reduce((sum, camp) => sum + (camp.likes || 0), 0)
      const totalViews = allCampaigns.reduce((sum, camp) => sum + (camp.views || 0), 0)
      const avgROI =
        allCampaigns.length > 0
          ? Math.round(allCampaigns.reduce((sum, camp) => sum + (camp.roi || 0), 0) / allCampaigns.length)
          : 0

      setStats({
        totalCampaigns: allCampaigns.length,
        totalClients: clients.length,
        totalLikes,
        totalViews,
        avgROI,
      })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    window.location.href = "/"
  }

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr")
  }

  const goToCreateCampaign = () => {
    window.location.href = "/create-campaign"
  }

  const addClient = () => {
    if (newClient.name && newClient.email) {
      const client = {
        id: Date.now(),
        name: newClient.name,
        email: newClient.email,
        status: newClient.status,
        campaigns: 0,
        joinDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      }

      const updatedClients = [...clients, client]
      setClients(updatedClients)
      localStorage.setItem("fastads-clients", JSON.stringify(updatedClients))

      setNewClient({ name: "", email: "", status: "Standard" })
      setShowAddClientModal(false)
      loadData() // Recharger les données
    }
  }

  const deleteClient = (clientId) => {
    const updatedClients = clients.filter((client) => client.id !== clientId)
    setClients(updatedClients)
    localStorage.setItem("fastads-clients", JSON.stringify(updatedClients))
    loadData()
  }

  const content = {
    fr: {
      title: "FastAds AI - Admin",
      administrator: "👑 Administrateur",
      logout: "Déconnexion",
      dashboardTitle: "🎯 Tableau de Bord Administrateur",
      dashboardSubtitle: "Gérez et supervisez toutes les campagnes FastAds AI",
      totalCampaigns: "Total Campagnes",
      totalClients: "Total Clients",
      totalLikes: "Total Likes",
      totalViews: "Total Vues",
      avgROI: "ROI Moyen",
      campaignsCreated: "📈 Campagnes créées",
      activeUsers: "👥 Utilisateurs actifs",
      engagements: "❤️ Engagements",
      impressions: "👁️ Impressions",
      returnInvestment: "💰 Retour investissement",
      campaignManagement: "🎯 Gestion des Campagnes",
      clientManagement: "👥 Gestion des Clients",
      quickActions: "⚡ Actions Rapides",
      latestCampaigns: "📊 Dernières Campagnes",
      activeClients: "🏢 Clients Actifs",
      viewAllCampaigns: "📈 Voir toutes les campagnes",
      manageClients: "👥 Gérer les clients",
      createCampaign: "🎯 Créer Campagne",
      newCampaignAI: "Nouvelle campagne IA",
      analytics: "📊 Analytics",
      detailedReports: "Rapports détaillés",
      active: "Actif",
      inProgress: "En cours",
      completed: "Terminé",
      premium: "Premium",
      standard: "Standard",
      new: "Nouveau",
      systemStats: "📊 Statistiques Système",
      userManagement: "👥 Gestion Utilisateurs",
      campaignAnalytics: "📈 Analytics Campagnes",
      addClient: "Ajouter Client",
      clientName: "Nom du client",
      clientEmail: "Email du client",
      clientStatus: "Statut",
      cancel: "Annuler",
      save: "Sauvegarder",
      actions: "Actions",
      delete: "Supprimer",
      edit: "Modifier",
      joinDate: "Date d'inscription",
      lastLogin: "Dernière connexion",
    },
    en: {
      title: "FastAds AI - Admin",
      administrator: "👑 Administrator",
      logout: "Logout",
      dashboardTitle: "🎯 Administrator Dashboard",
      dashboardSubtitle: "Manage and supervise all FastAds AI campaigns",
      totalCampaigns: "Total Campaigns",
      totalClients: "Total Clients",
      totalLikes: "Total Likes",
      totalViews: "Total Views",
      avgROI: "Average ROI",
      campaignsCreated: "📈 Campaigns created",
      activeUsers: "👥 Active users",
      engagements: "❤️ Engagements",
      impressions: "👁️ Impressions",
      returnInvestment: "💰 Return on investment",
      campaignManagement: "🎯 Campaign Management",
      clientManagement: "👥 Client Management",
      quickActions: "⚡ Quick Actions",
      latestCampaigns: "📊 Latest Campaigns",
      activeClients: "🏢 Active Clients",
      viewAllCampaigns: "📈 View all campaigns",
      manageClients: "👥 Manage clients",
      createCampaign: "🎯 Create Campaign",
      newCampaignAI: "New AI campaign",
      analytics: "📊 Analytics",
      detailedReports: "Detailed reports",
      active: "Active",
      inProgress: "In Progress",
      completed: "Completed",
      premium: "Premium",
      standard: "Standard",
      new: "New",
      systemStats: "📊 System Statistics",
      userManagement: "👥 User Management",
      campaignAnalytics: "📈 Campaign Analytics",
      addClient: "Add Client",
      clientName: "Client name",
      clientEmail: "Client email",
      clientStatus: "Status",
      cancel: "Cancel",
      save: "Save",
      actions: "Actions",
      delete: "Delete",
      edit: "Edit",
      joinDate: "Join date",
      lastLogin: "Last login",
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
              <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                {content[language].administrator}
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{content[language].dashboardTitle}</h2>
          <p className="text-gray-600">{content[language].dashboardSubtitle}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-lg">
            {[
              { id: "overview", label: content[language].systemStats, icon: BarChart3 },
              { id: "users", label: content[language].userManagement, icon: Users },
              { id: "campaigns", label: content[language].campaignAnalytics, icon: Target },
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                variant={activeSection === tab.id ? "default" : "ghost"}
                className={`flex items-center gap-2 ${
                  activeSection === tab.id
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                    : "text-gray-600 hover:text-pink-600"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-pink-500 to-rose-500 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">{content[language].totalCampaigns}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{stats.totalCampaigns}</div>
                <Target className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-xs opacity-80 mt-1">{content[language].campaignsCreated}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">{content[language].totalClients}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{stats.totalClients}</div>
                <Users className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-xs opacity-80 mt-1">{content[language].activeUsers}</p>
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

        {/* Content based on active section */}
        {activeSection === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gestion des Campagnes */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <BarChart3 className="w-5 h-5 text-pink-500" />
                  {content[language].campaignManagement}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">{content[language].latestCampaigns}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    {campaigns.slice(-3).map((campaign, index) => (
                      <div key={index} className="flex justify-between">
                        <span>🍕 {campaign.name || `Campagne ${index + 1}`}</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {content[language].active}
                        </Badge>
                      </div>
                    ))}
                    {campaigns.length === 0 && (
                      <div className="text-center text-gray-500 py-4">Aucune campagne disponible</div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => setActiveSection("campaigns")}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                >
                  {content[language].viewAllCampaigns}
                </Button>
              </CardContent>
            </Card>

            {/* Gestion des Clients */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Users className="w-5 h-5 text-blue-500" />
                  {content[language].clientManagement}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">{content[language].activeClients}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    {clients.slice(-3).map((client, index) => (
                      <div key={index} className="flex justify-between">
                        <span>🏢 {client.name}</span>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          {client.status}
                        </Badge>
                      </div>
                    ))}
                    {clients.length === 0 && (
                      <div className="text-center text-gray-500 py-4">Aucun client disponible</div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => setActiveSection("users")}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  {content[language].manageClients}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "users" && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Users className="w-5 h-5 text-blue-500" />
                {content[language].userManagement}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{content[language].activeClients}</h3>
                  <Button
                    onClick={() => setShowAddClientModal(true)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {content[language].addClient}
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clients.map((client) => (
                    <Card key={client.id} className="border border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{client.name}</h4>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                              onClick={() => deleteClient(client.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{client.email}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                              {client.status}
                            </Badge>
                            <span className="text-xs text-gray-500">{client.campaigns} campagnes</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {content[language].joinDate}: {new Date(client.joinDate).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {content[language].lastLogin}: {new Date(client.lastLogin).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {clients.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun client</h3>
                    <p className="text-gray-500 mb-6">Commencez par ajouter votre premier client</p>
                    <Button
                      onClick={() => setShowAddClientModal(true)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {content[language].addClient}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === "campaigns" && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Target className="w-5 h-5 text-pink-500" />
                {content[language].campaignAnalytics}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Toutes les Campagnes</h3>
                  <Button onClick={goToCreateCampaign} className="bg-gradient-to-r from-pink-500 to-rose-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle Campagne
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {campaigns.map((campaign, index) => (
                    <Card key={index} className="border border-pink-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{campaign.name}</h4>
                        <p className="text-sm text-gray-600">
                          {campaign.generatedByAI ? "Généré par IA" : "Campagne standard"}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {campaign.status || "Actif"}
                          </Badge>
                          <span className="text-sm font-semibold text-green-600">ROI: {campaign.roi}%</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Créé le: {new Date(campaign.createdAt).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {campaigns.length === 0 && (
                  <div className="text-center py-12">
                    <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune campagne</h3>
                    <p className="text-gray-500 mb-6">Les campagnes créées apparaîtront ici</p>
                    <Button onClick={goToCreateCampaign} className="bg-gradient-to-r from-pink-500 to-rose-500">
                      <Plus className="w-4 h-4 mr-2" />
                      Créer la première campagne
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions rapides */}
        <div className="mt-8">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Zap className="w-5 h-5 text-purple-500" />
                {content[language].quickActions}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={goToCreateCampaign}
                  variant="outline"
                  className="p-6 h-auto flex-col gap-2 border-pink-200 hover:bg-pink-50"
                >
                  <Target className="w-8 h-8 text-pink-500" />
                  <span className="font-semibold">{content[language].createCampaign}</span>
                  <span className="text-xs text-gray-500">{content[language].newCampaignAI}</span>
                </Button>

                <Button
                  onClick={() => setActiveSection("campaigns")}
                  variant="outline"
                  className="p-6 h-auto flex-col gap-2 border-blue-200 hover:bg-blue-50"
                >
                  <BarChart3 className="w-8 h-8 text-blue-500" />
                  <span className="font-semibold">{content[language].analytics}</span>
                  <span className="text-xs text-gray-500">{content[language].detailedReports}</span>
                </Button>

                <Button
                  onClick={() => setActiveSection("users")}
                  variant="outline"
                  className="p-6 h-auto flex-col gap-2 border-purple-200 hover:bg-purple-50"
                >
                  <Users className="w-8 h-8 text-purple-500" />
                  <span className="font-semibold">{content[language].userManagement}</span>
                  <span className="text-xs text-gray-500">Gérer les utilisateurs</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal Ajouter Client */}
      {showAddClientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{content[language].addClient}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowAddClientModal(false)} className="h-8 w-8 p-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{content[language].clientName}</label>
                <Input
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  placeholder="Ex: Restaurant Pizza Palace"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{content[language].clientEmail}</label>
                <Input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  placeholder="contact@restaurant.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{content[language].clientStatus}</label>
                <select
                  value={newClient.status}
                  onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Nouveau">Nouveau</option>
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowAddClientModal(false)} className="flex-1">
                  {content[language].cancel}
                </Button>
                <Button onClick={addClient} className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500">
                  {content[language].save}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
