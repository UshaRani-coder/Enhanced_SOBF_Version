import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { MdEdit, MdDelete } from 'react-icons/md';
import {
  addTeam,
  getTeamData,
  removeTeam,
  updateTeamData,
} from '../Reducers/TeamSlice';
import DOMPurify from 'dompurify';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
const Team = () => {
  const dispatch = useDispatch();
  const { teams, status } = useSelector((state) => state.teams);
  ReactQuill.Quill = Quill; // Force ReactQuill to use latest Quill version
  const quillRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    linkedIn: '',
    instagram: '',
    image: null,
  });

  // Fetch teams data
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getTeamData());
    }
  }, [status, dispatch]);

  // Validate form data
  const validateForm = () => {
    const { name, role, linkedIn, instagram, image } = formData;
    if (!name || !role) {
      toast.error('Name and Role are required fields.');
      return false;
    }

    // Validate LinkedIn and Instagram URLs
    const linkedInRegex = /^https:\/\/([a-z]{2,3}\.)?linkedin\.com\/.*$/i;
    const instagramRegex = /^https:\/\/([a-z]{2,3}\.)?instagram\.com\/.*$/i;

    if (!linkedIn) {
      toast.error('linkedIn is required ');
      return false;
    }
    if (!linkedIn || !linkedInRegex.test(linkedIn)) {
      toast.error(
        "Invalid LinkedIn URL. It should start with 'https://linkedin.com'.",
      );
      return false;
    }
    if (!instagram) {
      toast.error('Instagram is required ');
      return false;
    }
    if (!instagram || !instagramRegex.test(instagram)) {
      toast.error(
        "Invalid Instagram URL. It should start with 'https://instagram.com'.",
      );
      return false;
    }

    if (!image) {
      toast.error('Profile image is required.');
      return false;
    }
    // Validate image type
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!image || !allowedImageTypes.includes(image.type)) {
      toast.error('Profile image is required and must be jpg ,png  or jpeg .');
      return false;
    }
    return true;
  };

  //! Add team member
  const handleAddTeamMember = async () => {
    if (!validateForm()) return;

    const newTeam = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      newTeam.append(key, value);
    });
    try {
      setIsLoading(true); // Start loading
      await dispatch(addTeam(newTeam)).unwrap();
      resetForm();
      setIsModalOpen(false);
      toast.success('Team member added successfully.');
      dispatch(getTeamData());
    } catch (error) {
      toast.error(error.message || 'Failed to add team member.');
    }
    setIsLoading(false);
  };

  //! Update team member
  const handleUpdateTeamMember = async () => {
    const { name, image, role } = formData;
    if (!name || !role) {
      toast.error('Name and Role are required fields.');
      return false;
    }
    //! Validate image type
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (image && !allowedImageTypes.includes(image.type)) {
      toast.error('Profile image is required and must be jpg ,png  or jpeg .');
      return;
    }
    const teamData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      teamData.append(key, value);
    });
    try {
      setIsLoading(true); // Start loading
      await dispatch(
        updateTeamData({ id: currentPost._id, teamData }),
      ).unwrap();
      resetForm();
      setIsModalOpen(false);
      toast.success('Team member updated successfully.');
      dispatch(getTeamData());
    } catch (error) {
      toast.error(error.message || 'Failed to update team member.');
    }
    setIsLoading(false);
  };

  //! Delete team member
  const handleDeleteTeamMember = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        setIsLoading(true);
        await dispatch(removeTeam(id)).unwrap();
        toast.success('Successfully deleted team member.');
      } catch (error) {
        toast.error(error.message || 'Failed to delete team member.');
      }
    }
    setIsLoading(false);
  };

  //! Handle input changes
  const handleInputChange = (e) => {
    setErrorMessage('');
    if (e.target) {
      // For regular input fields
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      // For ReactQuill (custom object)
      const { name, value } = e;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  //! Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
    setErrorMessage('');
  };

  //! Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      linkedIn: '',
      instagram: '',
      image: null,
    });
    setCurrentPost(null);
    setErrorMessage('');
  };

  //! Open modal for updating team member
  const openUpdateModal = (post) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setCurrentPost(post);
    setFormData({
      name: post.name || '',
      role: post.role || '',
      linkedIn: post.linkedIn || '',
      instagram: post.instagram || '',
      image: null,
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mx-4 my-4">
        <h1 className="text-xl small-range:text-2xl md:text-3xl lg:text-4xl font-semibold">
          Our Team Members
        </h1>
        <button
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-1.5 small-max:px-4 small-max:py-1.5 text-[13px] small-max:text-[16px] font-semibold rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl "
          onClick={() => {
            setIsModalOpen(true);
            setIsUpdateMode(false);
            resetForm();
          }}
        >
          Add Member
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-[90%]  overflow-y-auto scrollbar-none">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? 'Update Team Member' : 'Add New Team Member'}
            </h2>
            <form>
              {/* Name */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none text-[13px] small-range:text-[16px]"
                  placeholder="Enter your name here"
                />
              </div>
              {/* Role */}
              <div className="mb-4">
                <style>
                  {`
                                                   .ql-editor.ql-blank::before {
                                                   font-style: normal !important;
                                                  }
                                               `}
                </style>
                <label className="block font-semibold mb-2">Role</label>
                <ReactQuill
                  value={formData.role || ''}
                  ref={quillRef}
                  onChange={(value) =>
                    handleInputChange({ name: 'role', value })
                  }
                  className="w-full rounded focus:outline-none text-[13px] small-range:text-[16px]"
                  placeholder="Enter your  role and responsibility "
                />
              </div>
              {/* LinkedIn */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">LinkedIn</label>
                <input
                  type="text"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none text-[13px] small-range:text-[16px]"
                  placeholder="Enter your linkedin profile link "
                />
              </div>

              {/* Instagram */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Instagram</label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none text-[13px] small-range:text-[16px]"
                  placeholder="Enter your instagram profile link "
                />
              </div>

              {/* Image */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 font-semibold"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                  onClick={
                    isUpdateMode ? handleUpdateTeamMember : handleAddTeamMember
                  }
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      ></svg>
                      Processing...
                    </span>
                  ) : isUpdateMode ? (
                    'Update'
                  ) : (
                    'Add'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col items-center md:items-stretch p-6 small-max:p-0 md:p-6 justify-center md:flex-row md:flex-wrap md:justify-center  w-[100%] md:gap-x-[40px] gap-y-[45px] md:gap-y-[60px] lg:gap-y-[40px] lg:gap-x-[100px]">
        {teams && teams?.length > 0 ? (
          teams?.map((member, index) => (
            <div
              key={member._id || index}
              className="flex items-center flex-1 flex-col gap-y-[5px] md:gap-y-[10px]  w-[300px]"
            >
              <div
                className="w-[200px] h-[200px] rounded-full"
                style={{
                  backgroundImage: `url(${
                    member?.image || 'https://via.placeholder.com/150'
                  })`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              <div className="flex flex-col  items-center">
                <span className=" font-bold mt-[10px] text-[16px] lg:text-[18px]">
                  {member?.name}
                </span>
                <div
                  className="text-[14px] md:text-[16px] break-words max-w-[280px] text-center"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(member.role).replace(
                      /<a /g,
                      '<a style="color: #4a90e2; text-decoration: underline;" ',
                    ),
                  }}
                />
              </div>
              
              <div className="flex justify-center gap-x-[12px] ">
                <a
                  href={member?.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width={'20px'}
                    fill="#146EBE"
                  >
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                  </svg>
                </a>
                <a
                  href={member?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[25px] h-[25px]"
                    x="0px"
                    y="0px"
                    width="10"
                    height="10"
                    viewBox="0 0 48 48"
                  >
                    <radialGradient
                      id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                      cx="19.38"
                      cy="42.035"
                      r="44.899"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#fd5"></stop>
                      <stop offset=".328" stopColor="#ff543f"></stop>
                      <stop offset=".348" stopColor="#fc5245"></stop>
                      <stop offset=".504" stopColor="#e64771"></stop>
                      <stop offset=".643" stopColor="#d53e91"></stop>
                      <stop offset=".761" stopColor="#cc39a4"></stop>
                      <stop offset=".841" stopColor="#c837ab"></stop>
                    </radialGradient>
                    <path
                      fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                      d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                    ></path>
                    <radialGradient
                      id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                      cx="11.786"
                      cy="5.54"
                      r="29.813"
                      gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#4168c9"></stop>
                      <stop
                        offset=".999"
                        stopColor="#4168c9"
                        stopOpacity="0"
                      ></stop>
                    </radialGradient>
                    <path
                      fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                      d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                    ></path>
                    <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                    <path
                      fill="#fff"
                      d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                    ></path>
                  </svg>
                </a>
              </div>
              <div className=" flex justify-center gap-4">
                <button
                  className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold rounded-2xl shadow-lg transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-xl hover:translate-2 flex items-center gap-2"
                  onClick={() => openUpdateModal(member)}
                >
                  <MdEdit className="text-blue-800 text-2xl" /> Edit
                </button>

                <button
                  className=" bg-red-100 text-red-800 px-4 py-2 font-semibold rounded-2xl flex items-center gap-2"
                  onClick={() => handleDeleteTeamMember(member?._id)}
                >
                  <MdDelete className="text-red-800 text-2xl" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No team members found.</p>
        )}
      </div>
    </div>
  );
};

export default Team;
