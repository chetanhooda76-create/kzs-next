import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Package,
  Truck,
  RefreshCw,
  Calendar,
  Filter as FilterIcon,
  X as XIcon,
} from 'lucide-react';
import API_BASE_URL from '../apiConfig';

const REFRESH_INTERVAL_MS = 30000;

const STATUS_COLORS = {
  Pending: '#3B82F6',
  Completed: '#16A34A',
  Cancelled: '#EF4444',
};

const PIE_COLORS = ['#16A34A', '#F59E0B', '#3B82F6', '#EF4444', '#8B5CF6', '#EC4899'];

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const todayStr = () => new Date().toISOString().slice(0, 10);
const currentMonthStr = () => new Date().toISOString().slice(0, 7);
const currentYearStr = () => String(new Date().getFullYear());

const AdminAnalytics = () => {
  const [pickups, setPickups] = useState({ household: [], business: [] });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterTab, setFilterTab] = useState('days'); // days | months | years | custom
  const [draftDay, setDraftDay] = useState(todayStr());
  const [draftMonth, setDraftMonth] = useState(currentMonthStr());
  const [draftYear, setDraftYear] = useState(currentYearStr());
  const [draftFrom, setDraftFrom] = useState('');
  const [draftTo, setDraftTo] = useState('');
  const [appliedFilter, setAppliedFilter] = useState(null); // { mode, ...payload }
  const filterRef = useRef(null);

  const fetchPickups = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/pickups`);
      if (res.data.success) {
        setPickups(res.data.data);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/admin/pickups`);
        if (isMounted && res.data.success) {
          setPickups(res.data.data);
          setLastUpdated(new Date());
        }
      } catch (err) {
        if (isMounted) console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    const id = setInterval(fetchPickups, REFRESH_INTERVAL_MS);
    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, []);

  // Close filter popover on outside click
  useEffect(() => {
    if (!isFilterOpen) return;
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isFilterOpen]);

  const applyFilter = () => {
    if (filterTab === 'days' && draftDay) {
      setAppliedFilter({ mode: 'day', value: draftDay });
    } else if (filterTab === 'months' && draftMonth) {
      setAppliedFilter({ mode: 'month', value: draftMonth });
    } else if (filterTab === 'years' && draftYear) {
      setAppliedFilter({ mode: 'year', value: draftYear });
    } else if (filterTab === 'custom' && draftFrom && draftTo) {
      setAppliedFilter({ mode: 'custom', from: draftFrom, to: draftTo });
    }
    setIsFilterOpen(false);
  };

  const resetFilter = () => {
    setAppliedFilter(null);
    setDraftDay(todayStr());
    setDraftMonth(currentMonthStr());
    setDraftYear(currentYearStr());
    setDraftFrom('');
    setDraftTo('');
  };

  const filterLabel = useMemo(() => {
    if (!appliedFilter) return null;
    if (appliedFilter.mode === 'day') {
      return new Date(appliedFilter.value).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
      });
    }
    if (appliedFilter.mode === 'month') {
      const [y, m] = appliedFilter.value.split('-');
      return `${MONTH_NAMES[parseInt(m, 10) - 1]} ${y}`;
    }
    if (appliedFilter.mode === 'year') {
      return `Year ${appliedFilter.value}`;
    }
    if (appliedFilter.mode === 'custom') {
      const f = new Date(appliedFilter.from).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
      const t = new Date(appliedFilter.to).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      return `${f} → ${t}`;
    }
    return null;
  }, [appliedFilter]);

  const inFilter = useCallback((dateStr) => {
    if (!appliedFilter || !dateStr) return true;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return false;
    if (appliedFilter.mode === 'day') {
      return d.toISOString().slice(0, 10) === appliedFilter.value;
    }
    if (appliedFilter.mode === 'month') {
      return d.toISOString().slice(0, 7) === appliedFilter.value;
    }
    if (appliedFilter.mode === 'year') {
      return String(d.getFullYear()) === appliedFilter.value;
    }
    if (appliedFilter.mode === 'custom') {
      const from = new Date(appliedFilter.from);
      const to = new Date(appliedFilter.to);
      to.setHours(23, 59, 59, 999);
      return d >= from && d <= to;
    }
    return true;
  }, [appliedFilter]);

  const all = useMemo(() => {
    const merged = [
      ...pickups.household.map((p) => ({ ...p, type: 'household' })),
      ...pickups.business.map((p) => ({ ...p, type: 'business' })),
    ];
    return merged.filter((p) => inFilter(p.createdAt));
  }, [pickups, inFilter]);

  const statusCounts = useMemo(() => {
    const counts = { Pending: 0, Completed: 0, Cancelled: 0 };
    all.forEach((p) => {
      const s = p.status || 'Pending';
      counts[s] = (counts[s] || 0) + 1;
    });
    return counts;
  }, [all]);

  const totalPickups = all.length;
  const completionRate = totalPickups
    ? Math.round((statusCounts.Completed / totalPickups) * 100)
    : 0;

  const statusPieData = [
    { name: 'Pending', value: statusCounts.Pending, color: STATUS_COLORS.Pending },
    { name: 'Completed', value: statusCounts.Completed, color: STATUS_COLORS.Completed },
    { name: 'Cancelled', value: statusCounts.Cancelled, color: STATUS_COLORS.Cancelled },
  ].filter((d) => d.value > 0);

  const householdCount = useMemo(() => all.filter((p) => p.type === 'household').length, [all]);
  const businessCount = useMemo(() => all.filter((p) => p.type === 'business').length, [all]);

  const typePieData = [
    { name: 'Household', value: householdCount, color: '#16A34A' },
    { name: 'Business', value: businessCount, color: '#F59E0B' },
  ].filter((d) => d.value > 0);

  const topServices = useMemo(() => {
    const map = new Map();
    all.forEach((p) => {
      const s = p.service || 'General Scrap';
      map.set(s, (map.get(s) || 0) + 1);
    });
    return [...map.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [all]);

  // Trend — adapts to filter: year → monthly, otherwise daily
  const trendData = useMemo(() => {
    const byMonth = appliedFilter?.mode === 'year';
    const buckets = new Map();

    if (byMonth) {
      const year = parseInt(appliedFilter.value, 10);
      for (let m = 0; m < 12; m++) {
        const key = `${year}-${String(m + 1).padStart(2, '0')}`;
        buckets.set(key, { key, label: MONTH_NAMES[m], total: 0, completed: 0 });
      }
      all.forEach((p) => {
        if (!p.createdAt) return;
        const d = new Date(p.createdAt);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const bucket = buckets.get(key);
        if (bucket) {
          bucket.total += 1;
          if (p.status === 'Completed') bucket.completed += 1;
        }
      });
      return [...buckets.values()];
    }

    // daily range
    let start;
    let end;
    if (appliedFilter?.mode === 'month') {
      const [y, m] = appliedFilter.value.split('-').map(Number);
      start = new Date(y, m - 1, 1);
      end = new Date(y, m, 0);
    } else if (appliedFilter?.mode === 'custom') {
      start = new Date(appliedFilter.from);
      end = new Date(appliedFilter.to);
    } else if (appliedFilter?.mode === 'day') {
      start = new Date(appliedFilter.value);
      end = new Date(appliedFilter.value);
    } else {
      end = new Date();
      start = new Date();
      start.setDate(end.getDate() - 29);
    }
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const cursor = new Date(start);
    while (cursor <= end) {
      const key = cursor.toISOString().slice(0, 10);
      buckets.set(key, { key, label: cursor.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }), total: 0, completed: 0 });
      cursor.setDate(cursor.getDate() + 1);
    }

    all.forEach((p) => {
      if (!p.createdAt) return;
      const d = new Date(p.createdAt);
      d.setHours(0, 0, 0, 0);
      const key = d.toISOString().slice(0, 10);
      const bucket = buckets.get(key);
      if (bucket) {
        bucket.total += 1;
        if (p.status === 'Completed') bucket.completed += 1;
      }
    });

    return [...buckets.values()];
  }, [all, appliedFilter]);

  const trendChartTitle = useMemo(() => {
    if (!appliedFilter) return 'Request Trend (Last 30 Days)';
    if (appliedFilter.mode === 'day') return 'Request Trend (Selected Day)';
    if (appliedFilter.mode === 'month') return `Request Trend (${filterLabel})`;
    if (appliedFilter.mode === 'year') return `Monthly Breakdown (${filterLabel})`;
    if (appliedFilter.mode === 'custom') return `Request Trend (${filterLabel})`;
    return 'Request Trend';
  }, [appliedFilter, filterLabel]);

  const statCards = [
    {
      label: 'Total Requests',
      value: totalPickups,
      icon: <Package className="w-5 h-5" />,
      color: 'bg-primary/10 text-primary',
      accent: 'border-primary/20',
    },
    {
      label: 'Pending',
      value: statusCounts.Pending,
      icon: <Clock className="w-5 h-5" />,
      color: 'bg-blue-50 text-blue-600',
      accent: 'border-blue-100',
    },
    {
      label: 'Completed',
      value: statusCounts.Completed,
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: 'bg-green-50 text-green-600',
      accent: 'border-green-100',
    },
    {
      label: 'Cancelled',
      value: statusCounts.Cancelled,
      icon: <XCircle className="w-5 h-5" />,
      color: 'bg-red-50 text-red-600',
      accent: 'border-red-100',
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'bg-amber-50 text-amber-600',
      accent: 'border-amber-100',
    },
  ];

  const typeSplit = [
    {
      label: 'Household Pickups',
      value: householdCount,
      icon: <Package className="w-5 h-5" />,
      bg: 'bg-primary/5',
      text: 'text-primary',
    },
    {
      label: 'Business Pickups',
      value: businessCount,
      icon: <Truck className="w-5 h-5" />,
      bg: 'bg-secondary/10',
      text: 'text-secondary-hover',
    },
  ];

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400 font-bold">
        Loading analytics…
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="w-full md:w-auto">
          <p className="text-[10px] md:text-sm text-gray-500 font-medium font-lexend leading-tight">
            Realtime overview of pickup requests across household and business channels.
          </p>
          <p className="text-[9px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Auto-refreshes every 30s · Last updated{' '}
            {lastUpdated ? lastUpdated.toLocaleTimeString() : '—'}
          </p>
        </div>

        <div className="flex items-center gap-2 relative" ref={filterRef}>
          {appliedFilter && (
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-xl text-xs font-bold text-primary">
              <Calendar size={14} />
              {filterLabel}
              <button
                onClick={resetFilter}
                className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-primary/20 transition-all"
                aria-label="Clear filter"
              >
                <XIcon size={12} />
              </button>
            </div>
          )}

          <button
            onClick={() => setIsFilterOpen((v) => !v)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border ${
              appliedFilter
                ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20'
                : 'bg-white text-gray-700 border-gray-100 hover:bg-gray-50'
            }`}
          >
            <FilterIcon size={14} /> Filter by Date
          </button>

          <button
            onClick={fetchPickups}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-100 text-gray-700 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all"
          >
            <RefreshCw size={14} /> Refresh
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 w-70 md:w-85 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden outline-none">
              {/* Tabs */}
              <div className="flex border-b border-gray-100 bg-gray-50/50">
                {[
                  { id: 'days', label: 'Days' },
                  { id: 'months', label: 'Months' },
                  { id: 'years', label: 'Years' },
                  { id: 'custom', label: 'Custom' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setFilterTab(t.id)}
                    className={`flex-1 px-1 py-2.5 text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                      filterTab === t.id
                        ? 'text-primary border-b-2 border-primary bg-white'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="p-4 md:p-5 space-y-3">
                {filterTab === 'days' && (
                  <div>
                    <label className="block text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 md:mb-2 ml-1">
                      Pick a Day
                    </label>
                    <input
                      type="date"
                      value={draftDay}
                      onChange={(e) => setDraftDay(e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[11px] md:text-sm text-gray-800 focus:ring-2 focus:ring-primary/10 outline-none"
                    />
                  </div>
                )}

                {filterTab === 'months' && (
                  <div>
                    <label className="block text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 md:mb-2 ml-1">
                      Pick a Month
                    </label>
                    <input
                      type="month"
                      value={draftMonth}
                      onChange={(e) => setDraftMonth(e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[11px] md:text-sm text-gray-800 focus:ring-2 focus:ring-primary/10 outline-none"
                    />
                  </div>
                )}

                {filterTab === 'years' && (
                  <div>
                    <label className="block text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 md:mb-2 ml-1">
                      Pick a Year
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 md:gap-2">
                      {(() => {
                        const current = new Date().getFullYear();
                        const years = [];
                        for (let y = current; y >= current - 7; y--) years.push(String(y));
                        return years.map((y) => (
                          <button
                            key={y}
                            onClick={() => setDraftYear(y)}
                            className={`py-2 md:py-2.5 rounded-lg md:rounded-xl font-black text-[9px] md:text-xs transition-all ${
                              draftYear === y
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {y}
                          </button>
                        ));
                      })()}
                    </div>
                  </div>
                )}

                {filterTab === 'custom' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        From
                      </label>
                      <input
                        type="date"
                        value={draftFrom}
                        onChange={(e) => setDraftFrom(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl font-bold text-[10px] md:text-xs text-gray-800 focus:ring-2 focus:ring-primary/10 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                        To
                      </label>
                      <input
                        type="date"
                        value={draftTo}
                        onChange={(e) => setDraftTo(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl font-bold text-[10px] md:text-xs text-gray-800 focus:ring-2 focus:ring-primary/10 outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="px-4 pb-4 md:px-5 md:pb-5 flex gap-2">
                <button
                  onClick={resetFilter}
                  className="flex-1 py-2 md:py-3 bg-gray-50 text-gray-600 rounded-lg md:rounded-xl font-black text-[9px] md:text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
                >
                  Reset
                </button>
                <button
                  onClick={applyFilter}
                  className="flex-2 py-2 md:py-3 bg-primary text-white rounded-lg md:rounded-xl font-black text-[9px] md:text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4 font-lexend">
        {statCards.map((c) => (
          <div
            key={c.label}
            className={`bg-white p-3 md:p-5 rounded-xl md:rounded-2xl border ${c.accent} shadow-sm hover:shadow-md transition-all`}
          >
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div className={`w-8 h-8 md:w-10 md:h-10 ${c.color} rounded-lg md:rounded-xl flex items-center justify-center`}>
                {c.icon}
              </div>
            </div>
            <div className="text-xl md:text-3xl font-black text-gray-900 tracking-tight">
              {c.value}
            </div>
            <div className="text-[8px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-0.5 md:mt-1">
              {c.label}
            </div>
          </div>
        ))}
      </div>

      {/* Type Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {typeSplit.map((t) => (
          <div
            key={t.label}
            className={`${t.bg} p-4 md:p-5 rounded-xl md:rounded-2xl border border-gray-100 flex items-center justify-between`}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg md:rounded-xl flex items-center justify-center ${t.text} shadow-sm`}>
                {t.icon}
              </div>
              <div>
                <div className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {t.label}
                </div>
                <div className="text-lg md:text-2xl font-black text-gray-900 mt-0.5 md:mt-1">{t.value}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Share
              </div>
              <div className={`text-base md:text-xl font-black ${t.text}`}>
                {totalPickups ? Math.round((t.value / totalPickups) * 100) : 0}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Status Pie */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 md:mb-4">
            <h3 className="text-[11px] md:text-sm font-black text-gray-900 uppercase tracking-widest font-lexend">
              Status Distribution
            </h3>
            <span className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Pending / Completed / Cancelled
            </span>
          </div>
          {statusPieData.length === 0 ? (
            <div className="h-72 flex items-center justify-center text-gray-400 font-bold text-sm">
              No data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) =>
                    window.innerWidth < 768 ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {statusPieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #f3f4f6',
                    fontSize: window.innerWidth < 768 ? 9 : 10,
                    fontWeight: 700,
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ fontSize: window.innerWidth < 768 ? 8 : 10, fontWeight: 700, paddingTop: 10 }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Type Pie */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 md:mb-4">
            <h3 className="text-[11px] md:text-sm font-black text-gray-900 uppercase tracking-widest font-lexend">
              Request Channel
            </h3>
            <span className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Household vs Business
            </span>
          </div>
          {typePieData.length === 0 ? (
            <div className="h-72 flex items-center justify-center text-gray-400 font-bold text-sm">
              No data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={typePieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) =>
                    window.innerWidth < 768 ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {typePieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #f3f4f6',
                    fontSize: window.innerWidth < 768 ? 9 : 10,
                    fontWeight: 700,
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ fontSize: window.innerWidth < 768 ? 8 : 10, fontWeight: 700, paddingTop: 10 }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Top Services Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-6 md:mb-4">
          <h3 className="text-[10px] md:text-sm font-black text-gray-900 uppercase tracking-widest font-lexend whitespace-nowrap">
            Top Services Requested
          </h3>
          <span className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            By count
          </span>
        </div>
        {topServices.length === 0 ? (
          <div className="h-72 flex items-center justify-center text-gray-400 font-bold text-sm">
            No data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={topServices} margin={{ top: 8, right: 8, left: -20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: window.innerWidth < 768 ? 7 : 11, fontWeight: 700, fill: '#6b7280' }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: window.innerWidth < 768 ? 8 : 11, fontWeight: 700, fill: '#6b7280' }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid #f3f4f6',
                  fontSize: window.innerWidth < 768 ? 9 : 12,
                  fontWeight: 700,
                }}
                cursor={{ fill: 'rgba(22,163,74,0.06)' }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {topServices.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Daily Trend Line */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Calendar size={18} />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest font-lexend">
                {trendChartTitle}
              </h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                Total vs Completed
              </p>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData} margin={{ top: 8, right: 8, left: -20, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: window.innerWidth < 768 ? 8 : 10, fontWeight: 700, fill: '#6b7280' }}
              interval="preserveStartEnd"
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: window.innerWidth < 768 ? 8 : 11, fontWeight: 700, fill: '#6b7280' }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #f3f4f6',
                fontSize: window.innerWidth < 768 ? 9 : 12,
                fontWeight: 700,
              }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: window.innerWidth < 768 ? 9 : 12, fontWeight: 700 }}
            />
            <Line
              type="monotone"
              dataKey="total"
              name="Total Requests"
              stroke="#16A34A"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="completed"
              name="Completed"
              stroke="#F59E0B"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalytics;
