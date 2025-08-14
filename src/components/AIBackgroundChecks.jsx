import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Shield, Plus, Search, Filter, User, FileText, AlertTriangle, CheckCircle, Clock, Star, Eye, Download, Zap, Brain, TrendingUp, BarChart3, Users } from 'lucide-react'

export default function AIBackgroundChecks() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showRunModal, setShowRunModal] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState(null)

  const backgroundChecks = [
    {
      id: 1,
      applicantName: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "(555) 123-4567",
      property: "Sunset Apartments",
      unit: "4B",
      dateRequested: "2024-01-15",
      status: "Completed",
      overallScore: 92,
      creditScore: 785,
      criminalRecord: "Clean",
      employmentVerification: "Verified",
      incomeVerification: "Verified",
      rentalHistory: "Excellent",
      aiRiskAssessment: "Low Risk",
      aiInsights: [
        "Stable employment history with consistent income",
        "Excellent credit management with no late payments",
        "Strong rental references from previous landlords",
        "No criminal background concerns"
      ],
      redFlags: [],
      recommendation: "Highly Recommended",
      processingTime: "2.3 minutes",
      avatar: "👩‍💼"
    },
    {
      id: 2,
      applicantName: "Michael Chen",
      email: "m.chen@email.com",
      phone: "(555) 234-5678",
      property: "Oak Street Townhomes",
      unit: "12A",
      dateRequested: "2024-01-14",
      status: "Completed",
      overallScore: 88,
      creditScore: 742,
      criminalRecord: "Clean",
      employmentVerification: "Verified",
      incomeVerification: "Verified",
      rentalHistory: "Good",
      aiRiskAssessment: "Low Risk",
      aiInsights: [
        "Tech professional with high income stability",
        "Good credit history with minor fluctuations",
        "Previous rental experience with positive references",
        "No significant background concerns"
      ],
      redFlags: ["One late payment in past 12 months"],
      recommendation: "Recommended",
      processingTime: "1.8 minutes",
      avatar: "👨‍💻"
    },
    {
      id: 3,
      applicantName: "Emily Rodriguez",
      email: "emily.r@email.com",
      phone: "(555) 345-6789",
      property: "Riverside Condos",
      unit: "8C",
      dateRequested: "2024-01-13",
      status: "In Progress",
      overallScore: null,
      creditScore: null,
      criminalRecord: "Pending",
      employmentVerification: "In Progress",
      incomeVerification: "Pending",
      rentalHistory: "Pending",
      aiRiskAssessment: "Analyzing...",
      aiInsights: [],
      redFlags: [],
      recommendation: "Pending",
      processingTime: "Processing...",
      avatar: "👩‍🎨"
    },
    {
      id: 4,
      applicantName: "David Thompson",
      email: "d.thompson@email.com",
      phone: "(555) 456-7890",
      property: "Garden Villa",
      unit: "1",
      dateRequested: "2024-01-12",
      status: "Completed",
      overallScore: 76,
      creditScore: 658,
      criminalRecord: "Minor Traffic Violations",
      employmentVerification: "Verified",
      incomeVerification: "Verified",
      rentalHistory: "Fair",
      aiRiskAssessment: "Medium Risk",
      aiInsights: [
        "Stable medical profession with good income",
        "Credit score below optimal range but improving",
        "Some rental history gaps requiring attention",
        "Minor traffic violations, no serious concerns"
      ],
      redFlags: ["Credit utilization above 70%", "Gap in rental history (6 months)"],
      recommendation: "Conditional Approval",
      processingTime: "3.1 minutes",
      avatar: "👨‍⚕️"
    }
  ]

  const stats = [
    {
      title: "Total Checks Run",
      value: "156",
      change: "+23 this month",
      icon: Shield,
      color: "gradient-primary"
    },
    {
      title: "AI Processing Speed",
      value: "2.1 min",
      change: "45% faster than manual",
      icon: Zap,
      color: "gradient-secondary"
    },
    {
      title: "Accuracy Rate",
      value: "98.7%",
      change: "+1.2% this quarter",
      icon: Brain,
      color: "gradient-accent"
    },
    {
      title: "Risk Prevention",
      value: "$47K",
      change: "Potential losses avoided",
      icon: TrendingUp,
      color: "gradient-primary"
    }
  ]

  const filteredChecks = backgroundChecks.filter(check => {
    const matchesSearch = check.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         check.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         check.property.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || check.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Failed': return 'bg-red-100 text-red-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low Risk': return 'text-green-600'
      case 'Medium Risk': return 'text-yellow-600'
      case 'High Risk': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'Highly Recommended': return 'bg-green-100 text-green-800'
      case 'Recommended': return 'bg-blue-100 text-blue-800'
      case 'Conditional Approval': return 'bg-yellow-100 text-yellow-800'
      case 'Not Recommended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Background Checks</h1>
          <p className="text-lg text-gray-600">Advanced AI-powered tenant screening and risk assessment</p>
        </div>
        <Dialog open={showRunModal} onOpenChange={setShowRunModal}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-5 h-5 mr-2" />
              Run New Check
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Run AI Background Check</DialogTitle>
              <DialogDescription>
                Start a comprehensive AI-powered background check for a new applicant
              </DialogDescription>
            </DialogHeader>
            <RunBackgroundCheckForm onClose={() => setShowRunModal(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover-lift border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Features Highlight */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Brain className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <h3 className="text-xl font-bold text-gray-900">AI-Powered Intelligence</h3>
              <p className="text-gray-600">Advanced machine learning algorithms for comprehensive risk assessment</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Lightning Fast</h4>
              <p className="text-sm text-gray-600">Complete checks in under 3 minutes</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">99% Accurate</h4>
              <p className="text-sm text-gray-600">Industry-leading accuracy rates</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Smart Insights</h4>
              <p className="text-sm text-gray-600">AI-generated risk analysis</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by applicant name, email, or property..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Background Checks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredChecks.map((check) => (
          <Card key={check.id} className="hover-lift border-0 shadow-lg overflow-hidden">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center text-2xl mr-4">
                    {check.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{check.applicantName}</h3>
                    <p className="text-sm text-gray-600">{check.email}</p>
                    <p className="text-sm text-gray-600">{check.phone}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(check.status)}>
                  {check.status}
                </Badge>
              </div>

              {/* Property Info */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Property:</strong> {check.property} - Unit {check.unit}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date Requested:</strong> {new Date(check.dateRequested).toLocaleDateString()}
                </p>
              </div>

              {/* Overall Score */}
              {check.overallScore && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Score</span>
                    <span className="text-lg font-bold text-blue-600">{check.overallScore}/100</span>
                  </div>
                  <Progress value={check.overallScore} className="h-3" />
                </div>
              )}

              {/* Key Metrics */}
              {check.status === 'Completed' && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Credit Score</p>
                    <p className="text-lg font-bold text-green-600">{check.creditScore}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Processing Time</p>
                    <p className="text-lg font-bold text-blue-600">{check.processingTime}</p>
                  </div>
                </div>
              )}

              {/* AI Risk Assessment */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">AI Risk Assessment</span>
                  <span className={`text-sm font-bold ${getRiskColor(check.aiRiskAssessment)}`}>
                    {check.aiRiskAssessment}
                  </span>
                </div>
              </div>

              {/* Recommendation */}
              {check.recommendation !== 'Pending' && (
                <div className="mb-4">
                  <Badge className={getRecommendationColor(check.recommendation)}>
                    {check.recommendation}
                  </Badge>
                </div>
              )}

              {/* Red Flags */}
              {check.redFlags.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Red Flags</p>
                  <div className="space-y-1">
                    {check.redFlags.map((flag, index) => (
                      <div key={index} className="flex items-center text-sm text-red-600">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <span>{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Insights Preview */}
              {check.aiInsights.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">AI Insights</p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      {check.aiInsights[0]}
                    </p>
                    {check.aiInsights.length > 1 && (
                      <p className="text-xs text-blue-600 mt-1">
                        +{check.aiInsights.length - 1} more insights
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setSelectedApplicant(check)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Full Report
                </Button>
                {check.status === 'Completed' && (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    Download PDF
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredChecks.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Background Checks Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? "Try adjusting your search or filter criteria"
                : "Get started by running your first AI background check"
              }
            </p>
            <Button className="btn-primary" onClick={() => setShowRunModal(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Run Your First Check
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Detailed Report Modal */}
      {selectedApplicant && (
        <DetailedReportModal 
          applicant={selectedApplicant} 
          onClose={() => setSelectedApplicant(null)} 
        />
      )}
    </div>
  )
}

function RunBackgroundCheckForm({ onClose }) {
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    property: '',
    unit: '',
    ssn: '',
    dateOfBirth: '',
    currentAddress: '',
    employerName: '',
    annualIncome: '',
    consentGiven: false
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Background check data:', formData)
    onClose()
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="applicantName">Full Name</Label>
          <Input
            id="applicantName"
            placeholder="e.g., Sarah Johnson"
            value={formData.applicantName}
            onChange={(e) => handleChange('applicantName', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="sarah@example.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="property">Property</Label>
          <Select value={formData.property} onValueChange={(value) => handleChange('property', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sunset">Sunset Apartments</SelectItem>
              <SelectItem value="oak">Oak Street Townhomes</SelectItem>
              <SelectItem value="riverside">Riverside Condos</SelectItem>
              <SelectItem value="garden">Garden Villa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="unit">Unit Number</Label>
          <Input
            id="unit"
            placeholder="4B"
            value={formData.unit}
            onChange={(e) => handleChange('unit', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="annualIncome">Annual Income ($)</Label>
          <Input
            id="annualIncome"
            type="number"
            placeholder="75000"
            value={formData.annualIncome}
            onChange={(e) => handleChange('annualIncome', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentAddress">Current Address</Label>
        <Input
          id="currentAddress"
          placeholder="123 Current St, City, State, ZIP"
          value={formData.currentAddress}
          onChange={(e) => handleChange('currentAddress', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="employerName">Employer Name</Label>
        <Input
          id="employerName"
          placeholder="e.g., Tech Corp Inc."
          value={formData.employerName}
          onChange={(e) => handleChange('employerName', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ssn">Social Security Number (Last 4 digits)</Label>
        <Input
          id="ssn"
          placeholder="1234"
          maxLength="4"
          value={formData.ssn}
          onChange={(e) => handleChange('ssn', e.target.value)}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="consent"
          checked={formData.consentGiven}
          onChange={(e) => handleChange('consentGiven', e.target.checked)}
          required
        />
        <Label htmlFor="consent" className="text-sm">
          I confirm that the applicant has provided written consent for this background check
        </Label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="btn-primary flex-1">
          <Shield className="w-4 h-4 mr-2" />
          Run AI Background Check
        </Button>
      </div>
    </form>
  )
}

function DetailedReportModal({ applicant, onClose }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detailed Background Report - {applicant.applicantName}</DialogTitle>
          <DialogDescription>
            Comprehensive AI-powered background check results
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Overall Score</h3>
            <div className="text-6xl font-bold text-blue-600 mb-2">{applicant.overallScore}/100</div>
            <Badge className={getRecommendationColor(applicant.recommendation)}>
              {applicant.recommendation}
            </Badge>
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Credit Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Credit Score:</span>
                    <span className="font-bold text-green-600">{applicant.creditScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Credit History:</span>
                    <span className="font-medium">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Debt-to-Income:</span>
                    <span className="font-medium">23%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Background Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Criminal Record:</span>
                    <span className="font-bold text-green-600">{applicant.criminalRecord}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Employment:</span>
                    <span className="font-bold text-green-600">{applicant.employmentVerification}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Income:</span>
                    <span className="font-bold text-green-600">{applicant.incomeVerification}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-600" />
                AI Insights & Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {applicant.aiInsights.map((insight, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-sm">{insight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Red Flags */}
          {applicant.redFlags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-red-600">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Areas of Concern
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {applicant.redFlags.map((flag, index) => (
                    <div key={index} className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                      <span className="text-sm">{flag}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          <Button className="btn-primary flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download Full Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

