import React from 'react';

const ProfilePage = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      {/* Profile management form */}
      <form>
        <div className="mb-5">
          <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
          <input 
            type="text" 
            id="name" 
            placeholder="Enter Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Student Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Enter Student Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
          <input 
            type="text" 
            id="phone" 
            placeholder="Enter Phone Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
