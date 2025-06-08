const DonorCard = ({ donor }) => {
 const colorSchemes = [
  'bg-red-100 text-red-800',
  'bg-green-100 text-green-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800',
  'bg-indigo-100 text-indigo-800',
  'bg-yellow-100 text-yellow-800',
  'bg-red-100 text-red-800',
  'bg-teal-100 text-teal-800',
  'bg-amber-100 text-amber-800',
  'bg-cyan-100 text-cyan-800',
  'bg-fuchsia-100 text-fuchsia-800',
  'bg-rose-100 text-rose-800',
  'bg-emerald-100 text-emerald-800',
  'bg-violet-100 text-violet-800',
  'bg-sky-100 text-sky-800',
  'bg-lime-100 text-lime-800'
 ];

 const colorIndex = donor.fullname.charCodeAt(0) % colorSchemes.length;
 const [bgColor, textColor] = colorSchemes[colorIndex].split(' ');

 return (
  <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
   <div className={`w-10 h-10 rounded-full ${bgColor} ${textColor} flex items-center justify-center text-lg font-bold`}>
    {donor.fullname.charAt(0).toUpperCase()}
   </div>
   <div className="flex-1 min-w-0">
    <p className="font-medium text-gray-800 truncate">{donor.fullname}</p>
    <div className="flex items-center mt-1">
     <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
     </svg>
     <p className="text-sm text-gray-500 truncate">{donor.email}</p>
    </div>
   </div>
   <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
    Supporter
   </div>
  </div>
 );
};

export default DonorCard