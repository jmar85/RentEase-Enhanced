import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Building2, Plus, Search, Filter, MapPin, Bed, Bath, Square, DollarSign, Users, Calendar, Star, Eye, Edit, Trash2, Home, TrendingUp, AlertCircle } from 'lucide-react'

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const properties = [
    {
      id: 1,
      name: "Sunset Apartments",
      address: "123 Main St, Downtown",
      type: "Apartment Complex",
      units: 24,
      occupied: 22,
      monthlyRent: 2500,
      totalValue: 850000,
      rating: 4.8,
      image: "🏢",
      status: "Excellent",
      lastInspection: "2024-01-15",
      amenities: ["Pool", "Gym", "Parking", "Laundry"]
    },
    {
      id: 2,
      name: "Oak Street Townhomes",
      address: "456 Oak St, Midtown",
      type: "Townhouse",
      units: 8,
      occupied: 7,
      monthlyRent: 3200,
      totalValue: 1200000,
      rating: 4.6,
      image: "🏘️",
      status: "Good",
      lastInspection: "2024-01-10",
      amenities: ["Garden", "Garage", "Patio"]
    },
    {
      id: 3,
      name: "Riverside Condos",
      address: "789 River Rd, Waterfront",
      type: "Condominium",
      units: 16,
      occupied: 14,
      monthlyRent: 2800,
      totalValue: 950000,
      rating: 4.9,
      image: "🏙️",
      status: "Excellent",
      lastInspection: "2024-01-20",
      amenities: ["River View", "Balcony", "Concierge"]
    },
    {
      id: 4,
      name: "Garden Villa",
      address: "321 Garden Ave, Suburbs",
      type: "Single Family",
      units: 1,
      occupied: 1,
      monthlyRent: 4500,
      totalValue: 750000,
      rating: 4.7,
      image: "🏡",
      status: "Good",
      lastInspection: "2024-01-05",
      amenities: ["Garden", "Garage", "Fireplace"]
    }
  ]

  const stats = [
    {
      title: "Total Properties",
      value: "12",
      change: "+2 this month",
      icon: Building2,
      color: "gradient-primary"
    },
    {
      title: "Total Units",
      value: "156",
      change: "+8 this month",
      icon: Home,
      color: "gradient-secondary"
    },
    {
      title: "Occupancy Rate",
      value: "94.2%",
      change: "+2.1% this month",
      icon: TrendingUp,
      color: "gradient-accent"
    },
    {
      title: "Portfolio Value",
      value: "$8.5M",
      change: "+5.2% this year",
      icon: DollarSign,
      color: "gradient-primary"
    }
  ]

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || property.type.toLowerCase().includes(filterType.toLowerCase())
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Excellent': return 'bg-green-100 text-green-800'
      case 'Good': return 'bg-blue-100 text-blue-800'
      case 'Fair': return 'bg-yellow-100 text-yellow-800'
      case 'Poor': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getOccupancyColor = (occupied, total) => {
    const rate = (occupied / total) * 100
    if (rate >= 90) return 'text-green-600'
    if (rate >= 75) return 'text-blue-600'
    if (rate >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Properties Management</h1>
          <p className="text-lg text-gray-600">Manage your property portfolio with comprehensive tools</p>
        </div>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-5 h-5 mr-2" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
              <DialogDescription>
                Enter the details for your new property
              </DialogDescription>
            </DialogHeader>
            <AddPropertyForm onClose={() => setShowAddModal(false)} />
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
                  placeholder="Search properties by name or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="condominium">Condominium</SelectItem>
                  <SelectItem value="single">Single Family</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="hover-lift border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              {/* Property Image/Icon */}
              <div className="h-48 gradient-bg flex items-center justify-center text-6xl">
                {property.image}
              </div>
              
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{property.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.address}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {property.type}
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{property.rating}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Home className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="text-sm font-medium">Units</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{property.units}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm font-medium">Occupied</span>
                    </div>
                    <p className={`text-lg font-bold ${getOccupancyColor(property.occupied, property.units)}`}>
                      {property.occupied}/{property.units}
                    </p>
                  </div>
                </div>

                {/* Financial Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Rent</p>
                    <p className="text-lg font-bold text-green-600">${property.monthlyRent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Property Value</p>
                    <p className="text-lg font-bold text-blue-600">${(property.totalValue / 1000000).toFixed(1)}M</p>
                  </div>
                </div>

                {/* Status and Inspection */}
                <div className="flex justify-between items-center mb-4">
                  <Badge className={getStatusColor(property.status)}>
                    {property.status}
                  </Badge>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Last Inspection</p>
                    <p className="text-sm font-medium">{new Date(property.lastInspection).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-1">
                    {property.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterType !== 'all' 
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first property"
              }
            </p>
            <Button className="btn-primary" onClick={() => setShowAddModal(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Property
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function AddPropertyForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: '',
    units: '',
    monthlyRent: '',
    totalValue: '',
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Property data:', formData)
    onClose()
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Property Name</Label>
          <Input
            id="name"
            placeholder="e.g., Sunset Apartments"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Property Type</Label>
          <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment Complex</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="condominium">Condominium</SelectItem>
              <SelectItem value="single">Single Family Home</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder="123 Main St, City, State, ZIP"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="units">Number of Units</Label>
          <Input
            id="units"
            type="number"
            placeholder="1"
            value={formData.units}
            onChange={(e) => handleChange('units', e.target.value)}
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
        <div className="space-y-2">
          <Label htmlFor="value">Property Value ($)</Label>
          <Input
            id="value"
            type="number"
            placeholder="850000"
            value={formData.totalValue}
            onChange={(e) => handleChange('totalValue', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the property features, amenities, and other details..."
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="btn-primary flex-1">
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </div>
    </form>
  )
}

