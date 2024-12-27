import ContentLoader from 'react-content-loader';

const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
      <ContentLoader
        height={80}
        width="100%"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="10" rx="4" ry="4" width="70%" height="20" />
        <rect x="0" y="40" rx="4" ry="4" width="50%" height="20" />
      </ContentLoader>
    </div>
  );
};

export default SkeletonCard;
