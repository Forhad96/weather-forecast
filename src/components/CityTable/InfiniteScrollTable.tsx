import InfiniteScroll from "react-infinite-scroll-component";
import {City} from '../../utils/interface';
import Table from "./Table";

interface InfiniteScrollTableProps {
  cities:City[];
  getAllCityData:()=> void;
  hasMore:boolean;
}
const InfiniteScrollTable:React.FC<InfiniteScrollTableProps> = ({ cities, getAllCityData, hasMore }) => (
  <InfiniteScroll
    dataLength={cities.length}
    next={getAllCityData}
    hasMore={hasMore}
    loader={
      <div className="text-center mt-4">
        <span className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 rounded-full"></span>
        <p className="text-gray-700">Loading...</p>
      </div>
    }
    endMessage={<p className="text-center mt-4">No more cities to load.</p>}
  >
    <Table cities={cities} />
  </InfiniteScroll>
);

export default InfiniteScrollTable