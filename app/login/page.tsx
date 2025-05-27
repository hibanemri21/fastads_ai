"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Zap, Sparkles, Heart, Star, TrendingUp, Globe } from "lucide-react"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [language, setLanguage] = useState("fr")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isLogin) {
      // Simulation de connexion avec les nouveaux comptes clients
      if (email === "admin@fastads.com" && password === "fastadsadmin") {
        localStorage.setItem("userRole", "admin")
        localStorage.setItem("userEmail", email)
        window.location.href = "/admin-dashboard"
      } else if (
        (email === "client1@fastads.com" && password === "fastadsclient1") ||
        (email === "client2@fastads.com" && password === "fastadsclient2") ||
        (email === "client3@fastads.com" && password === "fastadsclient3") ||
        (email === "client4@fastads.com" && password === "fastadsclient4")
      ) {
        localStorage.setItem("userRole", "client")
        localStorage.setItem("userEmail", email)

        // Ajouter le client à la liste des clients si pas déjà présent
        const existingClients = JSON.parse(localStorage.getItem("fastads-clients") || "[]")
        const clientExists = existingClients.find((client) => client.email === email)

        if (!clientExists) {
          const clientNumber = email.split("@")[0].replace("client", "")
          const newClient = {
            id: Date.now(),
            name: `Restaurant Client ${clientNumber}`,
            email: email,
            status: "Standard",
            campaigns: 0,
            joinDate: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          }
          existingClients.push(newClient)
          localStorage.setItem("fastads-clients", JSON.stringify(existingClients))
        } else {
          // Mettre à jour la dernière connexion
          clientExists.lastLogin = new Date().toISOString()
          localStorage.setItem("fastads-clients", JSON.stringify(existingClients))
        }

        window.location.href = "/client-dashboard"
      } else {
        alert(content[language].errorMessage)
      }
    } else {
      // Simulation d'inscription
      if (password === confirmPassword && password.length >= 8) {
        const newClient = {
          id: Date.now(),
          name: name,
          email: email,
          status: "Nouveau",
          campaigns: 0,
          joinDate: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        }

        // Ajouter à la liste des clients
        const existingClients = JSON.parse(localStorage.getItem("fastads-clients") || "[]")
        existingClients.push(newClient)
        localStorage.setItem("fastads-clients", JSON.stringify(existingClients))

        localStorage.setItem("userRole", "client")
        localStorage.setItem("userEmail", email)
        window.location.href = "/client-dashboard"
      } else {
        alert(content[language].checkInfo)
      }
    }
  }

  const goBack = () => {
    window.location.href = "/"
  }

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr")
  }

  const content = {
    fr: {
      login: "🔐 Connexion",
      signup: "📝 Inscription",
      loginSubtitle: "Accédez à votre tableau de bord",
      signupSubtitle: "Créez votre compte FoodAds AI",
      fullName: "👤 Nom complet",
      email: "📧 Email",
      password: "🔒 Mot de passe",
      confirmPassword: "🔒 Confirmer le mot de passe",
      loginButton: "🚀 Se connecter",
      signupButton: "✨ Créer mon compte",
      noAccount: "Pas de compte ? Inscrivez-vous 📝",
      hasAccount: "Déjà un compte ? Connectez-vous 🔐",
      backToHome: "Retour à l'accueil",
      revolutionize: "🚀 Révolutionnez vos campagnes publicitaires",
      features:
        "✨ Génération automatique avec IA\n📊 Optimisation en temps réel\n🎯 Ciblage intelligent\n💰 ROI maximisé",
      quote: "L'IA qui transforme vos idées en campagnes gagnantes 🏆",
      errorMessage: "Email ou mot de passe incorrect",
      checkInfo: "Vérifiez vos informations",
    },
    en: {
      login: "🔐 Login",
      signup: "📝 Sign Up",
      loginSubtitle: "Access your dashboard",
      signupSubtitle: "Create your FoodAds AI account",
      fullName: "👤 Full name",
      email: "📧 Email",
      password: "🔒 Password",
      confirmPassword: "🔒 Confirm password",
      loginButton: "🚀 Sign in",
      signupButton: "✨ Create my account",
      noAccount: "No account? Sign up 📝",
      hasAccount: "Already have an account? Sign in 🔐",
      backToHome: "Back to home",
      revolutionize: "🚀 Revolutionize your advertising campaigns",
      features: "✨ Automatic generation with AI\n📊 Real-time optimization\n🎯 Smart targeting\n💰 Maximized ROI",
      quote: "The AI that transforms your ideas into winning campaigns 🏆",
      errorMessage: "Incorrect email or password",
      checkInfo: "Check your information",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-rose-100 flex items-center justify-center p-4">
      {/* Animations de fond */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 animate-bounce">
          <Sparkles className="text-pink-300 w-8 h-8" />
        </div>
        <div className="absolute top-40 right-32 animate-pulse">
          <Heart className="text-rose-300 w-6 h-6" />
        </div>
        <div className="absolute bottom-32 left-40 animate-bounce delay-300">
          <Star className="text-pink-400 w-7 h-7" />
        </div>
        <div className="absolute bottom-20 right-20 animate-pulse delay-500">
          <TrendingUp className="text-rose-400 w-8 h-8" />
        </div>
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Section gauche - Branding */}
        <div className="text-center lg:text-left space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={goBack}
              variant="outline"
              className="border-pink-200 text-pink-600 hover:bg-pink-50"
              type="button"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {content[language].backToHome}
            </Button>
            <Button
              onClick={toggleLanguage}
              variant="outline"
              className="border-pink-200 text-pink-600 hover:bg-pink-50"
              type="button"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === "fr" ? "EN" : "FR"}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-2xl">
                <Zap className="text-white w-8 h-8" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                FoodAds AI
              </h1>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-gray-800">{content[language].revolutionize}</h2>
              <p className="text-lg text-gray-600 whitespace-pre-line">{content[language].features}</p>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className="text-sm text-gray-500 italic">"{content[language].quote}"</p>
          </div>
        </div>

        {/* Section droite - Formulaire */}
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isLogin ? content[language].login : content[language].signup}
            </CardTitle>
            <p className="text-gray-600">
              {isLogin ? content[language].loginSubtitle : content[language].signupSubtitle}
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Input
                    type="text"
                    placeholder={content[language].fullName}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-pink-200 focus:border-pink-400"
                    required
                  />
                </div>
              )}

              <div>
                <Input
                  type="email"
                  placeholder={content[language].email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-pink-200 focus:border-pink-400"
                  required
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder={content[language].password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-pink-200 focus:border-pink-400"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <Input
                    type="password"
                    placeholder={content[language].confirmPassword}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-pink-200 focus:border-pink-400"
                    required
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {isLogin ? content[language].loginButton : content[language].signupButton}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
              >
                {isLogin ? content[language].noAccount : content[language].hasAccount}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
