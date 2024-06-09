'use client';
import Banner from 'components/admin/nft-marketplace/Banner';
import MiniCalendar from 'components/calendar/MiniCalendar';
import DailyTraffic from 'components/admin/default/DailyTraffic';

import tableDataTopCreators from 'variables/nfts/marketplace/tableDataTopCreators';
import HistoryItem from 'components/admin/nft-marketplace/HistoryItem';
import TopCreatorTable from 'components/admin/nft-marketplace/TableTopCreators';


const Marketplace = () => {
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* NFt Banner */}
        <Banner />

 
        
      </div>

      {/* right side section */}

      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <MiniCalendar />
        <div className="mb-5" />
        <DailyTraffic />
      </div>
    </div>
  );
};

export default Marketplace;
