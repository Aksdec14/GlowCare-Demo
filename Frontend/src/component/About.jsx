import React from 'react';
import img1 from '../assets/images/image1.jpeg'
import img2 from '../assets/images/image2.jpeg'

const About = () => {
  return (
    <section id="about" className="bg-white text-gray-900 py-16 px-4">
      <div className="mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
        {/* Text content */}
        <div className="font-light sm:text-lg">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-blue-600">
            Your Skin, Our Priority
          </h2>
          <p className="mb-4">
            At GlowCare, we combine science, care, and personalized advice to help your skin look and feel its best. Our team of skincare experts and AI-assisted tools guide you towards healthy, radiant skin.
          </p>
          <p>
            From everyday skincare tips to solutions for specific concerns, we provide actionable insights and remedies tailored to you. Simple, effective, and backed by research.
          </p>
        </div>

        {/* Images */}
        <div className="grid grid-cols-2 gap-4 mt-8 lg:mt-0">
          <img
            className="w-full rounded-lg shadow-md"
            src= {img1}
            alt="skincare consultation"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg shadow-md"
            src= {img2}
            alt="skincare products"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
