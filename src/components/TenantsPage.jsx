import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Users, Plus, Search, Filter, MapPin, Phone, Mail, Calendar, DollarSign, Star, Eye, Edit, Trash2, MessageSquare, FileText, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react'

export default function TenantsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const tenants = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "(555) 123-4567",
      property: "Sunset Apartments",
      unit: "4B",
      leaseStart: "2023-06-01",
      leaseEnd: "2024-05-31",
      monthlyRent: 2500,
      paymentStatus: "Current",
      rating: 4.8,
      avatar: "👩‍💼",
      occupation: "Marketing Manager",
      emergencyContact: "John Johnson - (555) 987-6543",
      totalPaid: 22500,
      monthsAsResident: 9,
      maintenanceRequests: 2,
      communicationScore: 95,
      notes: "Excellent tenant, always pays on time"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "(555) 234-5678",
      property: "Oak Street Townhomes",
      unit: "12A",
      leaseStart: "2023-03-15",
      leaseEnd: "2024-03-14",
      monthlyRent: 3200,
      paymentStatus: "Current",
      rating: 4.6,
      avatar: "👨‍💻",
      occupation: "Software Engineer",
      emergencyContact: "Lisa Chen - (555) 876-5432",
      totalPaid: 28800,
      monthsAsResident: 12,
      maintenanceRequests: 1,
      communicationScore: 88,
      notes: "Tech professional, very responsible"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      phone: "(555) 345-6789",
      property: "Riverside Condos",
      unit: "8C",
      leaseStart: "2023-09-01",
      leaseEnd: "2024-08-31",
      monthlyRent: 2800,
      paymentStatus: "Late",
      rating: 4.2,
      avatar: "👩‍🎨",
      occupation: "Graphic Designer",
      emergencyContact: "Carlos Rodriguez - (555) 765-4321",
      totalPaid: 14000,
      monthsAsResident: 5,
      maintenanceRequests: 3,
      communicationScore: 72,
      notes: "Creative professional, occasional late payments"
    },
    {
      id: 4,
      name: "David Thompson",
      email: "d.thompson@email.com",
      phone: "(555) 456-7890",
      property: "Garden Villa",
      unit: "1",
      leaseStart: "2023-01-01",
      leaseEnd: "2023-12-31",
      monthlyRent: 4500,
      paymentStatus: "Current",
      rating: 4.9,
      avatar: "👨‍⚕️",
      occupation: "Doctor",
      emergencyContact: "Susan Thompson - (555) 654-3210",
      totalPaid: 54000,
      monthsAsResident: 15,
      maintenanceRequests: 0,
      communicationScore: 98,
      notes: "Model tenant, excellent communication"
    }
  ]

  const stats = [
    {
      title: "Total Tenants",
      value: "28",
      change: "+3 this month",
      icon: Users,
      color: "gradient-primary"
    },
    {
      title: "Current Tenants",
      value: "26",
      change: "93% occupancy",
      icon: CheckCircle,
      color: "gradient-secondary"
    },
    {
      title: "Late Payments",
      value: "2",
      change: "-1 from last month",
      icon: AlertCircle,
      color: "gradient-accent"
    },
    {
      title: "Avg. Rating",
      value: "4.7",
      change: "+0.2 this quarter",
      icon: Star,
      color: "gradient-primary"
    }
  ]

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.property.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'current' && tenant.paymentStatus === 'Current') ||
                         (filterStatus === 'late' && tenant.paymentStatus === 'Late')
    return matchesSearch && matchesFilter
  })

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Current': return 'bg-green-100 text-green-800'
      case 'Late': return 'bg-red-100 text-red-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCommunicationScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-blue-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tenant Management</h1>
          <p className="text-lg text-gray-600">Manage your tenants with comprehensive tools and insights</p>
        </div>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-5 h-5 mr-2" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Tenant</DialogTitle>
              <DialogDescription>
                Enter the details for your new tenant
              </DialogDescription>
            </DialogHeader>
            <AddTenantForm onClose={() => setShowAddModal(false)} />
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

      {/* Search and Filter */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search tenants by name, email, or property..."
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
                  <SelectItem value="all">All Tenants</SelectItem>
                  <SelectItem value="current">Current Payments</SelectItem>
                  <SelectItem value="late">Late Payments</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tenants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id} className="hover-lift border-0 shadow-lg overflow-hidden">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center text-2xl mr-4">
                    {tenant.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{tenant.name}</h3>
                    <p className="text-sm text-gray-600">{tenant.occupation}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{tenant.rating}</span>
                    </div>
                  </div>
                </div>
                <Badge className={getPaymentStatusColor(tenant.paymentStatus)}>
                  {tenant.paymentStatus}
                </Badge>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{tenant.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{tenant.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{tenant.property} - Unit {tenant.unit}</span>
                </div>
              </div>

              {/* Lease Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm font-medium">Monthly Rent</span>
                  </div>
                  <p className="text-lg font-bold text-green-600">${tenant.monthlyRent.toLocaleString()}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Calendar className="w-4 h-4 text-blue-600 mr-1" />
                    <span className="text-sm font-medium">Lease End</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600">
                    {new Date(tenant.leaseEnd).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Months Here</p>
                  <p className="text-lg font-bold text-gray-900">{tenant.monthsAsResident}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Maintenance</p>
                  <p className="text-lg font-bold text-orange-600">{tenant.maintenanceRequests}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Communication</p>
                  <p className={`text-lg font-bold ${getCommunicationScoreColor(tenant.communicationScore)}`}>
                    {tenant.communicationScore}%
                  </p>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-800">Total Paid</span>
                  <span className="text-lg font-bold text-blue-600">${tenant.totalPaid.toLocaleString()}</span>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Emergency Contact</p>
                <p className="text-sm text-gray-700">{tenant.emergencyContact}</p>
              </div>

              {/* Notes */}
              {tenant.notes && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Notes</p>
                  <p className="text-sm text-gray-700 italic">{tenant.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Message
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="w-4 h-4 mr-1" />
                  Lease
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTenants.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tenants Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first tenant"
              }
            </p>
            <Button className="btn-primary" onClick={() => setShowAddModal(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Tenant
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function AddTenantForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: '',
    unit: '',
    monthlyRent: '',
    leaseStart: '',
    leaseEnd: '',
    emergencyContact: '',
    occupation: '',
    notes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Tenant data:', formData)
    onClose()
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="e.g., Sarah Johnson"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
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
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            placeholder="e.g., Marketing Manager"
            value={formData.occupation}
            onChange={(e) => handleChange('occupation', e.target.value)}
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
          <Label htmlFor="rent">Monthly Rent ($)</Label>
          <Input
            id="rent"
            type="number"
            placeholder="2500"
            value={formData.monthlyRent}
            onChange={(e) => handleChange('monthlyRent', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="leaseStart">Lease Start Date</Label>
          <Input
            id="leaseStart"
            type="date"
            value={formData.leaseStart}
            onChange={(e) => handleChange('leaseStart', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="leaseEnd">Lease End Date</Label>
          <Input
            id="leaseEnd"
            type="date"
            value={formData.leaseEnd}
            onChange={(e) => handleChange('leaseEnd', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="emergency">Emergency Contact</Label>
        <Input
          id="emergency"
          placeholder="John Johnson - (555) 987-6543"
          value={formData.emergencyContact}
          onChange={(e) => handleChange('emergencyContact', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Additional notes about the tenant..."
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="btn-primary flex-1">
          <Plus className="w-4 h-4 mr-2" />
          Add Tenant
        </Button>
      </div>
    </form>
  )
}

