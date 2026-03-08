import { Activity, BellRing, Landmark } from 'lucide-react';

const features = [
  {
    name: 'Instant Business Health Report',
    description: 'Get a clear health score out of 100. We analyze your growth potential, operational efficiency, and compliance risk to give you actionable insights.',
    icon: Activity,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Smart Alerts & Monitoring',
    description: 'Never miss a critical event. Receive real-time continuous tracking alerts for sales drops, low inventory, and unexpected cost surges.',
    icon: BellRing,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    name: 'Funding Readiness & Loans',
    description: 'Know exactly what lenders are looking for. Improve your funding readiness score and instantly connect with lenders offering matched loan offers.',
    icon: Landmark,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-slate-50 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Why SMEs Need Inua360</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            The 3 Killer Features That Drive Growth
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-start bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className={`rounded-lg p-3 ${feature.bgColor} ${feature.color} ring-1 ring-white/10`}>
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-slate-900 text-xl">
                  {feature.name}
                </dt>
                <dd className="mt-2 leading-7 text-slate-600 flex-auto">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Features;