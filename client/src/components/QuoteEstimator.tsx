import { useState } from 'react';
import { Calculator, Home, Users, Clock, DollarSign, ArrowRight, CheckCircle } from 'lucide-react';

interface QuoteResult {
  estimatedCost: number;
  minCost: number;
  maxCost: number;
  duration: string;
  providers: number;
}

export function QuoteEstimator() {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState('');
  const [propertySize, setPropertySize] = useState('');
  const [urgency, setUrgency] = useState('standard');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);

  const serviceTypes = [
    { id: 'plumbing', name: 'Plumbing', baseRate: 85 },
    { id: 'electrical', name: 'Electrical', baseRate: 95 },
    { id: 'cleaning', name: 'House Cleaning', baseRate: 65 },
    { id: 'landscaping', name: 'Landscaping', baseRate: 75 },
    { id: 'painting', name: 'Painting', baseRate: 70 },
    { id: 'handyman', name: 'Handyman', baseRate: 60 },
  ];

  const propertySizes = [
    { id: 'small', name: 'Small (< 1000 sq ft)', multiplier: 0.8 },
    { id: 'medium', name: 'Medium (1000-2000 sq ft)', multiplier: 1.0 },
    { id: 'large', name: 'Large (2000-3000 sq ft)', multiplier: 1.3 },
    { id: 'xlarge', name: 'Extra Large (> 3000 sq ft)', multiplier: 1.6 },
  ];

  const additionalOptions = [
    { id: 'deep', name: 'Deep Service', cost: 50 },
    { id: 'eco', name: 'Eco-Friendly Products', cost: 30 },
    { id: 'emergency', name: 'Emergency/Same Day', cost: 100 },
    { id: 'weekend', name: 'Weekend Service', cost: 40 },
  ];

  const calculateQuote = () => {
    const service = serviceTypes.find(s => s.id === serviceType);
    const size = propertySizes.find(s => s.id === propertySize);
    
    if (!service || !size) return;

    let baseCost = service.baseRate * 2; // 2 hours minimum
    baseCost *= size.multiplier;

    if (urgency === 'urgent') baseCost *= 1.5;
    if (urgency === 'emergency') baseCost *= 2.0;

    let additionalCost = 0;
    additionalServices.forEach(serviceId => {
      const addon = additionalOptions.find(a => a.id === serviceId);
      if (addon) additionalCost += addon.cost;
    });

    const totalCost = baseCost + additionalCost;
    const minCost = Math.floor(totalCost * 0.85);
    const maxCost = Math.ceil(totalCost * 1.15);

    setQuoteResult({
      estimatedCost: Math.round(totalCost),
      minCost,
      maxCost,
      duration: urgency === 'emergency' ? '1-2 hours' : urgency === 'urgent' ? '2-4 hours' : '4-8 hours',
      providers: Math.floor(Math.random() * 8) + 5
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      calculateQuote();
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setServiceType('');
    setPropertySize('');
    setUrgency('standard');
    setAdditionalServices([]);
    setQuoteResult(null);
  };

  const toggleAdditionalService = (serviceId: string) => {
    setAdditionalServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(s => s !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calculator className="w-8 h-8" />
        </div>
        <h1 className="text-4xl text-gray-900 mb-2">Instant Quote Estimator</h1>
        <p className="text-xl text-gray-600">Get an AI-powered estimate in seconds</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex items-center ${s < 4 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    s < step
                      ? 'bg-green-600 text-white'
                      : s === step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 4 && (
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
            <span>Service</span>
            <span>Size</span>
            <span>Options</span>
            <span>Quote</span>
          </div>
        </div>

        <div className="p-8">
          {/* Step 1: Service Type */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl text-gray-900 mb-4">What service do you need?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {serviceTypes.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setServiceType(service.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      serviceType === service.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-lg text-gray-900 mb-1">{service.name}</div>
                    <div className="text-gray-600">Starting at ${service.baseRate}/hr</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Property Size */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl text-gray-900 mb-4">What's your property size?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {propertySizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setPropertySize(size.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      propertySize === size.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Home className="w-5 h-5 text-gray-600" />
                      <span className="text-lg text-gray-900">{size.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Additional Options */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl text-gray-900 mb-4">Service Details</h2>
              
              {/* Urgency */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-3">How urgent is this?</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setUrgency('standard')}
                    className={`p-3 rounded-lg border-2 ${
                      urgency === 'standard'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-gray-900">Standard</div>
                    <div className="text-sm text-gray-600">Within a week</div>
                  </button>
                  <button
                    onClick={() => setUrgency('urgent')}
                    className={`p-3 rounded-lg border-2 ${
                      urgency === 'urgent'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-gray-900">Urgent</div>
                    <div className="text-sm text-gray-600">1-2 days</div>
                  </button>
                  <button
                    onClick={() => setUrgency('emergency')}
                    className={`p-3 rounded-lg border-2 ${
                      urgency === 'emergency'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-gray-900">Emergency</div>
                    <div className="text-sm text-gray-600">Same day</div>
                  </button>
                </div>
              </div>

              {/* Additional Services */}
              <div>
                <label className="block text-gray-700 mb-3">Additional Options (Optional)</label>
                <div className="space-y-2">
                  {additionalOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => toggleAdditionalService(option.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left flex items-center justify-between ${
                        additionalServices.includes(option.id)
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <span className="text-gray-900">{option.name}</span>
                      <span className="text-gray-600">+${option.cost}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Quote Result */}
          {step === 4 && quoteResult && (
            <div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-3xl text-gray-900 mb-2">Your Estimated Quote</h2>
                <p className="text-gray-600">Based on your requirements</p>
              </div>

              {/* Price Display */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white text-center mb-6">
                <div className="text-blue-200 mb-2">Estimated Total</div>
                <div className="text-5xl mb-2">${quoteResult.estimatedCost}</div>
                <div className="text-blue-200">
                  Range: ${quoteResult.minCost} - ${quoteResult.maxCost}
                </div>
              </div>

              {/* Quote Details */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Clock className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <div className="text-gray-500 mb-1">Estimated Duration</div>
                  <div className="text-lg text-gray-900">{quoteResult.duration}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Users className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <div className="text-gray-500 mb-1">Available Providers</div>
                  <div className="text-lg text-gray-900">{quoteResult.providers} nearby</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <DollarSign className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <div className="text-gray-500 mb-1">Price Guarantee</div>
                  <div className="text-lg text-gray-900">Best Match</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                  <span>Find Providers at This Price</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleReset}
                  className="w-full px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Get Another Quote
                </button>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This is an AI-powered estimate. Final prices may vary based on specific requirements and provider rates. Get exact quotes from providers before booking.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex gap-3 p-6 border-t border-gray-200">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !serviceType) ||
                (step === 2 && !propertySize)
              }
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 3 ? 'Calculate Quote' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
