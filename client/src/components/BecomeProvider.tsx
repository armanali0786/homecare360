import { useState } from 'react';
import { User, Briefcase, DollarSign, Award, Image, Shield, CreditCard, CheckCircle, Upload, Plus, X } from 'lucide-react';

interface ProviderFormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  
  // Service Details
  serviceCategory: string;
  specializations: string[];
  experience: string;
  description: string;
  
  // Pricing & Availability
  hourlyRate: string;
  availability: string[];
  travelRadius: string;
  
  // Certifications
  certifications: Array<{ name: string; issuer: string; year: string }>;
  
  // Portfolio
  portfolioItems: Array<{ title: string; description: string }>;
  
  // Background Check
  backgroundCheckConsent: boolean;
  insuranceInfo: string;
  
  // Payment
  bankAccount: string;
  taxId: string;
}

export function BecomeProvider() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProviderFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    serviceCategory: '',
    specializations: [],
    experience: '',
    description: '',
    hourlyRate: '',
    availability: [],
    travelRadius: '',
    certifications: [],
    portfolioItems: [],
    backgroundCheckConsent: false,
    insuranceInfo: '',
    bankAccount: '',
    taxId: ''
  });

  const [newSpecialization, setNewSpecialization] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const serviceCategories = [
    'Plumbing',
    'Electrical',
    'Cleaning',
    'Landscaping',
    'Painting',
    'Handyman',
    'HVAC',
    'Carpentry',
    'Roofing',
    'Moving'
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSpecialization = () => {
    if (newSpecialization.trim()) {
      updateFormData('specializations', [...formData.specializations, newSpecialization.trim()]);
      setNewSpecialization('');
    }
  };

  const removeSpecialization = (index: number) => {
    updateFormData('specializations', formData.specializations.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    updateFormData('certifications', [
      ...formData.certifications,
      { name: '', issuer: '', year: '' }
    ]);
  };

  const updateCertification = (index: number, field: string, value: string) => {
    const updated = [...formData.certifications];
    updated[index] = { ...updated[index], [field]: value };
    updateFormData('certifications', updated);
  };

  const removeCertification = (index: number) => {
    updateFormData('certifications', formData.certifications.filter((_, i) => i !== index));
  };

  const addPortfolioItem = () => {
    updateFormData('portfolioItems', [
      ...formData.portfolioItems,
      { title: '', description: '' }
    ]);
  };

  const updatePortfolioItem = (index: number, field: string, value: string) => {
    const updated = [...formData.portfolioItems];
    updated[index] = { ...updated[index], [field]: value };
    updateFormData('portfolioItems', updated);
  };

  const removePortfolioItem = (index: number) => {
    updateFormData('portfolioItems', formData.portfolioItems.filter((_, i) => i !== index));
  };

  const toggleAvailability = (day: string) => {
    if (formData.availability.includes(day)) {
      updateFormData('availability', formData.availability.filter(d => d !== day));
    } else {
      updateFormData('availability', [...formData.availability, day]);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would submit to backend
    setSubmitted(true);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.serviceCategory && formData.specializations.length > 0 && formData.description;
      case 3:
        return formData.hourlyRate && formData.availability.length > 0;
      case 4:
        return true; // Optional step
      case 5:
        return formData.backgroundCheckConsent;
      case 6:
        return true; // Optional payment info
      default:
        return false;
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-xl border border-gray-200 p-12">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl text-gray-900 mb-4">Application Submitted!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for applying to become a service provider on our platform. Our team will review your application and get back to you within 2-3 business days.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg text-blue-900 mb-3">What Happens Next?</h3>
            <ul className="text-left space-y-2 text-blue-800">
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>We'll verify your credentials and certifications</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Background check will be processed (1-2 business days)</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>You'll receive an email with your profile setup instructions</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Once approved, you can start accepting bookings!</span>
              </li>
            </ul>
          </div>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl text-gray-900 mb-2">Become a Service Provider</h1>
        <p className="text-xl text-gray-600">Join our platform and grow your business</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  s < step
                    ? 'bg-green-600 text-white'
                    : s === step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {s < step ? <CheckCircle className="w-6 h-6" /> : s}
              </div>
              {s < 6 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    s < step ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Personal</span>
          <span>Services</span>
          <span>Pricing</span>
          <span>Portfolio</span>
          <span>Verification</span>
          <span>Payment</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">Personal Information</h2>
                <p className="text-gray-600">Tell us about yourself</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Business Name (Optional)</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => updateFormData('businessName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Smith Plumbing Services"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Service Details */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">Service Details</h2>
                <p className="text-gray-600">What services do you provide?</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Service Category *</label>
                <select
                  value={formData.serviceCategory}
                  onChange={(e) => updateFormData('serviceCategory', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {serviceCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Years of Experience *</label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => updateFormData('experience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="5"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Specializations *</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newSpecialization}
                    onChange={(e) => setNewSpecialization(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialization())}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Emergency Repairs"
                  />
                  <button
                    onClick={addSpecialization}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.specializations.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg"
                    >
                      <span>{spec}</span>
                      <button onClick={() => removeSpecialization(idx)}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Service Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your services, expertise, and what makes you stand out..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Pricing & Availability */}
        {step === 3 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">Pricing & Availability</h2>
                <p className="text-gray-600">Set your rates and schedule</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Hourly Rate (USD) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">$</span>
                  <input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => updateFormData('hourlyRate', e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="85"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Platform fee: 15% per booking</p>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Travel Radius (miles) *</label>
                <input
                  type="number"
                  value={formData.travelRadius}
                  onChange={(e) => updateFormData('travelRadius', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="25"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-3">Available Days *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {daysOfWeek.map((day) => (
                    <button
                      key={day}
                      onClick={() => toggleAvailability(day)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        formData.availability.includes(day)
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Certifications & Portfolio */}
        {step === 4 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">Certifications & Portfolio</h2>
                <p className="text-gray-600">Showcase your credentials and work (Optional)</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Certifications */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-gray-700">Certifications & Licenses</label>
                  <button
                    onClick={addCertification}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Certification
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.certifications.map((cert, idx) => (
                    <div key={idx} className="p-4 border border-gray-300 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-gray-700">Certification {idx + 1}</h4>
                        <button
                          onClick={() => removeCertification(idx)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => updateCertification(idx, 'name', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Certification Name"
                        />
                        <div className="grid md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => updateCertification(idx, 'issuer', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Issuing Organization"
                          />
                          <input
                            type="text"
                            value={cert.year}
                            onChange={(e) => updateCertification(idx, 'year', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Year"
                          />
                        </div>
                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-100">
                          <Upload className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-600">Upload Certificate (PDF or Image)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-gray-700">Portfolio Work Samples</label>
                  <button
                    onClick={addPortfolioItem}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Work Sample
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.portfolioItems.map((item, idx) => (
                    <div key={idx} className="p-4 border border-gray-300 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-gray-700">Work Sample {idx + 1}</h4>
                        <button
                          onClick={() => removePortfolioItem(idx)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updatePortfolioItem(idx, 'title', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Project Title"
                        />
                        <textarea
                          value={item.description}
                          onChange={(e) => updatePortfolioItem(idx, 'description', e.target.value)}
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Project Description"
                        />
                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-100">
                          <Image className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-600">Upload Photos (Before/After)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Background Check & Verification */}
        {step === 5 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">Verification & Trust</h2>
                <p className="text-gray-600">Help customers trust your services</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-lg text-blue-900 mb-2">Background Check Required</h3>
                <p className="text-blue-800 mb-4">
                  All service providers must pass a background check to ensure customer safety and trust. This includes:
                </p>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Criminal background check</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Identity verification</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Professional license verification (if applicable)</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-start gap-3 p-4 border border-gray-300 rounded-lg">
                <input
                  type="checkbox"
                  id="bgCheck"
                  checked={formData.backgroundCheckConsent}
                  onChange={(e) => updateFormData('backgroundCheckConsent', e.target.checked)}
                  className="mt-1 w-5 h-5 text-blue-600"
                />
                <label htmlFor="bgCheck" className="flex-1 text-gray-700">
                  I consent to a background check and understand that my application will be reviewed upon successful completion. I certify that all information provided is accurate and truthful.
                </label>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Insurance Information (Optional but Recommended)</label>
                <textarea
                  value={formData.insuranceInfo}
                  onChange={(e) => updateFormData('insuranceInfo', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Insurance provider, policy number, coverage amount..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Providers with insurance get a "Insured" badge and higher customer trust
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Payment Information */}
        {step === 6 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl text-gray-900">Payment Information</h2>
                <p className="text-gray-600">How you'll receive payments</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg text-green-900 mb-2">Payment Terms</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Payments released within 24 hours of job completion</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>15% platform fee per booking</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Weekly direct deposits to your bank account</span>
                  </li>
                </ul>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Bank Account Number</label>
                <input
                  type="text"
                  value={formData.bankAccount}
                  onChange={(e) => updateFormData('bankAccount', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Account number (encrypted)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Your banking information is encrypted and secure
                </p>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Tax ID / EIN (Optional)</label>
                <input
                  type="text"
                  value={formData.taxId}
                  onChange={(e) => updateFormData('taxId', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="XX-XXXXXXX"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Required for tax reporting if you earn over $600/year
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
          )}
          {step < 6 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Application
            </button>
          )}
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg text-gray-900 mb-2">Need Help?</h3>
        <p className="text-gray-600 mb-4">
          Our team is here to assist you with the application process.
        </p>
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white">
          Contact Support
        </button>
      </div>
    </div>
  );
}
