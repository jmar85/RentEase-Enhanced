import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Wrench, Plus, Search, Filter, MapPin, Calendar, DollarSign, Star, Eye, Edit, Trash2, Clock, CheckCircle, AlertCircle, User, Phone, TrendingUp, BarChart3, Zap } from 'lucide-react'

export default function MaintenancePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const maintenanceRequests = [
    {
      id: 1,
      title: "Kitchen Faucet Leak",
      description: "Water dripping from kitchen faucet, needs immediate attention",
      property: "Sunset Apartments",
      unit: "4B",
      tenant: "Sarah Johnson",
      tenantPhone: "(555) 123-4567",
      priority: "High",
      status: "In Progress",
      category: "Plumbing",
      dateSubmitted: "2024-01-15",
      dateScheduled: "2024-01-16",
      estimatedCost: 150,
      actualCost: null,
      assignedTo: "Mike's Plumbing",
      rating: null,
      photos: ["📷", "📷"],
      notes: "Tenant reports constant dripping, affecting water bill"
    },
    {
      id: 2,
      title: "AC Unit Not Cooling",
      description: "Air conditioning unit in living room not producing cold air",
      property: "Oak Street Townhomes",
      unit: "12A",
      tenant: "Michael Chen",
      tenantPhone: "(555) 234-5678",
      priority: "High",
      status: "Pending",
      category: "HVAC",
      dateSubmitted: "2024-01-14",
      dateScheduled: "2024-01-17",
      estimatedCost: 300,
      actualCost: null,
      assignedTo: "Cool Air Services",
      rating: null,
      photos: ["📷"],
      notes: "Summer heat wave, urgent repair needed"
    },
    {
      id: 3,
      title: "Bathroom Light Fixture",
      description: "Light fixture in master bathroom flickering intermittently",
      property: "Riverside Condos",
      unit: "8C",
      tenant: "Emily Rodriguez",
      tenantPhone: "(555) 345-6789",
      priority: "Medium",
      status: "Completed",
      category: "Electrical",
      dateSubmitted: "2024-01-10",
      dateScheduled: "2024-01-12",
      estimatedCost: 80,
      actualCost: 75,
      assignedTo: "Bright Electric",
      rating: 4.8,
      photos: ["📷"],
      notes: "Quick fix, tenant very satisfied"
    },
    {
      id: 4,
      title: "Garage Door Opener",
      description: "Garage door opener remote not working, manual operation only",
      property: "Garden Villa",
      unit: "1",
      tenant: "David Thompson",
      tenantPhone: "(555) 456-7890",
      priority: "Low",
      status: "Scheduled",
      category: "Mechanical",
      dateSubmitted: "2024-01-12",
      dateScheduled: "2024-01-18",
      estimatedCost: 120,
      actualCost: null,
      assignedTo: "Garage Pro",
      rating: null,
      photos: [],
      notes: "Non-urgent, tenant can use manual override"
    },
    {
      id: 5,
      title: "Window Seal Replacement",
      description: "Bedroom window seal deteriorated, causing draft",
      property: "Sunset Apartments",
      unit: "2A",
      tenant: "Lisa Park",
      tenantPhone: "(555) 567-8901",
      priority: "Medium",
      status: "Completed",
      category: "Windows",
      dateSubmitted: "2024-01-08",
      dateScheduled: "2024-01-11",
      estimatedCost: 200,
      actualCost: 185,
      assignedTo: "Window Works",
      rating: 4.5,
      photos: ["📷", "📷"],
      notes: "Improved insulation, tenant happy with results"
    }
  ]

  const stats = [
    {
      title: "Open Requests",
      value: "12",
      change: "+3 this week",
      icon: Wrench,
      color: "gradient-primary"
    },
    {
      title: "Completed This Month",
      value: "28",
      change: "+15% from last month",
      icon: CheckCircle,
      color: "gradient-secondary"
    },
    {
      title: "Avg. Response Time",
      value: "2.4 hrs",
      change: "-30 min improvement",
      icon: Clock,
      color: "gradient-accent"
    },
    {
      title: "Total Cost (MTD)",
      value: "$3,240",
      change: "-12% from last month",
      icon: DollarSign,
      color: "gradient-primary"
    }
  ]

  const filteredRequests = maintenanceRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || request.status.toLowerCase() === filterStatus.toLowerCase()
    const matchesPriority = filterPriority === 'all' || request.priority.toLowerCase() === filterPriority.toLowerCase()
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Scheduled': return 'bg-blue-100 text-blue-800'
      case 'In Progress': return 'bg-orange-100 text-orange-800'
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Plumbing': return '🔧'
      case 'HVAC': return '❄️'
      case 'Electrical': return '⚡'
      case 'Mechanical': return '⚙️'
      case 'Windows': return '🪟'
      default: return '🔨'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Maintenance Management</h1>
          <p className="text-lg text-gray-600">Track and manage maintenance requests efficiently</p>
        </div>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-5 h-5 mr-2" />
              Add Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Maintenance Request</DialogTitle>
              <DialogDescription>
                Create a new maintenance request
              </DialogDescription>
            </DialogHeader>
            <AddMaintenanceForm onClose={() => setShowAddModal(false)} />
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
                  placeholder="Search by title, property, tenant, or category..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="h-12">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover-lift border-0 shadow-lg overflow-hidden">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center text-2xl mr-3">
                    {getCategoryIcon(request.category)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{request.title}</h3>
                    <p className="text-sm text-gray-600">{request.category}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                  <Badge className={getPriorityColor(request.priority)}>
                    {request.priority}
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 mb-4">{request.description}</p>

              {/* Property & Tenant Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{request.property} - Unit {request.unit}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span>{request.tenant}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{request.tenantPhone}</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Calendar className="w-4 h-4 text-blue-600 mr-1" />
                    <span className="text-sm font-medium">Submitted</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    {new Date(request.dateSubmitted).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 text-orange-600 mr-1" />
                    <span className="text-sm font-medium">Scheduled</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    {new Date(request.dateScheduled).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Cost Information */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Estimated Cost</p>
                  <p className="text-lg font-bold text-blue-600">${request.estimatedCost}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Actual Cost</p>
                  <p className="text-lg font-bold text-green-600">
                    {request.actualCost ? `$${request.actualCost}` : 'TBD'}
                  </p>
                </div>
              </div>

              {/* Assigned Contractor */}
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-800">Assigned To</span>
                  <span className="text-sm font-bold text-blue-600">{request.assignedTo}</span>
                </div>
              </div>

              {/* Photos */}
              {request.photos.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Photos ({request.photos.length})</p>
                  <div className="flex gap-2">
                    {request.photos.map((photo, index) => (
                      <div key={index} className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-sm">
                        {photo}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rating (for completed requests) */}
              {request.rating && (
                <div className="mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">Rating: {request.rating}/5</span>
                  </div>
                </div>
              )}

              {/* Notes */}
              {request.notes && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Notes</p>
                  <p className="text-sm text-gray-700 italic">{request.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Update
                </Button>
                {request.status !== 'Completed' && (
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Maintenance Requests Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
                ? "Try adjusting your search or filter criteria"
                : "All maintenance requests are up to date"
              }
            </p>
            <Button className="btn-primary" onClick={() => setShowAddModal(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Add Maintenance Request
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function AddMaintenanceForm({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property: '',
    unit: '',
    tenant: '',
    priority: '',
    category: '',
    estimatedCost: '',
    assignedTo: '',
    scheduledDate: '',
    notes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Maintenance request data:', formData)
    onClose()
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Request Title</Label>
          <Input
            id="title"
            placeholder="e.g., Kitchen Faucet Leak"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plumbing">Plumbing</SelectItem>
              <SelectItem value="hvac">HVAC</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="mechanical">Mechanical</SelectItem>
              <SelectItem value="windows">Windows</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the maintenance issue in detail..."
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          required
        />
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
          <Label htmlFor="priority">Priority</Label>
          <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tenant">Tenant Name</Label>
          <Input
            id="tenant"
            placeholder="e.g., Sarah Johnson"
            value={formData.tenant}
            onChange={(e) => handleChange('tenant', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="estimatedCost">Estimated Cost ($)</Label>
          <Input
            id="estimatedCost"
            type="number"
            placeholder="150"
            value={formData.estimatedCost}
            onChange={(e) => handleChange('estimatedCost', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="assignedTo">Assign To</Label>
          <Input
            id="assignedTo"
            placeholder="e.g., Mike's Plumbing"
            value={formData.assignedTo}
            onChange={(e) => handleChange('assignedTo', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="scheduledDate">Scheduled Date</Label>
          <Input
            id="scheduledDate"
            type="date"
            value={formData.scheduledDate}
            onChange={(e) => handleChange('scheduledDate', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Additional notes or special instructions..."
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
          Create Request
        </Button>
      </div>
    </form>
  )
}

