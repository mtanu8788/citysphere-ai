import DashboardLayout from "../components/DashboardLayout"
import CityMap from "../components/CityMap";
function Dashboard() {
  return (
    <DashboardLayout>

      <div className="p-6">

        {/* ==================== WELCOME ==================== */}

        <div className="mb-6">

          <h1 className="text-3xl font-bold text-slate-900">
            Good Morning, Tanuja 👋
          </h1>

          <p className="text-slate-500 mt-1">
            Here's what's happening across your city today.
          </p>

        </div>


        {/* ==================== KPI CARDS ==================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

          {/* Total Reports */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">

            <p className="text-sm text-slate-500">
              Total Reports
            </p>

            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              124
            </h3>

            <p className="text-xs text-green-600 mt-1">
              ↑ 12% from last week
            </p>

          </div>


          {/* Traffic Level */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">

            <p className="text-sm text-slate-500">
              Traffic Level
            </p>

            <h3 className="text-3xl font-bold text-orange-500 mt-2">
              68%
            </h3>

            <p className="text-xs text-orange-500 mt-1">
              Moderate
            </p>

          </div>


          {/* Active Hotspots */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">

            <p className="text-sm text-slate-500">
              Active Hotspots
            </p>

            <h3 className="text-3xl font-bold text-red-500 mt-2">
              8
            </h3>

            <p className="text-xs text-red-500 mt-1">
              3 high priority
            </p>

          </div>


          {/* Resolved Issues */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">

            <p className="text-sm text-slate-500">
              Resolved Issues
            </p>

            <h3 className="text-3xl font-bold text-green-600 mt-2">
              86
            </h3>

            <p className="text-xs text-green-600 mt-1">
              ↑ 18% this month
            </p>

          </div>

        </div>


        {/* ==================== MAP + AI ==================== */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">

          {/* LIVE CITY MAP */}

          <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

            <div className="p-4 border-b border-slate-200 flex items-center justify-between">

              <div>

                <h3 className="font-semibold text-slate-800">
                  Live City Map
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  Real-time urban mobility activity
                </p>

              </div>

              <span className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
                ● Live
              </span>

            </div>


            <div className="h-72">
  <CityMap />
</div>

            </div>

        


          {/* AI INSIGHTS */}

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">

            <div className="p-4 border-b border-slate-200">

              <h3 className="font-semibold text-slate-800">
                ✦ AI Insights
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                Intelligent mobility analysis
              </p>

            </div>


            <div className="p-4 space-y-4">

              {/* Insight 1 */}

              <div className="border-l-4 border-red-500 pl-3">

                <p className="text-sm font-semibold text-slate-800">
                  Traffic Hotspot
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Heavy congestion detected in Central Area.
                </p>

                <span className="inline-block mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                  High Priority
                </span>

              </div>


              {/* Insight 2 */}

              <div className="border-l-4 border-orange-500 pl-3">

                <p className="text-sm font-semibold text-slate-800">
                  Road Issue
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Multiple reports detected near Main Road.
                </p>

                <span className="inline-block mt-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                  Medium
                </span>

              </div>


              {/* Insight 3 */}

              <div className="border-l-4 border-green-500 pl-3">

                <p className="text-sm font-semibold text-slate-800">
                  Traffic Improving
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Traffic levels decreased by 14% in Zone 3.
                </p>

                <span className="inline-block mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                  Positive
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ==================== TRAFFIC + ALERTS ==================== */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* TRAFFIC TRENDS */}

          <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">

            <div className="p-4 border-b border-slate-200 flex items-center justify-between">

              <div>

                <h3 className="font-semibold text-slate-800">
                  Traffic Trends
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  Traffic activity over the last 7 days
                </p>

              </div>

              <span className="text-xs text-slate-500">
                Last 7 Days
              </span>

            </div>


            {/* Simple Chart */}

            <div className="p-5">

              <div className="flex items-end justify-between h-44 gap-4">

                {/* Monday */}
                <div className="flex flex-col items-center flex-1">

                  <div
                    className="w-full bg-blue-200 rounded-t-lg"
                    style={{ height: "55%" }}
                  ></div>

                  <span className="text-xs text-slate-500 mt-2">
                    Mon
                  </span>

                </div>


                {/* Tuesday */}
                <div className="flex flex-col items-center flex-1">

                  <div
                    className="w-full bg-blue-300 rounded-t-lg"
                    style={{ height: "68%" }}
                  ></div>

                  <span className="text-xs text-slate-500 mt-2">
                    Tue
                  </span>

                </div>


                {/* Wednesday */}
                <div className="flex flex-col items-center flex-1">

                  <div
                    className="w-full bg-blue-400 rounded-t-lg"
                    style={{ height: "78%" }}
                  ></div>

                  <span className="text-xs text-slate-500 mt-2">
                    Wed
                  </span>

                </div>


                {/* Thursday */}
                <div className="flex flex-col items-center flex-1">

                  <div
                    className="w-full bg-blue-500 rounded-t-lg"
                    style={{ height: "88%" }}
                  ></div>

                  <span className="text-xs text-slate-500 mt-2">
                    Thu
                  </span>

                </div>


                {/* Friday */}
                <div className="flex flex-col items-center flex-1">

                  <div
                    className="w-full bg-blue-400 rounded-t-lg"
                    style={{ height: "72%" }}
                  ></div>

                  <span className="text-xs text-slate-500 mt-2">
                    Fri
                  </span>

                </div>


                {/* Saturday */}
                <div className="flex flex-col items-center flex-1">

                  <div
                    className="w-full bg-blue-300 rounded-t-lg"
                    style={{ height: "60%" }}
                  ></div>

                  <span className="text-xs text-slate-500 mt-2">
                    Sat
                  </span>

                </div>


                {/* Sunday */}
                <div className="flex flex-col items-center flex-1">

                  <div
                    className="w-full bg-blue-200 rounded-t-lg"
                    style={{ height: "48%" }}
                  ></div>

                  <span className="text-xs text-slate-500 mt-2">
                    Sun
                  </span>

                </div>

              </div>


              <div className="mt-4 flex items-center justify-between">

                <p className="text-xs text-slate-500">
                  Average traffic level
                </p>

                <p className="text-sm font-semibold text-orange-500">
                  68% Moderate
                </p>

              </div>

            </div>

          </div>


          {/* PRIORITY ALERTS */}

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">

            <div className="p-4 border-b border-slate-200">

              <h3 className="font-semibold text-slate-800">
                🚨 Priority Alerts
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                Issues requiring attention
              </p>

            </div>


            <div className="p-4 space-y-4">

              {/* Alert 1 */}

              <div className="p-3 bg-red-50 rounded-lg">

                <div className="flex items-start gap-3">

                  <span className="text-red-500">
                    ●
                  </span>

                  <div>

                    <p className="text-sm font-semibold text-slate-800">
                      Heavy Congestion
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Central Road
                    </p>

                    <span className="inline-block mt-2 text-xs text-red-600 font-medium">
                      High Priority
                    </span>

                  </div>

                </div>

              </div>


              {/* Alert 2 */}

              <div className="p-3 bg-orange-50 rounded-lg">

                <div className="flex items-start gap-3">

                  <span className="text-orange-500">
                    ●
                  </span>

                  <div>

                    <p className="text-sm font-semibold text-slate-800">
                      Multiple Road Issues
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Main Road
                    </p>

                    <span className="inline-block mt-2 text-xs text-orange-600 font-medium">
                      Medium Priority
                    </span>

                  </div>

                </div>

              </div>


              {/* Alert 3 */}

              <div className="p-3 bg-yellow-50 rounded-lg">

                <div className="flex items-start gap-3">

                  <span className="text-yellow-500">
                    ●
                  </span>

                  <div>

                    <p className="text-sm font-semibold text-slate-800">
                      Parking Congestion
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Station Road
                    </p>

                    <span className="inline-block mt-2 text-xs text-yellow-600 font-medium">
                      Medium Priority
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  )
}

export default Dashboard