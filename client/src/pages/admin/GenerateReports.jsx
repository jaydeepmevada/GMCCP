import { useState, useEffect } from 'react';
import API from '../../services/api';
import { HiDocumentReport, HiDownload, HiClock, HiCheckCircle } from 'react-icons/hi';

const reportTypes = [
  { value: 'complaints', label: 'All Complaints Report', description: 'Complete complaints overview with details', color: 'blue' },
  { value: 'status', label: 'Status-wise Report', description: 'Complaints grouped by status (New, In Progress, Resolved, etc.)', color: 'green' },
  { value: 'department', label: 'Department-wise Report', description: 'Complaints grouped by department with resolution stats', color: 'purple' },
  { value: 'city', label: 'City-wise Report', description: 'Complaints grouped by city', color: 'orange' },
  { value: 'priority', label: 'Priority-wise Report', description: 'Complaints grouped by priority level', color: 'red' },
];

const GenerateReports = () => {
  const [stats, setStats] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [savedReports, setSavedReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, complaintsRes, reportsRes] = await Promise.all([
          API.get('/admin/stats'),
          API.get('/admin/complaints', { params: { limit: 100 } }),
          API.get('/admin/reports'),
        ]);
        setStats(statsRes.data.stats);
        setComplaints(complaintsRes.data.complaints);
        setSavedReports(reportsRes.data.reports);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleGenerateReport = async (type) => {
    try {
      setGenerating(type);
      setSuccessMsg('');
      const res = await API.post('/admin/reports/generate', { type });
      setSavedReports(prev => [res.data.report, ...prev]);
      setSuccessMsg(`${reportTypes.find(r => r.value === type)?.label} generated successfully!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to generate report');
    } finally {
      setGenerating('');
    }
  };

  // Group by city
  const cityStats = complaints.reduce((acc, c) => {
    acc[c.city] = (acc[c.city] || 0) + 1;
    return acc;
  }, {});

  // Group by status
  const statusStats = complaints.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});

  // Group by category
  const categoryStats = complaints.reduce((acc, c) => {
    const name = c.category?.name || 'Unknown';
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  if (loading) return <div className="text-center py-12 text-gray-400">Loading reports...</div>;

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6">
        <HiDocumentReport className="w-8 h-8 text-blue-400" />
        <h1 className="text-2xl font-bold text-gray-100">Reports</h1>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="mb-6 bg-green-900/50 border border-green-500 text-green-300 px-4 py-3 rounded-lg flex items-center gap-2">
          <HiCheckCircle className="w-5 h-5" />
          {successMsg}
        </div>
      )}

      {/* Generate Report Buttons */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-100 mb-4">📥 Generate & Save Report</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((rt) => (
            <div key={rt.value} className="card flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-gray-100 mb-1">{rt.label}</h3>
                <p className="text-xs text-gray-400 mb-3">{rt.description}</p>
              </div>
              <button
                onClick={() => handleGenerateReport(rt.value)}
                disabled={generating === rt.value}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all ${
                  generating === rt.value
                    ? 'bg-gray-600 cursor-not-allowed'
                    : `bg-${rt.color}-600 hover:bg-${rt.color}-700`
                }`}
                style={{
                  backgroundColor: generating === rt.value ? '#4B5563' :
                    rt.color === 'blue' ? '#2563EB' :
                    rt.color === 'green' ? '#16A34A' :
                    rt.color === 'purple' ? '#9333EA' :
                    rt.color === 'orange' ? '#EA580C' :
                    '#DC2626'
                }}
              >
                {generating === rt.value ? (
                  <>⏳ Generating...</>
                ) : (
                  <><HiDownload className="w-4 h-4" /> Generate Report</>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Reports History */}
      {savedReports.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">📋 Saved Reports ({savedReports.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-gray-800">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Generated By</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Data Summary</th>
                </tr>
              </thead>
              <tbody>
                {savedReports.map((report, index) => (
                  <tr key={report._id} className="border-b border-gray-700 hover:bg-gray-800/50">
                    <td className="px-4 py-3 text-gray-300">{index + 1}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-300 capitalize">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{report.generatedBy?.name || 'Admin'}</td>
                    <td className="px-4 py-3 text-gray-400 flex items-center gap-1">
                      <HiClock className="w-3 h-3" />
                      {new Date(report.createdAt).toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {report.type === 'complaints' && `Total: ${report.data?.totalComplaints || 0} complaints`}
                      {report.type === 'status' && `Total: ${report.data?.total || 0} | ${Object.entries(report.data?.statusWise || {}).map(([k,v]) => `${k}: ${v}`).join(', ')}`}
                      {report.type === 'department' && `${Object.keys(report.data?.departmentWise || {}).length} departments`}
                      {report.type === 'city' && `${Object.keys(report.data?.cityWise || {}).length} cities | Total: ${report.data?.total || 0}`}
                      {report.type === 'priority' && `Total: ${report.data?.total || 0} | ${Object.entries(report.data?.priorityWise || {}).map(([k,v]) => `${k}: ${v}`).join(', ')}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Visual Stats Section */}
      <h2 className="text-lg font-semibold text-gray-100 mb-4">📊 Live Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* By Status */}
        <div className="card">
          <h3 className="font-semibold text-gray-100 mb-4">Complaints by Status</h3>
          <div className="space-y-3">
            {Object.entries(statusStats).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{status}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(count / complaints.length) * 100}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-gray-100 w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By City */}
        <div className="card">
          <h3 className="font-semibold text-gray-100 mb-4">Complaints by City</h3>
          <div className="space-y-3">
            {Object.entries(cityStats).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([city, count]) => (
              <div key={city} className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{city}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-100 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(count / complaints.length) * 100}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-gray-100 w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
            {Object.keys(cityStats).length === 0 && <p className="text-gray-400 text-sm">No data</p>}
          </div>
        </div>

        {/* By Category */}
        <div className="card md:col-span-2">
          <h3 className="font-semibold text-gray-100 mb-4">Complaints by Category</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(categoryStats).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
              <div key={cat} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-2">
                <span className="text-sm text-gray-400">{cat}</span>
                <span className="text-sm font-bold text-gray-100">{count}</span>
              </div>
            ))}
            {Object.keys(categoryStats).length === 0 && <p className="text-gray-400 text-sm">No data</p>}
          </div>
        </div>

        {/* Summary */}
        {stats && (
          <div className="card md:col-span-2">
            <h3 className="font-semibold text-gray-100 mb-4">Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-blue-400">{stats.totalComplaints}</p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-green-700">{stats.resolvedComplaints}</p>
                <p className="text-xs text-gray-500">Resolved</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-orange-700">{stats.inProgressComplaints}</p>
                <p className="text-xs text-gray-500">In Progress</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-purple-700">{stats.totalUsers}</p>
                <p className="text-xs text-gray-500">Citizens</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateReports;
