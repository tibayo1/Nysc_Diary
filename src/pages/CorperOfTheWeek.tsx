import { MapPin, Briefcase, Calendar } from 'lucide-react';
import { Corper } from '../types';

const corpers: Corper[] = [
  {
    id: '1',
    name: 'Adaeze Okonkwo',
    state: 'Lagos State',
    ppa: 'Ministry of Education',
    story: 'From starting a tech community in her LGA to impacting over 200 students, Adaeze is redefining what it means to serve. She developed a free coding bootcamp for secondary school students in her community.',
    image: 'https://images.pexels.com/photos/3796810/pexels-photo-3796810.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-20'
  },
  {
    id: '2',
    name: 'Chukwuemeka Nwosu',
    state: 'Enugu State',
    ppa: 'General Hospital Enugu',
    story: 'As a medical doctor serving in rural Enugu, Chukwuemeka initiated a free medical outreach program that has served over 500 community members. His dedication to healthcare delivery in underserved areas is truly inspiring.',
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-13'
  },
  {
    id: '3',
    name: 'Fatima Abubakar',
    state: 'Kano State',
    ppa: 'Community Secondary School',
    story: 'Fatima transformed her PPA by introducing a girls-in-STEM program that has enrolled over 150 female students. Her passion for bridging the gender gap in technology is making real impact.',
    image: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-06'
  },
  {
    id: '4',
    name: 'Oluwaseun Adebayo',
    state: 'Oyo State',
    ppa: 'Ministry of Agriculture',
    story: 'Oluwaseun established a youth farming cooperative that has trained 80 young farmers in modern agricultural practices. His initiative has created sustainable income opportunities for youth in his community.',
    image: 'https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-02-28'
  },
  {
    id: '5',
    name: 'Blessing Eze',
    state: 'Rivers State',
    ppa: 'State Library Board',
    story: 'Blessing started a mobile library service that brings books to children in remote riverine communities. Her innovation has improved literacy rates and sparked a love for reading in hundreds of children.',
    image: 'https://images.pexels.com/photos/3783520/pexels-photo-3783520.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-02-21'
  },
  {
    id: '6',
    name: 'Ibrahim Yusuf',
    state: 'Kaduna State',
    ppa: 'Ministry of Youth Development',
    story: 'Ibrahim created a skills acquisition center that has trained over 300 youths in various vocational skills including tailoring, carpentry, and digital marketing, helping reduce unemployment in his community.',
    image: 'https://images.pexels.com/photos/5325890/pexels-photo-5325890.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-02-14'
  }
];

export default function CorperOfTheWeek() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Corper of the Week</h1>
          <p className="text-xl text-green-50">
            Celebrating corps members making extraordinary impact across Nigeria
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-8 md:flex items-center gap-8">
          <img
            src={corpers[0].image}
            alt={corpers[0].name}
            className="w-full md:w-80 h-80 object-cover rounded-xl shadow-md"
          />
          <div className="mt-6 md:mt-0 flex-1">
            <div className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Featured This Week
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {corpers[0].name}
            </h2>
            <div className="flex flex-col gap-2 mb-4 text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                {corpers[0].state}
              </div>
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                {corpers[0].ppa}
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                {new Date(corpers[0].date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{corpers[0].story}</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-8">Previous Featured Corpers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {corpers.slice(1).map((corper) => (
            <div
              key={corper.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <img
                src={corper.image}
                alt={corper.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {corper.name}
                </h3>
                <div className="flex flex-col gap-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-green-600" />
                    {corper.state}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-green-600" />
                    {corper.ppa}
                  </div>
                </div>
                <p className="text-gray-700">{corper.story}</p>
                <div className="mt-4 pt-4 border-t">
                  <span className="text-sm text-gray-500">
                    Featured: {new Date(corper.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Know an Amazing Corper?</h2>
          <p className="text-xl mb-8 text-green-50">
            Nominate them to be featured as Corper of the Week
          </p>
          <a
            href="mailto:help@nyscdiary.com?subject=Corper of the Week Nomination"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Submit Nomination
          </a>
        </div>
      </section>
    </div>
  );
}
