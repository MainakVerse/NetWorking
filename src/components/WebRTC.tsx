import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ExternalLink } from 'lucide-react';

// TypeScript interface for website visit data
interface WebsiteVisit {
  url: string;
  domain: string;
  visits: number;
  color: string;
}

export default function WebsiteVisitsChart() {
  const [visitData, setVisitData] = useState<WebsiteVisit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch browsing history data
    // In a real implementation, this would come from a browser extension API
    // or server endpoint with proper permissions
    const fetchBrowsingData = async () => {
      try {
        setIsLoading(true);
        
        // Since we can't actually access browser history data in this context,
        // we'll simulate a fetch that would happen in a real implementation
        // In a real app, this would be replaced with actual API calls
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create sample data (in a real implementation, this would be actual data)
        const mockData: WebsiteVisit[] = [
          { url: 'https://google.com', domain: 'Google', visits: 187, color: '#4285F4' },
          { url: 'https://youtube.com', domain: 'YouTube', visits: 143, color: '#FF0000' },
          { url: 'https://github.com', domain: 'GitHub', visits: 112, color: '#24292e' },
          { url: 'https://stackoverflow.com', domain: 'Stack Overflow', visits: 89, color: '#F48024' },
          { url: 'https://netflix.com', domain: 'Netflix', visits: 76, color: '#E50914' },
          { url: 'https://twitter.com', domain: 'Twitter', visits: 68, color: '#1DA1F2' },
          { url: 'https://linkedin.com', domain: 'LinkedIn', visits: 52, color: '#0077B5' },
          { url: 'https://amazon.com', domain: 'Amazon', visits: 41, color: '#FF9900' },
          { url: 'https://reddit.com', domain: 'Reddit', visits: 37, color: '#FF4500' },
          { url: 'https://instagram.com', domain: 'Instagram', visits: 29, color: '#C13584' }
        ];
        
        // Sort by visits (highest to lowest)
        const sortedData = [...mockData].sort((a, b) => b.visits - a.visits);
        
        setVisitData(sortedData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch browsing data. Please check permissions.');
        setIsLoading(false);
      }
    };

    fetchBrowsingData();
  }, []);

  // Custom tooltip to show the full URL and visit count
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="font-semibold">{data.domain}</p>
          <p className="text-sm truncate max-w-xs">{data.url}</p>
          <p className="font-bold">{data.visits} visits</p>
        </div>
      );
    }
    return null;
  };

  // Format domain names to ensure they fit
  const formatDomain = (domain: string) => {
    return domain.length > 15 ? `${domain.substring(0, 12)}...` : domain;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full  rounded-lg shadow-md p-4">
      
      
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={visitData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis 
              dataKey="domain" 
              type="category" 
              tick={{ fontSize: 12 }} 
              width={100}
              tickFormatter={formatDomain}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="visits" 
              fill="#8884d8" 
              radius={[0, 4, 4, 0]}
              barSize={24}
            >
              {visitData.map((entry, index) => (
                <rect key={`rect-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-500 italic">
          Note: This component displays simulated data. In a real implementation, it would need proper browser permissions to access actual browsing history.
        </p>
        
        <div className="mt-2 flex items-center text-sm text-blue-600 cursor-pointer hover:underline">
          <ExternalLink size={16} className="mr-1" />
          <span>View detailed analytics</span>
        </div>
      </div>
    </div>
  );
}