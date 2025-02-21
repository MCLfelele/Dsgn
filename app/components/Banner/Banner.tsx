"use client";

import React, { useState, useEffect } from 'react';

interface Guest {
  id: number;
  name: string;
  numberOfGuests: number;
}

const Banner = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [name, setName] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Hardcoded RSVP data
  const rsvpList = [
    { name: "John Doe", phoneNumber: "+1234567890" },
    { name: "Jane Smith", phoneNumber: "+0987654321" },
    { name: "Alice Johnson", phoneNumber: "+1122334455" },
  ];

  // Load guests from localStorage on component mount
  useEffect(() => {
    const savedGuests = localStorage.getItem('guests');
    if (savedGuests) {
      setGuests(JSON.parse(savedGuests));
    }
  }, []);

  // Save guests to localStorage whenever the guests state changes
  useEffect(() => {
    localStorage.setItem('guests', JSON.stringify(guests));
  }, [guests]);

  // Calculate total guests including the main guest
  const totalGuests = guests.reduce((sum, guest) => sum + guest.numberOfGuests + 1, 0);

  // Countdown timer logic
  useEffect(() => {
    const targetDate = new Date('August 30, 2025 00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && numberOfGuests > 0) {
      const newGuest: Guest = {
        id: Date.now(),
        name: name.trim(),
        numberOfGuests,
      };
      setGuests([...guests, newGuest]);
      setName('');
      setNumberOfGuests(1);
    }
  };

  const handleClearAll = () => {
    setGuests([]); // Clear the guest list
    localStorage.removeItem('guests'); // Remove guests from localStorage
  };

  const toggleRSVPModal = () => {
    setShowRSVPModal(!showRSVPModal); // Toggle RSVP modal visibility
  };

  return (
    <main>
      <div className="px-6 lg:px-8 animated-gradient">
        <div className="mx-auto max-w-7xl pt-16 sm:pt-20 pb-20">
          {/* Grid container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Video column (left) */}
            <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-lg shadow-lg">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
              >
                <source src="/video/hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Text column (right) */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-semibold text-white sm:text-5xl lg:text-7xl align-center">
                Celebrating Femosh @ 40
              </h1>
              <p className="mt-6 text-lg leading-8 text-white">
                Please fill the form below and the number of guest you&aposre coming with
              </p>
              <div className="mt-8">
                {/* Guest List Form and Display */}
                <div className="max-w-md mx-auto p-2 rounded-lg shadow-md border border-white text-white pr-2">
                  <h1 className="text-2xl font-bold mb-4">Guest List</h1>
                  <p className="text-lg mb-4">Total Guests: {totalGuests}</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        placeholder="Guest Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white bg-transparent"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Number of Guests"
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                        min="1"
                        className="w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white bg-transparent"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Submit
                    </button>
                  </form>
                  <div className="mt-6 space-y-4 max-h-[300px] overflow-y-auto">
                    {guests.map((guest) => (
                      <div
                        key={guest.id}
                        className="flex items-center p-4 bg-gray-800 rounded-lg shadow-sm"
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4">
                          {guest.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{guest.name}</p>
                          <p className="text-sm text-white">
                            {guest.numberOfGuests} guest(s)
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Clear All Button */}
                  {guests.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Countdown Section (Under the video) */}
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Countdown</h2>
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <span className="text-4xl font-bold text-white">{timeLeft.days}</span>
                <span className="block text-sm text-white">Days</span>
              </div>
              <div className="text-center">
                <span className="text-4xl font-bold text-white">{timeLeft.hours}</span>
                <span className="block text-sm text-white">Hours</span>
              </div>
              <div className="text-center">
                <span className="text-4xl font-bold text-white">{timeLeft.minutes}</span>
                <span className="block text-sm text-white">Minutes</span>
              </div>
              <div className="text-center">
                <span className="text-4xl font-bold text-white">{timeLeft.seconds}</span>
                <span className="block text-sm text-white">Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Button (Outside the border outline) */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={toggleRSVPModal}
          className="border border-white text-white py-2 px-6 rounded-md hover:bg-white hover:text-black transition-colors"
        >
          RSVP
        </button>
      </div>

      {/* RSVP Modal */}
      {showRSVPModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-black">RSVP List</h2>
            <div className="space-y-4">
              {rsvpList.map((rsvp, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                  <div>
                    <p className="font-semibold text-black">{rsvp.name}</p>
                    <p className="text-sm text-gray-600">{rsvp.phoneNumber}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={toggleRSVPModal}
              className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Banner;
