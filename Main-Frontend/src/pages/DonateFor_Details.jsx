import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDonationById } from '@/reducers/donateForSlice';
import { ArrowLeft } from 'lucide-react';
import DonationDetails from '@/components/DonateForDetails_Page/DonationDetails';
import DonationForm from '@/components/DonateForDetails_Page/DonationForm';
import DonorsModal from '@/components/DonateForDetails_Page/DonorsModal';

const DonateFor_Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentDonation, donorStatus } = useSelector(
    (state) => state.donateFor,
  );

  const [showAllDonors, setShowAllDonors] = useState(false);

  useEffect(() => {
    dispatch(fetchDonationById(id))
      .unwrap()
      .catch((err) => console.error('Fetch donation error:', err));
  }, [dispatch, id]);

  if (!currentDonation) {
    return <div className="text-center py-8">Donation not found</div>;
  }

  const donors = currentDonation?.category?.donor || [];

  return (
    <div className="container mx-auto px-4 pb-8 max-w-9xl">
      <div className="container mx-auto px-4 py-8 max-w-6xl mt-4">
        <div className="mt-[100px] md:mt-[120px] mb-10">
        <button
          onClick={() => navigate('/donate-for#donation-categories')}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition"
        >
          <ArrowLeft size={18} />
          Back to Donation categories
        </button>
      </div>
        <DonorsModal
          donors={donors}
          showAllDonors={showAllDonors}
          setShowAllDonors={setShowAllDonors}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <DonationDetails
            currentDonation={currentDonation}
            setShowAllDonors={setShowAllDonors}
          />

          <DonationForm
            id={id}
            currentDonation={currentDonation}
            dispatch={dispatch}
            donorStatus={donorStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default DonateFor_Details;
