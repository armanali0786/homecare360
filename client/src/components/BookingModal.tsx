import { useState } from 'react';
import { X, Calendar, Clock, CreditCard, CheckCircle } from 'lucide-react';
import { ServiceProvider } from '../App';

interface BookingModalProps {
  provider: ServiceProvider;
  onClose: () => void;
}

export function BookingModal({ provider, onClose }: BookingModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [hours, setHours] = useState(2);
  const [description, setDescription] = useState('');

  const totalPrice = provider.hourlyRate * hours;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'details') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('confirmation');
    }
  };

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl text-gray-900">
            {step === 'details' && 'Book Service'}
            {step === 'payment' && 'Payment Details'}
            {step === 'confirmation' && 'Booking Confirmed'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 'confirmation' ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl text-gray-900 mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-6">
              Your booking with {provider.name} has been confirmed. You'll receive a confirmation email shortly.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
              <h4 className="text-lg text-gray-900 mb-4">Booking Details</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Provider</span>
                  <span className="text-gray-900">{provider.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service</span>
                  <span className="text-gray-900">{provider.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="text-gray-900">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="text-gray-900">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="text-gray-900">{hours} hours</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-900">Total Amount</span>
                  <span className="text-xl text-gray-900">${totalPrice}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              {step === 'details' && (
                <div className="space-y-6">
                  {/* Provider Info */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="text-lg text-gray-900">{provider.name}</div>
                      <div className="text-gray-600">{provider.service}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl text-gray-900">${provider.hourlyRate}/hr</div>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-gray-700 mb-2">Select Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-gray-700 mb-2">Select Time</label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-2 rounded-lg border ${
                            selectedTime === time
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'border-gray-300 text-gray-700 hover:border-blue-500'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Duration: {hours} hours
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="8"
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-gray-500 mt-1">
                      <span>2 hours</span>
                      <span>8 hours</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Service Description (Optional)
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what you need help with..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  {/* Total */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Hourly Rate</span>
                      <span className="text-gray-900">${provider.hourlyRate}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Duration</span>
                      <span className="text-gray-900">{hours} hours</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-lg text-gray-900">Total</span>
                      <span className="text-2xl text-gray-900">${totalPrice}</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-6">
                  {/* Payment Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-gray-600 mb-1">Total Amount</div>
                    <div className="text-3xl text-gray-900">${totalPrice}</div>
                  </div>

                  {/* Card Details */}
                  <div>
                    <label className="block text-gray-700 mb-2">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Security Note */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-blue-900 mb-1">Secure Payment</div>
                        <p className="text-blue-700">
                          Your payment will be held in escrow and only released to the provider once you confirm the job is completed satisfactorily.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              {step === 'payment' && (
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={step === 'details' && (!selectedDate || !selectedTime)}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 'details' ? 'Continue to Payment' : 'Confirm & Pay'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
