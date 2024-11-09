import React from "react";
import { CalendarDays } from "lucide-react";
import Layout from "../../components/Layout/Layout";

function Schedule() {
  return (
    <>
      <Layout>
        <div className="schedule">
          <div className="schedule-header">
            <div className="menu">
              <div className="icon">
                <CalendarDays strokeWidth={1.5} size={28} />
              </div>
              <div className="title">Schedule</div>
              <div className="desc">Overview All Component</div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Schedule;
