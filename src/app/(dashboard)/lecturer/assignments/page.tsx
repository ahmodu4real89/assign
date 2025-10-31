

const AssignmentGradingPage = async()=> {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gray-50 font-display">
      <div className="flex h-full grow flex-col">
        
        {/* Main Content */}
        <main className="flex flex-1 flex-col p-4 md:flex-row md:gap-6 md:p-6 lg:p-8">
          {/* Left Section */}
          <div className="flex-1">
           

            {/* Title */}
            
                 <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-background-dark dark:text-background-light">
                  Assignment : Into to Phython
                </h1>
                <p className="mt-1 text-sm text-background-dark/60 dark:text-background-light/60">
                  june 12, 2025
                </p>
              </div>
            </div>
              
          
           
          </div>
        </main>
      </div>
    </div>
  );
}
export default AssignmentGradingPage