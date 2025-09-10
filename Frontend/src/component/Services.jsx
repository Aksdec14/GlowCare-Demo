import React from "react";

const Services = () => {
  const services = [
    {
      title: "Personalized Skin Care Plans",
      color: "indigo-500",
      description:
        "Get customized skin care routines designed specifically for your skin type and concerns for optimal results.",
    },
    {
      title: "Acne & Blemish Treatment",
      color: "purple-500",
      description:
        "Target acne, blemishes, and breakouts with advanced treatments and expert guidance to achieve clearer skin.",
    },
    {
      title: "Anti-Aging Solutions",
      color: "blue-400",
      description:
        "Explore anti-aging therapies and products to reduce fine lines, wrinkles, and restore youthful skin texture.",
    },
    {
      title: "Hyperpigmentation Care",
      color: "yellow-400",
      description:
        "Treat uneven skin tone, dark spots, and sun damage with specialized solutions to brighten and even out your complexion.",
    },
    {
      title: "Sensitive Skin Support",
      color: "green-500",
      description:
        "Gentle formulations and therapies designed to calm irritation and soothe sensitive or reactive skin conditions.",
    },
  ];

  return (
    <section id="services" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Our Services</h2>
        <p className="text-gray-600 mb-12 text-lg">
          Discover how we can help you achieve healthy, radiant skin with our expert solutions.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, idx) => (
          <div key={idx} className="relative">
            <span
              className={`absolute top-0 left-0 w-full h-full mt-1 ml-1 rounded-lg bg-${service.color}`}
            ></span>
            <div
              className={`relative h-full p-6 bg-white border-2 border-${service.color} rounded-lg flex flex-col`}
            >
              <h3 className={`text-lg font-bold text-gray-900 mb-2`}>{service.title}</h3>
              <hr className={`border-${service.color} mb-3`} />
              <p className="text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
