import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Shield, Phone, Mail, Key, Smartphone, MessageSquare, Lock, CheckCircle, AlertTriangle, Settings, User, Eye, EyeOff, RefreshCw, HelpCircle, Clock, Fingerprint, QrCode } from 'lucide-react'

export default function EnhancedAuth({ onAuthSuccess }) {
  const [authStep, setAuthStep] = useState('login') // login, 2fa, backup, recovery
  const [authMethod, setAuthMethod] = useState('sms') // sms, email, app, backup
  const [showPassword, setShowPassword] = useState(false)
  const [showRecoveryModal, setShowRecoveryModal] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    backupEmail: '',
    securityQuestions: [],
    verificationCode: ''
  })

  const authMethods = [
    {
      id: 'sms',
      name: 'SMS Text Message',
      icon: MessageSquare,
      description: 'Receive code via text message',
      status: 'active',
      lastUsed: '2 hours ago'
    },
    {
      id: 'email',
      name: 'Email Verification',
      icon: Mail,
      description: 'Receive code via email',
      status: 'active',
      lastUsed: '1 day ago'
    },
    {
      id: 'app',
      name: 'Authenticator App',
      icon: Smartphone,
      description: 'Use Google Authenticator or similar',
      status: 'active',
      lastUsed: 'Never'
    },
    {
      id: 'backup',
      name: 'Backup Codes',
      icon: Key,
      description: 'Use one-time backup codes',
      status: 'available',
      lastUsed: 'Never'
    }
  ]

  const securityQuestions = [
    "What was the name of your first pet?",
    "What city were you born in?",
    "What was your mother's maiden name?",
    "What was the name of your first school?",
    "What was your childhood nickname?",
    "What street did you grow up on?",
    "What was the make of your first car?",
    "What is your favorite movie?"
  ]

  const handleLogin = (e) => {
    e.preventDefault()
    // Simulate login process
    setAuthStep('2fa')
  }

  const handleVerification = (e) => {
    e.preventDefault()
    // Simulate verification
    if (formData.verificationCode) {
      onAuthSuccess()
    }
  }

  const handleRecovery = (method) => {
    setAuthMethod(method)
    setAuthStep('2fa')
    setShowRecoveryModal(false)
  }

  const renderLoginForm = () => (
    <Card className="w-full max-w-md mx-auto border-0 shadow-xl">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">Secure Login</CardTitle>
        <CardDescription>Enhanced security with multiple authentication options</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full btn-primary">
            <Lock className="w-4 h-4 mr-2" />
            Continue to Verification
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Button
            variant="link"
            onClick={() => setShowRecoveryModal(true)}
            className="text-blue-600 hover:text-blue-800"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Can't access your account?
          </Button>
        </div>

        {/* Security Features Highlight */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2 flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Enhanced Security Features
          </h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Multiple 2FA options (SMS, Email, App)</li>
            <li>• Backup authentication methods</li>
            <li>• Account recovery assistance</li>
            <li>• Security question fallback</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )

  const render2FAForm = () => (
    <Card className="w-full max-w-md mx-auto border-0 shadow-xl">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <Fingerprint className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">Two-Factor Authentication</CardTitle>
        <CardDescription>
          {authMethod === 'sms' && 'Enter the code sent to your phone'}
          {authMethod === 'email' && 'Enter the code sent to your email'}
          {authMethod === 'app' && 'Enter the code from your authenticator app'}
          {authMethod === 'backup' && 'Enter one of your backup codes'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Authentication Method Selection */}
        <div className="mb-6">
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Choose verification method:</Label>
          <div className="grid grid-cols-2 gap-3">
            {authMethods.map((method) => (
              <Button
                key={method.id}
                variant={authMethod === method.id ? "default" : "outline"}
                className={`p-3 h-auto flex flex-col items-center space-y-2 ${
                  authMethod === method.id ? 'btn-primary' : ''
                }`}
                onClick={() => setAuthMethod(method.id)}
              >
                <method.icon className="w-5 h-5" />
                <span className="text-xs text-center">{method.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Current Method Info */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-blue-900">
                {authMethods.find(m => m.id === authMethod)?.name}
              </p>
              <p className="text-sm text-blue-700">
                {authMethods.find(m => m.id === authMethod)?.description}
              </p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              {authMethods.find(m => m.id === authMethod)?.status}
            </Badge>
          </div>
        </div>

        <form onSubmit={handleVerification} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              placeholder="Enter 6-digit code"
              value={formData.verificationCode}
              onChange={(e) => setFormData(prev => ({ ...prev, verificationCode: e.target.value }))}
              maxLength="6"
              className="text-center text-lg tracking-widest"
              required
            />
          </div>

          <Button type="submit" className="w-full btn-primary">
            <CheckCircle className="w-4 h-4 mr-2" />
            Verify & Continue
          </Button>
        </form>

        <div className="mt-4 flex justify-between text-sm">
          <Button variant="link" className="text-blue-600 hover:text-blue-800">
            <RefreshCw className="w-4 h-4 mr-1" />
            Resend Code
          </Button>
          <Button variant="link" onClick={() => setAuthStep('login')} className="text-gray-600">
            Back to Login
          </Button>
        </div>

        {/* Backup Options */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Having trouble?
          </h4>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAuthMethod('email')}
              className="w-full justify-start"
            >
              <Mail className="w-4 h-4 mr-2" />
              Try email verification instead
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAuthMethod('backup')}
              className="w-full justify-start"
            >
              <Key className="w-4 h-4 mr-2" />
              Use backup codes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRecoveryModal(true)}
              className="w-full justify-start"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Contact support for help
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderRecoveryModal = () => (
    <Dialog open={showRecoveryModal} onOpenChange={setShowRecoveryModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Account Recovery Options
          </DialogTitle>
          <DialogDescription>
            Multiple ways to regain access to your account safely and securely
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Recovery Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover-lift cursor-pointer" onClick={() => handleRecovery('email')}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Recovery</h4>
                    <p className="text-sm text-gray-600">Send code to backup email</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift cursor-pointer" onClick={() => handleRecovery('backup')}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Key className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Backup Codes</h4>
                    <p className="text-sm text-gray-600">Use saved recovery codes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Security Questions</h4>
                    <p className="text-sm text-gray-600">Answer security questions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Admin Override</h4>
                    <p className="text-sm text-gray-600">Contact property manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support Contact */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Need Additional Help?</h4>
            <p className="text-sm text-gray-600 mb-3">
              Our support team is available 24/7 to help you regain access to your account.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Call Support
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                Email Support
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {authStep === 'login' && renderLoginForm()}
        {authStep === '2fa' && render2FAForm()}
        {renderRecoveryModal()}
      </div>
    </div>
  )
}

