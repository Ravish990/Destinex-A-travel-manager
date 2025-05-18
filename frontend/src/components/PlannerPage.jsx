import React from 'react';
import { useParams } from 'react-router-dom';
import './PlannerPage.css';

const PlannerPage = () => {
  const { locationId } = useParams();

  return (
    <div className="planner-page">
      <h2>Now planning your holiday to {locationId.replace(/-/g, ' ')}</h2>
      <h3>What's the duration of your holiday?</h3>
      <div className="duration-options">
        <div className="option">6–9 Days</div>
        <div className="option">10–12 Days</div>
        <div className="option highlighted">13–15 Days <span className="badge">Our Pick</span></div>
        <div className="option">15–20 Days</div>
      </div>
    </div>
  );
};

export default PlannerPage;
