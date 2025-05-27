"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Zap,
  Target,
  BarChart3,
  Users,
  Eye,
  TrendingUp,
  Star,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Globe,
} from "lucide-react"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [openFaq, setOpenFaq] = useState(null)
  const [language, setLanguage] = useState("fr")
  const [statsAnimated, setStatsAnimated] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({
    restaurants: 0,
    campaigns: 0,
    revenue: 0,
  })

  const goToLogin = () => {
    window.location.href = "/login"
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    alert(content[language].newsletterSuccess)
    setEmail("")
  }

  const handleContactClick = () => {
    window.location.href = "mailto:contact@marketiq.tn"
  }

  // Animation des statistiques
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true)
            animateStats()
          }
        })
      },
      { threshold: 0.5 },
    )

    const statsElement = document.getElementById("stats-section")
    if (statsElement) {
      observer.observe(statsElement)
    }

    return () => observer.disconnect()
  }, [statsAnimated])

  const animateStats = () => {
    const targets = { restaurants: 120, campaigns: 450, revenue: 350 }
    const duration = 2000
    const steps = 60

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedStats({
        restaurants: Math.floor(targets.restaurants * progress),
        campaigns: Math.floor(targets.campaigns * progress),
        revenue: Math.floor(targets.revenue * progress),
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setAnimatedStats(targets)
      }
    }, duration / steps)
  }

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr")
  }

  const content = {
    fr: {
      slogan: "Créez. Testez. Optimisez. Vos publicités n'ont jamais été aussi intelligentes.",
      cta: "🚀 Démarrer maintenant",
      heroTitle: "Génère des pubs irrésistibles pour ton fast-food avec l'IA ! 🍔✨",
      heroSubtitle:
        "Des pubs savoureuses, des clics à volonté. FoodAds AI génère et optimise automatiquement tes campagnes publicitaires pour attirer plus de clients et augmenter ton chiffre d'affaires.",
      features: "Des fonctionnalités qui donnent faim 🍔",
      howItWorks: "Comment ça marche",
      testimonials: "Ce que disent nos clients",
      faq: "Questions fréquentes",
      readyToBoost: "Prêt à booster vos ventes ? 🚀",
      startNow: "Commencer maintenant",
      trustText: "Plus de 120 restaurants tunisiens nous font confiance",
      newsletterTitle: "Restez informé",
      newsletterSubtitle:
        "Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et conseils marketing",
      newsletterSuccess: "Merci pour votre inscription! 🎉",
      emailPlaceholder: "Votre adresse email",
      subscribe: "S'inscrire",
      connection: "Connexion",
      home: "Accueil",
      functionality: "Fonctionnalités",
      howItWorksNav: "Comment ça marche",
      testimonialsNav: "Témoignages",
      campaignExamples: "Exemples de campagnes",
      campaignExamplesSubtitle: "Découvrez comment FoodAds AI transforme la publicité pour les restaurants tunisiens",
      createSimilarCampaign: "Créer une campagne similaire",
      statsRestaurants: "restaurants actifs",
      statsCampaigns: "campagnes optimisées",
      statsRevenue: "générés pour les clients",
    },
    en: {
      slogan: "Create. Test. Optimize. Your ads have never been this smart.",
      cta: "🚀 Start now",
      heroTitle: "Generate irresistible ads for your fast-food with AI! 🍔✨",
      heroSubtitle:
        "Tasty ads, unlimited clicks. FoodAds AI automatically generates and optimizes your advertising campaigns to attract more customers and increase your revenue.",
      features: "Features that make you hungry 🍔",
      howItWorks: "How it works",
      testimonials: "What our clients say",
      faq: "Frequently asked questions",
      readyToBoost: "Ready to boost your sales? 🚀",
      startNow: "Start now",
      trustText: "More than 120 Tunisian restaurants trust us",
      newsletterTitle: "Stay informed",
      newsletterSubtitle: "Subscribe to our newsletter to receive our latest news and marketing tips",
      newsletterSuccess: "Thank you for subscribing! 🎉",
      emailPlaceholder: "Your email address",
      subscribe: "Subscribe",
      connection: "Login",
      home: "Home",
      functionality: "Features",
      howItWorksNav: "How it works",
      testimonialsNav: "Testimonials",
      campaignExamples: "Campaign examples",
      campaignExamplesSubtitle: "Discover how FoodAds AI transforms advertising for Tunisian restaurants",
      createSimilarCampaign: "Create similar campaign",
      statsRestaurants: "active restaurants",
      statsCampaigns: "optimized campaigns",
      statsRevenue: "generated for clients",
    },
  }

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-pink-500" />,
      title: language === "fr" ? "Génération automatique" : "Automatic generation",
      description:
        language === "fr"
          ? "Créez des publicités attrayantes en quelques clics grâce à notre IA spécialisée dans la restauration tunisienne."
          : "Create attractive ads in just a few clicks with our AI specialized in Tunisian restaurants.",
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: language === "fr" ? "Multi-plateformes" : "Multi-platform",
      description:
        language === "fr"
          ? "Publiez sur Facebook et Instagram en un seul endroit sans effort supplémentaire."
          : "Publish on Facebook and Instagram in one place without additional effort.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-500" />,
      title: "A/B Testing",
      description:
        language === "fr"
          ? "Testez différentes versions de vos publicités pour identifier celles qui convertissent le mieux."
          : "Test different versions of your ads to identify those that convert best.",
    },
    {
      icon: <Eye className="w-8 h-8 text-purple-500" />,
      title: language === "fr" ? "Analyse en temps réel" : "Real-time analysis",
      description:
        language === "fr"
          ? "Suivez les performances de vos campagnes et obtenez des insights pour les optimiser."
          : "Track your campaign performance and get insights to optimize them.",
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: language === "fr" ? "Ciblage précis" : "Precise targeting",
      description:
        language === "fr"
          ? "Atteignez exactement les clients qui aimeront votre restaurant grâce à notre ciblage intelligent."
          : "Reach exactly the customers who will love your restaurant with our smart targeting.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-red-500" />,
      title: language === "fr" ? "Optimisation automatique" : "Automatic optimization",
      description:
        language === "fr"
          ? "Notre IA ajuste continuellement vos campagnes pour maximiser votre retour sur investissement."
          : "Our AI continuously adjusts your campaigns to maximize your return on investment.",
    },
  ]

  const testimonials = [
    {
      name: "Ahmed Ben Ali",
      role: language === "fr" ? "Propriétaire, Maqloub Express" : "Owner, Maqloub Express",
      content:
        language === "fr"
          ? "Grâce à FoodAds AI, j'ai augmenté ma clientèle de 35% en seulement 2 mois. Les publicités générées sont parfaitement adaptées à mon restaurant et attirent exactement le type de clients que je recherche."
          : "Thanks to FoodAds AI, I increased my clientele by 35% in just 2 months. The generated ads are perfectly adapted to my restaurant and attract exactly the type of customers I'm looking for.",
    },
    {
      name: "Sonia Mansour",
      role: language === "fr" ? "Gérante, Pizza Tunisienne" : "Manager, Pizza Tunisienne",
      content:
        language === "fr"
          ? "L'IA comprend parfaitement l'univers de la restauration tunisienne. Les visuels et les textes sont toujours pertinents et donnent vraiment envie de venir manger chez nous. Un investissement qui rapporte gros!"
          : "The AI perfectly understands the Tunisian restaurant universe. The visuals and texts are always relevant and really make people want to come eat with us. An investment that pays off big!",
    },
    {
      name: "Karim Trabelsi",
      role: language === "fr" ? "Chef, Tacos Deluxe" : "Chef, Tacos Deluxe",
      content:
        language === "fr"
          ? "Je n'avais aucune compétence en marketing digital avant d'utiliser FoodAds AI. Maintenant, je gère mes campagnes publicitaires en quelques clics et les résultats sont impressionnants."
          : "I had no digital marketing skills before using FoodAds AI. Now I manage my advertising campaigns with just a few clicks and the results are impressive.",
    },
  ]

  const faqs = [
    {
      question: language === "fr" ? "Comment fonctionne cette application ?" : "How does this application work?",
      answer:
        language === "fr"
          ? "Notre système utilise l'intelligence artificielle pour générer, tester et optimiser automatiquement vos publicités sur Facebook et Instagram. Il s'appuie sur des milliers de publicités pour apprendre ce qui fonctionne le mieux et augmenter vos performances (clics, commandes, visibilité…)."
          : "Our system uses artificial intelligence to automatically generate, test and optimize your ads on Facebook and Instagram. It relies on thousands of ads to learn what works best and increase your performance (clicks, orders, visibility...).",
    },
    {
      question:
        language === "fr"
          ? "Est-ce que je dois créer moi-même les publicités ?"
          : "Do I have to create the ads myself?",
      answer:
        language === "fr"
          ? "Non. L'application génère automatiquement des visuels, des légendes et des appels à l'action adaptés à votre restaurant, vos plats et vos promotions."
          : "No. The application automatically generates visuals, captions and calls to action adapted to your restaurant, your dishes and your promotions.",
    },
    {
      question:
        language === "fr" ? "Est-ce que je peux modifier les publicités générées ?" : "Can I modify the generated ads?",
      answer:
        language === "fr"
          ? "Oui. Chaque publicité générée peut être modifiée (texte, image, CTA) avant d'être publiée."
          : "Yes. Each generated ad can be modified (text, image, CTA) before being published.",
    },
    {
      question:
        language === "fr"
          ? "Comment l'IA choisit-elle les meilleures publicités ?"
          : "How does AI choose the best ads?",
      answer:
        language === "fr"
          ? "L'IA se base sur des données d'engagement (likes, clics, conversions) et effectue des tests A/B pour identifier les formats les plus performants, puis optimise en temps réel vos campagnes."
          : "AI is based on engagement data (likes, clicks, conversions) and performs A/B tests to identify the most effective formats, then optimizes your campaigns in real time.",
    },
    {
      question:
        language === "fr"
          ? "Sur quelles plateformes l'application fonctionne-t-elle ?"
          : "On which platforms does the application work?",
      answer:
        language === "fr"
          ? "Actuellement, notre système est compatible avec Facebook et Instagram. L'intégration de TikTok Ads est prévue prochainement."
          : "Currently, our system is compatible with Facebook and Instagram. TikTok Ads integration is planned soon.",
    },
    {
      question:
        language === "fr"
          ? "Ai-je besoin de compétences techniques pour l'utiliser ?"
          : "Do I need technical skills to use it?",
      answer:
        language === "fr"
          ? "Pas du tout ! L'interface est simple et intuitive. Vous sélectionnez vos objectifs (plus de clients, plus de commandes…), et le système s'occupe du reste."
          : "Not at all! The interface is simple and intuitive. You select your objectives (more customers, more orders...), and the system takes care of the rest.",
    },
    {
      question: language === "fr" ? "Mes données sont-elles sécurisées ?" : "Is my data secure?",
      answer:
        language === "fr"
          ? "Oui. Toutes vos données publicitaires sont stockées de manière sécurisée et ne sont jamais partagées avec des tiers."
          : "Yes. All your advertising data is stored securely and is never shared with third parties.",
    },
    {
      question:
        language === "fr" ? "Puis-je suivre les performances de mes pubs ?" : "Can I track the performance of my ads?",
      answer:
        language === "fr"
          ? "Oui. Vous avez accès à un tableau de bord interactif qui affiche en temps réel les performances de chaque publicité : nombre de vues, clics, commandes, etc."
          : "Yes. You have access to an interactive dashboard that displays real-time performance of each ad: number of views, clicks, orders, etc.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-xl">
                <Zap className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                FoodAds AI
              </span>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#accueil" className="text-gray-700 hover:text-pink-600 transition-colors">
                {content[language].home}
              </a>
              <a href="#fonctionnalites" className="text-gray-700 hover:text-pink-600 transition-colors">
                {content[language].functionality}
              </a>
              <a href="#comment-ca-marche" className="text-gray-700 hover:text-pink-600 transition-colors">
                {content[language].howItWorksNav}
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-pink-600 transition-colors">
                {content[language].testimonialsNav}
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                onClick={toggleLanguage}
                variant="outline"
                className="border-pink-200 text-pink-600 hover:bg-pink-50"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === "fr" ? "EN" : "FR"}
              </Button>
              <Button onClick={goToLogin} variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                {content[language].connection}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-pink-100">
              <div className="flex flex-col space-y-4">
                <a href="#accueil" className="text-gray-700 hover:text-pink-600 transition-colors">
                  {content[language].home}
                </a>
                <a href="#fonctionnalites" className="text-gray-700 hover:text-pink-600 transition-colors">
                  {content[language].functionality}
                </a>
                <a href="#comment-ca-marche" className="text-gray-700 hover:text-pink-600 transition-colors">
                  {content[language].howItWorksNav}
                </a>
                <a href="#testimonials" className="text-gray-700 hover:text-pink-600 transition-colors">
                  {content[language].testimonialsNav}
                </a>
                <div className="flex flex-col gap-2 pt-4">
                  <Button
                    onClick={toggleLanguage}
                    variant="outline"
                    className="border-pink-200 text-pink-600 hover:bg-pink-50"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    {language === "fr" ? "EN" : "FR"}
                  </Button>
                  <Button
                    onClick={goToLogin}
                    variant="outline"
                    className="border-pink-200 text-pink-600 hover:bg-pink-50"
                  >
                    {content[language].connection}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="accueil" className="bg-gradient-to-br from-white via-pink-50 to-rose-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <Badge variant="secondary" className="bg-pink-100 text-pink-700 px-4 py-2 text-lg">
              #1 en Marketing IA pour Fast-Food Tunisien 🇹🇳
            </Badge>

            <div className="space-y-4">
              <p className="text-xl text-pink-600 font-medium">{content[language].slogan}</p>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                {content[language].heroTitle}
              </h1>
            </div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{content[language].heroSubtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={goToLogin}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-lg px-8 py-4"
              >
                {content[language].cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <p className="text-gray-500">{content[language].trustText}</p>
          </div>

          {/* Statistiques animées */}
          <div id="stats-section" className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-pink-600 mb-2">✅ {animatedStats.restaurants}</div>
                <div className="text-gray-600">{content[language].statsRestaurants}</div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">🚀 +{animatedStats.campaigns}</div>
                <div className="text-gray-600">{content[language].statsCampaigns}</div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">💰 +{animatedStats.revenue}K TND</div>
                <div className="text-gray-600">{content[language].statsRevenue}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fonctionnalites" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content[language].features}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "fr"
                ? "Notre plateforme utilise l'intelligence artificielle pour créer des campagnes publicitaires qui attirent les clients comme l'odeur d'un bon maqloub."
                : "Our platform uses artificial intelligence to create advertising campaigns that attract customers like the smell of a good maqloub."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="comment-ca-marche" className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content[language].howItWorks}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "fr"
                ? "Créer des campagnes publicitaires efficaces n'a jamais été aussi simple avec FoodAds AI"
                : "Creating effective advertising campaigns has never been easier with FoodAds AI"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: language === "fr" ? "Connectez-vous" : "Sign in",
                description:
                  language === "fr"
                    ? "Créez votre compte et accédez à votre tableau de bord personnalisé pour gérer toutes vos campagnes."
                    : "Create your account and access your personalized dashboard to manage all your campaigns.",
              },
              {
                step: "2",
                title: language === "fr" ? "Renseignez votre produit" : "Enter your product",
                description:
                  language === "fr"
                    ? "Indiquez le nom de votre plat, le type d'offre et quelques détails. Notre IA s'occupe du reste automatiquement."
                    : "Enter the name of your dish, the type of offer and some details. Our AI takes care of the rest automatically.",
              },
              {
                step: "3",
                title: language === "fr" ? "L'IA génère vos pubs" : "AI generates your ads",
                description:
                  language === "fr"
                    ? "Notre système crée automatiquement des visuels, textes et call-to-action optimisés pour Facebook et Instagram."
                    : "Our system automatically creates visuals, texts and call-to-action optimized for Facebook and Instagram.",
              },
              {
                step: "4",
                title: language === "fr" ? "Suivez vos performances" : "Track your performance",
                description:
                  language === "fr"
                    ? "Consultez en temps réel les statistiques de vos campagnes : vues, likes, conversions et ROI."
                    : "View real-time statistics of your campaigns: views, likes, conversions and ROI.",
              },
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Examples - PHOTO PIZZA RÉELLE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content[language].campaignExamples}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{content[language].campaignExamplesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Platform info */}
            <div className="space-y-6">
              <div className="space-y-4">
                {[
                  {
                    platform: "Facebook",
                    description:
                      language === "fr"
                        ? "Idéal pour la notoriété et les promotions"
                        : "Ideal for awareness and promotions",
                    color: "blue",
                  },
                  {
                    platform: "Instagram",
                    description:
                      language === "fr" ? "Parfait pour les visuels attrayants" : "Perfect for attractive visuals",
                    color: "pink",
                  },
                ].map((platform, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${
                        platform.color === "blue" ? "bg-blue-500" : "bg-pink-500"
                      }`}
                    >
                      📱
                    </div>
                    <div>
                      <h4 className="font-semibold">{platform.platform}</h4>
                      <p className="text-sm text-gray-600">{platform.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Preview */}
            <Card className="shadow-2xl border-0">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">📘</div>
                  <div>
                    <h3 className="font-bold">Pizza Palace</h3>
                    <p className="text-sm text-gray-500">Facebook</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=200&fit=crop&auto=format"
                  alt="Pizza Margherita délicieuse avec mozzarella fondante et basilic frais"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    console.error("Erreur chargement image pizza")
                    e.target.src = "https://via.placeholder.com/400x200/f3f4f6/6b7280?text=🍕+Pizza+Délicieuse"
                  }}
                />
                <p className="text-gray-800">
                  🍕{" "}
                  {language === "fr"
                    ? "Découvrez notre délicieuse pizza margherita avec 20% de réduction ! Pâte fraîche, mozzarella fondante et basilic frais. Commandez maintenant ! 🔥"
                    : "Discover our delicious margherita pizza with 20% off! Fresh dough, melted mozzarella and fresh basil. Order now! 🔥"}
                </p>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">15.2K</div>
                    <div className="text-sm text-gray-500">{language === "fr" ? "Portée" : "Reach"}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">8.7%</div>
                    <div className="text-sm text-gray-500">Engagement</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">342</div>
                    <div className="text-sm text-gray-500">{language === "fr" ? "Conversions" : "Conversions"}</div>
                  </div>
                </div>

                <Button
                  onClick={goToLogin}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                >
                  {content[language].createSimilarCampaign}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content[language].testimonials}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "fr"
                ? "Des centaines de restaurateurs tunisiens ont déjà transformé leur marketing avec FoodAds AI"
                : "Hundreds of Tunisian restaurateurs have already transformed their marketing with FoodAds AI"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content[language].faq}</h2>
            <p className="text-xl text-gray-600">
              {language === "fr"
                ? "Tout ce que vous devez savoir sur FoodAds AI"
                : "Everything you need to know about FoodAds AI"}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <button
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content[language].newsletterTitle}</h2>
          <p className="text-xl text-gray-600 mb-8">{content[language].newsletterSubtitle}</p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={content[language].emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border-pink-200 focus:border-pink-400"
              required
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
            >
              {content[language].subscribe}
            </Button>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content[language].readyToBoost}</h2>
          <p className="text-xl mb-8 opacity-90">
            {language === "fr"
              ? "Rejoignez les centaines de restaurants qui ont déjà transformé leur marketing avec FoodAds AI"
              : "Join the hundreds of restaurants that have already transformed their marketing with FoodAds AI"}
          </p>
          <Button
            onClick={goToLogin}
            size="lg"
            className="bg-white text-pink-600 hover:bg-gray-100 text-lg px-8 py-4 font-semibold"
          >
            {content[language].startNow}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-xl">
                  <Zap className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">FoodAds AI</span>
              </div>
              <p className="text-gray-400">
                {language === "fr"
                  ? "La plateforme d'IA qui révolutionne le marketing pour les restaurants tunisiens."
                  : "The AI platform that revolutionizes marketing for Tunisian restaurants."}
              </p>
            </div>

            {/* Produit */}
            <div>
              <h3 className="font-semibold mb-4">{language === "fr" ? "Produit" : "Product"}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#fonctionnalites" className="hover:text-white transition-colors">
                    {content[language].functionality}
                  </a>
                </li>
                <li>
                  <a href="#comment-ca-marche" className="hover:text-white transition-colors">
                    {content[language].howItWorksNav}
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-white transition-colors">
                    {content[language].testimonialsNav}
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={handleContactClick} className="hover:text-white transition-colors text-left">
                    Contact
                  </button>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Légal */}
            <div>
              <h3 className="font-semibold mb-4">{language === "fr" ? "Légal" : "Legal"}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    {language === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white transition-colors">
                    {language === "fr" ? "Conditions d'utilisation" : "Terms of Service"}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 FoodAds AI. Tous droits réservés.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                {language === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                {language === "fr" ? "Conditions d'utilisation" : "Terms of Service"}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
