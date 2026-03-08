import React from 'react';

const teamMembers = [
  {
    name: 'Team Member 1',
    role: 'Lead Full-Stack Developer',
    description: 'Architecting the React frontend and Django integration.',
    imageUrl: 'https://ui-avatars.com/api/?name=Team+Member+1&background=0D8ABC&color=fff',
  },
  {
    name: 'Team Member 2',
    role: 'Lead AI/ML Engineer',
    description: 'Developed the predictive models and FastAPI microservice.',
    imageUrl: 'https://ui-avatars.com/api/?name=Team+Member+2&background=random',
  },
  {
    name: 'Team Member 3',
    role: 'Backend / Data Engineer',
    description: 'Handling data pipelines and model training infrastructure.',
    imageUrl: 'https://ui-avatars.com/api/?name=Team+Member+3&background=random',
  },
  {
    name: 'Team Member 4',
    role: 'UI/UX & Product Manager',
    description: 'Designing user flows and ensuring product-market fit.',
    imageUrl: 'https://ui-avatars.com/api/?name=Team+Member+4&background=random',
  },
];

const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-white sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Meet the Team</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            The engineers and data scientists building the future of SME intelligence.
          </p>
        </div>
        
        <ul role="list" className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {teamMembers.map((person) => (
            <li key={person.name} className="flex flex-col items-center text-center">
              <img className="mx-auto h-32 w-32 rounded-full object-cover shadow-sm border border-slate-200" src={person.imageUrl} alt={person.name} />
              <h3 className="mt-6 text-lg font-semibold leading-7 tracking-tight text-slate-900">{person.name}</h3>
              <p className="text-sm leading-6 text-blue-600 font-medium">{person.role}</p>
              <p className="mt-4 text-sm leading-6 text-slate-500">{person.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Team;