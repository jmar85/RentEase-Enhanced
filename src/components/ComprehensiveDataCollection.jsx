import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { User, FileText, CreditCard, Briefcase, Home, Phone, Mail, MapPin, Calendar, Upload, CheckCircle, AlertTriangle, Info, Plus, X, Eye, Download, Shield, Clock, Star, Users, Building } from 'lucide-react'

export default function ComprehensiveDataCollection() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      ssn: '',
      maritalStatus: '',
      dependents: 0
    },
    employment: {
      currentEmployer: '',
      position: '',
      employmentType: '',
      startDate: '',
      monthlyIncome: '',
      additionalIncome: '',
      previousEmployers: []
    },
    financial: {
      bankName: '',
      accountType: '',
      monthlyExpenses: '',
      creditScore: '',
      bankruptcyHistory: false,
      collections: false,
      studentLoans: '',
      creditCards: []
    },
    rental: {
      currentAddress: '',
      currentLandlord: '',
      landlordPhone: '',
      rentAmount: '',
      moveInDate: '',
      moveOutDate: '',
      reasonForLeaving: '',
      previousAddresses: []
    },
    references: {
      personal: [],
      professional: [],
      emergency: []
    },
    documents: {
      idDocument: null,
      incomeProof: null,
      bankStatements: null,
      references: null,
      additionalDocs: []
    }
  })

  const [missingData, setMissingData] = useState([])
  const [showManualInput, setShowManualInput] = useState(false)
  const [completionPercentage, setCompletionPercentage] = useState(15)

  const steps = [
    { id: 1, title: 'Personal Information', icon: User, description: 'Basic personal details' },
    { id: 2, title: 'Employment History', icon: Briefcase, description: 'Current and previous employment' },
    { id: 3, title: 'Financial Information', icon: CreditCard, description: 'Income, expenses, and credit' },
    { id: 4, title: 'Rental History', icon: Home, description: 'Previous rental experiences' },
    { id: 5, title: 'References', icon: Users, description: 'Personal and professional references' },
    { id: 6, title: 'Document Upload', icon: FileText, description: 'Supporting documents' },
    { id: 7, title: 'Review & Submit', icon: CheckCircle, description: 'Final review and submission' }
  ]

  const creditScoreRanges = [
    { range: '300-579', label: 'Poor', color: 'bg-red-500' },
    { range: '580-669', label: 'Fair', color: 'bg-yellow-500' },
    { range: '670-739', label: 'Good', color: 'bg-blue-500' },
    { range: '740-799', label: 'Very Good', color: 'bg-green-500' },
    { range: '800-850', label: 'Excellent', color: 'bg-purple-500' }
  ]

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
    updateCompletionPercentage()
  }

  const addArrayItem = (section, field, item) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], item]
      }
    }))
  }

  const removeArrayItem = (section, field, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_, i) => i !== index)
      }
    }))
  }

  const updateCompletionPercentage = () => {
    // Calculate completion based on filled fields
    let totalFields = 0
    let filledFields = 0
    
    Object.keys(formData).forEach(section => {
      if (typeof formData[section] === 'object' && !Array.isArray(formData[section])) {
        Object.keys(formData[section]).forEach(field => {
          totalFields++
          if (formData[section][field] && formData[section][field] !== '' && formData[section][field] !== 0) {
            filledFields++
          }
        })
      }
    })
    
    const percentage = Math.round((filledFields / totalFields) * 100)
    setCompletionPercentage(percentage)
  }

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.personal.firstName}
            onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
            placeholder="Enter first name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.personal.lastName}
            onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
            placeholder="Enter last name"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.personal.email}
            onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.personal.phone}
            onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
            placeholder="(555) 123-4567"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.personal.dateOfBirth}
            onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ssn">Social Security Number *</Label>
          <Input
            id="ssn"
            value={formData.personal.ssn}
            onChange={(e) => handleInputChange('personal', 'ssn', e.target.value)}
            placeholder="XXX-XX-XXXX"
            maxLength="11"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="maritalStatus">Marital Status</Label>
          <Select value={formData.personal.maritalStatus} onValueChange={(value) => handleInputChange('personal', 'maritalStatus', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select marital status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
              <SelectItem value="separated">Separated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dependents">Number of Dependents</Label>
          <Input
            id="dependents"
            type="number"
            min="0"
            value={formData.personal.dependents}
            onChange={(e) => handleInputChange('personal', 'dependents', parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>
      </div>
    </div>
  )

  const renderEmploymentHistory = () => (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
          <Briefcase className="w-4 h-4 mr-2" />
          Current Employment
        </h4>
        <p className="text-sm text-blue-700">
          Provide details about your current job. This helps us verify your income and employment stability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="currentEmployer">Current Employer *</Label>
          <Input
            id="currentEmployer"
            value={formData.employment.currentEmployer}
            onChange={(e) => handleInputChange('employment', 'currentEmployer', e.target.value)}
            placeholder="Company name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Job Title/Position *</Label>
          <Input
            id="position"
            value={formData.employment.position}
            onChange={(e) => handleInputChange('employment', 'position', e.target.value)}
            placeholder="Your job title"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="employmentType">Employment Type *</Label>
          <Select value={formData.employment.employmentType} onValueChange={(value) => handleInputChange('employment', 'employmentType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="self-employed">Self-employed</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="student">Student</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate">Employment Start Date *</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.employment.startDate}
            onChange={(e) => handleInputChange('employment', 'startDate', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="monthlyIncome">Monthly Gross Income *</Label>
          <Input
            id="monthlyIncome"
            type="number"
            value={formData.employment.monthlyIncome}
            onChange={(e) => handleInputChange('employment', 'monthlyIncome', e.target.value)}
            placeholder="5000"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="additionalIncome">Additional Monthly Income</Label>
          <Input
            id="additionalIncome"
            type="number"
            value={formData.employment.additionalIncome}
            onChange={(e) => handleInputChange('employment', 'additionalIncome', e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      {/* Previous Employers Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-900">Previous Employers (Last 2 years)</h4>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addArrayItem('employment', 'previousEmployers', {
              company: '',
              position: '',
              startDate: '',
              endDate: '',
              reason: ''
            })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Previous Employer
          </Button>
        </div>

        {formData.employment.previousEmployers.map((employer, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h5 className="font-medium">Previous Employer #{index + 1}</h5>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeArrayItem('employment', 'previousEmployers', index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Company name"
                value={employer.company}
                onChange={(e) => {
                  const updated = [...formData.employment.previousEmployers]
                  updated[index].company = e.target.value
                  handleInputChange('employment', 'previousEmployers', updated)
                }}
              />
              <Input
                placeholder="Position"
                value={employer.position}
                onChange={(e) => {
                  const updated = [...formData.employment.previousEmployers]
                  updated[index].position = e.target.value
                  handleInputChange('employment', 'previousEmployers', updated)
                }}
              />
              <Input
                type="date"
                placeholder="Start date"
                value={employer.startDate}
                onChange={(e) => {
                  const updated = [...formData.employment.previousEmployers]
                  updated[index].startDate = e.target.value
                  handleInputChange('employment', 'previousEmployers', updated)
                }}
              />
              <Input
                type="date"
                placeholder="End date"
                value={employer.endDate}
                onChange={(e) => {
                  const updated = [...formData.employment.previousEmployers]
                  updated[index].endDate = e.target.value
                  handleInputChange('employment', 'previousEmployers', updated)
                }}
              />
            </div>
            <div className="mt-4">
              <Textarea
                placeholder="Reason for leaving"
                value={employer.reason}
                onChange={(e) => {
                  const updated = [...formData.employment.previousEmployers]
                  updated[index].reason = e.target.value
                  handleInputChange('employment', 'previousEmployers', updated)
                }}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderFinancialInfo = () => (
    <div className="space-y-6">
      <div className="p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold text-green-900 mb-2 flex items-center">
          <CreditCard className="w-4 h-4 mr-2" />
          Financial Information
        </h4>
        <p className="text-sm text-green-700">
          This information helps us assess your financial stability and ability to pay rent consistently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bankName">Primary Bank *</Label>
          <Input
            id="bankName"
            value={formData.financial.bankName}
            onChange={(e) => handleInputChange('financial', 'bankName', e.target.value)}
            placeholder="Bank name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accountType">Account Type *</Label>
          <Select value={formData.financial.accountType} onValueChange={(value) => handleInputChange('financial', 'accountType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="checking">Checking</SelectItem>
              <SelectItem value="savings">Savings</SelectItem>
              <SelectItem value="both">Both Checking & Savings</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="monthlyExpenses">Monthly Expenses *</Label>
          <Input
            id="monthlyExpenses"
            type="number"
            value={formData.financial.monthlyExpenses}
            onChange={(e) => handleInputChange('financial', 'monthlyExpenses', e.target.value)}
            placeholder="3000"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="creditScore">Credit Score (if known)</Label>
          <Input
            id="creditScore"
            type="number"
            min="300"
            max="850"
            value={formData.financial.creditScore}
            onChange={(e) => handleInputChange('financial', 'creditScore', e.target.value)}
            placeholder="750"
          />
        </div>
      </div>

      {/* Credit Score Guide */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-3">Credit Score Ranges</h5>
        <div className="space-y-2">
          {creditScoreRanges.map((range, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded ${range.color}`}></div>
              <span className="text-sm font-medium">{range.range}</span>
              <span className="text-sm text-gray-600">{range.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Financial History</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="bankruptcyHistory"
              checked={formData.financial.bankruptcyHistory}
              onCheckedChange={(checked) => handleInputChange('financial', 'bankruptcyHistory', checked)}
            />
            <Label htmlFor="bankruptcyHistory">I have filed for bankruptcy in the past 7 years</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="collections"
              checked={formData.financial.collections}
              onCheckedChange={(checked) => handleInputChange('financial', 'collections', checked)}
            />
            <Label htmlFor="collections">I have accounts in collections</Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="studentLoans">Student Loan Balance</Label>
        <Input
          id="studentLoans"
          type="number"
          value={formData.financial.studentLoans}
          onChange={(e) => handleInputChange('financial', 'studentLoans', e.target.value)}
          placeholder="25000"
        />
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo()
      case 2:
        return renderEmploymentHistory()
      case 3:
        return renderFinancialInfo()
      case 4:
        return <div className="text-center py-8">Rental History form content...</div>
      case 5:
        return <div className="text-center py-8">References form content...</div>
      case 6:
        return <div className="text-center py-8">Document upload content...</div>
      case 7:
        return <div className="text-center py-8">Review and submit content...</div>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Comprehensive Application
          </h1>
          <p className="text-lg text-gray-600">
            Complete your rental application with our comprehensive data collection system
          </p>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{completionPercentage}% Complete</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </div>

        {/* Step Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {steps.map((step) => (
              <Button
                key={step.id}
                variant={currentStep === step.id ? "default" : currentStep > step.id ? "secondary" : "outline"}
                size="sm"
                onClick={() => setCurrentStep(step.id)}
                className="flex items-center space-x-2"
              >
                <step.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{step.title}</span>
                <span className="sm:hidden">{step.id}</span>
              </Button>
            ))}
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {steps[currentStep - 1]?.title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep - 1]?.description}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <Card className="mb-8">
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowManualInput(true)}
            >
              <Info className="w-4 h-4 mr-2" />
              Manual Input Help
            </Button>
            
            <Button
              onClick={() => setCurrentStep(Math.min(7, currentStep + 1))}
              disabled={currentStep === 7}
              className="btn-primary"
            >
              {currentStep === 7 ? 'Submit Application' : 'Next'}
            </Button>
          </div>
        </div>

        {/* Manual Input Help Modal */}
        <Dialog open={showManualInput} onOpenChange={setShowManualInput}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                Manual Input Assistance
              </DialogTitle>
              <DialogDescription>
                Can't find your information automatically? We can help you input it manually.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Missing Information?</h4>
                <p className="text-sm text-blue-700 mb-3">
                  If our system can't automatically retrieve your information, you can manually enter:
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Employment history and income verification</li>
                  <li>• Previous rental addresses and landlord contacts</li>
                  <li>• Bank account and financial information</li>
                  <li>• Personal and professional references</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Data Verification</h4>
                <p className="text-sm text-green-700">
                  All manually entered information will be verified through our comprehensive background check process.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

