import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Building2, Users, Wrench, DollarSign, FileText, MessageSquare, BarChart3, Settings, Home, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react'
import PropertiesPageComponent from './components/PropertiesPage.jsx'
import TenantsPageComponent from './components/TenantsPage.jsx'
import MaintenancePageComponent from './components/MaintenancePage.jsx'
import AIBackgroundChecksComponent from './components/AIBackgroundChecks.jsx'
import ChatSystemComponent from './components/ChatSystem.jsx'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('login')
  const [userType, setUserType] = useState('landlord')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoggedIn(true)
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentView('login')
  }

  if (currentView === 'login') {
    return (
      <div className="min-h-screen animated-gradient flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="glass hover-lift border-0 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to RentEase
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Premium Property Management Platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={userType} onValueChange={setUserType} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="landlord" className="text-sm font-medium">
                    <Building2 className="w-4 h-4 mr-2" />
                    Landlord
                  </TabsTrigger>
                  <TabsTrigger value="tenant" className="text-sm font-medium">
                    <Users className="w-4 h-4 mr-2" />
                    Tenant
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="landlord" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="landlord@example.com"
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors pr-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 btn-primary text-lg font-semibold">
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In as Landlord
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="tenant" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tenant-email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="tenant-email"
                        type="email"
                        placeholder="tenant@example.com"
                        className="h-12 border-2 border-gray-200 focus:border-green-500 transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tenant-password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Input
                          id="tenant-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="h-12 border-2 border-gray-200 focus:border-green-500 transition-colors pr-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 btn-secondary text-lg font-semibold">
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In as Tenant
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full h-12 border-2 hover:bg-gray-50 transition-colors"
                onClick={handleLogin}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign up for free
                  </button>
                </p>
                <p className="text-xs text-gray-500">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center mr-3">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">RentEase</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {userType === 'landlord' ? 'Property Manager' : 'Tenant'}
                </span>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {userType === 'landlord' ? (
            <LandlordDashboard setCurrentView={setCurrentView} />
          ) : (
            <TenantDashboard setCurrentView={setCurrentView} />
          )}
        </main>
      </div>
    )
  }

  // Feature pages will be rendered here
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center mr-3">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">RentEase</h1>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderFeaturePage(currentView)}
      </main>
    </div>
  )
}

function LandlordDashboard({ setCurrentView }) {
  const features = [
    {
      id: 'properties',
      title: 'Properties',
      description: 'Manage your property portfolio',
      icon: Building2,
      color: 'gradient-primary',
      stats: '12 Properties'
    },
    {
      id: 'tenants',
      title: 'Tenants',
      description: 'Tenant management and communication',
      icon: Users,
      color: 'gradient-secondary',
      stats: '28 Tenants'
    },
    {
      id: 'maintenance',
      title: 'Maintenance',
      description: 'Track and manage maintenance requests',
      icon: Wrench,
      color: 'gradient-accent',
      stats: '5 Open Requests'
    },
    {
      id: 'financial',
      title: 'Financial',
      description: 'Revenue, expenses, and financial reports',
      icon: DollarSign,
      color: 'gradient-primary',
      stats: '$24,500 Monthly'
    },
    {
      id: 'screening',
      title: 'Screening',
      description: 'Tenant screening and background checks',
      icon: FileText,
      color: 'gradient-secondary',
      stats: '3 Pending'
    },
    {
      id: 'communication',
      title: 'Communication',
      description: 'Messages and notifications',
      icon: MessageSquare,
      color: 'gradient-accent',
      stats: '7 Unread'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Performance insights and reports',
      icon: BarChart3,
      color: 'gradient-primary',
      stats: '95% Occupancy'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Account and system preferences',
      icon: Settings,
      color: 'gradient-secondary',
      stats: 'Configure'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Landlord Dashboard</h2>
        <p className="text-lg text-gray-600">Manage your properties with ease and efficiency</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Card 
            key={feature.id}
            className="hover-lift cursor-pointer border-0 shadow-lg"
            onClick={() => setCurrentView(feature.id)}
          >
            <CardContent className="p-6">
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
              <div className="text-sm font-medium text-blue-600">{feature.stats}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TenantDashboard({ setCurrentView }) {
  const features = [
    {
      id: 'tenant-home',
      title: 'My Home',
      description: 'Property details and lease information',
      icon: Home,
      color: 'gradient-primary',
      stats: 'Unit 4B'
    },
    {
      id: 'tenant-payments',
      title: 'Payments',
      description: 'Rent payments and payment history',
      icon: DollarSign,
      color: 'gradient-secondary',
      stats: 'Due in 5 days'
    },
    {
      id: 'tenant-maintenance',
      title: 'Maintenance',
      description: 'Submit and track maintenance requests',
      icon: Wrench,
      color: 'gradient-accent',
      stats: '2 Active'
    },
    {
      id: 'tenant-messages',
      title: 'Messages',
      description: 'Communication with property management',
      icon: MessageSquare,
      color: 'gradient-primary',
      stats: '3 Unread'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tenant Portal</h2>
        <p className="text-lg text-gray-600">Everything you need to manage your tenancy</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Card 
            key={feature.id}
            className="hover-lift cursor-pointer border-0 shadow-lg"
            onClick={() => setCurrentView(feature.id)}
          >
            <CardContent className="p-6">
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
              <div className="text-sm font-medium text-blue-600">{feature.stats}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function renderFeaturePage(view) {
  switch (view) {
    case 'properties':
      return <PropertiesPageComponent />
    case 'tenants':
      return <TenantsPageComponent />
    case 'maintenance':
      return <MaintenancePageComponent />
    case 'financial':
      return <FinancialPage />
    case 'screening':
      return <AIBackgroundChecksComponent />
    case 'communication':
      return <ChatSystemComponent userType="landlord" />
    case 'analytics':
      return <AnalyticsPage />
    case 'settings':
      return <SettingsPage />
    default:
      return <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Feature Coming Soon</h2>
        <p className="text-gray-600">This feature is currently under development.</p>
      </div>
  }
}

// Placeholder components for feature pages

function TenantsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Tenant Management</h2>
      <Card className="p-6">
        <p className="text-gray-600">Advanced tenant management features coming soon...</p>
      </Card>
    </div>
  )
}

function MaintenancePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Maintenance Hub</h2>
      <Card className="p-6">
        <p className="text-gray-600">Maintenance tracking and management features coming soon...</p>
      </Card>
    </div>
  )
}

function FinancialPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Financial Dashboard</h2>
      <Card className="p-6">
        <p className="text-gray-600">Financial analytics and reporting features coming soon...</p>
      </Card>
    </div>
  )
}

function ScreeningPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Tenant Screening</h2>
      <Card className="p-6">
        <p className="text-gray-600">AI-powered tenant screening features coming soon...</p>
      </Card>
    </div>
  )
}

function CommunicationPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Communication Center</h2>
      <Card className="p-6">
        <p className="text-gray-600">Advanced communication features coming soon...</p>
      </Card>
    </div>
  )
}

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
      <Card className="p-6">
        <p className="text-gray-600">Comprehensive analytics and insights coming soon...</p>
      </Card>
    </div>
  )
}

function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
      <Card className="p-6">
        <p className="text-gray-600">Account and system settings coming soon...</p>
      </Card>
    </div>
  )
}

export default App

