"use client";

import React, { useState, useEffect } from "react";

interface Guest {
  id: number;
  name: string;
  numberOfGuests: number;
  contactType: "email" | "phone";
  contactValue: string;
}

const Banner = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [name, setName] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [contactType, setContactType] = useState<"email" | "phone">("email");
  const [contactValue, setContactValue] = useState("");
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [showGuestListModal, setShowGuestListModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Load guests from localStorage on component mount
  useEffect(() => {
    const savedGuests = localStorage.getItem("guests");
    if (savedGuests) {
      setGuests(JSON.parse(savedGuests));
    }
  }, []);

  // Save guests to localStorage whenever the guests state changes
  useEffect(() => {
    localStorage.setItem("guests", JSON.stringify(guests));
  }, [guests]);

  // Calculate total guests including the main guest
  const totalGuests = guests.reduce((sum, guest) => sum + guest.numberOfGuests + 1, 0);

  // Countdown timer logic
  useEffect(() => {
    const targetDate = new Date("August 30, 2025 00:00:00").getTime();

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
    if (name.trim() && numberOfGuests > 0 && contactValue.trim()) {
      const newGuest: Guest = {
        id: Date.now(),
        name: name.trim(),
        numberOfGuests,
        contactType,
        contactValue: contactValue.trim(),
      };
      setGuests([...guests, newGuest]);
      setName("");
      setNumberOfGuests(1);
      setContactValue("");
      setShowRSVPModal(false); // Close the modal after submission
    }
  };

  const handleClearAll = () => {
    setGuests([]); // Clear the guest list
    localStorage.removeItem("guests"); // Remove guests from localStorage
  };

  const toggleRSVPModal = () => {
    setShowRSVPModal(!showRSVPModal); // Toggle RSVP modal visibility
  };

  const toggleGuestListModal = () => {
    setShowGuestListModal(!showGuestListModal); // Toggle Guest List modal visibility
  };

  return (
    <main>
      <div className="px-6 lg:px-8 bg-[#F4CCE9]">
        <div className="mx-auto max-w-7xl pt-16 sm:pt-20 pb-20">
          {/* Countdown Section (At the top in all views) */}
          <div className="text-center mb-12 relative">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center z-0"
    style={{ backgroundImage: "url('/public/assets/banner/count.jpg')" }}
  ></div>
  {/* Overlay to darken the background image */}
  <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
  {/* Countdown Content */}
  <div className="relative z-20">
    <h2 className="text-3xl font-bold text-white mb-8">Countdown</h2>
    <div className="flex justify-center space-x-4 md:space-x-6">
      {/* Days */}
      <div className="text-center">
        <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg border-2 border-white">
          <span className="text-2xl md:text-4xl font-bold text-white font-serif">{timeLeft.days}</span>
        </div>
        <span className="block text-sm text-white mt-2">Days</span>
      </div>
      {/* Hours */}
      <div className="text-center">
        <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg shadow-lg border-2 border-white">
          <span className="text-2xl md:text-4xl font-bold text-white font-serif">{timeLeft.hours}</span>
        </div>
        <span className="block text-sm text-white mt-2">Hours</span>
      </div>
      {/* Minutes */}
      <div className="text-center">
        <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-gradient-to-br from-green-500 to-yellow-500 rounded-lg shadow-lg border-2 border-white">
          <span className="text-2xl md:text-4xl font-bold text-white font-serif">{timeLeft.minutes}</span>
        </div>
        <span className="block text-sm text-white mt-2">Minutes</span>
      </div>
      {/* Seconds */}
      <div className="text-center">
        <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-gradient-to-br from-red-500 to-orange-500 rounded-lg shadow-lg border-2 border-white">
          <span className="text-2xl md:text-4xl font-bold text-white font-serif">{timeLeft.seconds}</span>
        </div>
        <span className="block text-sm text-white mt-2">Seconds</span>
      </div>
    </div>
  </div>
</div>

          {/* Grid container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Video column (left) */}
            <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-lg shadow-lg">
              <video
                autoPlay
                muted={false} // Unmuted video
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
                Join us for an unforgettable celebration!
              </p>
              {/* RSVP Button */}
              <div className="mt-8 space-y-4">
                <button
                  onClick={toggleRSVPModal}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  RSVP
                </button>
                {/* Guest List Button */}
                <button
                  onClick={toggleGuestListModal}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Guest List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {showRSVPModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            {/* Close (X) Button */}
            <button
              onClick={toggleRSVPModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-black">RSVP Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Guest Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
                required
              />
              <input
                type="number"
                placeholder="Number of Guests"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                min="1"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
                required
              />
              <select
                value={contactType}
                onChange={(e) => setContactType(e.target.value as "email" | "phone")}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="email">Email</option>
                <option value="phone">Phone Number</option>
              </select>
              {contactType === "email" ? (
                <input
                  type="email"
                  placeholder="Email"
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
                  required
                />
              ) : (
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
                  required
                />
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Guest List Modal */}
      {showGuestListModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            {/* Close (X) Button */}
            <button
              onClick={toggleGuestListModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-black">Guest List</h2>
            <p className="text-lg mb-4">Total Guests: {totalGuests}</p>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {guests.map((guest) => (
                <div
                  key={guest.id}
                  className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4">
                    {guest.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-black">{guest.name}</p>
                    <p className="text-sm text-gray-600">
                      {guest.numberOfGuests} guest(s)
                    </p>
                    <p className="text-sm text-gray-600">
                      {guest.contactType === "email" ? "Email" : "Phone"}: {guest.contactValue}
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
      )}
    </main>
  );
};

export default Banner;