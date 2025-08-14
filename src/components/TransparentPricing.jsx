import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { DollarSign, TrendingUp, PieChart, Calculator, CheckCircle, AlertCircle, Info, Download, Calendar, CreditCard, Receipt, Zap, Shield, Star, Users, Building, FileText, Eye, HelpCircle } from 'lucide-react'

export default function TransparentPricing() {
  const [selectedPlan, setSelectedPlan] = useState('professional')
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [showCalculator, setShowCalculator] = useState(false)
  const [properties, setProperties] = useState(5)
  const [units, setUnits] = useState(25)

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small landlords',
      monthlyPrice: 29,
      yearlyPrice: 290,
      maxProperties: 3,
      maxUnits: 15,
      features: [
        'Property & tenant management',
        'Basic maintenance tracking',
        'Rent collection',
        'Basic reporting',
        'Email support'
      ],
      color: 'from-blue-400 to-blue-600',
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Most popular for growing portfolios',
      monthlyPrice: 79,
      yearlyPrice: 790,
      maxProperties: 15,
      maxUnits: 100,
      features: [
        'Everything in Starter',
        'AI background checks',
        'Advanced analytics',
        'P2P instant messaging',
        'Multi-platform listing',
        'Priority support',
        'Custom branding'
      ],
      color: 'from-purple-400 to-purple-600',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large property management companies',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      maxProperties: 'Unlimited',
      maxUnits: 'Unlimited',
      features: [
        'Everything in Professional',
        'White-label solution',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        '24/7 phone support',
        'Advanced security features'
      ],
      color: 'from-green-400 to-green-600',
      popular: false
    }
  ]

  const feeBreakdown = {
    monthly: {
      subscription: 79,
      processing: 2.9, // percentage
      additionalFeatures: {
        'AI Background Checks': 15,
        'Premium Support': 10,
        'Custom Branding': 25,
        'API Access': 50
      }
    },
    yearly: {
      subscription: 790,
      processing: 2.9,
      additionalFeatures: {
        'AI Background Checks': 150,
        'Premium Support': 100,
        'Custom Branding': 250,
        'API Access': 500
      },
      discount: 158 // 2 months free
    }
  }

  const competitorComparison = [
    {
      feature: 'Base Monthly Cost',
      rentease: '$79',
      appfolio: '$280+',
      buildium: '$50+',
      notes: 'RentEase offers premium features at 70% less cost'
    },
    {
      feature: 'Setup Fees',
      rentease: '$0',
      appfolio: '$500',
      buildium: '$300',
      notes: 'No hidden setup or onboarding fees'
    },
    {
      feature: 'Transaction Fees',
      rentease: '2.9%',
      appfolio: '3.5%',
      buildium: '3.2%',
      notes: 'Lower processing fees save money on every transaction'
    },
    {
      feature: 'AI Background Checks',
      rentease: 'Included',
      appfolio: '$35 each',
      buildium: '$30 each',
      notes: 'Unlimited AI-powered screening included'
    },
    {
      feature: 'Support Response',
      rentease: '< 2 hours',
      appfolio: '24-48 hours',
      buildium: '12-24 hours',
      notes: 'Fastest support response in the industry'
    }
  ]

  const calculateTotal = () => {
    const plan = pricingPlans.find(p => p.id === selectedPlan)
    const basePrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
    const savings = billingCycle === 'yearly' ? feeBreakdown.yearly.discount : 0
    return { basePrice, savings, total: basePrice - savings }
  }

  const renderPricingCard = (plan) => {
    const isSelected = selectedPlan === plan.id
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
    const savings = billingCycle === 'yearly' ? Math.round((plan.monthlyPrice * 12 - plan.yearlyPrice) / 12) : 0

    return (
      <Card 
        key={plan.id}
        className={`relative cursor-pointer transition-all duration-300 hover-lift ${
          isSelected ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:shadow-lg'
        } ${plan.popular ? 'border-purple-200' : ''}`}
        onClick={() => setSelectedPlan(plan.id)}
      >
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
              <Star className="w-3 h-3 mr-1" />
              Most Popular
            </Badge>
          </div>
        )}
        
        <CardHeader className="text-center pb-4">
          <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Building className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
          <CardDescription>{plan.description}</CardDescription>
          
          <div className="mt-4">
            <div className="flex items-baseline justify-center">
              <span className="text-3xl font-bold text-gray-900">${price}</span>
              <span className="text-gray-600 ml-1">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
            {savings > 0 && (
              <div className="text-sm text-green-600 font-medium">
                Save ${savings}/month with yearly billing
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Properties:</span>
              <span className="font-medium">{plan.maxProperties}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Units:</span>
              <span className="font-medium">{plan.maxUnits}</span>
            </div>
          </div>
          
          <ul className="space-y-2 mb-6">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <Button 
            className={`w-full ${isSelected ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {isSelected ? 'Selected Plan' : 'Select Plan'}
          </Button>
        </CardContent>
      </Card>
    )
  }

  const renderFeeBreakdown = () => {
    const { basePrice, savings, total } = calculateTotal()
    
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-600" />
            Transparent Fee Breakdown
          </CardTitle>
          <CardDescription>
            No hidden fees, no surprises. See exactly what you're paying for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">Base Subscription</span>
              <span className="text-lg font-bold">${basePrice}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Processing Fee</span>
              <span className="text-sm">2.9% per transaction</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Setup Fee</span>
              <span className="text-green-600 font-medium">$0 (FREE)</span>
            </div>
            
            {savings > 0 && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-green-600">Yearly Discount</span>
                <span className="text-green-600 font-medium">-${savings}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-3 bg-blue-50 px-4 rounded-lg">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-bold text-blue-600">${total}</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Price Lock Guarantee
            </h4>
            <p className="text-sm text-green-700">
              Your price is locked for 12 months. No surprise increases or hidden fees.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderCompetitorComparison = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <PieChart className="w-5 h-5 mr-2 text-purple-600" />
          Competitor Comparison
        </CardTitle>
        <CardDescription>
          See how RentEase compares to other property management platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Feature</th>
                <th className="text-center py-3 px-2 bg-blue-50 rounded-t-lg">
                  <div className="flex items-center justify-center">
                    <Zap className="w-4 h-4 mr-1 text-blue-600" />
                    RentEase
                  </div>
                </th>
                <th className="text-center py-3 px-2">AppFolio</th>
                <th className="text-center py-3 px-2">Buildium</th>
              </tr>
            </thead>
            <tbody>
              {competitorComparison.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium">{item.feature}</td>
                  <td className="py-3 px-2 text-center bg-blue-50">
                    <span className="font-bold text-blue-600">{item.rentease}</span>
                  </td>
                  <td className="py-3 px-2 text-center text-gray-600">{item.appfolio}</td>
                  <td className="py-3 px-2 text-center text-gray-600">{item.buildium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Why Choose RentEase?</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 70% lower cost than competitors</li>
            <li>• No setup fees or hidden charges</li>
            <li>• AI-powered features included</li>
            <li>• Fastest support response times</li>
            <li>• Modern, intuitive interface</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No hidden fees, no surprises. Choose the plan that fits your portfolio size and get all the features you need to succeed.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-lg shadow-sm border">
            <Button
              variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
              onClick={() => setBillingCycle('monthly')}
              className="px-6"
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
              onClick={() => setBillingCycle('yearly')}
              className="px-6"
            >
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-800">Save 20%</Badge>
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {pricingPlans.map(renderPricingCard)}
        </div>

        {/* Fee Breakdown and Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {renderFeeBreakdown()}
          {renderCompetitorComparison()}
        </div>

        {/* Additional Features */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              What's Included in Every Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">Security First</h4>
                <p className="text-sm text-gray-600">Bank-level encryption and security</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">24/7 Support</h4>
                <p className="text-sm text-gray-600">Always here when you need us</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-2">Regular Updates</h4>
                <p className="text-sm text-gray-600">New features added monthly</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold mb-2">No Contracts</h4>
                <p className="text-sm text-gray-600">Cancel anytime, no penalties</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-6 opacity-90">
                Join thousands of property managers who trust RentEase
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Schedule Demo
                </Button>
              </div>
              <p className="text-sm mt-4 opacity-75">
                14-day free trial • No credit card required • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

