const CTASection = () => {
  return (
    <section className="w-full flex justify-center px-4 py-16">
      <div
        className="relative w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl rounded-[48px] overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #1f8f8b 0%, #0b1f24 100%)",
        }}
      >
        <div className="relative z-10 px-8 md:px-16 py-14 md:py-14">
          
          {/* Left Content */}
          <div>
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
              Ready to Start Learning<br className="hidden lg:block xl:hidden" /> Smarter?
            </h2>
          </div>

          {/* Right Content */}
          <div className="mt-4 flex flex-col sm:items-start gap-6">
            <p className="text-white/80 max-w-md text-sm md:text-base">
              Join thousands of educators, researchers, and businesses using DeepTrace to detect AI
              content accurately, protect integrity, and make informed decisions.
            </p>

            <button className="inline-flex cursor-pointer items-center gap-2 bg-white text-black font-medium px-4 py-2 rounded-xl hover:bg-gray-100 transition">
              Start Free Verification
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>

        {/* Right Image */}
        <img
          src="/ai-hand-pic.png"
          alt="AI Detection Illustration"
          className="absolute right-0 bottom-0 h-full max-h-80 md:max-h-105 object-contain pointer-events-none"
        />
      </div>
    </section>
  );
};

export default CTASection;
