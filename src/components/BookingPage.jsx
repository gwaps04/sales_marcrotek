import React, { useEffect } from 'react';
import BookingForm from './BookingForm';

const BookingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex-grow-1 bg-gradient-midnight font-montserrat py-5" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6"> {/* Narrower column for a focused form */}
            <div className="text-center mb-5" data-aos="fade-down">
              <h1 className="display-5 fw-bold text-white mb-2">Final Step</h1>
              <p className="text-info text-uppercase fw-bold letter-spacing-1">
                Confirm your details to access the live booking calendar
              </p>
            </div>
            
            {/* Added booking-form-container class to link with index.css styles */}
            <div className="bg-white rounded-5 shadow-2xl p-4 p-md-5 booking-form-container" data-aos="fade-up">
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;