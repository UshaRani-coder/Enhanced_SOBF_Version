import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOurImpact } from '../../Reducers/ourImpactsSlice.js';

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

  function Number({ n }) {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 200,
      config: { mass: 1, tension: 80, friction: 20 },
    });

    return (
      <animated.span>
        {number.to((val) => formatNumber(Math.round(val)))}
      </animated.span>
    );
  }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getOurImpact());
    }
  }, [status, dispatch]);

  return (
    <div className="mt-2 text-center">
      {location.pathname === '/' && (
        <h2 className="inline-block text-heading3 lg:text-heading2 font-bold p-5 text-blue">
          Our Impacts
          <hr className="mt-1 border-light-lavender border-[1px]" />
        </h2>
      )}
       {status === 'loading' && <p className='w-full text-center'>Impacts Loading...</p>}
       {status === 'failed' && <p className="text-red-500">{error}</p>}
      <div className="flex justify-center px-4 sm:px-6  ">
       
        <div className="max-w-6xl w-full">
          {/* <ul className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-6 gap-4"> */}
          <ul
            className={`w-full flex flex-col items-center  justify-center md:flex-row md:flex-wrap ${ourImpacts.length > 5 ? ' md:justify-evenly' : ''}`}
          >
            {ourImpacts?.map((impact, index) => (
              <li
                key={impact?.id || index}
                className="flex flex-col items-center  justify-center  group p-2 md:p-6   rounded-xl hover:shadow-xl w-[230px] md:w-[220px] "
              >
                <img
                  src={impact?.image}
                  alt="impact"
                  className="text-[#001d23] w-[70px] transition-transform duration-300 group-hover:scale-110"
                />

                {/* Animated Count */}
                <span className="text-logoYellow text-center font-bold text-3xl md:text-3xl lg:text-4xl mt-4">
                  {/* <Number n={parseInt(impact?.total_services)} /> */}
                  {formatNumber(impact?.total_services)}
                  <br />
                </span>

                {/* Description */}
                <p className="text-center w-[90%] overflow-hidden md:mt-2 min-h-[100px] flex flex-col justify-between">
                  {impact?.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
