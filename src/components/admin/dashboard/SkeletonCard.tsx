import ContentLoader from "react-content-loader";

const SkeletonCard = () => {
 return  (
  <div className="bg-white border border-slate-200 rounded-lg p-6">
    <ContentLoader height={80} width="100%">
      <rect x="0" y="10" rx="4" ry="4" width="70%" height="20" />
      <rect x="0" y="40" rx="4" ry="4" width="50%" height="20" />
    </ContentLoader>
  </div>
);
}

export default SkeletonCard;