import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDonationById } from '@/Reducers/donateForSlice';

import DonationDetails from '@/Components/DonateForDetails_Page/DonationDetails';
import DonationForm from '@/Components/DonateForDetails_Page/DonationForm';
import DonorsModal from '@/Components/DonateForDetails_Page/DonorsModal';

const DonateFor_Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {  currentDonation, status, error, donorStatus } = useSelector((state) => state.donateFor);

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
      <div className="container mx-auto px-4 py-8 max-w-6xl mt-40">
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
