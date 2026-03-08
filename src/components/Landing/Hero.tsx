import React from 'react'

const Hero: React.FC = () => {
  return (
    <section className="px-6 py-20 text-center lg:px-24 bg-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
        Understand Your Business. <br className="hidden sm:block" />
        <span className="text-blue-600">Avoid Risks. Get Funded.</span>
      </h1>
      <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
        Inua360 is an AI-powered business intelligence platform designed specifically for SMEs. Connect your data to unlock instant health reports, smart alerts, and get matched with lenders.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a href="/register" className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all">
          Get Started for Free
        </a>
        <a href="/login" className="text-sm font-semibold leading-6 text-slate-900 hover:text-blue-600 transition-all">
          Log in to Dashboard <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}

export default Hero