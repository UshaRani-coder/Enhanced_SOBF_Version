import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOurImpact } from '../../reducers/ourImpactsSlice.js';
import { getCloudinaryUrl } from '@/utils/getCloudinaryUrl.js';

const Statistics = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { ourImpacts, status, error } = useSelector(
    (state) => state.ourImpacts,
  );

  function formatNumber(n) {
    if (n >= 10000000) return `${(n / 10000000).toFixed(0)} crore+`;
    if (n >= 1000000) return `${(n / 1000000).toFixed(0)}M+`;
    if (n >= 100000) return `${(n / 100000).toFixed(0)} Lakh+`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}k+`;
    if (n >= 100) return `${(n / 100).toFixed(0)}00+`;
    if (n >= 10) return `${(n / 10).toFixed(0)}0+`;
    return `${n}`;
  }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getOurImpact());
    }
  }, [status, dispatch]);

  return (
    <div className="mt-2 text-center mb-8">
      {location.pathname === '/' && (
        <h2 className="inline-block text-heading3 lg:text-heading2 font-bold p-3 text-blue">
          Our Impacts
          <hr className="mt-1 border-light-lavender border-[1px]" />
        </h2>
      )}
      {status === 'loading' && (
        <p className="w-full text-center">Impacts Loading...</p>
      )}
      <div className="flex justify-center px-4 sm:px-6  ">
        <div className="max-w-6xl w-full">
          <ul
            className={`w-full flex flex-col mt-8 items-center  justify-center md:flex-row md:flex-wrap ${ourImpacts.length > 5 ? ' md:justify-evenly' : ''}`}
          >
            {ourImpacts?.map((impact, index) => (
              <li
                key={impact?.id || index}
                className="flex flex-col items-center p-4 rounded-xl hover:shadow-xl w-[230px] md:w-[220px] min-h-[200px] md:min-h-[260px]"
              >
                {/* Image */}
                <img
                  src={getCloudinaryUrl(impact?.image, 100)}
                  alt={impact?.description || 'Impact'}
                  width="60"
                  height="60"
                  loading="lazy"
                  decoding="async"
                  className="w-[60px] h-[60px] object-contain transition-transform duration-300 group-hover:scale-110"
                />

                {/* Number (FIXED POSITION BLOCK) */}
                <div className="mt-3 md:h-[60px] flex items-center justify-center">
                  <span className="text-logoYellow font-bold text-3xl md:text-3xl lg:text-4xl">
                    {formatNumber(impact?.total_services)}
                  </span>
                </div>

                {/* Description*/}
                <div className="flex-1 flex items-start justify-center">
                  <p className="text-center w-full text-sm md:text-base text-gray-700 line-clamp-3">
                    {impact?.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
