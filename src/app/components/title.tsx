export const Title = ({ icon, children, color }: { icon: React.ReactNode, children: React.ReactNode, color?: string }) => {
  return (
    <div className={`flex items-center justify-between w-full h-12 px-4 py-2 bg-gray-100 border-b border-gray-200 ${color}`}> 
      <div className="flex items-center">
        {icon}
        <div className="ml-2 text-sm font-medium text-gray-900">{children}</div>
      </div>
    </div>
  );
};